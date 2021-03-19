from .db import db


class Post(db.Model):
    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    photoURL = db.Column(db.Text)
    caption = db.Column(db.Text)
    vaulted = db.Column(db.Boolean, nullable=False, default=False)
    createdAt = db.Column(db.DateTime,  default=db.func.current_timestamp())
    updatedAt = db.Column(db.DateTime,  default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # user = db.relationship("User", back_populates="posts")
    # comment = db.relationship("Comment", back_populates="posts")
    # like = db.relationship("Like", back_populates="posts")
    user = db.relationship('User', backref="posts")


    def to_dict(self):
        user = self.user.to_dict()
        userName = user['userName']
        profileImage = user["profileImage"]

        likesByUser = [like.to_list() for like in self.likes]


        return {
            "id": self.id,
            "userId": self.userId,
            "photoURL": self.photoURL,
            "caption": self.caption,
            "vaulted": self.vaulted,
            "userName": userName,
            "profileImage": profileImage,
            "likesByUser": likesByUser,
            "createdAt": self.createdAt,
        }
