from pydblite.pydblite import Base
from exceptions import KeyError


class PyDbLiteDatabase:

    def __init__(self):
        db = Base('billboard', save_to_file=False)
        db.create('content', 'upvotes', 'downvotes')
        self.db = db
        self.db.commit()

    def queryById(self, id):
        try:
            r = self.db[int(id)]
            return r
        except KeyError as e:
            return None

    def insert(self, content, upvotes=0, downvotes=0):
        id = self.db.insert(content=content, upvotes=upvotes, downvotes=downvotes)
        self.db.commit()
        return id

    def updateById(self, id, **kwargs):
        record = self.db[int(id)]
        self.db.update(record, **kwargs)
        self.db.commit()
        return self.db[int(id)]

    def deleteById(self, id):
        record = self.queryById(id)
        self.db.delete(record)
        self.db.commit()
        return True

    def upvoteById(self, id):
        topic = self.queryById(id)
        new_vote = topic['upvotes'] + 1
        return self.updateById(id, upvotes=new_vote)


    def downvoteById(self, id):
        topic = self.queryById(id)
        new_vote = topic['downvotes'] + 1
        return self.updateById(id, downvotes=new_vote)

    def exit(self):
        self.db.exists()

pydb = PyDbLiteDatabase()