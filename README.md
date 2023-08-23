# [Pixstock](https://pixstock-projeto.netlify.app/)

Pixstock é um aplicativo de imagens e vídeos desenvolvido em [React](https://react.dev/) e todo o conteúdo fornecido por [Pexels](https://www.pexels.com/).

## Instalação

É necessário ter o gerenciador de pacotes [Node.js](https://nodejs.org/en) instalado e uma [chave API Pexels](https://www.pexels.com/api/).

### Passos de Instalação

1. Primeiro, clone este repositório para o seu sistema local usando o comando:
```bash
git clone https://github.com/KayqueGoldner/pixstock
```
2. Após o clone, navegue até o diretório do projeto:
```bash
cd pixstock
```
3. navegue até o arquivo .env.local e substitua o campo "CHAVE_API" pela sua chave api:
```bash
VITE_API_KEY=CHAVE_API
```
4. Instale as dependências do projeto:
```bash
npm install
```
5. Inicie o servidor:
```bash
npm run dev
```