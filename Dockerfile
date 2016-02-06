FROM debian:8.3
LABEL Description="Koncep" Vendor="Mike Keen" Version="0.0.1"
RUN apt-get -y update && \
apt-get -y install wget build-essential pciutils npm gdb uuid-dev && \
npm set progress=false
WORKDIR /usr/local
RUN wget http://gwan.com/archives/gwan_linux64-bit.tar.bz2 && \
tar -xjf gwan_linux64-bit.tar.bz2 && \
rm gwan_linux64-bit.tar.bz2
ENV PATH /usr/local/gwan_linux64-bit:$PATH
WORKDIR /usr/local/gwan_linux64-bit
RUN rm -rf 0.0.0.0_8081_PONG
WORKDIR /usr/local/gwan_linux64-bit/0.0.0.0\:8080/\#0.0.0.0/
RUN rm -rf csp/* && \
rm -rf www/* && \
rm -rf handlers/*
ADD dist/package.json www/package.json
RUN npm install --prefix www
ADD dist www
ADD src/csp csp
ADD src/handlers handlers
RUN chown -hR www-data www && \
chown -hR www-data gzip && \
rm -f www/package.json
EXPOSE 8080
CMD gwan
