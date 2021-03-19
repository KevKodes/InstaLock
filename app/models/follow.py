from .db import db


class Follow(db.Model):
    __tablename__ = 'follows'

    id = db.Column(db.Integer, primary_key=True)
    followedId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    followerId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    createdAt = db.Column(db.DateTime,  default=db.func.current_timestamp())
    updatedAt = db.Column(db.DateTime,  default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())

    # user = db.relationship("User", back_populates="follows")
    user = db.relationship("User", backref="follows")
