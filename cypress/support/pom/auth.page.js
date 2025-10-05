class AuthPage {
  visitWithBasicAuth() {
    cy.visit('/', {
      auth: { username: Cypress.env('basicUser'), password: Cypress.env('basicPass') }
    });
    return this;
  }

  login(email = Cypress.env('email'), password = Cypress.env('password')) {
    expect(email, 'env.email must be set').to.be.a('string').and.not.be.empty;
    expect(password, 'env.password must be set').to.be.a('string').and.not.be.empty;

    cy.contains(/sign in/i).click();
    cy.get('div.modal-content').within(() => {
      cy.get('input[name="email"]').clear().type(email);
      cy.get('input[name="password"]').clear().type(password);
      cy.contains(/login/i).click();
    });
    cy.contains(/garage|my garage|vehicles|logout/i, { timeout: 10000 }).should('be.visible');
    return this;
  }

  ensureLoggedIn() {
    const key = [Cypress.env('email'), Cypress.env('password')];
    cy.session(key, () => {
      this.visitWithBasicAuth();
      this.login();
    }, { cacheAcrossSpecs: true });
    this.visitWithBasicAuth();
    return this;
  }
}
module.exports = new AuthPage();
