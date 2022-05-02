/// <reference types='cypress'/>

Cypress.Commands.add('seleciona_cadastre_se', () => {
  cy.get('a[href="/deliver"]').click()
  cy.get('#page-deliver form h1')
    .should('have.text', 'Cadastre-se para  fazer entregas')
})

Cypress.Commands.add('preenche_form', () => {

  const faker = require('faker-br')

  let entregador = {
    nome: faker.name.firstName(),
    cpf: faker.br.cpf(),
    email: faker.internet.email(),
    whatsapp: faker.phone.phoneNumber(),
    endereco: {
      cep: '06775001',
      rua: 'Estrada Kizaemon Takeuti',
      numero: faker.random.number(),
      complemento: faker.random.alphaNumeric(),
      bairro: 'Jardim Clementino',
      cidade: 'Taboão da Serra/SP'
    },
    metodo_entrega: 'Moto',
    cnh: 'cnh-digital.jpg'
  }

  // Preenche dados do entregador
  cy.get('input[name="name"]').type(entregador.nome, { delay: 0 })
  cy.get('input[name="cpf"]').type(entregador.cpf, { delay: 0 })
  cy.get('input[name="email"]').type(entregador.email, { delay: 0 })
  cy.get('input[name="whatsapp"]').type(entregador.whatsapp, { delay: 0 })

  // Preenche endereço do entregador
  cy.get('input[name="postalcode"]').type(entregador.endereco.cep, { delay: 0 })
  cy.get('input[value="Buscar CEP"]').click()
  cy.get('input[placeholder="Rua"]')
    .should('have.attr', 'value', entregador.endereco.rua)
  cy.get('input[name="address-number"]').type(entregador.endereco.numero, { delay: 0 })
  cy.get('input[name="address-details"]').type(entregador.endereco.complemento, { delay: 0 })
  cy.get('input[name="district"]')
    .should('have.attr', 'value', entregador.endereco.bairro)
  cy.get('input[name="city-uf"]')
    .should('have.attr', 'value', entregador.endereco.cidade)

  // selecionando método de entrega
  cy.contains('.delivery-method li', entregador.metodo_entrega).click()
  cy.get('input[accept^="image"]').selectFile(`cypress/fixtures/images/${entregador.cnh}`, { force: true })
    .then(input => {
      expect(input[0].files[0].name).to.eq(entregador.cnh)
    })
})

Cypress.Commands.add("salva_form", () => {

  const expectMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato'
  cy.get('button[type="submit"]').click()
  cy.get('.swal2-popup').should('contain.text', expectMessage)
})