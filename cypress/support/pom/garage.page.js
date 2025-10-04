class GaragePage {
  open() {
    cy.contains(/garage|my garage/i).click({ force: true });
    return this;
  }

  openAddCarModal() {
    cy.contains('button', /add car/i).click({ force: true });
    cy.get('.modal-content, .mat-dialog-container').should('be.visible');
    return this;
  }

  ensureAtLeastOneCar() {
    this.open();
    cy.get('body').then(($b) => {
      if ($b.find('.car.jumbotron').length === 0) {
        this.openAddCarModal();
        cy.get('select[name="carBrand"], select[name="carBrandId"]').first().select('BMW');   // можна змінити
        cy.get('select[name="carModel"], select[name="carModelId"]').first().select('X5');   // можна змінити
        cy.get('input[name="mileage"]').clear().type('10000');
        cy.get('.modal-content').within(() => cy.get('button.btn.btn-primary, button[type="submit"]').click());
        cy.get('.car.jumbotron', { timeout: 10000 }).should('have.length.at.least', 1);
      }
    });
    return this;
  }
}
module.exports = new GaragePage();
