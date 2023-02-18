describe('Login Form', () => {
  const email = 'phil@test.de';
  const unkwownEmail = 'unknown@test.de';
  const password = '123456';
  const incorrectPassword = '1234567';

  beforeEach(() => {
    cy.logout();
    cy.visit('/login');
  });

  it('submit button should be disabled until email and password are filled out', () => {
    cy.get('ion-button[type="submit"]').should('have.attr', 'disabled');
    cy.get('ion-input[id="email"]').type(email);
    cy.get('ion-button[type="submit"]').should('have.attr', 'disabled');
    cy.get('ion-input[id="password"]').type(password);
    cy.get('ion-button[type="submit"]').should('not.have.attr', 'disabled');
  });

  it('should be possible to login', () => {
    cy.get('ion-input[id="email"]').type(email);
    cy.get('ion-input[id="password"]').type(password);
    cy.get('ion-button[type="submit"]').click();
    cy.url().should('include', '/');
  });

  it('should not be possible to login with an unknown email', () => {
    cy.get('ion-input[id="email"]').type(unkwownEmail);
    cy.get('ion-input[id="password"]').type(password);
    cy.get('ion-button[type="submit"]').click();
    cy.url().should('include', '/login');
    cy.get('ion-note[id="authError"').should('be.visible');
  });

  it('should not be possible to login with an incorrect password', () => {
    cy.get('ion-input[id="email"]').type(email);
    cy.get('ion-input[id="password"]').type(incorrectPassword);
    cy.get('ion-button[type="submit"]').click();
    cy.url().should('include', '/login');
    cy.get('ion-note[id="authError"').should('be.visible');
  });
});
