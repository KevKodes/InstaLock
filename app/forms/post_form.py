from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired



class PostForm(FlaskForm):
    postId = IntegerField("postId")
    caption = StringField("Caption", validators=[DataRequired()])
    photoURL = StringField("Photo")
