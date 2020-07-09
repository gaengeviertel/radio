# icecast podman with custom frontend

## Features

- current icecast running on alpine linux
- build in support for stream transcode to mp3 using ffmpeg (safari is not supporting ogg, certain DJ softwares f.e. traktor are only able to stream ogg) - still in progress
- custom frontend for icecast

## Install

For configuring the container use following env vars:

- `$ICECAST_SOURCE_PASSWORD`
- `ICECAST_RELAY_PASSWORD`
- `ICECAST_ADMIN_PASSWORD`
- `ICECAST_HOST`

For deploying the custom Dockerfile clone the repo and run following commands with podman (docker should be identical):

```bash
podman build -t icecast:latest --rm .
podman create -d --name icecast -v icecast:/etc/icecast2 -p 8000:8000 icecast:latest
podman generate systemd --name icecast > /etc/systemd/user/icecast.service
systemctl --user start icecast.service
```

Additional configuration can be done within the file `/etc/icecast2/icecast.xml`. For reference use the documentation. 

## Frontend

For displaying the schedule an axios request is executed to the endpoint of the [calendar api](calendar-api). 