const express  = require('express');
const router = express.Router();

const mysqlConnection = require ('../database');

router.get('/getAllSensorDevice', (req, res) => {
    var sql = 'CALL spGetAllSensorDevice()';

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

router.post('/getSensorDevice', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spGetSensorDeviceById(?)';
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

router.post('/insertSensorDevice', (req, res) => {
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var sensor_idSensor = req.body.sensor_idSensor;
    var sql = 'CALL spInsertSensorDevice(?, ?,?);'
    var values = [startDate, endDate, sensor_idSensor];

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


router.post('/updateSensorDevice', (req, res) => {
    var sensor_idSensor = req.body.id;
    var startDate = req.body.startDate;

    var endDate = req.body.endDate;
    var sql = 'CALL spUpdateSensorDevice(?,?,?);'
    var values = [sensor_idSensor,startDate, endDate];
    
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

router.post('/deleteSensorDevice', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spDeleteSensorDevice(?);'
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


router.post('/admin/getSensorIdByName', (req, res) => {
    var nombre = req.body.nombre;
    var sql = 'CALL spGetSensorIdByName(?)';
    var values = [nombre];

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