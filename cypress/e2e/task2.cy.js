const auth = require('../support/pom/auth.page');

describe('Profile - intercept name -> Polar Bear', () => {
  beforeEach(() => {
    auth.ensureLoggedIn();
  });

  it('shows "Polar Bear" after intercepting /api/users/profile', () => {
    cy.intercept('GET', '**/api/users/profile', (req) => {
      req.reply((res) => {
        if (res.body && res.body.data) {
          res.body.data.name = 'Polar';
          res.body.data.lastName = 'Bear';
        }
      });
    }).as('getUser');
    cy.visit('/panel/profile', {
      auth: { username: Cypress.env('basicUser'), password: Cypress.env('basicPass') }
    });
    cy.wait('@getUser', { timeout: 15000 });
    cy.contains('Polar Bear').should('be.visible');              
  });
});