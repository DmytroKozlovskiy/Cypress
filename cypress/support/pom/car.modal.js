class CarModal {
  selectBrand(brand) {
    cy.get('select[name="carBrand"], select[name="carBrandId"]').first().select(brand);
    return this;
  }
  selectModel(model) {
    cy.get('select[name="carModel"], select[name="carModelId"]').first().select(model);
    return this;
  }
  typeMileage(v) {
    cy.get('input[name="mileage"]').clear().type(String(v));
    return this;
  }
  typeCreatedAt(ddmmyyyy) {
    cy.get('input[name="carCreatedAt"], #carCreationDate').clear().type(ddmmyyyy);
    return this;
  }
  save() {
    cy.get('.modal-content, .mat-dialog-container').first().within(() => {
      cy.get('button.btn.btn-primary, button[type="submit"]').click({ force: true });
    });
    return this;
  }
  clearMileageAndBlur() {
    cy.get('input[name="mileage"]').clear().blur();
    return this;
  }
  shouldSeeValidation(text) {
    cy.contains('.invalid-feedback, .mat-error', new RegExp(text, 'i')).should('be.visible');
    return this;
  }
}
module.exports = new CarModal();
