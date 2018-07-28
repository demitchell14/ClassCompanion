const express   = require('express');
const DB        = require('./database');
const {body, validationResult}= require('express-validator/check');
const bcrypt    = require('bcrypt-nodejs');
const moment    = require('moment');



let crypt = {
    rounds: 3,
};

const MESSAGES = {
    error: {
        "-1": "Unknown Error",
        1062: "Email is already taken."
    }
};

let User = (function(opts) {
    this.email = opts.email;
    this.password = opts.password;
    this._errors = [];
    this.state = "init";
});

/**
 *
 * @returns {Promise<User>}
 */
User.prototype.create = function() {
    let _this = this;
    this.password = undefined;
    return new Promise((resolve, reject) => {

        let salt = bcrypt.genSaltSync(crypt.rounds);
        let hash = bcrypt.hashSync(_this.password, salt);

        let statement = `INSERT INTO users (user_email, user_password, user_date_created)` +
            ` VALUES ("${DB.escape(_this.email)}", "${hash}", "${moment().format("YYYY-MM-DD H:mm:ss")}")`;

        DB.query(statement, function(error, val) {
            if (error) {
                _this.state = "create_error";
                _this._errors.push({
                    code: error.errno,
                    message: MESSAGES.error[error.errno]
                });
                reject(_this)
            } else {
                if (val.affectedRows > 0) {
                    _this.state = "create_success";
                    _this.password = hash;
                    resolve(_this);
                } else {
                    _this.state = "create_error";
                    _this._errors.push({
                        code: -1,
                        message: MESSAGES.error[-1]
                    })
                    reject(_this);
                }
            }
        });

        //resolve({statement: statement});
    });
};
User.prototype.errors = function() {
    return this._errors;
};

User.validator = function(opts) {
    switch (typeof opts) {
        case "string":
            return validators[opts];
    }
}

User.prototype.load = function(opts) {
    return new Promise((resolve, reject) => {

    });
};




let validators = {
    registration: [
        body('email', 'Invalid Email').isEmail(),
        body('email_confirmation')
            .custom((value, {req, loc, path}) => {
                if (value !== req.body['email'])
                    throw new Error("Emails don't match");
                return this;
            }),
        body('password')
            .isLength({min: 8}).withMessage('must be at least 8 characters')
            .matches(/\d/).withMessage('must contain at least 1 number'),

        body("password_confirmation")
            .custom((value, {req, loc, path}) => {
                if (value !== req.body['password'])
                    throw new Error("Passwords don't match");
                return this;
            })
    ]
};

module.exports = User;