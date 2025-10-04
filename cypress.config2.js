const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto2.forstudy.space/',
    env: {
      basicUser: 'guest',
      basicPass: 'welcome2qauto',
      email: 'formula.ods@gmail.com',   
      password: 'Qwerty123'
    },
    video: false,
    setupNodeEvents(on, config) { return config; },
  },
});
