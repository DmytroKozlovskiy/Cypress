class CarCard {
  openEditOfFirst() {
    cy.get('.car.jumbotron').first().find('button.car_edit').click({ force: true });
    cy.get('.modal-content, .mat-dialog-container').should('be.visible');
    return this;
  }
  removeFirst(confirm = true) {
    this.openEditOfFirst();
    cy.get('.modal-content, .mat-dialog-container').within(() => {
      cy.contains('button', /remove car/i).click({ force: true });
    });
    if (confirm) cy.contains('button', /^remove$/i).click({ force: true });
    return this;
  }
}
module.exports = new CarCard();
