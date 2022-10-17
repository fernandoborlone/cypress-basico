const { defineConfig } = require('cypress')

const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile(file) {
    const pathToConfigFile = path.resolve('..', 'cypress-pipeline-example/cypress/config', `${file}.json`)
    console.log(pathToConfigFile)

    return fs.readJSON(pathToConfigFile)
}

module.exports = defineConfig({
    experimentalSourceRewriting: true,
    chromeWebSecurity: false,
    e2e: {
        setupNodeEvents(on, config) {
            const file = config.env.configFile || 'dev'
            return getConfigurationByFile(file)
        },
        baseUrl: 'https://bit.ly',
    },
})
