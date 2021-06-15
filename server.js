const express = require('express')
const path = require('path')
const app = express()
const port = 3000


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.get('/mobilni', function (req, res) {
    res.sendFile(path.join(__dirname + '/src/mobilni.html'));
});

app.use('/public', express.static(path.join(__dirname, '/public')));

app.get('/dist/mobilnimain.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/mobilnimain.js'));
});


app.get('/dist/indexmain.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/indexmain.js'));
});

app.get('/dist/img/background.jpg', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/img/background.jpg'));
});


app.get('/node_modules/qrcodejs/qrcode.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/node_modules/qrcodejs/qrcode.js'));
});

app.get('/node_modules/bootstrap/dist/css/bootstrap.min.css', function (req, res) {
    res.sendFile(path.join(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css'));
});

app.get('/node_modules/bootstrap/dist/js/bootstrap.min.js', function (req, res) {
    res.sendFile(path.join(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.min.js'));
});





app.use('/fonts', express.static(path.join(__dirname, '/fonts')));



app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});


// // ------------------------------------ WebSocket Server sa mobilnog na serveru --------------------------------------------



const WebSocket = require("ws");
const { data } = require('jquery');

const wss = new WebSocket.Server({ port: 8082 });

const wss2 = new WebSocket.Server({ port: 8085 });



// let iDodeljena = false;
// let i = 0;
// let brBeta = 0;

// let jDodeljena = false;
// let j = 0;
// let brGamma = 0;

// let stabAlpha = 0;
// let alphaDodeljena = false;

// //const coef = 0.00555555555555555555555555555556;

// const coef = 0.5 / 90;

let second_socket_helper = null;

wss2.on("connection", ws2 => {
    console.log("New client connected");


    second_socket_helper = ws2;
    //     // if(brBeta == 100 && brGamma == 100)



    // });

    wss.on("connection", ws => {
        console.log("New client connected");



        ws.send("Hey, how's it going?");

        ws.on("message", message => {

            try {
                const data = JSON.parse(message);
                second_socket_helper.send(JSON.stringify({volume: data.volume }));

            } catch (e) {
                console.log(`Something went wrong with the message: ${e.message}`);
            }

            ws.on("close", () => {
                console.log("Client has disconnected!");
            });

        });
    });
});



