const express = require('express');
const app = express();
const http = require('http');
const dotEnv = require('dotenv');
const hbs = require('hbs');
const db =  require('./src/server/db.js');
const playerRouter = require('./src/server/playerRouter.js');

app.set('view engine', 'html');
app.engine('html', hbs.__express);
app.use(express.static(__dirname + '/public'));
global.publicFolder = __dirname + '/public';

let dotEnvPath = 'dev.env';
dotEnv.config({path: dotEnvPath});


app.get('/', async (req, res) => {
    let results = await db.getProfiles();
    res.render('index.hbs', {RESULTS : JSON.stringify(results)})
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