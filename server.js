const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/bower_components")));
app.use(bodyParser.urlencoded({ extended: true }));

var session = require("express-session")({
    secret: "my-secret",
    resave: true,
    saveUninitialized: true
});
app.use(session);
var sharedsession = require("express-socket.io-session");

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

//socket
server.listen(1337);
const io = require('socket.io')(server);
var counter = 0;

io.use(sharedsession(session, {
    autoSave:true
}));

io.on('connection', function (socket) {
    
    socket.on('reset_counter', function() {
        counter = 0;
        socket.emit('updated_counter', counter);
    })
    
    socket.on('increment_counter', function () {
        counter++
        socket.emit('updated_counter', counter);
    });
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/', function(req, res) {
    res.render('index');
})

app.listen(8000, function() {
    console.log("Power Overwhelming...");
})