# Server
## Pandora's Box

This server is hosted at (http://pandoras-box-team.herokuapp.com/).



### Installing
NOTE: You will need clone this server repo, the client repo at (https://github.com/pandoras-box/Client) and the Raspberry Pi server repo at (https://github.com/pandoras-box/Pi-Server).

* Fork and clone this repo
* `$ cd` into the folder and `$ npm install`
* Create a PSQL database named `pandora-db`
* Run `$ knex migrate:latest` and `$ knex seed:run`
* See the `example.env` file for needed Environment variables
  * Don't forget to create your own `.env` file with your project's specific Environment variables
* Create a FaceBook Developer account for OAuth authorization
* Launch nodemon on the server with `$ PORT=5000 nodemon` from the root of the sever repo
  * This will let you test the client with `$ ionic serve --lab` which defaults to port 3000
* Your server is now ready to connect to the mobile clients and RPi
