/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 */

const allureWriter = require('@shelex/cypress-allure-plugin/writer')
// import allureWriter from "@shelex/cypress-allure-plugin/writer";

module.exports = (on, config) => {
  allureWriter(on, config)
  return config
}

/// <reference types="cypress" />

const fs = require('fs-extra')
const path = require('path')

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('..', 'cypress-basico/cypress/config', `${file}.json`)
  console.log(pathToConfigFile)

  return fs.readJSON(pathToConfigFile)
}

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {

  // Configuração do Plugin utilizado para categoriar os testes
  require('cypress-grep/src/plugin')(config)

  // Exportando as variáveis de ambiente utilizadas na seção scripts do package.json
  const file = config.env.configFile || 'dev'
  return getConfigurationByFile(file)
}
