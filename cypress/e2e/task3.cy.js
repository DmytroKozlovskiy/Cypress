it('Sign In [/api/auth/signin]', () => {
  cy.api('POST', 'https://qauto.forstudy.space/api/auth/signin', {
    'email': 'formula.ods@gmail.com',
    'password': 'Qwerty123',
    'remember': false
  }).then((response) => {
    cy.log(JSON.stringify(response))
  });
});

it('Get all brands [/api/cars/brand]', () => {
  cy.api('GET', 'https://qauto.forstudy.space/api/cars/brands').then((response) => {
    const brands = response.body.data;
    cy.log(JSON.stringify(brands));
    expect(response.status).to.eq(200);
    expect(brands).to.be.an('array');
  });
});

it('Add car [/api/cars]', () => {
  cy.api('POST', 'https://qauto.forstudy.space/api/auth/signin', {
    'email': 'formula.ods@gmail.com',
    'password': 'Qwerty123',
    'remember': false
  });
  cy.api('POST', '/api/cars', {
    'carBrandId': 1,
    'carModelId': 1,
    'mileage': 122
  }).then((response) => {
    cy.log(JSON.stringify(response));
    expect(response.body.data.brand).to.equal('Audi');
    expect(response.body.data.model).to.equal('TT');
  });
});