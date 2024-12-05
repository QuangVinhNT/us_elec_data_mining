import mysql.connector as connector
from flask import Flask, jsonify, request
from flask_cors import CORS
from os import environ
from datetime import datetime
import pytz
import pandas

app = Flask(__name__)
CORS(app)

DB_HOST = environ.get('DB_HOST', 'host')
DB_USER = environ.get('DB_USER', 'root')
DB_PASSWORD = environ.get('DB_PASSWORD', '1234')
DB_DATABASE = environ.get('DB_DATABASE', 'us_elec')

def connect_db():
  try:
    db_connector = connector.connect(
      host=DB_HOST,
      user=DB_USER,
      password=DB_PASSWORD,
      database=DB_DATABASE
    )
    if db_connector.is_connected():
      print('Connected to MySQL')
    return db_connector
  except connector.Error as err:
    print({'error': err})
    return None

# Insert raw data from API to database
@app.route('/insert-raw-data', methods=['POST'])
def insert_raw_data():
  data = request.get_json()
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute(
      '''
        INSERT INTO elec_prod (produce_time, fuel_type, value, value_unit, get_data_time)
        VALUES (%s, %s, %s, %s, %s)
      '''
    , (data['produce_time'], data['fuel_type'], data['value'], data['value_unit'], datetime.now(tz=pytz.timezone('Asia/Ho_Chi_Minh'))))
    connection.commit()
    return jsonify({'message': 'Raw data added successfully'}), 201
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when insert raw data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Insert decomposed data (resample, trend, seasonal, resid) to database
@app.route('/insert-decomposed-data', methods=['POST'])
def insert_decomposed_data():
  data = request.get_json()
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute(
      '''        
        INSERT INTO decomposed_data (produce_time, total_produce, trend, seasonal, resid, created_at)
        VALUES (%s, %s, %s, %s, %s, %s)
      '''
    , (data['produce_time'], data['total_produce'], data['trend'], data['seasonal'], data['resid'], datetime.now(tz=pytz.timezone('Asia/Ho_Chi_Minh'))))
    connection.commit()
    return jsonify({'message': 'Decomposed data added successfully'}), 201
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when insert decomposed data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Insert correlation data (resample, trend, seasonal, resid) to database
@app.route('/insert-correlation-data', methods=['POST'])
def insert_correlation_data():
  data = request.get_json()
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute(
      '''        
        INSERT INTO corr_data (coal, hydro, natural_gas, nuclear, solar, total, created_at)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
      '''
    , (data['coal'], data['hydro'], data['natural_gas'], data['nuclear'], data['solar'], data['total'], datetime.now(tz=pytz.timezone('Asia/Ho_Chi_Minh'))))
    connection.commit()
    return jsonify({'message': 'Correlation data added successfully'}), 201
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when insert correlation data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Insert clustering data to database
@app.route('/insert-clustering-data', methods=['POST'])
def insert_clustering_data():
  data = request.get_json()
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute(
      '''        
        INSERT INTO clustering_data (produce_time, half_year, total_produce, kmean_label, custom_label, created_at)
        VALUES (%s, %s, %s, %s, %s, %s)
      '''
    , (data['produce_time'], data['half_year'], data['total_produce'], data['kmean_label'], data['custom_label'], datetime.now(tz=pytz.timezone('Asia/Ho_Chi_Minh'))))
    connection.commit()
    return jsonify({'message': 'Clustering data added successfully'}), 201
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when insert clustering data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Insert prediction data to database
@app.route('/insert-prediction-data', methods=['POST'])
def insert_prediction_data():
  data = request.get_json()
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute(
      '''        
        INSERT INTO prediction_data (predict_value, exactly_rate, created_at)
        VALUES (%s, %s, %s)
      '''
    , (data['predict_value'], data['exactly_rate'], datetime.now(tz=pytz.timezone('Asia/Ho_Chi_Minh'))))
    connection.commit()
    return jsonify({'message': 'Prediction data added successfully'}), 201
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when insert prediction data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Delete all decomposed_data table in database
@app.route('/delete-decomposed-data', methods=['DELETE'])
def delete_all_decomposed_data():
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute('DELETE FROM us_elec.decomposed_data')
    connection.commit()
    return jsonify({'message': 'Decomposed data deleted successfully'}), 201
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when delete decomposed data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Delete all corr_data table in database
@app.route('/delete-correlation-data', methods=['DELETE'])
def delete_all_correlation_data():
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute('DELETE FROM us_elec.corr_data')
    connection.commit()
    return jsonify({'message': 'Correlation data deleted successfully'}), 201
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when delete correlation data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Delete all clustering_data table in database
@app.route('/delete-clustering-data', methods=['DELETE'])
def delete_all_clustering_data():
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute('DELETE FROM us_elec.clustering_data')
    connection.commit()
    return jsonify({'message': 'Clustering data deleted successfully'}), 201
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when delete clustering data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Delete all prediction_data table in database
@app.route('/delete-prediction-data', methods=['DELETE'])
def delete_all_prediction_data():
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute('DELETE FROM us_elec.prediction_data')
    connection.commit()
    return jsonify({'message': 'Prediction data deleted successfully'}), 201
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when delete prediction data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Get pivot data by hour
@app.route('/get-pivot-data', methods=['GET'])
def get_pivot_data():
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute(
      '''
        SELECT produce_time, fuel_type, sum(value)
        FROM us_elec.elec_prod
        GROUP BY fuel_type, produce_time
        ORDER BY produce_time ASC
      '''
    )
    raw_data = cursor.fetchall()
    df_data = pandas.DataFrame(raw_data, columns=['produce_time', 'fuel_type', 'value'])
    pivot_data = df_data.pivot(index='produce_time', columns='fuel_type', values='value').reset_index().dropna(axis=1)
    pivot_data['total'] = pivot_data.iloc[:, 1:].sum(axis=1) 
    return jsonify(pivot_data.to_dict())
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when get pivot data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Get pivot data by day
@app.route('/get-pivot-data-d', methods=['GET'])
def get_pivot_data_d():
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute(
      '''
        SELECT produce_time, fuel_type, sum(value)
        FROM us_elec.elec_prod
        GROUP BY fuel_type, produce_time
        ORDER BY produce_time ASC
      '''
    )
    raw_data = cursor.fetchall()
    df_data = pandas.DataFrame(raw_data, columns=['produce_time', 'fuel_type', 'value'])
    pivot_data = df_data.pivot(index='produce_time', columns='fuel_type', values='value').reset_index().dropna(axis=1)
    pivot_data['total'] = pivot_data.iloc[:, 1:].sum(axis=1) 
    pivot_data = pivot_data.resample('D', on='produce_time').median().dropna(axis=0).reset_index()
    return jsonify(pivot_data.to_dict())
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when get pivot data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Get pivot data by week
@app.route('/get-pivot-data-w', methods=['GET'])
def get_pivot_data_w():
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute(
      '''
        SELECT produce_time, fuel_type, sum(value)
        FROM us_elec.elec_prod
        GROUP BY fuel_type, produce_time
        ORDER BY produce_time ASC
      '''
    )
    raw_data = cursor.fetchall()
    df_data = pandas.DataFrame(raw_data, columns=['produce_time', 'fuel_type', 'value'])
    pivot_data = df_data.pivot(index='produce_time', columns='fuel_type', values='value').reset_index().dropna(axis=1)
    pivot_data['total'] = pivot_data.iloc[:, 1:].sum(axis=1) 
    pivot_data = pivot_data.resample('W', on='produce_time').median().dropna(axis=0).reset_index()
    return jsonify(pivot_data.to_dict())
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when get pivot data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Get pivot data by month
@app.route('/get-pivot-data-m', methods=['GET'])
def get_pivot_data_m():
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute(
      '''
        SELECT produce_time, fuel_type, sum(value)
        FROM us_elec.elec_prod
        GROUP BY fuel_type, produce_time
        ORDER BY produce_time ASC
      '''
    )
    raw_data = cursor.fetchall()
    df_data = pandas.DataFrame(raw_data, columns=['produce_time', 'fuel_type', 'value'])
    pivot_data = df_data.pivot(index='produce_time', columns='fuel_type', values='value').reset_index().dropna(axis=1)
    pivot_data['total'] = pivot_data.iloc[:, 1:].sum(axis=1) 
    pivot_data = pivot_data.resample('ME', on='produce_time').median().dropna(axis=0).reset_index()
    return jsonify(pivot_data.to_dict())
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when get pivot data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Get decomposed data
@app.route('/get-decomposed-data', methods=['GET'])
def get_decomposed_data():
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute(
      '''
        SELECT produce_time, total_produce, trend, seasonal, resid
        FROM us_elec.decomposed_data
      '''
    )
    decomposed_data = cursor.fetchall()    
    return jsonify(decomposed_data)
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when get decomposed data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Get correlation data
@app.route('/get-correlation-data', methods=['GET'])
def get_correlation_data():
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute(
      '''
        SELECT coal, hydro, natural_gas, nuclear, solar, total
        FROM us_elec.corr_data
      '''
    )
    correlation_data = cursor.fetchall()    
    return jsonify(correlation_data)
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when get correlation data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Get clustering data
@app.route('/get-clustering-data', methods=['GET'])
def get_clustering_data():
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute(
      '''
        SELECT produce_time, total_produce, custom_label
        FROM us_elec.clustering_data
      '''
    )
    clustering_data = cursor.fetchall()    
    return jsonify(clustering_data)
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when get correlation data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()

# Get prediction data
@app.route('/get-prediction-data', methods=['GET'])
def get_prediction_data():
  connection = connect_db()
  if not connection:
    return jsonify({'error': 'Database connection failed'}), 500
  try:
    cursor = connection.cursor()
    cursor.execute(
      '''
        SELECT predict_value, exactly_rate
        FROM us_elec.prediction_data
      '''
    )
    prediction_data = cursor.fetchall()    
    return jsonify(prediction_data)
  except connector.Error as err:
    connection.rollback()
    return jsonify({'Error when get correlation data': str(err)}), 500
  finally:
    cursor.close()
    connection.close()


if __name__ == '__main__':
  port = int(environ.get('PORT', 3000))
  app.run(debug=True, host='0.0.0.0', port=port)