from .db import db


class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey("posts.id"), nullable=False)
    commentId = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=False)
    createdAt = db.Column(db.DateTime,  default=db.func.current_timestamp())
    updatedAt = db.Column(db.DateTime,  default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    user = db.relationship('User', backref='likes')
    # user = db.relationship("User", back_populates="likes")
    post = db.relationship("Post", backref="likes")
    # comment = db.relationship("Comment", back_populates="likes")
    comment = db.relationship('Comment', backref='likes')


    def to_list(self):
        return self.userId
