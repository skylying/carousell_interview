from flask import Blueprint, render_template
from src.model.billboard import Topics
from flask.json import jsonify
from src.model import db

from src.forms import validate_json_schema
from src.forms import AddTopicForm

from src.exceptions import CSNotFoundException
from src.helper import api_err, api_ok

bp = Blueprint('ajax', __name__)

@bp.errorhandler(CSNotFoundException)
def existed_handler(err):
    return api_err('NOT_FOUND', message=err.message), 404

# Add topic API
@bp.route('/topic', methods=['POST'])
@validate_json_schema(AddTopicForm)
def add_topic(form):

    new_topic = Topics(content=form.content.data)
    db.session.add(new_topic)
    db.session.commit()

    data = dict(
        id=new_topic.id,
        upvotes=new_topic.upvotes,
        downvotes=new_topic.downvotes,
        content=new_topic.content
    )

    return api_ok(data=data)


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
                upvotes=t.upvotes,
                downvotes=t.downvotes,
                content=t.content
            )
            data['topic_list'].append(topic)

    return api_ok(data=data)


# Up vote topic API
@bp.route('/upvote/<string:topic_id>', methods=['POST'])
def up_vote(topic_id):

    topic = Topics.query.filter_by(id=topic_id).first()
    if topic is None:
        raise CSNotFoundException(message="Topic id:{} not found".format(id))

    topic.upvote()

    data = dict(
        id=topic.id,
        upvotes=topic.upvotes,
        downvotes=topic.downvotes,
    )

    return api_ok(data=data)

# Up vote topic API
@bp.route('/downvote/<string:topic_id>', methods=['POST'])
def down_vote(topic_id):

    topic = Topics.query.filter_by(id=topic_id).first()
    if topic is None:
        raise CSNotFoundException(message="Topic id:{} not found".format(id))

    topic.downvote()

    data = dict(
        id=topic.id,
        upvotes=topic.upvotes,
        downvotes=topic.downvotes,
    )

    return api_ok(data=data)