#docker build -t minatto/tcc .
FROM golden/meteor-dev
MAINTAINER Gabriel Minatto

RUN meteor update --release 1.6.1.1

USER root

RUN chmod -R 777 .
RUN apt-get update
RUN apt-get install -y npm git

WORKDIR /app

USER app

COPY . /app

ENTRYPOINT [ "npm" ]

CMD [ "run", "build-start" ]

EXPOSE 3000
