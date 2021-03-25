from .db import db
# from sqlalchemy.schema import Index


class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey("posts.id"))
    commentId = db.Column(db.Integer, db.ForeignKey("comments.id"))
    createdAt = db.Column(db.DateTime,  default=db.func.current_timestamp())
    updatedAt = db.Column(db.DateTime,  default=db.func.current_timestamp(
    ), onupdate=db.func.current_timestamp())
    # db.UniqueConstraint(userId, postId, commentId)
    # index = Index('uniqueLike', "commentId", "postId", "userId", unique=True)
    # __table_args__ = (
    #     db.UniqueConstraint('userId', 'commentId',
    #                         'postId', name='unique_like'),
    # )

    user = db.relationship('User', backref='likes')
    # user = db.relationship("User", back_populates="likes")
    post = db.relationship("Post", backref="likes")
    # comment = db.relationship("Comment", back_populates="likes")
    comment = db.relationship('Comment', backref='likes')

    def to_list(self):
        return self.userId

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "postId": self.postId,
            "commentId": self.commentId,
        }
