const mongoose = require('mongoose');
const config = require('../config');
const {host,port,name,url}  = config.database;

//const url = `mongodb://${host}:${port}/${name}`;
mongoose.connect(url);

const connection = mongoose.connection;

connection.on('open',()=>{
    console.log(`mongodb connected on ${url}`)
});
