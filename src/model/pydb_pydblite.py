from pydblite.pydblite import Base
from exceptions import KeyError
from src.exceptions import CSInvalidInputTypeException
from src.schema.csschema import Schema

class PyDbLiteDatabase():

    def __init__(self):
        db = Base('billboard', save_to_file=False) # Use memory
        self.schema = Schema()
        db.create(*self.schema.columns)

        self.db = db
        self.db.commit()

    def queryById(self, id):
        """
        Query single record in database
        :param id:
        :return:
        """
        try:
            r = self.db[int(id)]
            return r
        except KeyError as e:
            return None

    def queryAll(self):
        """
        Query all records in database
        :return: list
        """
        object_list = [r for r in self.db]
        return object_list

    def insert(self, **kwargs):
        """
        Insert data to database
        :param kwargs:
        :return: integer
        """
        # Check input value
        self.schema.validate(**kwargs)
        id = self.db.insert(**kwargs)
        self.db.commit()
        return self.queryById(id)

    def updateById(self, id, **kwargs):
        """
        Update db record by id
        :param id:
        :param kwargs:
        :return:
        """
        # Check input value
        self.schema.validate(**kwargs)
        record = self.db[int(id)]
        self.db.update(record, **kwargs)
        self.db.commit()
        return self.db[int(id)]

    def deleteById(self, id):
        """
        Delete db record by id
        :param id:
        :return:
        """
        record = self.queryById(id)
        self.db.delete(record)
        self.db.commit()
        return True

    def upvoteById(self, id):
        """
        Upvote topic by id
        :param id:
        :return:
        """
        topic = self.queryById(id)
        new_vote = topic['upvotes'] + 1
        return self.updateById(id, upvotes=new_vote)

    def downvoteById(self, id):
        """
        Downvote topic by id
        :param id:
        :return:
        """
        topic = self.queryById(id)
        new_vote = topic['downvotes'] + 1
        return self.updateById(id, downvotes=new_vote)


pydb = PyDbLiteDatabase()