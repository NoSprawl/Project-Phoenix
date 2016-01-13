FROM ubuntu

RUN apt-get -y install wget

WORKDIR /usr/share
RUN wget http://gwan.com/archives/gwan_linux64-bit.tar.bz2
RUN tar -xjf gwan_linux64-bit.tar.bz2
RUN rm gwan_linux64-bit.tar.bz2
WORKDIR /usr/share/gwan_linux64-bit
RUN mv 0.0.0.0_8080 0.0.0.0_80
RUN rm -rf 0.0.0.0_80/\#0.0.0.0/csp/*
RUN rm -rf 0.0.0.0_80/\#0.0.0.0/handlers/*
RUN rm -rf 0.0.0.0_80/\#0.0.0.0/www/*
ADD www/* 0.0.0.0_80/\#0.0.0.0/www/

EXPOSE 80

CMD ["gwan -d"]
