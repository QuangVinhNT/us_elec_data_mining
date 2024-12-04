# Image of MySQL in hub.docker.com
FROM mysql

# Sets an environment variable inside the Docker container (root user password)
ENV MYSQL_ROOT_PASSWORD 1234

# Copy file init.sql from main device to Docker container
ADD ./init.sql /docker-entrypoint-initdb.d

# Expose 3306 port in Docker container
EXPOSE 3306