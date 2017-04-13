from flask import Flask
import config
import wtforms_json
from model import db

# monkey patching
wtforms_json.init()

def create_app(config_obj=None):

    app = Flask(__name__, template_folder='sites')
    app.config.from_object(config)

    with app.app_context():
        db.init_app(app)

    return app
