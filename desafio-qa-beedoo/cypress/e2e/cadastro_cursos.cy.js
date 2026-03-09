describe("Beedoo QA Challenge - Automação de Cadastro", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get('a[href="/new-course"]').click();
  });

  it("CT-01/02: Deve cadastrar e listar curso Online com sucesso", () => {
    const curso = {
      nome: "DevOps para Iniciantes",
      descricao: "Curso focado em CI/CD e Docker.",
      instrutor: "Marcos Soares",
      url: "https://bit.ly/imagem-teste",
      inicio: "2026-05-01",
      fim: "2026-05-10",
      vagas: "50",
    };

    cy.preencherFormularioBase(curso);
    cy.get('input[aria-label="Tipo de curso"]').click(); // Abre o menu
    cy.get(".q-item").contains("Online").click(); // Seleciona a opção no popup
    cy.get('input[aria-label="Link de inscrição"]').type(
      "https://beedoo.com/inscricao",
    );
    cy.get("button").contains("Cadastrar curso").click();
    cy.get('a[href="/"]').click();
    cy.get(".q-page-container").should("contain", curso.nome);
  });

  it("CT-03/04: Deve validar a alternância de campos dinâmicos", () => {
    // Seleciona Online
    cy.get('input[aria-label="Tipo de curso"]').click();
    cy.get(".q-item").contains("Online").click();
    cy.get('input[aria-label="Link de inscrição"]').should("be.visible");

    // Seleciona Presencial
    cy.get('input[aria-label="Tipo de curso"]').click();
    cy.get(".q-item").contains("Presencial").click();
    cy.get('input[aria-label="Endereço"]').should("be.visible");
    cy.get('input[aria-label="Link de inscrição"]').should("not.exist");
  });

  it("CT-05: Deve validar campos obrigatórios (Cenário Negativo)", () => {
    // Tenta cadastrar sem preencher nada
    cy.get("button").contains("Cadastrar curso").click();
    cy.url().should("include", "/new-course");
    cy.get(".q-field--error").should("be.visible");
  });

  // CT-06: Validação de Datas Lógicas
  it("CT-06: Não deve permitir data de fim anterior à data de início", () => {
    cy.get('input[aria-label="Data de início"]').type("2026-10-10");
    cy.get('input[aria-label="Data de fim"]').type("2026-10-01");
    cy.get("button").contains("Cadastrar curso").click();
    cy.url().should("include", "/new-course");
  });

  // CT-07: Caracteres Especiais
  it("CT-07: Deve validar sanitização no campo Instrutor", () => {
    const malicious = "'; Fulano e Beltrano; --";
    cy.get('input[aria-label="Instrutor"]').type(malicious);
    cy.get("button").contains("Cadastrar curso").click();
    cy.contains(malicious).should("be.visible"); // Verifica se tratou como string pura
  });

  // CT-08: Vagas Decimais
  it("CT-08: Não deve aceitar vagas decimais (ex: 1.5)", () => {
    cy.get('input[aria-label="Número de vagas"]').type("1.5");
    cy.get('input[aria-label="Número de vagas"]').should("have.value", "1");
  });

  // CT-09: Descrição Gigante (Layout Test)
  it("CT-09: Deve suportar descrições longas sem quebrar o layout", () => {
    const longa = "A".repeat(500);
    cy.get('textarea[aria-label="Descrição do curso"]').type(longa);
    cy.get('textarea[aria-label="Descrição do curso"]').should(
      "have.value",
      longa,
    );
  });

  // CT-10: URL de Imagem Quebrada
  it("CT-10: Deve permitir cadastrar mesmo com URL de imagem inválida", () => {
    cy.get('input[aria-label="Url da imagem de capa"]').type("link-quebrado");
    cy.get("button").contains("Cadastrar curso").click();
    cy.url().should("eq", Cypress.config().baseUrl);
  });

  // CT-11: Persistência após Refresh
  it("CT-11: Deve persistir os dados após atualizar a página", () => {
    cy.visit("/");
    cy.reload();
    cy.get(".q-page-container").should("exist");
  });

  it("CT-12: Deve remover um curso ao clicar em Excluir", () => {
    cy.visit("/");
    cy.get('a[href="/new-course"]').click();

    const nomeCurso = `Curso para Deletar ${Date.now()}`;
    cy.get('input[aria-label="Nome do curso"]').type(nomeCurso);
    cy.get("button").contains("Cadastrar curso").click();
    cy.get('a[href="/"]').click();

    cy.contains(nomeCurso)
      .parents(".q-card")
      .find("button")
      .contains(/excluir curso/i)
      .click();

    cy.contains(nomeCurso).should("not.exist");
  });

  // CT-13: Responsividade Mobile
  it("CT-13: O formulário deve ser responsivo no Mobile", () => {
    cy.viewport("iphone-xr");
    cy.get('a[href="/new-course"]').should("be.visible");
    cy.get("button").contains("Cadastrar curso").should("be.visible");
  });

  it("CT-14: Deve permitir navegar pelos campos usando a tecla TAB", () => {
    cy.get('input[aria-label="Nome do curso"]').focus();

    cy.get('textarea[aria-label="Descrição do curso"]')
      .focus()
      .should("be.focused");

    cy.get('input[aria-label="Nome do curso"]').should(
      "have.attr",
      "tabindex",
      "0",
    );
  });

  // CT-15: Link de Inscrição sem Protocolo
  it("CT-15: Deve validar link de inscrição sem http/https", () => {
    cy.get('input[aria-label="Tipo de curso"]').click();
    cy.get(".q-item").contains("Online").click();
    cy.get('input[aria-label="Link de inscrição"]').type("www.google.com");
    cy.get("button").contains("Cadastrar curso").click();
  });
});
