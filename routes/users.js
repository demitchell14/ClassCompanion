const express = require('express');
const router = express.Router();
const DB = require('../bin/database');
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

module.exports = router;
