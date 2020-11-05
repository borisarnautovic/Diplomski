var url = require('url');
var fs = require('fs');


function renderHTML(path, response)
{
    fs.readFile(path, null, function(error, data)
    {
        if (error)
        {
            response.writeHead(404);
            response.write('File not found!');
        }
        else
        {
            response.write(data);
        }
        response.end();
    });
}


function serveMusic(path, response)
{
    fs.readFile("./Songs/KAZKA", null, function(error, data)
    {
        if (error)
        {
            console.log("dasda")
            response.writeHead(404);
            response.write('File not found!');
        }
        else
        {
            console.log(data);
            fs.writeFile(data);
           response.end();
        }
    });
    
}



module.exports = 
{
    handleRequest: function(request, response)
    {
        response.writeHead(200, {'Content-Type': 'text/html'});

        var path = url.parse(request.url).pathname;
        switch (path)
        {
            case '/':
                renderHTML('./src/index.html', response);
                break;
            case '/mobilni':
                renderHTML('./src/mobilni.html', response);
                break;
            case '/dist/indexmain.js':
                renderHTML('./dist/indexmain.js',response)
                break;          
            case '/dist/mobilnimain.js':
                renderHTML('./dist/mobilnimain.js',response)
                break;     
            case '/node_modules/qrcodejs/qrcode.js':
                  renderHTML('./node_modules/qrcodejs/qrcode.js', response);
                  break; 
            case '/node_modules/bootstrap/dist/css/bootstrap.min.css':
                renderHTML('./node_modules/bootstrap/dist/css/bootstrap.min.css', response);
                break;
            case '/node_modules/bootstrap/dist/js/bootstrap.min.js':
                renderHTML('./node_modules/bootstrap/dist/js/bootstrap.min.js', response);
                break;
            case '/Songs/Kazka.mp3':
                serveMusic('./Songs/Kazka.mp3',response);
                break;
           
            case '/treca':
                renderHTML('./src/treca.html', response);
                break;

            default:
                response.writeHead(404);
                response.write('Route not defined');
                response.end();
        }
    }
};


  




    