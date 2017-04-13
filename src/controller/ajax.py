from flask import Blueprint, render_template
from src.model.billboard import Topics
from flask.json import jsonify
from src.model import db

from src.forms import validate_json_schema
from src.forms import AddTopicForm

bp = Blueprint('ajax', __name__)

# Add topic API
@bp.route('/topic', methods=['POST'])
@validate_json_schema(AddTopicForm)
def add_topic(form):

    new_topic = Topics(content=form.content.data)
    db.session.add(new_topic)
    db.session.commit()

    data = dict(
        id=new_topic.id,
        votes=new_topic.votes,
        content=new_topic.content
    )
    return jsonify(
        code=200,
        data=data
    )


# Get topic API
@bp.route('/topic', methods=['GET'])
def get_topic():
    
    # Initial value
    data = dict(topic_list=[])    
    topic_list = Topics.query.all()
    if len(topic_list) > 0:
        for t in topic_list:
            topic = dict(
                id=t.id,
                votes=t.votes,
                content=t.content
            )
            data['topic_list'].append(topic)

    return jsonify(
        code=200,
        data=data
    )
