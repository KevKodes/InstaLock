Instalock
========

See our site hosted on heroku\
[Instalock](https://instalock.herokuapp.com/)

[](https://github.com/KevKodes/InstaLock/#about)About
----------------------------------------------------

* * * * *

OpenEats is a spin-off to Instagram. By signing up, it allows users to view other users' profiles and see what posts have been uploaded to our database.

[![Home Page] //

[](https://github.com/KevKodes/InstaLock#technologies-used)Technologies used
----------------------------------------------------------------------------

* * * * *

-   JavaScript
-   Flask
-   Flask-Migrate
-   Flask-SQLAlchemy
-   Npm
-   Reactjs
-   Redux
-   All styling was done with raw CSS, no frameworks were used.

[](https://github.com/KevKodes/InstaLock#how-to-use) How To Use
----------------------------------------------------------------------------
```
# Close this repository
$ git clone https://github.com/KevKodes/InstaLock.git

# Install flask dependencies in root directory
$ pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt

# Install dependencies in react-app directory
$ cd react-app
$ npm install

# Run back end server from pipenv shell
$ pipenv shell
$ flask run

# Run front end server
$ npm start
```


[](https://github.com/KevKodes/InstaLock#development-environment)Development Environment
----------------------------------------------------------------------------------------

* * * * *

-   The database should be generated and seeded with the  commands:
-   `flask db init`
-   `flask db migrate`
-   `flask db upgrade`
-   `flask seed all


[](https://github.com/KevKodes/InstaLock#wiki-documentation) Wiki Documentation
------------------------------------------------------------------------------

* * * * *

-   [User Stories](https://github.com/KevKodes/InstaLock/wiki/User-Stories)
-   [Front End Routes](https://github.com/KevKodes/InstaLock/wiki/Frontend-Routes)
-   [Database Schema](https://github.com/KevKodes/InstaLock/wiki/Database-Schema)
-   [Feature List](https://github.com/KevKodes/open-eats/wiki/Features)


[](https://github.com/KevKodes/InstaLock#Future-improvements) Future Improvements
------------------------------------------------------------------------------
