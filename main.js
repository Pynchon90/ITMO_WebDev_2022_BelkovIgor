import TodoVO from './src/model/VOS/TodoVO.js';

const domInpTodoTitle = document.getElementById('inpTodoTitle');
const domBtnCreateTodo = document.getElementById('btnCreateTodo');
const domListOfTodos = document.getElementById('listOfTodos');

domBtnCreateTodo.addEventListener('click', onBtnCreateTodoClick);
domBtnCreateTodo.addEventListener('keyup', onInpTodoTitleKeyup);

const LOCAL_LIST_OF_TODOS = 'listOfTodos';

const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);

console.log('> Initial value -> listOfTodos', listOfTodos);

renderTodoListInContainer(listOfTodos, domListOfTodos);
disableButtonWhenTextInvalid(domBtnCreateTodo, domInpTodoTitle.value, isStringNotNumberAndNotEmpty);

function onBtnCreateTodoClick(event) {
  //console.log('> domBtnCreateTodo -> handle(click)', event);
  const todoTitleValueFromDomInput = domInpTodoTitle.value;
  if (isStringNotNumberAndNotEmpty(todoTitleValueFromDomInput)) {
    listOfTodos.push(TodoVO.createFromTitle(todoTitleValueFromDomInput));
    localStorage.setItem('LOCAL_LIST_OF_TODOS', JSON.stringify(listOfTodos));
    renderTodoListInContainer(listOfTodos, domListOfTodos);
  }
  //console.log('> domBtnCreateTodo -> todoInputTitleValue:', todoTitleValueFromDomInput);

  //const canCreateTodo = validateTodoInputTitleValue(todoTitleValueFromDomInput);
}

function onInpTodoTitleKeyup(event) {
  console.log('> onInpTodoTitleKeyup', event);
  const inputValue = event.currentTarget.value;
  console.log('> inputValue', inputValue);
  disableButtonWhenTextInvalid(domBtnCreateTodo, domInpTodoTitle.value, isStringNotNumberAndNotEmpty());
}

function isStringNotNumberAndNotEmpty(value) {
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

function localStorageListOf(key) {
  const value = localStorage.getItem(key);
  console.log('> localStorageListOf: value = ', value);
  if (value == null) return [];
  const parsedValue = JSON.parse(value);
  const isParsedValueArray = Array.isArray(parsedValue);
  //const isValueArray = value != null && Array.isArray(value);
  return isParsedValueArray ? parsedValue : [];
}

function disableButtonWhenTextInvalid(button, text, validateTextFunction, TextWhenDisabled, TextWhenEnabled) {
  if (!validateTextFunction) throw new Error('Validate method must be defined');
  if (isStringNotNumberAndNotEmpty(text)) {
    button.disabled = false;
    button.textContent = 'Create';
  } else {
    button.disabled = true;
    button.textContent = 'Enter text';
  }
}
function renderTodoListInContainer(list, container) {
  let output = '';
  for (let index in list) {
    output += `<li>${list[index].title}</li>`;
  }
  container.innerHTML = output;
}
