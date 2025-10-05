
describe('API tests', () => {


  it('Get all brands [/api/cars/brand]', () => {
    cy.request('GET', '/api/cars/brands').then((response) => {
      const brands = response.body.data;
      cy.log(JSON.stringify(brands));
      expect(response.status).to.eq(200);
      expect(brands).to.be.an('array');
    });
  });

  it('Sign In [/api/auth/signin]', () => {
    cy.request('POST', '/api/auth/signin', {
      'email': 'formula.ods@gmail.com',
      'password': 'Qwerty123',
      'remember': false
    }).then((response) => {
      cy.log(JSON.stringify(response))
    });
  });

  it('Password reset instructions [/api/auth/resetPassword]', () => {
    cy.request('POST', '/api/auth/resetPassword', {
      "email": "test@test.com"
    }).then((response) => {
      cy.log(JSON.stringify(response));
      expect(response.status).to.eq(200);
    });
  });
});

it('Set cookie [/api/auth/signin]', () => {
  cy.request('POST', '/api/auth/signin', {
    'email': 'formula.ods@gmail.com',
    'password': 'Qwerty123',
    'remember': false
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log(JSON.stringify(response.headers['set-cookie']));
  });
});

it('Add car [/api/cars]', () => {
  cy.request('POST', '/api/auth/signin', {
    'email': 'formula.ods@gmail.com',
    'password': 'Qwerty123',
    'remember': false
  });
  cy.request('POST', '/api/cars', {
    'carBrandId': 1,
    'carModelId': 1,
    'mileage': 122
  }).then((response) => {
    cy.log(JSON.stringify(response));
    expect(response.body.data.brand).to.equal('Audi');
    expect(response.body.data.model).to.equal('TT');
  });
});

it('Edits user profile [api/users/profile]', () => {
  cy.request('POST', '/api/auth/signin', {
    'email': 'formula.ods@gmail.com',
    'password': 'Qwerty123',
    'remember': false
  });
  cy.request('PUT', '/api/users/profile', {
    "photo": "user-1621352948859.jpg",
    "name": "John",
    "lastName": "Dou",
    "dateBirth": "2021-03-17T15:21:05.000Z",
    "country": "Ukraine"
  }).then((response) => {
    cy.log(JSON.stringify(response));
    expect(response.status).to.equal(200);
    expect(response.body.data.name).to.equal('John');
    expect(response.body.data.lastName).to.equal('Dou');
  });
});

it('Gets all instructions [/api/instructions?carBrandId=4&carModelId=18&page=1', () => {
  cy.request('GET', '/api/instructions?carBrandId=4&carModelId=18&page=1').then((response) => {
    cy.log(JSON.stringify(response.body.data));
    expect(response.status).to.equal(200);
    expect(response.body.data).to.be.an('array');
  });
});

it('Delete user without auth should fail [DELETE /api/users]', () => {
  cy.request({
    method: 'DELETE',
    url: '/api/users',
    failOnStatusCode: false  // щоб Cypress не падав на 401/403
  }).then((response) => {
    cy.log(JSON.stringify(response.body));
    expect(response.status).to.be.oneOf([401, 403]);
    expect(response.body.status).to.eq('error');
    expect(response.body.message).to.match(/not authenticated/i);
  });
});






