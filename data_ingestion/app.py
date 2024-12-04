import requests
import json
import time

API_KEY = f'LcKV9RNEoCTS40plfapKlOWMR1fcUZhuh7tAC23g'
API_PARAMS = f'&frequency=hourly&data[0]=value&facets[fueltype][]=COL&facets[fueltype][]=NG&facets[fueltype][]=NUC&facets[fueltype][]=SUN&facets[fueltype][]=WAT&facets[respondent][]=CAR&sort[0][column]=period&sort[0][direction]=desc&offset=0&length=5000'
API_URL = f'https://api.eia.gov/v2/electricity/rto/fuel-type-data/data/?api_key={API_KEY}{API_PARAMS}'

def get_raw_data():
  try:
    # response = requests.get(f'https://api.eia.gov/v2/electricity/rto/fuel-type-data/data/?api_key={API_KEY}&frequency=hourly&data[0]=value&facets[fueltype][]=COL&facets[fueltype][]=NG&facets[fueltype][]=NUC&facets[fueltype][]=SUN&facets[fueltype][]=WAT&facets[respondent][]=CAR&sort[0][column]=period&start=2019-01-01T00&sort[0][direction]=desc&offset={offset}&length=5000')
    response = requests.get(API_URL)
    elec_datas = json.loads(response.text)['response']['data']
    return elec_datas
  except Exception as err:
    print({'error': err})

def insert_to_db():
  try:
    raw_data = get_raw_data()
    print('====================\nStart collect data')
    for data in raw_data:
      elec_data = {}
      elec_data['produce_time'] = data['period']
      elec_data['fuel_type'] = data['type-name']
      elec_data['value'] = data['value']
      elec_data['value_unit'] = data['value-units']
      response = requests.post('http://database-api:3000/insert-raw-data', json=elec_data, headers={'Content-Type': 'application/json'})
      print(f'Status Code: {response.status_code}\nResponse: {response.json()}')
      if response.status_code == 500:
        break
    print('End collect data\n====================\n\n\n')
  except requests.RequestException as err:
    print(f'Error insert raw data to database: {err}')

if __name__ == '__main__':
  while True:
    insert_to_db()
    time.sleep(300)
  # pass