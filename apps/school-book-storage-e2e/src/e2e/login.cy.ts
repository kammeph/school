describe('Login Form', () => {
  it('submit button should be disabled until email and password are filled out', () => {
    cy.logout();
    cy.visit('/login');
    cy.get('ion-button[type="submit"]').should('have.attr', 'disabled');
    cy.get('ion-input[id="email"]').type('phil@test.de');
    cy.get('ion-button[type="submit"]').should('have.attr', 'disabled');
    cy.get('ion-input[id="password"]').type('123456');
    cy.get('ion-button[type="submit"]').should('not.have.attr', 'disabled');
    cy.get('ion-button[type="submit"]').click();
    cy.url().should('include', '/');
  });
});
