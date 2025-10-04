class ExpenseModal {
  selectCarByIndex(i = 0) {
    cy.get('body').then(($b) => {
      const $sel = $b.find('select[name="car"]');
      if ($sel.length) cy.wrap($sel).select(i);
    });
    return this;
  }
  typeMileage(v)   { cy.get('input[name="mileage"], input[name="odometer"]').clear().type(String(v)); return this; }
  typeLiters(v)    { cy.get('input[name="liters"], input[name="fuelAmount"]').clear().type(String(v)); return this; }
  typeTotalCost(v) { cy.get('input[name="totalCost"], input[name="cost"]').clear().type(String(v)); return this; }
  typeDate(ddmmyyyy) {
    cy.get('input[name="reportedAt"], input[name="date"], #expenseDate').then(($d) => {
      if ($d.length) cy.wrap($d).clear().type(ddmmyyyy).blur();
    });
    return this;
  }
  save() {
    cy.get('.modal-content, .mat-dialog-container').first().within(() => {
      cy.get('button.btn.btn-primary, button[type="submit"]').click({ force: true });
    });
    return this;
  }
  shouldSeeValidation(text) {
    cy.contains('.invalid-feedback, .mat-error', new RegExp(text, 'i')).should('be.visible');
    return this;
  }
}
module.exports = new ExpenseModal();
