/// <reference types="cypress"/>

Cypress.Commands.add('preencherCamposObrigatorios', (dados) => {
    cy.get('#first-name').type(dados.fistName)
    cy.get('#last-name').type(dados.lastName)
    cy.get('#email').type(dados.email)
    cy.get('#agree').check()
})

// Verifica que retorna 10 resultados e um botão Mais resultados
Cypress.Commands.add('verificaResultados', () => {
    cy.get('.result')
      .should('have.length', 11)
      .last()
      //.should('contain.text', 'More results')
      .should('contain.text', 'Mais resultados')
})

Cypress.Commands.add('setDate', date => {
    cy.get('[data-cy=birthdate-date-field]')
      .type(date)
      .should('have.value', date)
      .blur()
  })