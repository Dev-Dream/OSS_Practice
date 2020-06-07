var _http = require("http");
var _mysql = require("mysql");
var _url = require("url");
var _qs = require("querystring");
var _tpl = require("./lib/tpl.js");
var _body = require("./lib/body.js");
var _ctrl = require("./lib/ctrl.js");
var _express = require("express");
var _compression = require("compression");
var _bodyparser = require("body-parser");

var db = _mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"mysql",
    database:"oss_practice"
});
db.connect();

var title = "풀어보면 좋은 백준 문제";

var app = _express();

app.use(_bodyparser.urlencoded({ extended: false }));
app.use(_compression());

app.get('*', function(req, res, next){
    db.query(`SELECT * FROM problem`, (err, problems) => {
        req.list = _tpl.list(problems);
        next();
    });
});

app.get("/", (req, res) => {
    res.send(_tpl.home(title, req.list, _ctrl.create(), _body.home()))
});


app.get("/problem/:problemID", (req, res, next) => {
    var id = req.params.problemID;
    db.query(`SELECT * FROM problem WHERE id = ?`, [id], (err, problem) => {
        if (err) {
            next(err);
            return;
        }
        if (problem.length === 0) {
            next(err);
            // res.redirect("/"); // may go 404
            return;
        }
        res.send(_tpl.home(title, req.list, _ctrl.create()+" "+_ctrl.update(id)+" "+_ctrl.delete(id), _body.show_problem(problem, 0)));
    });
});

app.get("/problem/:problemID/hint", (req, res, next) => {
    var id = req.params.problemID;
    db.query(`SELECT * FROM problem WHERE id = ?`, [id], (err, problem) => {
        if (err) {
            next(err);
            return;
        }
        if (problem.length === 0) {
            next(err);
            // res.redirect("/"); // may go 404
            return;
        }
        res.send(_tpl.home(title, req.list, _ctrl.create()+" "+_ctrl.update(id)+" "+_ctrl.delete(id), _body.show_problem(problem, 1)));
    });
});

app.get("/create", (req, res) => {
    res.end(_tpl.home(title, req.list, "", _body.create()));
});

app.post("/create", (req, res) => {
    var post = req.body;
    var id = post.problem;
    var description = post.description;
    var hint = post.hint;
    db.query(`SELECT * FROM problem WHERE id=${id}`, function(err1, problem){
        if (problem.length === 1) {
            // may alert
            res.redirect(`/problem/${id}`);
        }
        else {
            db.query(`
            INSERT INTO problem VALUES(?, ?, ?)`,
            [id, description, hint], function(err2, result){
                res.redirect(`/problem/${id}`);
            });
        }
    });
});

app.get("/update/:problemID", (req, res) => {
    var id = req.params.problemID;
    db.query(`SELECT * FROM problem WHERE id = ${id}`, function(error, problem){
        if (problem.length === 0) {
            res.redirect("/");
        }
        else {
            res.send(_tpl.home(title, req.list, _ctrl.create()+" "+_ctrl.delete(id), _body.update(problem)));
        }
    });
});

app.post("/update", (req, res) => {
    var post = req.body;
    var id = post.problem;
    var description = post.description;
    var hint = post.hint;
    db.query('UPDATE problem SET description=?, hint=? WHERE id=?', [description, hint, id], function(error, result){
        res.writeHead(302, {Location: `/problem/${id}`});
        res.end();
    });
});

app.post("/delete", (req, res) => {
    var post = req.body;
    db.query('DELETE FROM problem WHERE id = ?', [post.problem], function(error, result){
        res.redirect("/");
    });
}); 

app.use((req, res, next) => res.status(404).send("404 not found"));

app.use((err, req, res, next) => res.status(404).send("404 not found!!"))

app.listen(3000);