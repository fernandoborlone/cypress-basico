/// <reference types="cypress"/>

const searchTerm = 'cypress.io'

describe('Busca', () => {

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

    it('Digita e pressiona tecla Enter', () => {
        cy.get('@searchField')
          .type(`${searchTerm}{enter}`)

        cy.wait('@getSearchResults')

        //Assert
        cy.VerificaResultados()        
    })

    it('Digita e seleciona o botão buscar', () => {
        cy.get('@searchField')
          .type(searchTerm)
        cy.get('input[type="submit"')
          .should('be.visible')
          .click()
        
          //Assert
        cy.VerificaResultados()
    })

    it('digita e submete o formulário diretamente', () => {
        cy.get('@searchField')
          .type(searchTerm)
        cy.get('form').submit()

        //Assert
        cy.VerificaResultados()
    })
})