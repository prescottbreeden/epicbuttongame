const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/bower_components")));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//socket
server.listen(1337);
const io = require('socket.io')(server);
var counter = 0;

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('user_data', function (data) {
        console.log('received user_data at server')
        console.log(data);
        socket.emit('thing', data);
    });
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/', function(req, res) {
    res.render('index');
})

app.listen(8000, function() {
    console.log("Power Overwhelming...");
})