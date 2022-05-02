/// <reference types="cypress"/>
describe('Buger Eats', () => {
  context('Cadastro', () => {
    it('Usuário deve se tornar um entregador', () => {
      cy.visit(Cypress.env('baseUrl'))
      cy.get('a[href="/deliver"]').click()
      cy.get('#page-deliver form h1')
        .should('have.text', 'Cadastre-se para  fazer entregas')
    })
  })
})
