import requests
import json
import time
import pandas
import statsmodels
import statsmodels.tsa
import statsmodels.tsa.seasonal


def get_pivot_data():
  try:
    response = requests.get('http://database-api:3000/get-pivot-data')
    response_data = pandas.DataFrame(json.loads(response.text))
    response_data['produce_time'] = pandas.to_datetime(response_data['produce_time'])
    return response_data
  except requests.RequestException as e:
    print(f'Error get data from database: {e}')

def cal_decomposed_data():
  pivot_data = get_pivot_data()
  df_total = pandas.DataFrame({
    'produce_time': pivot_data['produce_time'],
    'total': pivot_data['total']
  })
  decomposition_data = df_total.resample('ME', on='produce_time').median().dropna(axis=0)
  decomposition = statsmodels.tsa.seasonal.seasonal_decompose(decomposition_data['total'], model='additive', period=12)
  trend = decomposition.trend
  seasonal = decomposition.seasonal
  residual = decomposition.resid
  df_decomposed = pandas.DataFrame({
    'produce_time': decomposition_data.index,
    'total': decomposition_data['total'],
    'trend': trend,
    'seasonal': seasonal,
    'resid': residual
  }).dropna(axis=0)
  df_decomposed['index'] = range(df_decomposed.shape[0])
  df_decomposed = df_decomposed.set_index('index')
  try:
    print('====================\nStart insert decomposed data')
    for i in range(len(df_decomposed)):
      decomposed_data = {}
      decomposed_data['produce_time'] = str(df_decomposed['produce_time'][i])
      decomposed_data['total_produce'] = float(df_decomposed['total'][i])
      decomposed_data['trend'] = float(df_decomposed['trend'][i])
      decomposed_data['seasonal'] = float(df_decomposed['seasonal'][i])
      decomposed_data['resid'] = float(df_decomposed['resid'][i])
      response = requests.post('http://database-api:3000/insert-decomposed-data', json=decomposed_data, headers={'Content-Type': 'application/json'})
      print(f'Status Code: {response.status_code}\nResponse: {response.json()}')
    print('End collect data\n====================\n\n\n')
  except requests.RequestException as err:
    print(f'Error when insert decomposed data: {err}')

def delete_all_decomposed_data():
  try:
    response = requests.delete('http://database-api:3000/delete-decomposed-data', headers={'Content-Type': 'application/json'})
    print(f'Status Code: {response.status_code}\nResponse: {response.json()}')
  except requests.RequestException as err:
    print(f'Error when delete decomposed data: {err}')

def cal_correlation_data():
  pivot_data = get_pivot_data()
  df_correlation = pivot_data.drop(columns=['produce_time']).corr()
  try:
    print('====================\nStart insert correlation data')
    for i in range(len(df_correlation)):
      correlation_data = {}
      correlation_data['coal'] = float(df_correlation['Coal'].iloc[i])
      correlation_data['hydro'] = float(df_correlation['Hydro'].iloc[i])
      correlation_data['natural_gas'] = float(df_correlation['Natural Gas'].iloc[i])
      correlation_data['nuclear'] = float(df_correlation['Nuclear'].iloc[i])
      correlation_data['solar'] = float(df_correlation['Solar'].iloc[i])
      correlation_data['total'] = float(df_correlation['total'].iloc[i])
      response = requests.post('http://database-api:3000/insert-correlation-data', json=correlation_data, headers={'Content-Type': 'application/json'})
      print(f'Status Code: {response.status_code}\nResponse: {response.json()}')
    print('End collect data\n====================\n\n\n')
  except requests.RequestException as err:
    print(f'Error when insert correlation data: {err}')

def delete_all_correlation_data():
  try:
    response = requests.delete('http://database-api:3000/delete-correlation-data', headers={'Content-Type': 'application/json'})
    print(f'Status Code: {response.status_code}\nResponse: {response.json()}')
  except requests.RequestException as err:
    print(f'Error when delete correlation data: {err}')

if __name__ == '__main__':
  while True:
    delete_all_decomposed_data()
    delete_all_correlation_data()
    cal_correlation_data()
    cal_decomposed_data()
    time.sleep(300)