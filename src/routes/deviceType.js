const express  = require('express');
const router = express.Router();

const mysqlConnection = require ('../database');

router.get('/getAllDeviceType', (req, res) => {
    var sql = 'CALL spGetAllDeviceType()';

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

router.post('/admin/tipodispositivos/getDeviceTypeById', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spGetDeviceTypeById(?)';
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

router.post('/insertDeviceTyoe', (req, res) => {
    var name = req.body.name;
    var icon = req.body.icon;
    var sql = 'CALL spInsertDeviceType(?, ?);'
    var values = [name, icon];

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

router.post('/deleteDeviceType', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spDeleteDeviceType(?);'
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


router.post('/updateDeviceType', (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    var icon = req.body.icon;
   
    var sql = 'CALL spUpdateDeviceType(?, ?, ?);'
    var values =[id, name, icon];
    
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

module.exports = router;