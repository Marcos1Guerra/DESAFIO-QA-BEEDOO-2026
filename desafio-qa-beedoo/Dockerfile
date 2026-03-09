# Usa a imagem oficial do Cypress que já vem com todas as dependências e navegadores
FROM cypress/included:12.0.0

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências (incluindo os plugins que usamos)
RUN npm install

# Copia o restante do código do projeto
COPY . .

# Comando padrão ao rodar o container: executa os testes em modo headless
ENTRYPOINT ["npx", "cypress", "run"]