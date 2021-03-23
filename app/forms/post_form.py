from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError



class PostForm(FlaskForm):
    userId = IntegerField("userId", validators=[DataRequired()])
    caption = StringField("Caption")
    photoURL = StringField("Photo", validators=[DataRequired()])
    vaulted = BooleanField("Vaulted", validators=[DataRequired()])
