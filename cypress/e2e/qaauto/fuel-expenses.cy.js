
function appVisit() {
  cy.visit('/', {
    auth: { username: Cypress.env('basicUser'), password: Cypress.env('basicPass') }
  });
}

function loginViaUI(email = Cypress.env('email'), password = Cypress.env('password')) {
  expect(email, 'env.email must be set').to.be.a('string').and.not.be.empty;
  expect(password, 'env.password must be set').to.be.a('string').and.not.be.empty;

  cy.contains(/sign in/i).click();
  cy.get('div.modal-content').within(() => {
    cy.get('input[name="email"]').clear().type(email);
    cy.get('input[name="password"]').clear().type(password);
    cy.contains(/login/i).click();
  });
  cy.contains(/garage|my garage|vehicles|logout/i, { timeout: 10000 }).should('be.visible');
}

function ensureLoggedIn() {
  const key = [Cypress.env('email'), Cypress.env('password')];

  cy.session(key, () => {
    appVisit();
    loginViaUI();
  }, { cacheAcrossSpecs: true });
  appVisit();
}


describe('Fuel expenses', () => {
  beforeEach(() => {
    ensureLoggedIn();
  });

  it('open fuel expenses', () => {
    cy.contains(/fuel expenses|fuel/i).click();
    cy.contains(/fuel expenses|fuel/i).should('be.visible');
  });

  it('Edit fuel expense', () => {
    cy.contains(/fuel expenses|fuel/i).click();
    cy.contains('button', 'Add an expense').click();
    cy.get('.modal-content').within(() => {
      cy.get('input[name="mileage"]').clear().type('135');
      cy.get('input[name="liters"]').clear().type('10');
      cy.get('input[name="totalCost"]').clear().type('100');
      cy.get('button.btn.btn-primary').click();
    });
    cy.contains('td', '135').should('be.visible');
  });

  it('Edit mileage', () => {
    cy.contains(/fuel expenses|fuel/i).click();
    cy.get('table.expenses_table tbody tr')
      .first()
      .find('button.btn.btn-edit')
      .click({ force: true });
    cy.get('.modal-content').within(() => {
      cy.get('input[name="mileage"]').clear().type('2');
      cy.get('button.btn.btn-primary').click();
    });
    cy.contains('td', '2').should('be.visible');
  });


  it('incorrect date', () => {
    cy.contains(/fuel expenses|fuel/i).click();
    cy.contains(/fuel expenses|fuel/i).should('be.visible');
    cy.get('table.expenses_table tbody tr')
      .first()
      .find('button.btn.btn-edit')
      .click({ force: true });
      cy.get('input[name="reportedAt"]').clear().type('05.10.2025');
      cy.get('.modal-content').within(() => {
      cy.get('button.btn.btn-primary').click();
      });
      cy.get('p.alert.alert-danger').should('be.visible');
  });


  it('Skip all cells', () => {
    cy.contains(/fuel expenses|fuel/i).click();
    cy.contains(/fuel expenses|fuel/i).should('be.visible');
    cy.get('table.expenses_table tbody tr')
      .first()
      .find('button.btn.btn-edit')
      .click({ force: true });
      cy.get('input[name="reportedAt"]').clear().focus().blur();
      cy.get('input[name="mileage"]').clear().focus().blur();
      cy.contains('.invalid-feedback', 'Mileage required').should('be.visible');
      cy.get('input[name="liters"]').clear().focus().blur();
      cy.contains('.invalid-feedback', 'Liters required').should('be.visible');
      cy.get('input[name="totalCost"]').clear().focus().blur();
      cy.contains('.invalid-feedback', 'Total cost required').should('be.visible');
      cy.get('button.btn.btn-primary').should('be.disabled');     
  });

  it('Border color of liters', () => {
    cy.contains(/fuel expenses|fuel/i).click();
    cy.contains(/fuel expenses|fuel/i).should('be.visible');
    cy.get('table.expenses_table tbody tr')
      .first()
      .find('button.btn.btn-edit')
      .click({ force: true });
      cy.get('input[name="liters"]').clear().focus().blur();
      cy.get('input[name="liters"]').should('have.class', 'ng-invalid');
      cy.get('input[name="liters"]').should('have.css', 'border-color', 'rgb(220, 53, 69)');
  })

  it('Negative liters', () => {
    cy.contains(/fuel expenses|fuel/i).click();
    cy.contains(/fuel expenses|fuel/i).should('be.visible');
    cy.get('table.expenses_table tbody tr')
      .first()
      .find('button.btn.btn-edit')
      .click({ force: true });
      cy.get('input[name="liters"]').clear().type('-1');
      cy.get('button.btn.btn-primary').should('be.disabled');
  })

});
