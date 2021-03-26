from app.models import db, Like, User
import random


def seed_likes():


  count = 1
  while count < 10000:
    new_like = Like(
      userId = (random.randrange(1,150)),
      postId = (random.randrange(1, 150)),
    )
    count += 1
    db.session.add(new_like)

  db.session.commit()



def undo_likes():
  db.session.execute('TRUNCATE likes')
  db.session.commit()