module.exports = {
    home(title, list, control, body) { 
    return `<!DOCTYPE html>
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta charset="utf-8">
        </head>
        <body>
            <h1><a href="/">풀어보면 좋은 백준 문제</a></h1>
            <p>${list}</p>
            <p>${control}</p>
            <p>${body}</p>
        </body>
    </html>`;
    },

    list(problems) {
        if (problems.length == 0) return "아직 추천된 문제가 없습니다!"
        var rtn_string = "<ul>";
        var i = 0;
        while (i < problems.length) {
            rtn_string = rtn_string + `<li><a href="/?id=${problems[i].id}">${problems[i].id}</a></li>`
            i = i + 1;
        }
        return rtn_string + "</ul>";
    }
}
