module.exports = {
    home() {
        return "<h2>환영합니다!</h2>풀어보면 좋은 백준 문제를 추천해드리고 있습니다.";    
    },

    show_problem(problem, hint) {
        var dft = `<h2>${problem[0].id}</h2><a href="https://www.acmicpc.net/problem/${problem[0].id}">문제 링크</a><br><br>${problem[0].description}`
        if (problem[0].hint != "") {
            dft = dft + '<br>';
            if (hint != 1) {
                dft = dft + `<p> <form action="/"><input type="hidden" name="id" value="${problem[0].id}"><input type="hidden" name="hint" value="1"><input type="submit" value="힌트 보기"></form></p>`;
            }
            else {
                dft = dft + `<p>   ${problem[0].hint}</p>`;
            }
        }
        return dft;
    },

    create() {
        return `<h2>문제 추가</h2>
        <form action="/create_process" method="post">
        <p>
            <input type="number" name="problem" placeholder="BOJ problem" min="1000" max="19089">
        </p>
        <p>
            <textarea name="description" placeholder="Simple description" minlength="1" maxlength="100"></textarea> <br>
            <textarea name="hint" placeholder="Hint (if you want)" maxlength="30"></textarea>
        </p>
        <p>
            <input type="submit" value="추가">
        </p>
        </form>`
    },

    update(problem) {
        return `<h2>${problem[0].id}</h2>
        <form action="/update_process" method="post">
        </h2><a href="https://www.acmicpc.net/problem/${problem[0].id}">문제 링크</a><br>
        <p>
            <input type="hidden" name="problem" value="${problem[0].id}">
            <textarea name="description" placeholder="Simple description" minlength="1" maxlength="100">${problem[0].description}</textarea> <br>
            <textarea name="hint" placeholder="Hint (if you want)" maxlength="30">${problem[0].hint}</textarea>
        </p>
        <p>
            <input type="submit" value="수정">
        </p>
        </form>`
    }
}
