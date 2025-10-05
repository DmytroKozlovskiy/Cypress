class MileageForm {
  setFirstMiles(v) {
    cy.get('.car.jumbotron').first().within(() => {
      cy.get('input[name="miles"]').clear().type(String(v));
    });
    return this;
  }
  submitFirst() {
    cy.get('.car.jumbotron').first().within(() => {
      cy.contains('button', /^update$/i).should('not.be.disabled').click();
    });
    return this;
  }
  submitShouldBeDisabled() {
    cy.contains('button', /^update$/i).should('be.disabled');
    return this;
  }
}
module.exports = new MileageForm();
