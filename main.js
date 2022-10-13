const domInpTodoTitle = document.getElementById("inpTodoTitle");
const domBtnCreateTodo = document.getElementById("btnCreateTodo");
const domListOfTodos = document.getElementById("listOfTodos");

class TodoVO {
    constructor(id, title, date = new Date()) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.isCompleted = false;
    }
}

const listOfTodos = [];

domInpTodoTitle.value = "Todo text";

domBtnCreateTodo.addEventListener("click", (e) => {
    console.log("> domBtnCreateTodo -> handle(click)", e);
    const todoTitleValueFromDomInput = domInpTodoTitle.value;
    console.log(
        "> domBtnCreateTodo -> todoInputTitleValue:",
        todoTitleValueFromDomInput
    );

    const todoId = Date.now().toString();
    const todoVO = new TodoVO(todoId, todoTitleValueFromDomInput);

    listOfTodos.push(todoVO);

    let output = "";
    for (let index in listOfTodos) {
        output += `<li>${listOfTodos[index].title}</li>`;
    }
    domListOfTodos.innerHTML = output;
});
