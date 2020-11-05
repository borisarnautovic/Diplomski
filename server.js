var http = require('http');
var app = require('./src/app');


const port = 30001

const server = http.createServer(app.handleRequest);

server.listen(port, function(error)
{
    if (error)
    {
        console.log('Nesto nije u redu', error)
    }
    else
    {
        console.log('Server je u funkciji na  portu ' + port)
    }
});

// -------------------- WebSocket Server -----------------

const WebSocket = require("ws");
const { data } = require('jquery');

const wss = new WebSocket.Server({ port : 8082 });

wss.on("connection", ws => {
    console.log("New client connected");

    ws.on("message", message => {

        try {
            const data = JSON.parse(message);
        //console.log(`Client has sent us: ${data.alpha, data.beta}`);

        console.log('alpha: ' + data.alpha + ', beta: ' +  data.beta);
        
        } catch(e) {
            console.log(`Something went wrong with the message: ${e.message}`);
        }
        
    });

    

    ws.on("close", () => {
        console.log("Client has disconnected!");
    });
    
});

