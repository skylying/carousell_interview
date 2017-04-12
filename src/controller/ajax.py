from flask import Blueprint, render_template
from src.model.billboard import Topics
from flask.json import jsonify
from src.model import db

bp = Blueprint('ajax', __name__)

@bp.route('/topic', methods=['POST'])
def add_topic():

    new_topic = Topics(content="new")
    db.session.add(new_topic)
    db.session.commit()

    data = {
        'id': new_topic.id,
        'content': new_topic.content
    }

    return jsonify(
        code=200,
        data=data
    )

@bp.route('/topic', methods=['GET'])
def get_topic():

    topic = Topics.query.filter_by(content="new").all()

    data = {
        'topics': len(topic)
    }

    return jsonify(
        code=200,
        data=data
    )
