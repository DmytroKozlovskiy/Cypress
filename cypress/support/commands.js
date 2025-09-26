// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const uniqueEmail = () => `qa_${Date.now()}_${Math.random().toString(16).slice(2)}@mailinator.com`;

const sel = {
  modal: 'div.modal-content',
  name: 'input[name="name"], input[formcontrolname="name"]',
  last: 'input[name="lastName"], input[formcontrolname="lastName"]',
  email: 'input[name="email"], input[formcontrolname="email"]',
  pwd: 'input[name="password"], input[formcontrolname="password"]',
  pwd2: 'input[name="rePassword"], input[formcontrolname="rePassword"]',
  registerBtn: 'button[type="submit"], button.btn.btn-primary',
  error: '.invalid-feedback, .error-text'
};
