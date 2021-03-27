from app.models import db, Like, User
import random


def seed_likes():
  count = 1
  extra = 1

  while count < 3000:
    new_like_post = Like(
      userId = (random.randrange(1,153)),
      postId = (random.randrange(1,153)),
    )
    count += 1
    db.session.add(new_like_post)


  while extra < 3000:
    new_like_comment = Like(
      userId = (random.randrange(1,153)),
      commentId = (random.randrange(1,153))
    )
    extra += 1
    db.session.add(new_like_comment)


  db.session.commit()



def undo_likes():
  db.session.execute('TRUNCATE likes')
  db.session.commit()
