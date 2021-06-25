/// <reference types="cypress"/>

Cypress.Commands.add('preencherCamposObrigatorios', (dados) => {
    cy.get('#first-name').type(dados.fistName)
    cy.get('#last-name').type(dados.lastName)
    cy.get('#email').type(dados.email)
    cy.get('#agree').check()
})