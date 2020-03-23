const express  = require('express');
const router = express.Router();

const mysqlConnection = require ('../database');

router.get('/admin/sector/getAllSector', (req, res) => {
    var sql = 'CALL spGetAllSector()';

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

router.post('/admin/sector/getSectorById', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spGetSectorById(?)';
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


router.post('/updateSector', (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    var level = req.body.level;
    var sectorPlan = req.body.sectorPlan;
    var store_idStore = req.body.store_idStore;
    var sql = 'CALL spUpdateSector(?, ?, ?,  ?, ?);'
    var values =[id,name, level, sectorPlan, store_idStore];
    
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

router.post('/insertSector', (req, res) => {
    var name = req.body.name;
    var level = req.body.level;
    var sectorPlan = req.body.sectorPlan;
    var store_idStore = req.body.store_idStore;
    var sql = 'CALL spInsertSector(?, ?, ?, ?);'
    var values = [name, level, sectorPlan, store_idStore];

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

router.post('/deleteSector', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spDeleteSector(?);'
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