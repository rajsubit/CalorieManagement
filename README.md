# CalorieManagement
Django app about calorie management of users

## Requirements:
### API (Django):
Django requirements are listed in requirements.txt. Install using command

`pip install -r requirements.txt`

### Frontend:

# Same frontend is developed independently using React and Mithril.
The project can be run either in react or mithril or both.
However using one framework at a time is suggested.

# React:
React requirements are listed in React/package.json. Install using command

`npm install --save <package-name>`

# Mithril:
Mithril requirements are listed in Mithril/package.json. Install using command

`npm install --save <package-name>`

## Server Running:
Run Django server first using:

`python3 manage.py runserver`

Node server can be for React or Mithril. If both framework is required then command should
be issued separately in different command prompts.

`gulp`

#### Note: Django and Node server should run in different ports
