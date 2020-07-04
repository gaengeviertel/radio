# wrapper for ical calendar

This small python app provides a wrapper for exposing events from a ical calendar (nextcloud) in the following format:

```
{"date": "29. jul", "time": "2300", "description": "jodeln", "link": "http://lol.org"}
```

The *description* field is filled by the `summary` object. The *link* field is filled by the `description` object. This is done to provide a readable ical calendar. 

All data is provided via the following env variables:

- `CAL_SERVER_URL`
- `CAL_USER`
- `CAL_PASSWORD`
- `CAL_URL`

## development

Start the app by running this command:

```bash
flask run
```

## production

Use the provided docker / podman container:

```bash
podman build -t radio-cal-api .
podman run --rm --env-file=.env -p 80:8080 radio-cal-api
```

