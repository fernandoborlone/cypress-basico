/// <reference types="cypress"/>

const searchTerm = 'cypress.io'

describe('Exemplos de busca com Cypress', () => {

  beforeEach(() => {
    cy.intercept(
      'GET',
      `**?q=${searchTerm}**`
    ).as('getSearchResults')
    cy.visit('https://duckduckgo.com/')

    cy.get('input[type="text"]')
      .as('searchField')
      .should('be.visible')
  })

  context('3 maneiras de testar funcionalidades de busca', () => {

    it('Digita e pressiona tecla Enter', () => {
      cy.get('@searchField')
        .type(`${searchTerm}{enter}`)

      cy.wait('@getSearchResults')

      //Assert
      cy.verificaResultados()
    })

    it('Digita e seleciona o botão buscar', () => {
      cy.get('@searchField')
        .type(searchTerm)
      cy.get('input[type="submit"')
        .should('be.visible')
        .click()

      //Assert
      cy.verificaResultados()
    })

    it('digita e submete o formulário diretamente', () => {
      cy.get('@searchField')
        .type(searchTerm)
      cy.get('form').submit()

      //Assert
      cy.verificaResultados()
    })
  })

  // Testar a funcionalidade de busca
  // Selecionando itens através da lista de auto-complete
  context('selecionar item do auto-complete de busca', () => {

    it('Busca e seleciona o primeiro item da lista', () => {
      cy.get('@searchField')
        .type('cypress.io{downarrow}{enter}', { delay: 100 })

      //Assert
      cy.verificaResultados()
    })

    it('Busca e seleciona o segundo item da lista', () => {
      cy.get('@searchField')
        .type('cypress.io{downarrow}{downarrow}{enter}', { delay: 250 })

      //Assert
      cy.verificaResultados()
    })

    it('Busca e seleciona o quarto item da lista', () => {
      cy.get('@searchField')
        .type('cypress.io{downarrow}{downarrow}{downarrow}{downarrow}{enter}', { delay: 500 })

      //Assert
      cy.verificaResultados()
    })
  })
})