/// <reference types="cypress"/>

const faker = require('faker-br')


describe('Write File', () => {

  beforeEach(function () {

    cy.geraMassa()
    cy.visit('/2XSuwCW')
    cy.fixture('massaTeste').then(item => { this.item = item })
  })


  it('Teste writeFile com Cypress', function () {


    cy.get('#first-name').type(this.item.person[1].firstName)
    cy.get('#last-name').type(this.item.person[1].lastName)
    cy.get('#email').type(this.item.person[1].email)
    cy.get('#agree').check()

    cy.get('.agreement > fieldset')
      .should('be.visible')
      .and('contain', `I, ${this.item.person[1].firstName} ${this.item.person[1].lastName}, wish to buy`)
    cy.get('[type="submit"]').click()

    cy.get('.success')
      .should('be.visible')
      .and('contain', 'Ticket(s) successfully ordered.')
  })

})