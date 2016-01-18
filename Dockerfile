FROM ubuntu
RUN apt-get -y update
RUN apt-get -y install build-essential pciutils npm
WORKDIR /usr/local
RUN wget http://gwan.com/archives/gwan_linux64-bit.tar.bz2
RUN tar -xjf gwan_linux64-bit.tar.bz2
RUN rm gwan_linux64-bit.tar.bz2
ENV PATH /usr/local/gwan_linux64-bit:$PATH
WORKDIR /usr/local/gwan_linux64-bit
RUN rm -rf 0.0.0.0_8081_PONG
RUN mv 0.0.0.0_8080 0.0.0.0\:8080
WORKDIR /usr/local/gwan_linux64-bit/0.0.0.0\:8080/\#0.0.0.0/
RUN rm -rf csp/*
RUN rm -rf www/*
ADD dist www
ADD src/csp csp
WORKDIR /usr/local/gwan_linux64-bit/0.0.0.0\:8080/\#0.0.0.0/www
RUN npm install
RUN chown -hR www-data .
RUN chown -hR www-data ../gzip
EXPOSE 8080
CMD gwan