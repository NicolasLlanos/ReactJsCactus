const express  = require('express');
const app = express();


app.set('port', process.env.PORT || 4000);

app.use(express.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    next();
});


app.use(require('./routes/clients'));
app.use(require('./routes/users'));
app.use(require('./routes/current'));
app.use(require('./routes/device'));
app.use(require('./routes/deviceType'));
app.use(require('./routes/sector'));
app.use(require('./routes/sensor'));
app.use(require('./routes/sensorDevice'));
app.use(require('./routes/store'));
 

app.listen(app.get('port'), () => {
    console.log('Run in: ', app.get('port'));
})