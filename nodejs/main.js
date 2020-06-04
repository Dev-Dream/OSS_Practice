var http = require('http');
var fs = require('fs');
var url = require('url');

function checkURL(id) {
    if (id === undefined) return 0;
    if (1 <= id && id <= 4) return 1;
    return 2;
}

function getTitle(id) {
    var checker = checkURL(id);

    var title = "애국가 닷컴";
    if (checker === 0) return title;
    if (checker === 1) return title + ` - ${id}절`;
    return "404 not found";
}

function getFileDirectory(id) {
    var checker = checkURL(id);
    
    var fileDirecotry = "data/";
    if (checker === 0) return fileDirecotry + "welcome/index";
    if (checker === 1) return fileDirecotry + `original/${id}`;
    return fileDirecotry + "error/404";
}

function getTemplate(title, body) {
    var tpl = 
            `<!DOCTYPE html>
            <html>
                <head>
                    <title>${title}</title>
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
    return tpl;
}


var app = http.createServer(function(request,response){
    var _url = request.url;
    var querydata = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var id = querydata.id;

    var title = getTitle(id);
    var fileDirecotry = getFileDirectory(id);
    if (pathname === '/') {
        fs.readFile(fileDirecotry, "utf8", function(err, body){
            response.writeHead(200);
            var tpl = getTemplate(title, body);
            response.end(tpl);
        })
    }
    else {
        response.writeHead(404);
        response.end('not found');
    }
});

app.listen(3000);