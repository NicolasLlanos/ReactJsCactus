const express  = require('express');
const router = express.Router();

const mysqlConnection = require ('../database');

router.get('/admin/device/getAllDevice', (req, res) => {
    var sql = 'CALL spGetAllDevice()';

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

router.post('/admin/device/getDevice', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spGetDeviceById(?)';
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


router.post('/updateDevice', (req, res) => {
    var id = req.body.id;
    var sensorDevice_idSensorDevice = req.body.sensorDevice_idSensorDevice;
    var deviceType_idDeviceType = req.body.deviceType_idDeviceType;
    var name = req.body.name;
    var sql = 'CALL spUpdateDevice(?,?,?,?);'
    var values = [id,name,sensorDevice_idSensorDevice,deviceType_idDeviceType];
    
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


router.post('/insertDevice', (req, res) => {
    var name = req.body.name;
    var sensorDevice_idSensorDevice = req.body.sensorDevice_idSensorDevice;
    var deviceType_idDeviceType = req.body.deviceType_idDeviceType;
    var sql = 'CALL spInsertDevice(?, ?,?);'
    var values = [name, sensorDevice_idSensorDevice, deviceType_idDeviceType];

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

router.post('/deleteDevice', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spDeleteDevice(?);'
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