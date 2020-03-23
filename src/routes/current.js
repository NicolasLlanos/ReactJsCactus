const express  = require('express');
const router = express.Router();

const mysqlConnection = require ('../database');

router.get('/admin/current/getAllCurrent', (req, res) => {
    var sql = 'CALL spGetAllCurrent()';

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

router.post('/getCurrentById', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spGetCurrentById(?)';
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



router.post('/updateCurrent', (req, res) => {
    var id = req.body.id;
    var current = req.body.current;
    var sensor_idSensor = req.body.sensor_idSensor;
    var sql = 'CALL spUpdateCurrent(?,?,?);'
    var values = [id, current, sensor_idSensor];
    
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



router.post('/insertCurrent', (req, res) => {
    var current = req.body.current;
    var sensor_idSensor = req.body.sensor_idSensor;
    var sql = 'CALL spInsertCurrent(?, ?);'
    var values = [ current, sensor_idSensor];

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

router.post('/deleteCurrent', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spDeleteCurrent(?);'
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