const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    env: {
      basicUser: 'guest',
      basicPass: 'welcome2qauto',
      email: 'formula.ods@gmail.com',   
      password: 'Qwerty123'
    },

    setupNodeEvents(on, config) {
    },
  },
});
