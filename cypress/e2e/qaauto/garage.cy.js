
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

describe('manage cars', () => {
  beforeEach(() => {
    ensureLoggedIn();
  });

  it('Adding car', () => {

    cy.contains(/garage|my garage/i).click();
    cy.contains('button', /add car/i).click();
    cy.get('select[name="carBrand"], select[name="carBrandId"]').select('BMW');
    cy.get('select[name="carModelId"], select[name="carModel"]').select('X5');
    cy.get('input[name="mileage"]').clear().type('12345');
    cy.get('.modal-content').within(() => {
      cy.get('button.btn.btn-primary').click();
    });
  });

  it('Updating car', () => {
    cy.contains(/garage|my garage/i).click();
    cy.get('.car.jumbotron').first().find('button.car_edit').click();
    cy.get('select[name="carBrand"], select[name="carBrandId"]').select('Porsche');
    cy.get('select[name="carModelId"], select[name="carModel"]').select('Panamera');
    cy.get('input[name="mileage"]').clear().type('34567');
    cy.get('input[name="carCreatedAt"]').clear().type('25.11.2025');
    cy.get('.modal-content').within(() => {
    cy.get('button.btn.btn-primary').click();
    });
  });

  it('Update mileage', () => {
    cy.contains(/garage|my garage/i).click();
    cy.get('input[name="miles"]').clear().type('484848');
    cy.contains('button', 'Update').should('be.enabled').click();  
  });


    it('Skip mileage', () => {
      cy.contains(/garage|my garage/i).click();
      cy.get('.car.jumbotron').first().find('button.car_edit').click();
      cy.get('select[name="carBrand"], select[name="carBrandId"]').select('Porsche');
      cy.get('select[name="carModelId"], select[name="carModel"]').select('Panamera');
      cy.get('input[name="mileage"]').clear().focus().blur();
      cy.contains('.invalid-feedback', 'Mileage cost required').should('be.visible');
    });


    it('Incorrect mileage', () => {
      cy.contains(/garage|my garage/i).click();
      cy.get('.car.jumbotron').first().find('button.car_edit').click();
      cy.get('select[name="carBrand"], select[name="carBrandId"]').select('Porsche');
      cy.get('select[name="carModelId"], select[name="carModel"]').select('Panamera');
      cy.get('input[name="mileage"]').clear().type('99999999').blur();
      cy.contains('.invalid-feedback', 'Mileage has to be from 0 to 999999').should('be.visible');
    });

    it('Remove car', () => {
      cy.contains(/garage|my garage/i).click();
      cy.get('.car.jumbotron').first().find('button.car_edit').click();
      cy.contains('button', 'Remove car').click();
      cy.contains('button', 'Remove').click();
  });

    it('Adding car for next test', () => {
      cy.contains(/garage|my garage/i).click();
      cy.contains('button', /add car/i).click();
      cy.get('select[name="carBrand"], select[name="carBrandId"]').select('BMW');
      cy.get('select[name="carModelId"], select[name="carModel"]').select('X5');
      cy.get('input[name="mileage"]').clear().type('123');
      cy.get('.modal-content').within(() => {
        cy.get('button.btn.btn-primary').click();
      });
    });
});


