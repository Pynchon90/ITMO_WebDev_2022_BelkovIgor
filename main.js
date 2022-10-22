import TodoVO from './src/model/VOS/TodoVO.js';
import { disableButtonWhenTextInvalid } from './src/utils/domUtils.js';
import { isStringNotNumberAndNotEmpty } from './src/utils/stringUtils.js';
import { localStorageListOf, localStorageSaveListOfWithKey } from './src/utils/databaseUtils.js';
import TodoView from './src/view/TodoView.js';

const domInpTodoTitle = document.getElementById('inpTodoTitle');
const domBtnCreateTodo = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');

domBtnCreateTodo.addEventListener('click', onBtnCreateTodoClick);
domBtnCreateTodo.addEventListener('keyup', onInpTodoTitleKeyup);
domListOfTodos.addEventListener('change', onTodoListChange);

const LOCAL_LIST_OF_TODOS = 'listOfTodos';
const LOCAL_INPUT_TEXT = 'inputText';

const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);

console.log('> Initial value -> listOfTodos', listOfTodos);
domInpTodoTitle.value = localStorage.getItem(LOCAL_INPUT_TEXT);
renderTodoListInContainer(listOfTodos, domListOfTodos);
disableOrEnableCreateTodoButtonOnTodoInputTitle();

function onTodoListChange(event) {
  console.log('> onTodoListChange -> event', event);
  const target = event.target;
  const index = target.id;
  if (index) {
    const indexInt = parseInt(index.trim());
    const todoVO = listOfTodos[indexInt];
    console.log('> onTodoListChange -> todoVO', indexInt, todoVO);
    todoVO.isCompleted = !todoVO.isCompleted;
    saveListOfTodo();
  }
}

function onBtnCreateTodoClick() {
  const todoTitleValueFromDomInput = domInpTodoTitle.value;

  if (isStringNotNumberAndNotEmpty(todoTitleValueFromDomInput)) {
    createTodoFromTextAndAddToListThenSave(todoTitleValueFromDomInput);
    saveListOfTodo();
    setInputTextValueAndStoreToLocalStorage();
    renderTodoListInContainer(listOfTodos, domListOfTodos);
    disableOrEnableCreateTodoButtonOnTodoInputTitle();
  }
}
//function validateTodoInputTitleValue(value) {
//  const isInputValueString = typeof value === 'string';
//  const isInputValeNotNumber = isNaN(parseInt(value));
//}

function onInpTodoTitleKeyup(event) {
  console.log('> onInpTodoTitleKeyup', event);
  const inputValue = event.currentTarget.value;
  console.log('> inputValue', inputValue);
  disableOrEnableCreateTodoButtonOnTodoInputTitle();
  localStorage.setItem(LOCAL_INPUT_TEXT, inputValue);
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

function createTodoFromTextAndAddToListThenSave(input) {
  listOfTodos.push(TodoVO.createFromTitle(input));
}
function setInputTextValueAndStoreToLocalStorage(clearToText = '') {
  domInpTodoTitle.value = '';
  localStorage.setItem(LOCAL_INPUT_TEXT, clearToText);
}

function disableOrEnableCreateTodoButtonOnTodoInputTitle() {
  disableButtonWhenTextInvalid(domBtnCreateTodo, domInpTodoTitle.value, isStringNotNumberAndNotEmpty);
}

function saveListOfTodo() {
  localStorageSaveListOfWithKey(LOCAL_LIST_OF_TODOS, listOfTodos);
}
