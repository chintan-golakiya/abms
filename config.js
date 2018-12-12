const mysql = require('mysql');

exports.getdb = function(){
        var con = mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'5nake>Rat',
            database:'abms'
    });

    return con;
}