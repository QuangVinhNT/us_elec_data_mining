import pandas
import requests
import json
import numpy
import time
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

def get_pivot_data():
  try:
    response = requests.get('http://database-api:3000/get-pivot-data-d')
    response_data = pandas.DataFrame(json.loads(response.text))
    response_data['produce_time'] = pandas.to_datetime(response_data['produce_time'])
    return response_data
  except requests.RequestException as e:
    print(f'Error get data from database: {e}')

def get_prediction_data():
  pivot_data = get_pivot_data()
  df_prediction = pandas.DataFrame({
    'produce_time': pivot_data['produce_time'],
    'coal': pivot_data['Coal'],
    'hydro': pivot_data['Hydro'],
    'natural_gas': pivot_data['Natural Gas'],
    'total': pivot_data['total']
  })
  df_prediction = df_prediction.set_index('produce_time')

  s = df_prediction.values
  observed_size = 5
  overlap_size = 2
  predict_distance = 1
  samples = int((len(s) - observed_size) / (observed_size - overlap_size))
  X = numpy.stack([s[i*(observed_size - overlap_size) : i*(observed_size - overlap_size) + observed_size] for i in range(samples)])
  y = numpy.stack([s[i*(observed_size - overlap_size) + observed_size + predict_distance][-1] for i in range(samples)])
  X = X.reshape(X.shape[0], -1)
  X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
  regr = RandomForestRegressor(max_depth=5, n_estimators=300, random_state=0)
  regr.fit(X_train, y_train)
  regr.score(X_test, y_test)
  input_data = numpy.array([s[i] for i in range(-1, -6, -1)])
  predicted_data = regr.predict(input_data.reshape(1, -1))[-1]
  try:
    print('====================\nStart insert correlation data')    
    prediction_data = {}
    prediction_data['predict_value'] = float(predicted_data)
    prediction_data['exactly_rate'] = float(regr.score(X_test, y_test))
    response = requests.post('http://database-api:3000/insert-prediction-data', json=prediction_data, headers={'Content-Type': 'application/json'})
    print(f'Status Code: {response.status_code}\nResponse: {response.json()}')
    print('End collect data\n====================\n\n\n')
  except requests.RequestException as err:
    print(f'Error when insert correlation data: {err}')

def delete_all_prediction_data():
  try:
    response = requests.delete('http://database-api:3000/delete-prediction-data', headers={'Content-Type': 'application/json'})
    print(f'Status Code: {response.status_code}\nResponse: {response.json()}')
  except requests.RequestException as err:
    print(f'Error when delete prediction data: {err}')

if __name__ == '__main__':
  while True:
    delete_all_prediction_data()
    get_prediction_data()
    time.sleep(300)