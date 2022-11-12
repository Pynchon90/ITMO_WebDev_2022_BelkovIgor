import Dom from '../../src/consts/dom.js';

const createTodo = (text) => {
  cy.get(`#${Dom.INP_TODO_TITLE}`).type(text);
  cy.get(`#${Dom.BTN_CREATE_TODO}`).click();
};

describe('Test - todo creation', () => {
  before(() => {});
  it('enter todo text as number and press create', () => {
    cy.visit('http://localhost:8888/');
    cy.get('#inpTodoTitle').type('123');
    cy.get('#btnCreateTodo').should('be.disabled');
    cy.get('#inpTodoTitle').clear();
  });
  it('enter index page enter todo text and press create', () => {
    const TEST_INITIAL_INPUT_TEXT = '123';
    const TEST_TODO_TEXT = 'New Todo';
    cy.checkInputExistAndEmpty();

    cy.get('#inpTodoTitle').type(TEST_TODO_TEXT);
    cy.get('#btnCreateTodo').click();
    cy.get('#inpTodoTitle').should('exist');
    cy.get('#inpTodoTitle').should('contain.text', '');

    const todoListChildren = cy.get('#listOfTodos').children();
    todoListChildren.should('exist').should('have.length', 1);
    todoListChildren.first().should('contain.text', TEST_TODO_TEXT);
    cy.get('#listOfTodos > li > input[type="checkbox"]').should('exist').should('have.length', 1);
    cy.reload(true);
  });

  it('create todo and validate selection rules', () => {
    ['Todo 1', 'Todo 2'].forEach(createTodo);

    cy.get(`#${Dom.INP_TODO_TITLE}`).clear();

    const clickOnListItemAndCheckInputValueFromFunctionCall = (listItemIndex, getCompareValue) =>
      cy
        .get(`#${Dom.LIST_OF_TODOS}`)
        .children()
        .eq(listItemIndex)
        .click()
        .then(($child) => {
          cy.get(`#${Dom.INP_TODO_TITLE}`).should('have.value', getCompareValue($child));
        });

    const getTextFromTodoItemDomElement = ($child) => $child.text().trim();

    clickOnListItemAndCheckInputValueFromFunctionCall(0, getTextFromTodoItemDomElement)
      .then(() => {
        clickOnListItemAndCheckInputValueFromFunctionCall(0, () => '');
      })
      .then(() => {
        clickOnListItemAndCheckInputValueFromFunctionCall(1, getTextFromTodoItemDomElement);
      });
    /*let selectedTodoText = '';
    const todoListChildren = cy.get(`#${Dom.LIST_OF_TODOS}`).children();
    todoListChildren.eq(0).then(($child) => {
      selectedTodoText = $child.text().trim();
    });
    todoListChildren.eq(0).click();
    cy.get(`#${Dom.INP_TODO_TITLE}`).then(($input) => {
      const inputValue = $input.val();
      expect(inputValue).equal(selectedTodoText);*/

    /* cy.wrap($child).click();
    console.log('> $child.text: ', $child.text().trim());
    const todoText = $child.text().trim();
    cy.get(`#${Dom.INP_TODO_TITLE}`);*/
    /*
    firstChild.click();
    cy.get(`#${Dom.INP_TODO_TITLE}`).should('have.text', firstChild.innerText);*/
  });
});
