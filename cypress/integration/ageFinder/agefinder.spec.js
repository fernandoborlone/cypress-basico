/// <reference types="cypress"/>

describe('Descobre Idade', () => {

    beforeEach(() => {
        const now = new Date('2021, 09, 23').getTime() // atribui 23 de setembro de 2021 como uma data fixa
        cy.clock(now) // Congela a data para 23 de setembro de 2021
        cy.visit('https://age-finder.vercel.app/')
    })

    context('Plural', () => {
        const inputs = [
            {
                dataNasc: '2021-09-23',
                idade: '0'
            },
            {
                dataNasc: '1981-09-10',
                idade: '40'
            }
        ]

        inputs.forEach(input => {

            it(`pluraliza a idade encontrada - ${input.idade}`, () => {
                cy.setDate(input.dataNasc)

                cy.contains('p', `You're ${input.idade} years old`)
                    .should('be.visible')
            })
        })
    })

    context('Singular', () => {
        it('Singulariza quando a idade é 1', () => {
            cy.setDate('2020-08-23')

            cy.contains('p', "You're 1 year old")
                .should('be.visible')
        })
    })

    context('Data futura', () => {
        it('Pergunta se você é do futuro', () => {
            cy.setDate('2021-09-24')

            cy.contains('p', 'Are you from the future?')
                .should('be.visible')
        })
    })

    context('Campo data vazio', () => {
        it('Não deve exibir o paragrafo quando limpar o campo data', () => {
            cy.setDate('2021-09-24')
            cy.contains('p', 'Are you from the future?')
                .should('be.visible')

            cy.get('[data-cy=birthdate-date-field]')
                .clear()
                .blur()

            cy.get('p').should('not.exist')
        })
    })

})