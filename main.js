import TodoVO from './src/model/VOS/TodoVO.js';
import { disableButtonWhenTextInvalid } from './src/utils/domUtils.js';
import { isStringNotNumberAndNotEmpty } from './src/utils/stringUtils.js';
import { localStorageListOf } from './src/utils/databaseUtils.js';
import TodoView from './src/view/TodoView.js';

const domInpTodoTitle = document.getElementById('inpTodoTitle');
const domBtnCreateTodo = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');

domBtnCreateTodo.addEventListener('click', onBtnCreateTodoClick);
domBtnCreateTodo.addEventListener('keyup', onInpTodoTitleKeyup);

const LOCAL_LIST_OF_TODOS = 'listOfTodos';

const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);

console.log('> Initial value -> listOfTodos', listOfTodos);

renderTodoListInContainer(listOfTodos, domListOfTodos);
disableButtonWhenTextInvalid(domBtnCreateTodo, domInpTodoTitle.value, isStringNotNumberAndNotEmpty, {
  textWhenEnabled: 'Create',
  textWhenDisabled: 'Enter text',
});

function onBtnCreateTodoClick(event) {
  const todoTitleValueFromDomInput = domInpTodoTitle.value;

  if (isStringNotNumberAndNotEmpty(todoTitleValueFromDomInput)) {
    listOfTodos.push(TodoVO.createFromTitle(todoTitleValueFromDomInput));
    localStorage.setItem(LOCAL_LIST_OF_TODOS, JSON.stringify(listOfTodos));
    renderTodoListInContainer(listOfTodos, domListOfTodos);
    domInpTodoTitle.value = '';
  }
}
function validateTodoInputTitleValue(value) {
  const isInputValueString = typeof value === 'string';
  const isInputValeNotNumber = isNaN(parseInt(value));
}

function onInpTodoTitleKeyup(event) {
  console.log('> onInpTodoTitleKeyup', event);
  const inputValue = event.currentTarget.value;
  console.log('> inputValue', inputValue);
  disableButtonWhenTextInvalid(domBtnCreateTodo, inputValue, isStringNotNumberAndNotEmpty);
}

function renderTodoListInContainer(listOfTodoVO, container) {
  let output = '';
  let todoVO;
  for (let index in listOfTodoVO) {
    todoVO = listOfTodoVO[index];
    output += TodoView.createSimpleViewFromVO(index, todoVO);
  }
  container.innerHTML = output;
}
