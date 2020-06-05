module.exports = {
    create() { 
        return `<a href="/create">문제 추가</a>`;
    },

    update(id) {
        return `<a href="/update?id=${id}">문제 수정</a>`;
    },

    delete(id) {
        return `<form action="/delete_process" method="post"><input type="hidden" name="problem" value="${id}"><input type="submit" value="삭제"></form></p>`
    }
}
