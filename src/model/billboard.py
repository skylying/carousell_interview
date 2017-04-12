from . import db
from sqlalchemy.sql import func


# TODO, I hate db.Integer(), remove that
class Topics(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    content = db.Column(db.String(255), nullable=False)
    votes = db.Column(db.Integer(), default=0)
    _ctime = db.Column(db.DateTime(timezone=False), default=func.now())
    _mtime = db.Column(db.DateTime(timezone=False), onupdate=func.now())