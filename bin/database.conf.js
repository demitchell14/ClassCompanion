/**
 * TODO
 * TODO edit connection values to allow for local database connections
 * TODO
 */

const mysql       = require('mysql');


const requiredConnectFields = ["host", "user", "password", "database"];

const connection = {
    DEV: {
        connectionLimit: 10,
        host: "",
        user: "",
        password: "",
        database: "",
    }
};

/**
 *
 * @type {{connection: undefined, init: DB.init, connect: (function(*=): *), end: (function(): *), query: (function(*=, *=): *)}}
 */
let connectionOptions = {};
let DB = {
    /**
     * @type {Pool}
     */
    connection: undefined,
    init: function(connection) {
        if (typeof connection === 'object') {
            let fields = Object.keys(connection);
            let required = fields.filter(item => {
                for (let i = 0; i < requiredConnectFields.length; i++) {
                    if (requiredConnectFields[i] === item) return true;
                }
                return false;
            });

            if (required.length >= requiredConnectFields.length) {
                connectionOptions = connection;

                DB.connection = mysql.createPool(connectionOptions);
                console.log("Database Initialized");

                return DB;
            }
        }
    },
    escape: function(value) {
        return DB.connection.escape(value);
    },
    connect: function(callback) {
        return DB.connection.connect(callback);
    },
    end: function() {
        return DB.connection.end();
    },
    /**
     *
     * @param query {string}
     * @param callback {function(error, result, fields)}
     */
    query: function(query, callback) {
        return DB.connection.query(query, callback);
    },
    queryp: function(query, includeFields) {
        return new Promise((resolve, reject) => {
            DB.connection.query(query, function(error, results, fields) {
                if (error) reject(error);
                else {
                    resolve({
                        results: results,
                        fields: includeFields ? fields : undefined
                    });
                }
            })
        });
    },

    getConnectionOptions() {
        return connection.DEV;
    }
};

module.exports = DB;