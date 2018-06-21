var express = require('express')
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_kvl6gf2d:3aidf7cvhevd9ki3al2lo2g124@ds163300.mlab.com:63300/heroku_kvl6gf2d');


var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    //res.header("Access-Control-Allow-Origin",
        //"https://sule-disha-angular-app.herokuapp.com");

    var allowedOrigins = ['http://localhost:4200','https://sule-disha-angular-app.herokuapp.com'];
    var origin = req.headers.origin;
    if(allowedOrigins.indexOf(origin) > -1){
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string',
        cookie: {

            maxAge: 30 * 60 * 1000
        },
        rolling: true
}
));


var userService = require('./services/user.service.server');
userService(app);
require('./services/section.service.server')(app);
app.listen(process.env.PORT || 4000)