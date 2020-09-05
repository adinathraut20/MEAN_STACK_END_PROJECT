const mysql = require('mysql');
const Promise = require('bluebird');

Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

let dbConnection = async () => {
    let dbConnect = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "meanstack"
    })
    await dbConnect.connectAsync();
    console.log('DB connection Establish');
    return dbConnect;
};

module.exports = dbConnection;