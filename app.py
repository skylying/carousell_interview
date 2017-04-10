from src.factory import create_app
import sys

if __name__ == '__main__':
    app = create_app()
    if sys.argv[-1] == '--init':
        from src.model import db
        with app.app_context():
            db.create_all()
            from src.controller.index import bp as index_bp
            app.register_blueprint(index_bp)

    app.run(debug=True, host='0.0.0.0')
else:
    app = create_app()
