# How to use it

## Setting up folder structure

### First

Create a folder to contain this repository. eg: wisam-test

### Second

Clone this repository and the server repository, into the folder created above

- wisam-test/waku-test-back
- wisam-test/waku-test-front

### Third

Extract the 'docker-compose.yml' file from the client root directory and insert it in the folder created previously, your folder structure should look like this:

- wisam-test/waku-test-back
- wisam-test/waku-test-front
- wisam-test/docker-compose.yml

### Fourth

In the server folder eg: wisam-test/waku-test-back create a .env file containing the following:

- PORT=4000
- MONGODB_URI=mongodb://db:27017/gamesdb

NOTE: If not using docker, change the MONGODB_URI to mongodb://localhost/gamesdb

In the client folder eg: wisam-test/waku-test-front create a .env file containing the following:

- REACT_APP_SERVER_PORT=4000

### Using docker

Open a terminar in the first folder created => wisam-test and run the following command

- docker-compose up -d

Wait for the container to build and the open in the browser [http://localhost:3000](http://localhost:3000)

### Not using docker

Note: make sure before running the server and client to have mongod running

Open a terminal in the server folder eg: wisam-test/waku-test-back and run the following commands

- npm install
- npm run build
- npm start

Then open a terminal in the client folder eg: wisam-test/waku-test-front and run the following commands

- npm install
- npm start

### To run the tests

Open a terminal in the client folder eg: wisam-test/waku-test-front and run the following command

- npm test
