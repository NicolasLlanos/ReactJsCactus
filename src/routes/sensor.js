const express  = require('express');
const router = express.Router();

const mysqlConnection = require ('../database');


router.get('/admin/sensor/getAllSensor', (req, res) => {
    var sql = 'CALL spGetAllSensor()';

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

router.post('/admin/sensor/getSensorById', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spGetSensorById(?)';
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



router.get('/admin/sensor/getAllSensorPosition', (req, res) => {
    var sql = 'CALL spGetAllSensorPosition()';

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


router.post('/updateSensorPosition', (req, res) => {
    var id = req.body.id;
    var posx = req.body.posx;
    var posy = req.body.posy;
    var sql = 'CALL spUpdateSensorPosition(?,?, ?);'
    var values = [id,posx,posy];
    
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



router.post('/updateSensor', (req, res) => {
    var id = req.body.id;
    var isOn = req.body.isOn;
    var sector_idSector = req.body.sector_idSector;
    var nombre = req.body.nombre;
    var sql = 'CALL spUpdateSensor(?,?, ?, ?);'
    var values = [id,isOn,nombre, sector_idSector];
    
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


router.post('/insertSensor', (req, res) => {
    var isOn = req.body.isOn;
    var sector_idSector = req.body.sector_idSector;
    var nombre = req.body.nombre;
    var sql = 'CALL spInsertSensor(?, ?, ?);'
    var values = [isOn,nombre, sector_idSector];

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

router.post('/deleteSensor', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spDeleteSensor(?);'
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