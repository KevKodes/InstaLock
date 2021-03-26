from app.models import db, Post, User, Comment
import random

def seed_comments():
    users = len(User.query.all())

    commentList = [
        "Great Photo, who took it? Asking for a friend.",
        "This post really shows your mechanics",
        "lookin good brah",
        "love the energy!",
        "Such a feeder, I will report you!",
        "live your best life, Queeeeeeeeeen",
        "KYS",
        "omg, you're the guy who got the pentakill, right?",
        "I love you, please marry me!",
        "stay free",
        "Nice zhonya's that one game!",
        "Can you please stop feeding? It's hurting my MMR",
        "TURN ON YOUR BRAIN",
        "IT'S A FIRST",
        "IT'S AN EIGHTH",
        "Meet me on the rift",
        "Can't believe you had a 20/0/20 kda, hindsight 20/20 much?",
        'PENTA KILL WORTHY',
        'YOU ARE NUMBER ONE!',
        'Time flies like an arrow; fruit flies like banana.',
        "Hope you weren't planning to die of natural causes.",
        "Strike quickly, strike deftly.",
        "Only actions truly speak.",
        "Emotions are only distractions."
        "Is it hot in here or is it just me?",
        "So be it.",
        "Force is meaningless without skill.",
    ]

    commentLen = len(commentList)

    count = 1
    while count < 500:
        new_comment = Comment(
            userId = (random.randrange(1, 150)),
            postId = (random.randrange(1, 150)),
            body = commentList[random.randrange(commentLen)],
        )
        count = count + 1
        db.session.add(new_comment)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments;')
    db.session.commit()
