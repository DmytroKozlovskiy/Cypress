describe('queries', () => {

  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
  });

  it('logo visible', () => {
    cy.get('a.header_logo').should('be.visible');
  });

  it('button visible', () => {
    cy.contains('Sign In').should('be.visible');
  });

  it('modal window visible', () => {
    cy.contains('Sign In').click();
    cy.contains('Email').should('be.visible');
  });

  it('email input validation', () => {
    cy.contains('Sign In').click();
    cy.get('input[name="email"]').type('hello');
    cy.get('input[name="email"]').should('have.class', 'ng-invalid');
  });

  it('password input', () => {
    cy.contains('Sign In').click();
    cy.get('input[name="password"]').should('be.visible').and('have.attr', 'type', 'password');
  });

  it('modal contains email and password fields', () => {
    cy.contains('Sign In').click();
    cy.get('div.modal-content').within(() => {
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
    });
  });
  
  it('social icons length', () => {
    cy.get('.contacts_socials')
      .children()
      .should('have.length', 5);
  });

  it('text contains Do more', () => {
    cy.contains('Do more',).should('be.visible');
      
  });

  it('login with invalid credentials shows error', () => {
    cy.contains('Sign In').click();
    cy.get('div.modal-content').within(() => {
      cy.get('input[name="email"]').type('guest@cypress.com');
      cy.get('input[name="password"]').type('welcome2qauto');
      cy.contains('Login').click();
    });
  });

  it('header contains Contacts link', () => {
    cy.get('div.header_inner')
      .find('.header_left')
      .contains('Contacts')
      .should('be.visible');
  });

});