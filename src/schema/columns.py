class CSString(object):

    def __init__(self, length=None):
        self.length = length
        self.error = None

    def validate(self, input):
        if isinstance(input, str) is False and isinstance(input, unicode) is False:
            self.error = ('column value {} is not instance of String'.format(input))
            return False
        if len(input) > 255:
            self.error = ('column value exceed max length of {}'.format(self.length))
            return False
        return True


class CSInteger(object):

    def __init__(self, length=None, type=None):
        self.length = length

    def validate(self, input):
        if isinstance(input, int) is False:
            self.error = ('column value {} is not instance of Integer'.format(input))
            return False
        return True
