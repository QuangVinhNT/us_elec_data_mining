# Image of Python in hub.docker.com
FROM python:3.10

# Create folder path in Docker
WORKDIR /data_ingestion 

# Copy content of requirents.txt file from main device to Docker with file path
COPY requirements.txt /data_ingestion/requirements.txt

# Run command to install Python library contain in requirements.txt 
RUN pip install -r requirements.txt

# Copy all data_ingestion folder from main device to Docker with folder path
COPY . /data_ingestion

# Run command to start program
CMD python app.py