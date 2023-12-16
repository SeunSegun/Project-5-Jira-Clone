describe('Issue deletion test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
    cy.visit(url + '/board');
    //Find the specific issue
    cy.contains('This is an issue of type: Task.').click()
    });
  });

//Issue Deletion

  it('Test Case 1: Issue Delete', () => {
  //Find the icon to delete issue
  cy.get('[data-testid="icon:trash"]').click()
  //Confirmation window is visible
  cy.get('[data-testid="modal:confirm"]').should("be.visible")
  //Confirm to delete
  cy.contains('Delete issue').click()
  //Issue is deleted
  cy.contains("This is an issue of type: Task.").should("not.exist")
  //Assert that the issue is deleted and no longer displayed on the Jira board
  cy.reload()
  cy.contains('This is an issue of type: Task.').should('not.exist');
});

//Issue Cancellation

it.only('Test Case 2: Cancel the deletion process', () => {
  //Find the icon to delete issue
  cy.get('[data-testid="icon:trash"]').click()
  //Confirmation window is visible
  cy.get('[data-testid="modal:confirm"]').should("be.visible")
  //Cancel the deletion
  cy.contains('Cancel').click()
  cy.get('[data-testid="modal:issue-details"]').click();
  //Click the close button to close the window
  cy.get('[data-testid="icon:close"]').eq(0).click();

  //Assert that issue is visble on the Jira board after reload
  cy.reload()
  cy.contains('This is an issue of type: Task.').should('exist');
});
   });