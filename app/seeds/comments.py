from app.models import db, Post, User, Comment
import random

def seed_comments():
    users = len(User.query.all())

    commentList = [
        "Great Photo, who took it? Asking for a friend.",
        "This post really shows your mechanics",
        "lookin good brah",
        "love the energy!",
        "damnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn",
        "live your best life, Queeeeeeeeeen",
        "Yasssssssssssssssssssssssssssssssssssssss",
        "Meet me on the rift",
        "Can't believe you had a 20/0/20 kda, hindsight 20/20 much?"
    ]

    commentLen = len(commentList)

    count = 1
    while count < 500:
        new_comment = Comment(
            userId = (random.randrange(1, 48)),
            postId = (random.randrange(1, 48)),
            body = commentList[random.randrange(commentLen)],
        )
        count = count + 1
        db.session.add(new_comment)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments;')
    db.session.commit()
