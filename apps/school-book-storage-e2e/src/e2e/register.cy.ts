describe('Login Form', () => {
  const email = 'e2e@test.de';

  beforeEach(() => {
    cy.visit('/register');
  });

  it('submit button should be disabled until email and password are filled out', () => {
    cy.get('ion-button[type="submit"]').should('have.attr', 'disabled');
    cy.get('ion-input[id="displayName"]').type('E2E Test User');
    cy.get('ion-button[type="submit"]').should('have.attr', 'disabled');
    cy.get('ion-input[id="email"]').type(email);
    cy.get('ion-button[type="submit"]').should('have.attr', 'disabled');
    cy.get('ion-input[id="password"]').type('123456');
    cy.get('ion-button[type="submit"]').should('have.attr', 'disabled');
    cy.get('ion-input[id="confirmPassword"]').type('123456');
    cy.get('ion-button[type="submit"]').should('not.have.attr', 'disabled');
  });

  it('should be able to login with the new user', () => {
    cy.get('ion-input[id="displayName"]').type('E2E Test User');
    cy.get('ion-input[id="email"]').type(email);
    cy.get('ion-input[id="password"]').type('123456');
    cy.get('ion-input[id="confirmPassword"]').type('123456');
    cy.get('ion-button[type="submit"]').click();
    cy.url().should('include', '/');
    cy.exec('node ./src/support/cleanupFirebase.js', {
      env: { email },
    });
  });

  it('should not be able to register with an existing email', () => {
    cy.get('ion-input[id="displayName"]').type('E2E Test User');
    cy.get('ion-input[id="email"]').type('test@test.de');
    cy.get('ion-input[id="password"]').type('123456');
    cy.get('ion-input[id="confirmPassword"]').type('123456');
    cy.get('ion-button[type="submit"]').click();
    cy.url().should('include', '/register');
    cy.get('ion-note[id="authError"').should('be.visible');
  });

  it('should not be able to register with a passwords not matching', () => {
    cy.get('ion-input[id="displayName"]').type('E2E Test User');
    cy.get('ion-input[id="email"]').type(email);
    cy.get('ion-input[id="password"]').type('123456');
    cy.get('ion-input[id="confirmPassword"]').type('1234567');
    cy.get('ion-button[type="submit"]').should('have.attr', 'disabled');
    cy.get('ion-note[id="passwordsDontMatch"').should('be.visible');
  });
});
