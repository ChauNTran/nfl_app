const express = require('express');
const app = express();
const http = require('http');
const hbs = require('hbs');
const dotEnv = require('dotenv');
let dotEnvPath = 'dev.env';
dotEnv.config({path: dotEnvPath});
// const db =  require('./src/server/database.js');
const playerRouter = require('./src/server/playerRouter.js');

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static(__dirname + '/public'));
global.publicFolder = __dirname + '/public';



app.get('/', async (req, res) => {
    res.render('index.hbs')
})

app.use('/player', playerRouter);

let server = http.Server(app);
let listenPort = process.env.PORT || 3000;
server.listen(listenPort, function () {

    let host = server.address().address;
    let port = server.address().port;
 
    let date = new Date();
 
    console.log("App listening at http://%s:%s", host, port);
    console.log('Current Time: ' + date);

});
