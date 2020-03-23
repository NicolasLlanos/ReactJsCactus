const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/admin/users/getAllUsers', (req, res) => {
    var sql = 'CALL spGetAllUsers()';

    mysqlConnection.query(sql, (error, rows, fields) => {
        if (!error) {
            res.status(200);
            res.json(rows[0]);
            return;
        } else {
            res.status(404).json({ response: error })
            return;
        }
    });
});

router.post('/getUsersById', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spGetUsersById(?)';
    var values = [id];

    mysqlConnection.query(sql, values, (error, rows, fields) => {
        if (!error) {
            res.status(200);
            res.json(rows[0]);
        } else {
            res.status(404).json({ response: error })
            return;
        }
    });
});

router.post('/insertUser', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var client_idClient = req.body.client_idClient;
    var sql = 'CALL spInsertUser(?, ?, ?);'
    var values = [email, password, client_idClient];

    mysqlConnection.query(sql, values, (error, rows, fields) => {
        if (!error) {
            res.status(200).json({ success:true,
                message:"Guardo exitosamente"
                })
            
        } else {
            res.status(404).json({ response: error })
            return;
        }
    });
});


router.post('/updateUsers', (req, res) => {
    var id = req.body.id;
    var email = req.body.email;
    var password = req.body.password;
    var client_idClient = req.body.client_idClient;
    var sql = 'CALL spUpdateUser(?,?,?,?);'
    var values = [id,email,password,client_idClient];
    
    mysqlConnection.query(sql, values, (error, rows, fields) => {
        if (!error) {
            res.status(200).json({ success:true,
                message:"Guardo exitosamente"
                })
            
        } else {
            res.status(404).json({ response: error })
            return;
        }
    });
});



router.post('/deleteUser', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spDeleteUser(?);'
    var values = [id];

    mysqlConnection.query(sql, values, (error, rows, fields) => {
        if (!error) {
            res.status(200).json({ success:true,
                message:"Eliminado exitosamente"
                })
            
        } else {
            res.status(404).json({ response: error })
            return;
        }
    });
});



router.post('/loginForm', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var sql = 'CALL spValidarLogin(?,?)';
    var values = [email, password];

    mysqlConnection.query(sql, values, (error, rows, fields) => {
        if (!error) {
            res.status(200);
            res.json(rows[0]);
        } else {
            res.status(404).json({ response: error })
            return;
        }
    });
});


module.exports = router;