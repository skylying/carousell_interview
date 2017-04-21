from src.factory import create_app
import sys
from src.model import db
from pydblite.sqlite import Database, Table


if __name__ == '__main__':
    app = create_app()
    if sys.argv[-1] == '--init':
        with app.app_context():
            from src.model.billboard import Topics
            from src.model.pydb_pydblite import pydb

            # Use python in-memory class object as database
            #db.create_all()

            from src.controller.index import bp as index_bp
            from src.controller.ajax import bp as ajax_bp
            app.register_blueprint(index_bp)
            app.register_blueprint(ajax_bp, url_prefix='/ajax')

    app.run(debug=True, host='0.0.0.0')
else:
    app = create_app()
