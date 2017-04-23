from src.exceptions import CSInvalidInputTypeException
from src.schema.columns import CSString, CSInteger
import inspect


class SchemaBase():

    def __init__(self):
        # Prepare all db columns
        attributes = inspect.getmembers(self, lambda a: not (inspect.isroutine(a)))
        self.columns = [a[0] for a in attributes if not(a[0].startswith('__') and a[0].endswith('__'))]


class Schema(SchemaBase):
    content = CSString(255)
    upvotes = CSInteger()
    downvotes = CSInteger()

    def validate(self, **kwargs):
        """
        Validate schema format, check existence of schema
        :param kwargs:
        :return:
        """
        error = []
        for kw, value in kwargs.iteritems():
            if kw not in self.columns:
                raise CSInvalidInputTypeException(message="Column {} does not exist".format(kw))
            schema = getattr(self, kw)
            if schema.validate(value) is False:
                error.append(schema.error)
                raise CSInvalidInputTypeException(message=error[0])
        return True

