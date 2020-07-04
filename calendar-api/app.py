import json

from flask import Flask
from flask_caching import Cache
from flask_cors import CORS
from datetime import datetime, timedelta
import caldav as caldav
import os


class RadCal:
    def __init__(self, url):
        client = caldav.DAVClient(url=os.environ["CAL_SERVER_URL"],
                                  username=os.environ["CAL_USER"], password=os.environ["CAL_PASSWORD"])
        self.cal = caldav.Calendar(client=client, url=url)

    def sh_all_events(self):
        events = self.cal.date_search(start=datetime.today().replace(second=0, microsecond=0), end=datetime(2030, 1, 1),
                                      expand=True)

        custom_values = []
        for event in events:
            time = event.vobject_instance.vevent.dtstart.value + timedelta(hours=2)

            cevent = {'date': event.vobject_instance.vevent.dtstart.value.strftime("%d. %b").lower(),
                      'time': time.strftime("%H.%M"),
                      'description': event.vobject_instance.vevent.summary.value}
            if hasattr(event.vobject_instance.vevent, 'description'):
                cevent["link"] = event.vobject_instance.vevent.description.value
            custom_values.append(cevent)
        return custom_values


cal = RadCal(os.environ["CAL_URL"])


def create_app():
    app = Flask(__name__)
    CORS(app)
    cache = Cache(app, config={'CACHE_TYPE': 'simple'})

    @app.route("/")
    @cache.cached(timeout=300)
    def index():
        return json.dumps(cal.sh_all_events())

    return app
