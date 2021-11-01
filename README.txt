To start this app install heroku

Project Implements mongoDB using a collection called Messages and a document called Messages
You can use your own database for this by creating a free mongoDB cluster to reference and creating
a collection and document both called Messages

I am currently hosting this app with heroku so you can do this too by creating a heroku project following their
instructions and then creating a .env file for the mongoDB uri and a secret on heroku for the mongoDB uri when hosting.

npm install

heroku local web

This will start the app on your localhost:5000 with secrets loaded locally
and you can host it by pushing main/master to heroku after creating the heroku
project.
