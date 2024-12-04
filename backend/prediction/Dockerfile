# Image of Python in hub.docker.com
FROM python:3.10

# Create folder path in Docker
WORKDIR /prediction

# Copy content of requirents.txt file from main device to Docker with file path
COPY requirements.txt /prediction/requirements.txt

# Run command to install Python library contain in requirements.txt 
RUN pip install -r requirements.txt

# Copy all prediction folder from main device to Docker with folder path
COPY . /prediction

# Run command to start program
CMD python app.py