/// <reference types="cypress"/>

context('Tikects', () => {

    let dados = {
        fistName: 'Fernando',
        lastName: 'Borlone',
        email: 'fernandoborlone@gmail.com'
    }

    let fullName = `${dados.fistName} ${dados.lastName}`
    let qdtTicket = '2'

    beforeEach(() => {
        cy.visit('/2XSuwCW')

    })

    context('Interagir com elementos', () => {

        it('Preencher todos os campos do tipo texto', { tags: ['@smoke'] }, () => {

            cy.get('#first-name').type(dados.fistName)
            cy.get('#last-name').type(dados.lastName)
            cy.get('#email').type(dados.email)
            cy.get('#requests').type('Vegetariano')
            cy.get('#signature').type(fullName)
        })

        it('Selecionar dois tickets', { tags: ['@smoke'] }, () => {
            cy.get('#ticket-quantity').select('2')
        })

        it('Selecionar o tipo de ticket VIP', { tags: ['@smoke'] }, () => {
            cy.get('#vip').check()
        })

        it('Marcar opção Social Media', { tags: ['@critical'] }, () => {
            cy.get('#social-media').check()

        })
    })

    context('Realizar verificações (assertions)', () => {

        it('Deve conter o texto TICKETBOX no cabeçalho', () => {
            cy.get('header h1').should('have.text', 'TICKETBOX')
        })

        it('Deve alertar preencimento incorreto do campo email', () => {
            cy.get('#email')
                .as('email')
                .type('emailInvalido')

            cy.get('#email.invalid').should('exist')

            cy.get('@email')
                .clear()
                .type(dados.email)

            cy.get('#email.invalid').should('not.exist')
        })
    })

    context('Testes end-to-end', () => {

        it('Preencher todo o formulário e resetar', () => {
            cy.get('#first-name').type(dados.fistName)
            cy.get('#last-name').type(dados.lastName)
            cy.get('#email').type(dados.email)
            cy.get('#ticket-quantity').select(qdtTicket)
            cy.get('#vip').check()
            cy.get('#friend').check()
            cy.get('#requests').type('Fast Food')
            cy.get('.agreement p')
              .should('contain', `I, ${fullName}, wish to buy ${qdtTicket} VIP tickets.`)
            cy.get('#agree').click()
            cy.get('#signature').type(fullName)
            cy.get('button[type="submit"]')
              .as('submitButton')
              .should('not.be.disabled')
              cy.get('button[type="reset"]').click()
              cy.get('@submitButton').should('be.disabled')
        })

        it('Preencher os campos obrigatórios usando comandos customizados', () => {
            cy.preencherCamposObrigatorios(dados)
            cy.get('button[type="submit"]')
              .as('submitButton')
              .should('not.be.disabled')
            cy.get('#agree').uncheck()
            cy.get('@submitButton').should('be.disabled')
        })
    })
})

// Exemplo de como xecutar o mesmo teste para dados diferentes
context('Tickets', () => {
    
    const data = require('../../fixtures/data')

    data.forEach((item, index) => {
        it(`${index + 1}: ${item.firtName} ${item.lastName} - Fills and submit the form based on a predefined list of data`, () => {
            cy.visit('/2XSuwCW')

            cy.get('#first-name').type(item.firtName)
            cy.get('#last-name').type(item.lastName)
            cy.get('#email').type(item.email)
            cy.get('#agree').check()

            cy.get('.agreement > fieldset')
              .should('be.visible')
              .and('contain', `I, ${item.firtName} ${item.lastName}, wish to buy`)
            cy.get('[type="submit"]').click()

            cy.get('.success')
              .should('be.visible')
              .and('contain', 'Ticket(s) successfully ordered.')
        })   
    })
    
})