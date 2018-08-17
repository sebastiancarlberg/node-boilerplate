# node-boilerplate

Pre.
    * install nodejs
    * install mongodb
    * install mongoose
    * install robo3t to manage mongodb
    * install postman to manage requests

1.
    Create a config.js file with 
    
    module.exports = {
        'secret': 'xxxx-xxxx',
        'database': 'mongodb://localhost/nameofdb',
        'port': 1001
    }

2. 
    Create the folder to hold the mongodb
    
    sudo mkdir -p /data/db/
    sudo chown `id -u` /data/db
3.
    Create a new user by entering a POST with body x-www-form-urlencoded
    You need to disable the authenticate middleware for user to be allowed to create a new user. 

    http://localhost:1001/api/users

4.
    npm install
    npm install -g nodemon
    npm server.js to start the node server
    sudo mongod to start mongodb