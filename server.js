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

const wss2 = new WebSocket.Server({ port : 8085 });

let iDodeljena = false;
let i = 0;
let brBeta = 0;

let jDodeljena = false;
let j = 0;
let brGamma = 0;

let stabAlpha = 0;
let alphaDodeljena = false;

const coef = 0.00555555555555555555555555555556;

let second_socket_helper = null;

wss2.on("connection", ws2 => {
    console.log("New client connected");


    second_socket_helper= ws2;
    // if(brBeta == 100 && brGamma == 100)
 


    });

wss.on("connection", ws => {
    console.log("New client connected");

    

   // ws.send("Hey, how's it going?" +data.alpha);
    
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
                alphaDodeljena = false;
            }

        if(brBeta == 100)
        {
          //  console.log("Beta stabilozovano");
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
                alphaDodeljena = false;
            }

        if(brGamma == 100)
        {
           // console.log("Gamma stabilozovano");
        }


//----------------------------------------------------- SMANJIVANJE ZVUKA ------------------------------------------
    if(brBeta >= 100 && brGamma >= 100)
    {
        if(!alphaDodeljena)
        {
            alphaDodeljena = true;
            //stabAlpha = 180;
           stabAlpha = data.alpha;
        }

        if (second_socket_helper) 
        {

            if(stabAlpha >= 90 && stabAlpha <= 270 )
            {
                 if(data.alpha >= Math.abs(stabAlpha-90) && data.alpha <=Math.abs(stabAlpha+90)) // alpha izmedju 90 i 270 i u slucaju smanjivanja do 360
                {
                    
                    const razlika = stabAlpha - data.alpha;
                
                    const volume = razlika * coef + 0.5; 

                //    console.log("drugi uslov");

                    if( volume >=0 && volume <=1)
                    {
                        second_socket_helper.send(JSON.stringify({volume : volume}));
                    }
                }  
                        

        
            }
            else if(stabAlpha >= 270 && stabAlpha <= 360 )
            {
                 if(data.alpha >= Math.abs(stabAlpha-90) && data.alpha <=Math.abs(stabAlpha+90)) // u slucaju smanjivanja do 360
                {
                    
                    const razlika = stabAlpha - data.alpha;
                
                    const volume = razlika * coef + 0.5; 

                   // console.log("drugi uslov");

                    if( volume >=0 && volume <=1)
                    {
                        second_socket_helper.send(JSON.stringify({volume : volume}));
                    }
                }                                    

                else if(((stabAlpha + 90) - stabAlpha) >= data.alpha ) //  u slucaju smanjivanja kad ide preko 360
                {
                                
                    const volume = ((360 - stabAlpha + data.alpha) * coef)*(-1) + 0.5; 

                   // console.log("treci uslov");

                    if( volume >=0 && volume <=1)
                    {
                        second_socket_helper.send(JSON.stringify({volume : volume}));
                    }
                }
            }
            else if(stabAlpha >= 0 && stabAlpha <= 90)
            {
                if((stabAlpha - data.alpha) <= 0 )
                {
                    let volume;
                    if(( data.alpha - stabAlpha) >= 270 ) //  kad predje 0 (od 360) 
                    {
                         volume =  ((360 - (data.alpha - stabAlpha )) * coef) + 0.5; 
                      //   console.log("ovde je prvi")
                    }        
                    else  // volumen od 0.0 do 0.5
                    {
                        
                        volume =  Math.round(((Math.abs(stabAlpha - data.alpha)*(-1) * coef) + 0.5)*100)/100;
                        
                        
                    
                     //   console.log("ovde je treci");                        
                    }               
                
                    if( volume >=0 && volume <=1)
                    {
                        second_socket_helper.send(JSON.stringify({volume : volume}));
                    }
                } 

                else if ((stabAlpha - data.alpha) >=0 && Math.abs(stabAlpha - data.alpha) < stabAlpha) // od alpha do 0 
                {
                    volume =  ((stabAlpha - data.alpha) * coef) + 0.5;
                    //console.log("ovde je drugi")

                    if( volume >=0 && volume <=1)
                    {
                        second_socket_helper.send(JSON.stringify({volume : volume}));
                    }
                }                                  
                          
            } 
        }
            
        
    };
   


// ---------------------------------------------------------------------------------------------------------------    

    } catch(e) {
        console.log(`Something went wrong with the message: ${e.message}`);
    }
    
});




    ws.on("close", () => {
        console.log("Client has disconnected!");
    });
    
});


// ----------------------------------------------------------------------





