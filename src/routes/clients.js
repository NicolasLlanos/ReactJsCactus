const express  = require('express');
const router = express.Router();

const mysqlConnection = require ('../database');


router.get('/admin/clientes/getAllClients', (req, res) => {
    var sql = 'CALL spGetAllClients()';

    mysqlConnection.query(sql, (error, rows, fields) => {
        if(!error){
            res.status(200);
            return data = res.json(rows[0]);

        }else{
            res.status(404).json({ response: error })
            return;
        }


    });
 

});

router.post('/admin/clientes/getClientsById', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spGetClientsById(?)';
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


router.post('/insertClient', (req, res) => {
    var name = req.body.name;
    var rut = req.body.rut;
    var dv = req.body.dv;
    var telephone = req.body.telephone;
    var mail = req.body.mail;
    var sql = 'CALL spInsertClient(?, ?,  ?, ?, ?);'
    var values =[name, rut, dv, telephone, mail];
    
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



router.post('/updateClient', (req, res) => {
    var id = req.body.id;
    var name = req.body.name;
    var rut = req.body.rut;
    var dv = req.body.dv;
    var telephone = req.body.telephone;
    var mail = req.body.mail;
    var sql = 'CALL spUpdateClient(?, ?, ?,  ?, ?, ?);'
    var values =[id, name, rut, dv, telephone, mail];
    
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



router.post('/deleteClient', (req, res) => {
    var id = req.body.id;
    var sql = 'CALL spDeleteClient(?);'
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