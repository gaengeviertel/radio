# build stage
FROM alpine:latest as build-env

RUN apk add gcc make git g++
RUN git clone https://gitlab.com/wavexx/fIcy
RUN cd fIcy &&  make install

# final stage
FROM alpine:latest

RUN apk add icecast mailcap ffmpeg ezstream
COPY --from=build-env /usr/local/bin/fIcy /usr/local/bin/fIcy
COPY --from=build-env /usr/local/bin/fResync /usr/local/bin/fResync
COPY --from=build-env /usr/local/bin/fPls /usr/local/bin/fPls

ADD volume /etc/icecast2
RUN mv volume/web/index.html index.xsl

USER icecast:icecast
EXPOSE 8000
VOLUME ["/config","/var/log/icecast","/etc/icecast2"]

ENTRYPOINT ["icecast", "-n", "-c", "/etc/icecast2/icecast.xml"]
