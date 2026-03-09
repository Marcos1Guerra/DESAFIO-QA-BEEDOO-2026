const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://creative-sherbet-a51eac.netlify.app/',
    
    viewportWidth: 1280,
    viewportHeight: 720,

    video: true,
    screenshotOnRunFailure: true,
   
    defaultCommandTimeout: 5000,
  },
});