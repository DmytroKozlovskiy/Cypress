const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    env: {
      basicUser: 'guest',
      basicPass: 'welcome2qauto',
    },

    setupNodeEvents(on, config) {
    },
  },
});
