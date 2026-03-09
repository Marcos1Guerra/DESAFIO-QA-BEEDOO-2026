Cypress.Commands.add('preencherFormularioBase', (dados) => {
  cy.get('input[aria-label="Nome do curso"]').type(dados.nome);
  cy.get('textarea[aria-label="Descrição do curso"]').type(dados.descricao);
  cy.get('input[aria-label="Instrutor"]').type(dados.instrutor);
  cy.get('input[aria-label="Url da imagem de capa"]').type(dados.url);
  cy.get('input[aria-label="Data de início"]').type(dados.inicio);
  cy.get('input[aria-label="Data de fim"]').type(dados.fim);
  cy.get('input[aria-label="Número de vagas"]').type(dados.vagas);
});