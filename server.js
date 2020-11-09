const express = require('express')
const path =require('path')
const app = express()
const port = 3000

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.get('/mobilni', function(req, res) {
    res.sendFile(path.join(__dirname + '/src/mobilni.html'));
});

app.get('/dist/mobilnimain.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/mobilnimain.js'));
});

app.get('/dist/indexmain.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/indexmain.js'));
});

app.get('/node_modules/qrcodejs/qrcode.js', function(req, res) {
    res.sendFile(path.join(__dirname + '/node_modules/qrcodejs/qrcode.js'));
});


app.use('/public', express.static(path.join(__dirname, '/public')))


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});

// ------------------------------------ WebSocket Server sa mobilnog na serveru --------------------------------------------

const WebSocket = require("ws");
const { data } = require('jquery');

const wss = new WebSocket.Server({ port : 8082 });

let iDodeljena = false;
let i = 0;
let brBeta = 0;

let jDodeljena = false;
let j = 0;
let brGamma = 0;

let x = 0;


wss.on("connection", ws => {
    console.log("New client connected");
    
    
    ws.on("message", message => {

        try {
         const data = JSON.parse(message);
        
        console.log('alpha: ' + data.alpha + ', beta: ' +  data.beta + ', gamma: ' + data.gamma);
        

// -------------------------------------- Stabilizacija beta  --------------------------------------------------
        if(brBeta < 100 && data.beta )
        {
                        
            if( iDodeljena == false)
            {
                i = data.beta;
                iDodeljena = true;
            };
            
            
            if(i-data.beta < 3 && i-data.beta > -3)
            {
                brBeta++;
                //console.log(brBeta);

            }
            else
            {
                brBeta = 0;
                iDodeljena = false
            };
        };

        if(i-data.beta > 10 || i-data.beta < -10)
            {
                brBeta = 0;
                iDodeljena = false;
            }

        if(brBeta == 100)
        {
            console.log("Beta stabilozovano");
        }
        

    // -------------------------------------- Stabilizacija gamma  --------------------------------------------------
  



        if(brGamma < 100 && data.gamma )
        {
                        
            if( jDodeljena == false)
            {
                j = data.gamma;
                jDodeljena = true;
            };
            
            
            if(j-data.gamma < 3 && j-data.gamma > -3)
            {
                brGamma++;
                //console.log(brGamma);

            }
            else
            {
                brGamma = 0;
                jDodeljena = false
            };
        };

        if(j-data.gamma > 10 || j-data.gamma < -10)
            {
                brGamma = 0;
                jDodeljena = false;
            }

        if(brGamma == 100)
        {
            console.log("Gamma stabilozovano");
        }


//----------------------------------------------------- SMANJIVANJE ZVUKA ------------------------------------------

        // if(brBeta == 100 && brGamma == 100)
        // {
        //     x = 90 - data.alpha;
        //     audioElement.volume = (1/2) + (x + data.alpha)/180

        // }


// ---------------------------------------------------------------------------------------------------------------    

    } catch(e) {
        console.log(`Something went wrong with the message: ${e.message}`);
    }
    
});




    ws.on("close", () => {
        console.log("Client has disconnected!");
    });
    
});

