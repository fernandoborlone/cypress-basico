/// <reference types='cypress'/>

describe('Buger Eats', () => {

  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'))
    cy.get('img').should('have.attr', 'alt', 'Buger Eats')
  })

  context('Cadastro', () => {
    it('Usuário deve se tornar um entregador', () => {
      cy.seleciona_cadastre_se()
      cy.preenche_form()
      cy.salva_form()
    })
  })
})
