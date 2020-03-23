const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: '54.207.126.58',
    user: 'root',
    password: 'Kti2019++',
    database: 'cactus'
});

mysqlConnection.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log('DB Connectd')
    }
});

module.exports = mysqlConnection;