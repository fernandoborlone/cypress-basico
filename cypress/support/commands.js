/// <reference types="cypress"/>
const faker = require('faker-br')

Cypress.Commands.add('preencherCamposObrigatorios', (dados) => {
  cy.get('#first-name').type(dados.firstName)
  cy.get('#last-name').type(dados.lastName)
  cy.get('#email').type(dados.email)
  cy.get('#agree').check()
})

// Verifica que retorna 10 resultados e um botão Mais resultados
Cypress.Commands.add('verificaResultados', () => {

  cy.get('.nrn-react-div')
    .should('have.length', 10)
  cy.get('.results')
    .find('#rld-1')
    .should('be.visible')
    //.should('contain.text', 'Mais resultados')
})

Cypress.Commands.add('setDate', date => {
  cy.get('[data-cy=birthdate-date-field]')
    .type(date)
    .should('have.value', date)
    .blur()
})

Cypress.Commands.add('generateFixture', () => {

  cy.writeFile('cypress/fixtures/stories.json', {
    'hits': Cypress._.times(20, () => {
      return {
        'title': `${faker.lorem.words(3)}`,
        'url': `${faker.internet.url()}`,
        'author': `${faker.name.firstName()} ${faker.name.lastName()}`,
        'num_comments': `${faker.random.number()}`,
        'points': `${faker.random.number()}`,
        'objectID': `${faker.random.uuid()}`,
      }
    })
  })
})

Cypress.Commands.add('geraMassa', () => {

  cy.writeFile('cypress/fixtures/massaTeste.json', {
    'person': Cypress._.times(5, () => {
      return {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email()
      }
    })
  })
})