const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const db = require('./database/models');
const routes = require('./api/routes');
const { assertDatabaseConnectionOk, errorHandler } = require('./helpers/functions')
const redis = require('redis');
const connectRedis = require('connect-redis');

const crypto = require('crypto');

require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.prod' :
      (process.env.NODE_ENV === 'development' ? '.env.development' : '.env')
});

const RedisStore = connectRedis(sessions)
//Configure redis client
const redisClient = redis.createClient({
    host: 'redis://localhost',
    port: 6379, 
    username:'',
    password:''
})
// (async () => {
//     await redisClient.connect()
// })()

redisClient.on('error', function (err) {
    console.log('Could not establish a connection with redis. ' + err);
});
redisClient.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

const app = express();
const PORT = process.env.port

assertDatabaseConnectionOk(db.sequelize, 'General')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(cookieParser());

app.use(sessions({
    //store: new RedisStore({ client: redisClient }),
    genid: () => crypto.randomUUID(),
    secret: process.env.secret,
    saveUninitialized:true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false 
}));

routes(app)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));