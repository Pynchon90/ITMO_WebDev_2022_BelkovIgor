const domInpFirstName = document.getElementById('inpFirstName');
const domInpLastName = document.getElementById('inpLastName');

domInpFirstName.addEventListener('keyup', onInpFirstNameKeyup);
domInpLastName.addEventListener('keyup', onInpLastNameKeyup);
//domListOfTodos.addEventListener('change', onTodoListChange);

const LOCAL_LIST_OF_TODOS = 'listOfTodos';
const LOCAL_INPUT_TEXT = 'inputText';

const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);

/*console.log('> Initial value -> listOfTodos');
domInpTodoTitle.value = localStorage.getItem(LOCAL_INPUT_TEXT);
renderTodoListInContainer(listOfTodos, domListOfTodos);*/

renderFullName(domInpFirstName);
renderFullName(domInpLastName);

/*disableOrEnableCreateTodoButtonOnTodoInputTitle();*/

/*function onTodoDomItemClicked(event) {
  const domElement = event.target;
  const target = event.target;
  console.log('> onTodoDomItemClicked click -> dataset:', target.dataset);
  if (domElement.dataset['type'] !== TodoView.TODO_VIEW_ITEM) return;

  const SELECTED_ITEM_BACKGROUND_KEY = 'lightgray';

  function validateTodoItemById(vo) {
    return vo.id === todoId;
  }
  const todoId = target.id;
  const todoVO = listOfTodos.find(validateTodoItemById);

  const isSelected = target.style.backgroundColor === SELECTED_ITEM_BACKGROUND_KEY;

  if (isSelected) {
    target.style.backgroundColor = '';
  } else {
    target.style.backgroundColor = SELECTED_ITEM_BACKGROUND_KEY;
  }
}

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
    //if (selectedTodoVO){
    //  selectedTodoVO.title = todoTitleValueFromDomInput;
    //  resetSelectedTodo();
    //}
    //else{
    //  createTodoFromTextAndAddToListThenSave(todoTitleValueFromDomInput, listOfTodos);
    //  clearInputTextAndLocalStorage();
    //}
    createTodoFromTextAndAddToListThenSave(todoTitleValueFromDomInput);
    saveListOfTodo();
    setInputTextValueAndStoreToLocalStorage();
    renderTodoListInContainer(listOfTodos, domListOfTodos);
    disableOrEnableCreateTodoButtonOnTodoInputTitle();
  }
}*/
//function validateTodoInputTitleValue(value) {
//  const isInputValueString = typeof value === 'string';
//  const isInputValeNotNumber = isNaN(parseInt(value));
//}

function onInpFirstNameKeyup(event) {
  console.log('> onInpTodoTitleKeyup', event);
  const inputValue = event.currentTarget.value;
  console.log('> inputValue', inputValue);
  localStorage.setItem(LOCAL_INPUT_TEXT, inputValue);
  renderTodoListInContainer(inputValue, domInpFirstName);
}

function onInpLastNameKeyup(event) {
  console.log('> onInpTodoTitleKeyup', event);
  const inputValue = event.currentTarget.value;
  console.log('> inputValue', inputValue);
  localStorage.setItem(LOCAL_INPUT_TEXT, inputValue);
}

class NameView {
  static NAME_VIEW_ITEM = 'Name';
  static createSimpleViewFromVO(vo) {
    return `
            <div 
            style="user-select: none; width: 100%;"
            data-type="${NameView.NAME_VIEW_ITEM}"
            id="${vo.id}"
            >
                ${vo.title}
                </div>
           `;
  }
}
function renderFullName(name, container) {
  let output = '';
  let todoVO;
  todoVO = name;
  output += NameView.createSimpleViewFromVO(name);
  container.innerHTML = output;
}

/*function renderTodoListInContainer(listOfTodoVO, container) {
  let output = '';
  let todoVO;
  for (let index in listOfTodoVO) {
    todoVO = listOfTodoVO[index];
    output += TodoView.createSimpleViewFromVO(index, todoVO);
  }
  container.innerHTML = output;
}*/

/*
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
*/
