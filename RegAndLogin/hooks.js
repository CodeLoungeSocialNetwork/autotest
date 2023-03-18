const { Builder } = require("selenium-webdriver");

exports.mochaHooks = {
    beforeEach: async function() {
        //start browser
        driver = await new Builder().forBrowser(`chrome`).build();
    },
    afterEach: async function() {
        //close browser
        await driver.quit()
    },
}