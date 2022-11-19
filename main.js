import TodoVO from './src/model/VOS/TodoVO.js';
import { disableButtonWhenTextInvalid } from './src/utils/domUtils.js';
import { isStringNotNumberAndNotEmpty } from './src/utils/stringUtils.js';
import { localStorageListOf, localStorageSaveListOfWithKey } from './src/utils/databaseUtils.js';
import TodoView from './src/view/TodoView.js';
import ServerService from './src/services/ServerService.js';

const $ = document.getElementById.bind(document);

const domInpTodoTitle = $('inpTodoTitle');
const domBtnCreateTodo = $('btnCreateTodo');
const domListOfTodos = $('listOfTodos');

let selectedTodoVO = null;
let selectedTodoDom = null;
const hasSelectedTodo = () => !!selectedTodoVO;

const debug = console.log;
console.log = (...args) => {
  if (import.meta.env.DEV) debug(...args);
};

let listOfTodos = [];
const serverService = new ServerService(import.meta.env.VITE_DATA_SERVER);
serverService.requestTodos().then((todoList) => {
  $('app').style.visibility = 'visible';
});

domBtnCreateTodo.addEventListener('click', onBtnCreateTodoClick);
domInpTodoTitle.addEventListener('keyup', onInpTodoTitleKeyup);
domListOfTodos.addEventListener('change', onTodoListChange);
domListOfTodos.addEventListener('click', onTodoDomItemClicked);

const LOCAL_LIST_OF_TODOS = 'listOfTodos';
const LOCAL_INPUT_TEXT = 'inputText';

const listOfTodos = localStorageListOf(LOCAL_LIST_OF_TODOS);

console.log('> Initial value -> listOfTodos', listOfTodos);

domInpTodoTitle.value = localStorage.getItem(LOCAL_INPUT_TEXT);
render_TodoListInContainer(listOfTodos, domListOfTodos);
disableOrEnable_CreateTodoButtonOnTodoInputTitle();

function onTodoDomItemClicked(event) {
  const domElement = event.target;
  // console.log('> onTodoDomItemClicked click -> dataset:', target.dataset);
  const isNotTypeViewItem = domElement.dataset['type'] !== TodoView.TODO_VIEW_ITEM;
  if (!TodoView.isDomElementMatch(domElement)) return;
  const todoId = domElement.id;
  const currentTodoVO = listOfTodos.find((vo) => vo.id === domElement.id);
  const isCurrentTodoSelected = selectedTodoVO === currentTodoVO;

  if (hasSelectedTodo()) resetSelectedTodo();
  /*domInpTodoTitle.value = '';
    selectedTodoDom.style.backgroundColor = '';
    domBtnCreateTodo.innerText = 'Create';
    selectedTodoDom = null;
    selectedTodoVO = null;*/

  if (!isCurrentTodoSelected) {
    selectedTodoVO = currentTodoVO;
    selectedTodoDom = domElement;
    domBtnCreateTodo.innerText = 'Update';
    domInpTodoTitle.value = currentTodoVO.title;
    selectedTodoDom.style.backgroundColor = 'lightgray';
    onInpTodoTitleKeyup();
  }
}

function onTodoListChange(event) {
  console.log('> onTodoListChange -> event:', event);
  const target = event.target;
  const index = target.id;
  if (index && typeof index === 'string') {
    const indexInt = parseInt(index.trim());
    const todoVO = listOfTodos[indexInt];
    console.log('> onTodoListChange -> todoVO:', indexInt, todoVO);
    todoVO.isCompleted = !!target.checked;
    save_ListOfTodo();
  }
}

async function onBtnCreateTodoClick(event) {
  // console.log('> domBtnCreateTodo -> handle(click)', this.attributes);
  const todoTitle_Value_FromDomInput = domInpTodoTitle.value;
  // console.log('> domBtnCreateTodo -> todoInputTitleValue:', todoTitleValueFromDomInput);

  const isStringValid = isStringNotNumberAndNotEmpty(todoTitle_Value_FromDomInput);

  if (isStringValid) {
    /* const result = await delay(1000)
      .then((param) => {
        console.log('>delay -> then:data, param');
        return param ? param * 2 : 0;
      })
      .then((param) => {
        console.log('>delay -> then:data 2, param');
        return `time = ${param}`;
      });
    console.log('> result -> result', result);*/
    //delay(1000).then(() => {
    create_TodoFromTextAndAddToList(todoTitle_Value_FromDomInput, listOfTodos);
    clear_InputTextAndLocalStorage();
    save_ListOfTodo();
    render_TodoListInContainer(listOfTodos, domListOfTodos);
    disableOrEnable_CreateTodoButtonOnTodoInputTitle();
    //});
  }
}

function onInpTodoTitleKeyup() {
  // console.log('> onInpTodoTitleKeyup:', event);
  const inputValue = domInpTodoTitle.value;
  // console.log('> onInpTodoTitleKeyup:', inputValue);
  if (hasSelectedTodo()) {
    disableOrEnable_CreateTodoButtonOnTodoInputTitle(() => {
      return isStringNotNumberAndNotEmpty(inputValue) && selectedTodoVO.title !== inputValue;
    });
  } else {
    localStorage.setItem(LOCAL_INPUT_TEXT, inputValue);
    disableOrEnable_CreateTodoButtonOnTodoInputTitle();
  }
}

function render_TodoListInContainer(listOfTodoVO, container) {
  let output = '';
  let todoVO;
  for (let index in listOfTodoVO) {
    todoVO = listOfTodoVO[index];
    output += TodoView.createSimpleViewFromVO(index, todoVO);
  }
  container.innerHTML = output;
}

function resetSelectedTodo() {
  console.log('> resetSelectedTodo -> selectedTodoVO:', selectedTodoVO);
  domBtnCreateTodo.innerText = 'Create';
  domInpTodoTitle.value = localStorage.getItem(LOCAL_INPUT_TEXT);
  if (selectedTodoDom) selectedTodoDom.style.backgroundColor = '';
  selectedTodoVO = null;
  selectedTodoDom = null;
  disableOrEnable_CreateTodoButtonOnTodoInputTitle();
}

function create_TodoFromTextAndAddToList(input, listOfTodos) {
  console.log('> create_TodoFromTextAndAddToList -> input =', input);
  listOfTodos.push(TodoVO.createFromTitle(input));
}

function clear_InputTextAndLocalStorage() {
  domInpTodoTitle.value = '';
  localStorage.removeItem(LOCAL_INPUT_TEXT);
}

function disableOrEnable_CreateTodoButtonOnTodoInputTitle(validateInputMethod = isStringNotNumberAndNotEmpty) {
  console.log('> disableOrEnableCreateTodoButtonOnTodoInputTitle -> domInpTodoTitle.value =', domInpTodoTitle.value);
  const textToValidate = domInpTodoTitle.value;
  disableButtonWhenTextInvalid(domBtnCreateTodo, textToValidate, validateInputMethod);
}

function save_ListOfTodo() {
  localStorageSaveListOfWithKey(LOCAL_LIST_OF_TODOS, listOfTodos);
}
