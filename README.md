# covid-19_api

To run this API, first go to the root of the API and run npm install.

After that you will need to create a mongoDB database (I used Atlas), and then set the .env variables like this:

MONGO_URL=(to connect database)

SECRET_KEY=(for hashing password, and sign JWT)

KEY_VALUE=(a key value for request to the external API)
