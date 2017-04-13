from functools import wraps
from flask import request, current_app
from wtforms import Form
from wtforms.fields import TextField, StringField, Field
from wtforms.validators import InputRequired, Optional, AnyOf, Email, Length

# naive json validator
def validate_json_schema(schema_cls):
    def decorator(func):
        @wraps(func)
        def wrapped_func(*args, **kwargs):
            json_data = request.get_json(force=True)
            form = schema_cls.from_json(json_data)
            #if not form.validate():
                #return api_err('BAD_REQUEST', message=unicode(form.errors))
            kwargs['form'] = form
            return func(*args, **kwargs)
        return wrapped_func
    return decorator


class AddTopicForm(Form):
    content = StringField('content', [InputRequired()])