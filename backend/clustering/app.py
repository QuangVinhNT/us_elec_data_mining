import requests
import pandas
import json
import time
from sklearn.cluster import KMeans

def get_pivot_data():
  try:
    response = requests.get('http://database-api:3000/get-pivot-data')
    response_data = pandas.DataFrame(json.loads(response.text))
    response_data['produce_time'] = pandas.to_datetime(response_data['produce_time'])
    return response_data
  except requests.RequestException as e:
    print(f'Error get data from database: {e}')

def customize_kmean_label(kmean_label, half_year):
    if half_year == 'H1' and kmean_label == 2:
        return 0
    if half_year == 'H2' and kmean_label == 0:
        return 2
    return kmean_label

def cluster_process(data):
  data = data.reset_index()
  for i in range(data.shape[0]):
    data.loc[i, 'half_year'] = 'H1' if data.loc[i, 'produce_time'].month <= 6 else 'H2'
  data = data.set_index(['produce_time', 'half_year'])
  kmeans = KMeans(n_clusters=4, random_state=42)
  data['kmean_label'] = kmeans.fit_predict(data.values)
  custom_label_col = data.reset_index()[['kmean_label', 'half_year']].apply(lambda x: customize_kmean_label(x['kmean_label'], x['half_year']), axis=1)
  data['custom_label'] = custom_label_col.values
  data = data.reset_index()
  return(data)

def get_clustering_data():
  pivot_data = get_pivot_data()
  df_total = pandas.DataFrame({
    'produce_time': pivot_data['produce_time'],
    'total': pivot_data['total']
  })
  daily_df_total = df_total.resample('D', on='produce_time').median().dropna(axis=0)
  processed_data = cluster_process(daily_df_total)
  try:
    print('====================\nStart insert clustering data')
    for i in range(len(processed_data)):
      clustering_data = {}
      clustering_data['produce_time'] = str(processed_data['produce_time'][i])
      clustering_data['half_year'] = str(processed_data['half_year'][i])
      clustering_data['total_produce'] = float(processed_data['total'][i])
      clustering_data['kmean_label'] = int(processed_data['kmean_label'][i])
      clustering_data['custom_label'] = int(processed_data['custom_label'][i])
      response = requests.post('http://database-api:3000/insert-clustering-data', json=clustering_data, headers={'Content-Type': 'application/json'})
      print(f'Status Code: {response.status_code}\nResponse: {response.json()}')
    print('End collect data\n====================\n\n\n')
  except requests.RequestException as err:
    print(f'Error when insert clustering data: {err}')

def delete_all_clustering_data():
  try:
    response = requests.delete('http://database-api:3000/delete-clustering-data', headers={'Content-Type': 'application/json'})
    print(f'Status Code: {response.status_code}\nResponse: {response.json()}')
  except requests.RequestException as err:
    print(f'Error when delete clustering data: {err}')

def cal_percent_rate():
  # pivot_data = get_pivot_data()
  # df_total = pandas.DataFrame({
  #   'produce_time': pivot_data['produce_time'],
  #   'total': pivot_data['total']
  # })
  # daily_df_total = df_total.resample('D', on='produce_time').median().dropna(axis=0).reset_index()
  # daily_df_total = cluster_process(daily_df_total)
  # centroids = pandas.DataFrame(daily_df_total.groupby('custom_label')['total'].median())
  # centroids_probabilities = centroids
  # distances = [numpy.abs()]
  pass

if __name__ == '__main__':
  while True:
    delete_all_clustering_data()
    get_clustering_data()     
    time.sleep(86400)
  # pass