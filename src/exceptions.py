class CustomException(Exception):
    message = None

    def __init__(self, **kwargs):
        super(Exception, self).__init__()
        self.message = kwargs.get('message', None)


class CSNotFoundException(CustomException):
    pass

class CSInvalidInputTypeException(CustomException):
    pass