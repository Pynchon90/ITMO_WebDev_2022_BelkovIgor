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
    cy.visit('http://localhost:8888/');
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
});
