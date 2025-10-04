const auth = require('../../support/pom/auth.page');
const garage = require('../../support/pom/garage.page');
const fuel = require('../../support/pom/fuel-expenses.page');
const expenseModal = require('../../support/pom/expense.modal');

describe('Fuel expenses (POM)', () => {
  before(() => {
    auth.ensureLoggedIn();
    garage.ensureAtLeastOneCar();   // незалежність від Garage-спеки
    fuel.ensureAtLeastOneExpense(); // щоб точно був хоча б один рядок
  });

  beforeEach(() => {
    auth.ensureLoggedIn();
    fuel.open();
  });

  it('open fuel expenses', () => {
    cy.contains(/fuel expenses|fuel/i).should('be.visible');
  });

  it('Edit fuel expense (add one if empty)', () => {
    fuel.editFirstRow();
    expenseModal.typeMileage(135).typeLiters(10).typeTotalCost(100).save();
    cy.contains('td', '135').should('be.visible');
  });

  it('Edit mileage', () => {
    fuel.editFirstRow();
    expenseModal.typeMileage(2).save();
    cy.contains('td', '2').should('be.visible');
  });

  it('incorrect date', () => {
    fuel.editFirstRow();
    expenseModal.typeDate('05.10.2025').save();
    cy.get('p.alert.alert-danger').should('be.visible');
  });

  it('Skip all cells', () => {
    fuel.editFirstRow();
    cy.get('input[name="reportedAt"]').clear().focus().blur();
    cy.get('input[name="mileage"]').clear().focus().blur();
    expenseModal.shouldSeeValidation('Mileage required');
    cy.get('input[name="liters"]').clear().focus().blur();
    expenseModal.shouldSeeValidation('Liters required');
    cy.get('input[name="totalCost"]').clear().focus().blur();
    expenseModal.shouldSeeValidation('Total cost required');
    cy.get('button.btn.btn-primary, button[type="submit"]').should('be.disabled');
  });

  it('Border color of liters', () => {
    fuel.editFirstRow();
    cy.get('input[name="liters"]').clear().focus().blur()
      .should('have.class', 'ng-invalid')
      .and('have.css', 'border-color', 'rgb(220, 53, 69)');
  });

  it('Negative liters', () => {
    fuel.editFirstRow();
    cy.get('input[name="liters"]').clear().type('-1');
    cy.get('button.btn.btn-primary, button[type="submit"]').should('be.disabled');
  });
});
