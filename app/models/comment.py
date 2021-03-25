from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    body = db.Column(db.Text, nullable=False)
    createdAt = db.Column(db.DateTime,  default=db.func.current_timestamp())
    updatedAt = db.Column(db.DateTime,  default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # user = db.relationship("User", back_populates="comments")
    # post = db.relationship("Post", back_populates="comments")
    # like = db.relationship("Like", back_populates="comments")
    user = db.relationship("User", backref="comments")
    post = db.relationship("Post", backref="comments")


    def to_dict(self):
        userName = self.user.userName

        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "body": self.body,
            "userName": userName,
            "createdAt": self.createdAt,
            'updatedAt': self.updatedAt
        }
