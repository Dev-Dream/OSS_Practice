var _http = require("http");
var _mysql = require("mysql");
var _url = require("url");
var _qs = require("querystring");
var _tpl = require("./lib/tpl.js");
var _body = require("./lib/body.js");
var _ctrl = require("./lib/ctrl.js");

var db = _mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mysql",
    database:"oss_practice"
});
db.connect();

var app = _http.createServer(function(request,response){
    var url =  request.url;
    var parsing = _url.parse(url, true);
    var pathname = parsing.pathname;
    var id = parsing.query.id;
    
    var title = "풀어보면 좋은 백준 문제";
    db.query(`SELECT * FROM problem`, function(error, problems){
        var list = _tpl.list(problems);
        if (pathname === '/') {
            if (id === undefined) {
                response.writeHead(200);
                response.end(_tpl.home(title, list, _ctrl.create(), _body.home()));
            }
            else {
                db.query(`SELECT * FROM problem WHERE id = ${id}`, function(error, problem){;
                    if (problem.length === 0) {
                        response.writeHead(302, {Location : "/"});
                        response.end();
                    }
                    else {
                        var hint = parsing.query.hint;
                        response.writeHead(200);
                        response.end(_tpl.home(title, list, _ctrl.create()+" "+_ctrl.update(id)+" "+_ctrl.delete(id), _body.show_problem(problem, hint)));
                    }
                });
            }
        } 
        else if (pathname === "/update") {
            db.query(`SELECT * FROM problem WHERE id = ${id}`, function(error, problem){
                if (problem.length === 0) {
                    response.writeHead(302, {Location : "/"});
                    response.end();
                }
                else {
                    response.writeHead(200);
                    response.end(_tpl.home(title, list, _ctrl.create()+" "+_ctrl.delete(id), _body.update(problem)));
                }
            });
        } 
        else if (pathname === "/update_process") {
            var body = '';
            request.on('data', function(data){
                body = body + data;
            });
            request.on('end', function(){
                var post = _qs.parse(body);
                var id = post.problem;
                var description = post.description;
                var hint = post.hint;
                db.query('UPDATE problem SET description=?, hint=? WHERE id=?', [description, hint, id], function(error, result){
                    response.writeHead(302, {Location: `/?id=${id}`});
                    response.end();
                  })
            }); 
        }
        else if (pathname === "/create") {
            response.writeHead(200);
            response.end(_tpl.home(title, list, "", _body.create()));
        } 
        else if (pathname === "/create_process") {
            var body = '';
            request.on('data', function(data){
                body = body + data;
            });
            request.on('end', function(){
                var post = _qs.parse(body);
                var id = post.problem;
                var description = post.description;
                var hint = post.hint;
                db.query(`SELECT * FROM problem WHERE id=${id}`, function(err1, problem){
                    if (problem.length === 1) {
                        // may alert
                        response.writeHead(302, {Location : `/?id=${id}`});
                        response.end();
                    }
                    else {
                        db.query(`
                        INSERT INTO problem VALUES(?, ?, ?)`,
                        [id, description, hint], function(err2, result){
                            response.writeHead(302, {Location : `/?id=${id}`});
                            response.end();
                        });
                    }
                });
            });  
        }
        else if (pathname === "/delete_process") {
            var body = '';
            request.on('data', function(data){
                body = body + data;
            });
            request.on('end', function(){
                var post = _qs.parse(body);
                db.query('DELETE FROM problem WHERE id = ?', [post.problem], function(error, result){
                    response.writeHead(302, {Location: `/`});
                    response.end();
                });
            });
        }
        else {
            response.writeHead(404);
            response.end("not found");
        }
    });
});

app.listen(3000);