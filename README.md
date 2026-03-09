# 🚀 Beedoo QA Challenge - Automação de Testes E2E

Este repositório contém a solução desenvolvida para o desafio de QA da **Beedoo**. O foco principal deste projeto é a validação automatizada das funcionalidades de cadastro e listagem de cursos, aplicando práticas modernas de engenharia de software e testes de software.

---

## 🧐 1. Análise Inicial da Aplicação

A aplicação consiste em uma plataforma de gerenciamento de cursos construída com o framework **Quasar (Vue.js)** e hospedada no Netlify.

### Observações Técnicas:
* **Frontend:** Uso intenso de componentes dinâmicos do Quasar (`q-select`, `q-input`), exigindo estratégias de seleção baseadas em atributos de acessibilidade (`aria-label`).
* **Estado da Aplicação:** Ausência de validações de formulário no *client-side*, o que permite a submissão de dados nulos ou logicamente inválidos.
* **Infraestrutura:** Identificada falha de configuração de rotas (SPA) no servidor, resultando em erros 404 ao atualizar páginas internas (*Deep Linking*).

---

## 🛠️ 2. Decisões Técnicas e Estratégia

* **Framework de Teste:** [Cypress](https://www.cypress.io/). Escolhido pela robustez em lidar com SPAs, facilidade de depuração e geração automática de evidências.
* **Organização de Código:** Aplicação de conceitos de **Clean Code** e criação de **Comandos Customizados** para aumentar a manutenibilidade dos scripts.
* **Ambiente Isolado (Docker):** Implementação de um `Dockerfile` para garantir a reprodutibilidade dos testes em pipelines de CI/CD, mitigando variações de ambiente.

---

## 🧠 3. Raciocínio Analítico e Cobertura

A estratégia seguiu a mentalidade de **Shift-Left Testing**, antecipando falhas de lógica de negócio:

1.  **Caminho Feliz:** Validação dos fluxos de sucesso para cursos "Online" e "Presencial".
2.  **Cenários Negativos:** Testes de submissão de dados nulos, datas retroativas e tipos de dados incompatíveis (ex: vagas decimais).
3.  **Comportamentos Inesperados:** Detecção de falhas de servidor (Erro 405 na exclusão) e resiliência a ataques simples de XSS.

---

## 📊 4. Documentação e Bugs

A documentação detalhada inclui 15 cenários de teste (CT-01 a CT-15) e o detalhamento técnico das falhas críticas encontradas.

👉 [Acesse aqui a Planilha e o Relatório de Bugs (Google Sheets)](https://docs.google.com/spreadsheets/d/SEU_LINK_AQUI)

---

## 🚀 5. Como Executar o Projeto

### Pré-requisitos
* Node.js v14+
* Docker (opcional para execução em container)

### Localmente
Instale as dependências:
```bash
npm install
```

Abra o Cypress (Modo Visual):
```bash
npx cypress open
```

Execute em modo Headless (Geração de vídeos e prints):
```bash
npx cypress run
```

Via Docker
```bash
docker build -t desafio-beedoo-qa .
docker run desafio-beedoo-qa
```

---

## 📁 6. Evidências de Execução

As gravações das execuções e os screenshots das falhas encontradas podem ser visualizados na pasta /evidencias deste repositório ou através do link:

🔗 [Acesse aqui a Planilha e o Relatório de Bugs (Google Sheets)](https://docs.google.com/spreadsheets/d/SEU_LINK_AQUI)

1.  **Caminho Feliz:** Validação dos fluxos de sucesso para cursos "Online" e "Presencial".
2.  **Cenários Negativos:** Testes de submissão de dados nulos, datas retroativas e tipos de dados incompatíveis (ex: vagas decimais).
3.  **Comportamentos Inesperados:** Detecção de falhas de servidor (Erro 405 na exclusão) e resiliência a ataques simples de XSS.
