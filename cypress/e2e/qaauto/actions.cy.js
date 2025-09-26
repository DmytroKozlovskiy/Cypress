describe('first name actions', () => {

  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
  });

  it('open modal window', () => {
    cy.contains('Sign up').click();
    cy.contains('Registration').should('be.visible');
  });

  it('empty_name_error', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="name"]').focus().blur();
    cy.contains(/name required/i).should('be.visible');
    cy.get('input[name="name"]').should('have.class', 'ng-invalid');
  });

  it('short name error', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="name"]').type('a').blur();
    cy.contains(/2\s*to\s*20/i).should('be.visible');
    cy.get('input[name="name"]').should('have.class', 'ng-invalid');
  });

  it('valid name is accepted', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="name"]').clear().type('John').blur();
    cy.get('input[name="name"]').should('have.class', 'ng-valid');
    cy.contains(/name.*required|2 to 20/i).should('not.exist');
    cy.get('input[name="name"]').invoke('val').should('eq', 'John');

  });

  it('First name Border color', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="name"]').focus().blur();
    cy.get('input[name="name"]').should('have.class', 'ng-invalid');
    cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
});

describe('Last name actions', () => {

  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
  });

  it('last name error', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="lastName"]').focus().blur();
    cy.contains(/last name required/i).should('be.visible');
    cy.get('input[name="lastName"]').should('have.class', 'ng-invalid');
  });

  it('short last name error', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="lastName"]').type('a').blur();
    cy.contains(/2\s*to\s*20/i).should('be.visible');
    cy.get('input[name="lastName"]').should('have.class', 'ng-invalid');
  });

  it('last name invalid characters', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="lastName"]').type('smith-1').blur();
    cy.contains(/last name is invalid/i).should('be.visible');
  });

  it('valid last name is accepted ', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="lastName"]').type('Smith').blur();
    cy.get('input[name="lastName"]').should('have.class', 'ng-valid');
    cy.contains(/name.*required|2 to 20/i).should('not.exist');
    cy.get('input[name="lastName"]').invoke('val').should('eq', 'Smith');
  });

  it('Last name Border color', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="lastName"]').focus().blur();
    cy.get('input[name="lastName"]').should('have.class', 'ng-invalid');
    cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });

});

describe('Email actions', () => {

  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
  });

  it('email error', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="email"]').focus().blur();
    cy.contains(/email required/i).should('be.visible');
    cy.get('input[name="email"]').should('have.class', 'ng-invalid');
  });

  it('email invalid characters', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="email"]').type('formula@gmailcom').blur();
    cy.contains(/email is incorrect/i).should('be.visible');
  });

  it('valid email is accepted', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="email"]').type('formula.ods@gmail.com').blur();
    cy.get('input[name="email"]').should('have.class', 'ng-valid');
    cy.contains(/email (is )?(required|incorrect)/i).should('not.exist');
  });

  it('Email Border color', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="email"]').focus().blur();
    cy.get('input[name="name"]').should('have.class', 'ng-invalid');
    cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });

});

describe('Password actions', () => {

  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
  });

  it('wrong data password error', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="password"]').type('qwerty').blur();
    cy.contains(/password has to be/i).should('be.visible');
  });

  it('wrong data password error', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="password"]').focus().blur();
    cy.contains(/password required/i).should('be.visible');
    cy.get('input[name="password"]').should('have.class', 'ng-invalid');
  });

  it('valid data password ', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="password"]').type('Qwerty123').blur();
    cy.get('input[name="password"]').should('have.class', 'ng-valid');
    cy.contains(/password has to be/i).should('not.exist');
  });

  it('Password Border color', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="password"]').type('qwerty').blur();
    cy.get('input[name="password"]').should('have.class', 'ng-invalid');
    cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
});

describe('Re-enter password actions', () => {

  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
  });

  it('password do not match', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="password"]').type('Qwerty123').blur();
    cy.get('input[name="repeatPassword"]').type('Qwerty').blur();
    cy.get('.invalid-feedback p').should('be.visible');
    cy.get('input[name="repeatPassword"]').should('have.class', 'ng-invalid');
  });

  it('re-enter password ', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="password"]').type('Qwerty123').blur();
    cy.get('input[name="repeatPassword"]').focus().blur();
    cy.contains('Re-enter password required').should('be.visible');
    cy.get('input[name="repeatPassword"]').should('have.class', 'ng-invalid');
  })

  it('Border color of re-enter password', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="password"]').type('Qwerty123').blur();
    cy.get('input[name="repeatPassword"]').focus().blur();
    cy.get('input[name="repeatPassword"]').should('have.class', 'ng-invalid');
    cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
  });
});


describe('Button register', () => {

  beforeEach(() => {
    cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
  });
  it('Disabled register button', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="name"]').type('John').blur();
    cy.get('input[name="lastName"]').type('Smith').blur();
    cy.get('input[name="email"]').type('formula.ods@gmail.com').blur();
    cy.get('input[name="password"]').type('Qwerty123').blur();
    cy.get('input[name="repeatPassword"]').focus().blur();
    cy.get('button[type="button"]').should('be.disabled');
  })

  it('Enable register button', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="name"]').type('John').blur();
    cy.get('input[name="lastName"]').type('Smith').blur();
    cy.get('input[name="email"]').type('formula.ods@gmail.com').blur();
    cy.get('input[name="password"]').type('Qwerty123').blur();
    cy.get('input[name="repeatPassword"]').type('Qwerty123').blur();
    cy.get('button[type="button"]').should('be.enabled');
  });

  it.only('Success registration', () => {
    cy.contains('Sign up').click();
    cy.get('input[name="name"]').type('John').blur();
    cy.get('input[name="lastName"]').type('Smith').blur();
    cy.get('input[name="email"]').type('formula.ods@gmail.com').blur();
    cy.get('input[name="password"]').type('Qwerty123').blur();
    cy.get('input[name="repeatPassword"]').type('Qwerty123').blur();
    cy.contains('Register').click();
  });
  /* Цей тест можливо пройти один раз. На другий раз система пише "User already exists". Але тест був успішно пройдено. */
});