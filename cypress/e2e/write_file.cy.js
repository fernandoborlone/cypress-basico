/// <reference types="cypress"/>

// Disponível em <https://talkingabouttesting.com/2021/09/13/como-criar-fixtures-com-dados-aleatorios-com-cypress-e-faker/>
describe('Hacker Stories', () => {
  beforeEach(() => {
    cy.generateFixture()

    cy.intercept(
      'GET',
      '**/search?query=React&page=0',
      { fixture: 'stories' }
    ).as('getStories')

    cy.visit('https://wlsf82-hacker-stories.web.app/')
    cy.wait('@getStories')
  })

  it('renders 20 stories, then 19 when dismissing one', () => {
    cy.get('.item').should('have.length', 20)
    cy.get('.button-small')
      .first()
      .click()
    cy.get('.item').should('have.length', 19)
  })
})