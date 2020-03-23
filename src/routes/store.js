const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database');

router.get('/admin/store/getAllStore', (req, res) => {
    var sql = 'CALL spGetAllStore()';

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


router.post('/updateStore', (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    var address = req.body.address;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var client_idClient = req.body.client_idClient;
    var sql = 'CALL spUpdateStore(?, ?, ?,  ?, ?,?);'
    var values =[id,name, address, latitude, longitude, client_idClient];
    
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


router.post('/admin/store/getStoreById', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spGetStoreByID(?)';
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

router.post('/insertStore', (req, res) => {
    var name = req.body.name;
    var address = req.body.address;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var client_idClient = req.body.client_idClient;
    var sql = 'CALL spInsertStore(?, ?, ?, ?, ?);'
    var values = [name, address, latitude, longitude, client_idClient];

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

router.post('/deleteStore', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spDeleteStore(?);'
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

module.exports = router;