FROM ubuntu:14.04

# let the container know there is no tty
ENV DEBIAN_FRONTEND noninteractive

# install python and node.js
RUN \
  apt-get update ; apt-get upgrade ; \
  apt-get -y install git python python-dev python-setuptools python-pip python-virtualenv && \
  apt-get -y install build-essential sqlite3 libsqlite3-dev vim curl && \
  curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
  apt-get update && \
  apt-get install -y nodejs && \
  mkdir -p /opt/carousell

COPY ./src /opt/carousell/src
ADD ["./.gitignore", "./requirements.txt", "./app.py", "./index.html", "/opt/carousell/"]

RUN \
  cd /opt/carousell && \
  pip install --upgrade pip && \
  pip install -r /opt/carousell/requirements.txt && \
  cd /opt/carousell/src/sites && \
  npm install && \
  npm run build

WORKDIR /opt/carousell

EXPOSE 5000

ENTRYPOINT ["python"]
CMD ["app.py", "--init"]
