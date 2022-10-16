import TodoVO from './src/model/VOS/TodoVO.js';

const domInpTodoTitle = document.getElementById('inpTodoTitle');
const domBtnCreateTodo = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');

domBtnCreateTodo.addEventListener('click', onBtnCreateTodoClick);

const LOCAL_LIST_OF_TODOS = 'listOfTodos';

const localListOfTodos = localStorage.getItem(LOCAL_LIST_OF_TODOS);
const listOfTodos = localListOfTodos != null ? JSON.parse(localListOfTodos) : [];

console.log('> Initial value -> listOfTodos', listOfTodos);

renderTodoListInContainer(listOfTodos, domListOfTodos);

function onBtnCreateTodoClick(event) {
  console.log('> domBtnCreateTodo -> handle(click)', event);
  const todoTitleValueFromDomInput = domInpTodoTitle.value;
  if (validateTodoInputTitleValue(todoTitleValueFromDomInput)) {
    listOfTodos.push(createTodoVO(todoTitleValueFromDomInput));
    localStorage.setItem('LOCAL_LIST_OF_TODOS', JSON.stringify(listOfTodos));
    renderTodoListInContainer(listOfTodos, domListOfTodos);
  }
  console.log('> domBtnCreateTodo -> todoInputTitleValue:', todoTitleValueFromDomInput);

  const canCreateTodo = validateTodoInputTitleValue(todoTitleValueFromDomInput);

  //  if (canCreateTodo) {
  //    const todoVO = createTodoVO(todoTitleValueFromDomInput);
  //    listOfTodos.push(todoVO);
  //    renderTodoListInContainer(listOfTodos, domListOfTodos);
}

function validateTodoInputTitleValue(value) {
  const isInputValueString = typeof value === 'string';
  const isInputValueNotNumber = isNaN(parseInt(value));
  const result = isInputValueString && isInputValueNotNumber && value.length > 0;
  console.log('> validateTodoInputTitleValue -> result', {
    result,
    isInputValueString,
    isInputValueNotNumber,
  });
  return result;
}
function renderTodoListInContainer(list, container) {
  let output = '';
  for (let index in list) {
    output += `<li>${list[index].title}</li>`;
  }
  container.innerHTML = output;
}
function createTodoVO(title) {
  const todoId = Date.now().toString();
  //const todoVO = new TodoVO(todoId, title);
  return new TodoVO(todoId, title);
}
