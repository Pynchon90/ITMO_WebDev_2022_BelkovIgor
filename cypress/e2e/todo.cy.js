describe('Test - todo creation', () => {
  before(() => {});
  it('enter index page enter todo text and press create', () => {
    const TEST_INITIAL_INPUT_TEXT = '123';

    cy.visit('http://localhost:8888/');
    cy.get('#inpTodoTitle').should('exist');
    cy.get('#inpTodoTitle').should('contain.text', '');
  });
});
