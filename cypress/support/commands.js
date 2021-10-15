/// <reference types="cypress"/>
const faker = require('faker')


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
        .should('contain.text', 'More results')
    //.should('contain.text', 'Mais resultados')
})

Cypress.Commands.add('setDate', date => {
    cy.get('[data-cy=birthdate-date-field]')
        .type(date)
        .should('have.value', date)
        .blur()
})

Cypress.Commands.add('loginBySingleSignOn', () => {
    const options = {
        method: 'POST',
        url: 'https://id.dasa.com.br/auth/realms/Funcionarios/protocol/openid-connect/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
            grant_type: "password",
            username: 'fernando.borlone@dasa.com.br',
            password: '@Fpn2021',
            client_id: 'portal-cadastro-web',
            redirect_uri: 'https://portal-cadastro-web.azr-prd02.dasaexp.io/exames'
        },
        failOnStatusCode: false
    }
    cy.request(options)
})

Cypress.Commands.add('login_argo', () => {

    cy.get('#LoginView1_Login1_User').type('aprovador1')
    cy.get('#LoginView1_Login1_Password').type('aut@argo123')
    cy.get('#LoginView1_Login1_LoginButton').click()
    cy.wait('@getHome')

})

Cypress.Commands.add('selecionar_viajante', (viajante) => {
    cy.get('#dvAddViajante').click()
    cy.get('#divViajantes > :nth-child(1) > .ui-select-bootstrap > .btn > .text-muted').type(`${viajante}{enter}`, { delay: 400 })
    cy.get('.form-horizontal > .btnPad > .btnCall').click()
})

Cypress.Commands.add('preencher_origem_destino', (origem, destino) => {


    cy.get(':nth-child(1) > .col-md-7 > :nth-child(1) > .has-feedback > dir-auto-complete-aeroportos.ng-isolate-scope > #autoCompleteAereportos')
        .type(origem)

    cy.get(':nth-child(1) > .col-md-7 > :nth-child(2) > .has-feedback > dir-auto-complete-aeroportos.ng-isolate-scope > #autoCompleteAereportos')
        .type(destino)
})

Cypress.Commands.add('generateFixture', () => {

    cy.writeFile('cypress/fixtures/stories.json', {
        'hits': Cypress._.times(20, () => {
            return {
                'title': `${faker.lorem.words(3)}`,
                'url': `${faker.internet.url()}`,
                'author': `${faker.name.firstName()} ${faker.name.lastName()}`,
                'num_comments': `${faker.datatype.number()}`,
                'points': `${faker.datatype.number()}`,
                'objectID': `${faker.datatype.uuid()}`,
            }
        })
    })
})


Cypress.Commands.add('geraMassa', () => {

    cy.writeFile('cypress/fixtures/massaTeste.json', {
        'person': Cypress._.times(5, () => {
            return {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email()
            }
        })
    })
})