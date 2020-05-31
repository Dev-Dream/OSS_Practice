var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var querydata = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var id = querydata.id;
    
    if (id === undefined) id = 0;

    var sub = "";
    var file = "index";
    if (1 <= id && id <= 4) {
        sub = ` - ${id}절`;
        file = id;
    }

    if (pathname === '/') {
        fs.readFile(`data/${file}`, "utf8", function(err, body){
            var tpl = 
            `<!DOCTYPE html>
            <html>
                <head>
                    <title>애국가 닷컴${sub}</title>
                    <meta charset="utf-8" />
                </head>
                <body>
                    <h1> <a href="/">애국가 닷컴</a> </h1>
                    <ol>
                        <li> <a href="/?id=1">1절</a></li>
                        <li> <a href="/?id=2">2절</a></li>
                        <li> <a href="/?id=3">3절</a></li>
                        <li> <a href="/?id=4">4절</a></li>
                    </ol>
                    ${body}
                </body>
            </html>`;
            response.writeHead(200);
            response.end(tpl);
        })
    }
    else {
        response.writeHead(404);
        response.end('not found');
    }
});

app.listen(3000);