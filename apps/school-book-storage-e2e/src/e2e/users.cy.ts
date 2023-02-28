// go to the route /users and check if one or more users are displayed
describe('Users', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/app/users');
  });

  it('should display users', () => {
    cy.get('app-user-list').should('exist');
    cy.get('app-user-list mat-list-item').should('have.length.greaterThan', 0);
  });
});
