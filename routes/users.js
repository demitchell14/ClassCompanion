const express = require('express');
//const Validator = require('express-validator');

const router = express.Router();
const DB = require('../bin/database');
let User = require('../bin/userhandler');

const {body, validationResult}= require('express-validator/check');
/* GET users listing. */
router.get('/', function(req, res, next) {
    if (typeof req.session.test === 'undefined')
        req.session.test = 1;
    else
        req.session.test++;

    let response = {
        test2: "Hello World",
        session: req.session
    };

    let users = DB.queryp("SELECT * FROM `users` LIMIT 1");
    let profiles = DB.queryp("SELECT * FROM `user_profiles` LIMIT 1");


    Promise.all([users, profiles]).then(function(data) {
        //response.results = data;
        res.json(Object.assign({}, response, data));
    }).catch(err => res.send(err));

});

router.get('/login', function(req, res, next) {
    let response = {
        body: req.body,
        headers: req.headers,
        accepts: req.accepts(),
        params: req.params,
        integrity: req.integrity,
        protocol: req.protocol
    }

    if (req.header("x-requested-with") === "XMLHttpRequest") {
        //todo send only form frame back.
    } else {
        res.render('login', {
            local: true,
            topbar: false,
            sidebar: false,
            pageTitle: 'Project Andes',
            //frames: {}
            frames: 'component/login'
        })
    }
});

router.post('/register', User.validator('registration'), function(req, res, next) {
    let response = {
        "req.body": req.body,
        "Content-Type": req.get("content-type")
    };
    if (req.get("content-type") === "application/x-www-form-urlencoded") {
        let promise;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            response.errors = errors.array();
        } else {
            let userData = {
                email: req.body['email'],
                password: req.body['password']
            };
            let user = new User(userData);
            promise = user.create();
            if (promise) {
                promise.then(result => {
                    response.user = result;
                    res.json(response);
                }).catch(err => {
                    response.user = user;
                    res.json(response);
                });
            }
        }
    }
});

module.exports = router;
