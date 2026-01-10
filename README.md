# MagnorumForYou - Website com API

Este projeto contém o site institucional da MagnorumForYou com uma API completa para processar formulários de contato e orçamentos, utilizando MongoDB como banco de dados.

## 🚀 Tecnologias Utilizadas

### Frontend
- HTML5 semântico
- CSS3 com variáveis customizadas
- JavaScript vanilla (ES6+)
- Design responsivo
- Modo escuro/claro
- Animações CSS

### Backend
- Node.js
- Express.js
- MongoDB com Mongoose
- Nodemailer para envio de emails
- Express Validator para validação
- CORS para requisições cross-origin

## 📁 Estrutura do Projeto

\`\`\`
magnorum-website-api/
├── public/                 # Arquivos estáticos (HTML, CSS, JS, imagens)
│   ├── index.html
│   ├── contact.html
│   ├── orcamento.html
│   ├── style.css
│   ├── orcamento.css
│   ├── main.js
│   ├── contact.js
│   ├── orcamento.js
│   └── img/
├── models/                 # Modelos do MongoDB
│   ├── Contact.js
│   └── Quote.js
├── routes/                 # Rotas da API
│   ├── contact.js
│   └── quote.js
├── services/              # Serviços (email, etc.)
│   └── emailService.js
├── middleware/            # Middlewares customizados
│   └── validation.js
├── scripts/               # Scripts utilitários
│   └── seed-database.js
├── server.js              # Servidor principal
├── package.json
├── .env                   # Variáveis de ambiente
└── README.md
\`\`\`

## ⚙️ Configuração e Instalação

### 1. Pré-requisitos
- Node.js (versão 16 ou superior)
- MongoDB (local ou MongoDB Atlas)
- Conta de email para envio (Gmail ou SMTP)

### 2. Instalação

\`\`\`bash
# Clone o repositório
git clone <url-do-repositorio>
cd magnorum-website-api

# Instale as dependências
npm install
\`\`\`

### 3. Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto:

\`\`\`env
# Configurações do servidor
PORT=3000
NODE_ENV=development

# Configurações do MongoDB
MONGODB_URI=mongodb://localhost:27017/magnorum_website

# Configurações de Email - Gmail
EMAIL_SERVICE=gmail
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha-de-app

# Emails de destino
EMAIL_FROM=noreply@magnorumforyou.com.br
EMAIL_TO=contato@magnorumforyou.com.br
\`\`\`

### 4. Configuração do MongoDB

#### Opção 1: MongoDB Local
\`\`\`bash
# Instale o MongoDB
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb

# Inicie o serviço
sudo systemctl start mongodb
\`\`\`

#### Opção 2: MongoDB Atlas (Cloud)
1. Crie uma conta no [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crie um cluster gratuito
3. Configure o acesso de rede
4. Obtenha a string de conexão
5. Substitua `MONGODB_URI` no arquivo `.env`

### 5. Configuração de Email

#### Gmail:
1. Ative a verificação em duas etapas
2. Gere uma senha de app
3. Use a senha de app no campo `EMAIL_PASS`

#### SMTP Genérico:
\`\`\`env
SMTP_HOST=smtp.seu-provedor.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@dominio.com
SMTP_PASS=sua-senha
\`\`\`

## 🚀 Executando o Projeto

### 1. Desenvolvimento
\`\`\`bash
# Instalar nodemon globalmente (opcional)
npm install -g nodemon

# Executar em modo desenvolvimento
npm run dev
\`\`\`

### 2. Produção
\`\`\`bash
# Executar em modo produção
npm start
\`\`\`

### 3. Popular o Banco de Dados
\`\`\`bash
# Executar script de seed
npm run seed
\`\`\`

## 📡 API Endpoints

### Contatos

#### POST /api/contact
Enviar formulário de contato

**Body:**
\`\`\`json
{
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "phone": "(11) 99999-9999",
  "subject": "orçamento",
  "message": "Mensagem do cliente",
  "privacy": true
}
\`\`\`

#### GET /api/contact
Listar contatos (admin)

**Query Parameters:**
- `page`: Número da página (padrão: 1)
- `limit`: Itens por página (padrão: 10)
- `status`: Filtrar por status

#### PUT /api/contact/:id/status
Atualizar status do contato

**Body:**
\`\`\`json
{
  "status": "read"
}
\`\`\`

### Orçamentos

#### POST /api/quote
Enviar solicitação de orçamento

**Body:**
\`\`\`json
{
  "selectedPlan": {
    "name": "Profissional",
    "slug": "professional",
    "price": 3990
  },
  "selectedServices": [
    {
      "name": "SEO Avançado",
      "slug": "seo",
      "price": 1200
    }
  ],
  "additionalPages": 2,
  "additionalForms": 1,
  "selectedColor": "blue",
  "selectedTimeline": "standard",
  "name": "Ana Costa",
  "company": "Empresa ABC",
  "email": "ana@empresa.com",
  "phone": "(11) 88888-1111",
  "projectDescription": "Descrição do projeto",
  "budget": "5000-10000",
  "deadline": "2 meses",
  "terms": true
}
\`\`\`

#### GET /api/quote
Listar orçamentos (admin)

#### GET /api/quote/:id
Buscar orçamento específico

#### PUT /api/quote/:id/status
Atualizar status do orçamento

## 🎨 Funcionalidades do Frontend

### Páginas
- **index.html**: Página inicial com hero, serviços, processo, portfólio e depoimentos
- **contact.html**: Página de contato com formulário e informações
- **orcamento.html**: Página de orçamento interativo em 4 etapas

### Funcionalidades
- Design responsivo para todos os dispositivos
- Modo escuro/claro com persistência
- Menu mobile hamburger
- Slider de depoimentos
- Formulário de orçamento interativo
- Validação de formulários
- Feedback visual de loading
- Animações de scroll
- FAQ com accordion

### Estilos
- Sistema de cores com variáveis CSS
- Gradientes personalizados
- Animações suaves
- Tipografia responsiva
- Componentes reutilizáveis

## 🔧 Desenvolvimento

### Scripts Disponíveis
\`\`\`bash
npm start          # Executar em produção
npm run dev        # Executar em desenvolvimento
npm run seed       # Popular banco de dados
\`\`\`

### Estrutura de Dados

#### Contato
\`\`\`javascript
{
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  privacyAccepted: Boolean,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

#### Orçamento
\`\`\`javascript
{
  quoteNumber: String,
  customer: {
    name: String,
    email: String,
    phone: String,
    company: String
  },
  selectedPlan: Object,
  selectedServices: Array,
  customization: Object,
  projectDescription: String,
  totalPrice: Number,
  status: String,
  createdAt: Date,
  updatedAt: Date
}
\`\`\`

## 🚀 Deploy

### Vercel (Recomendado)
1. Instale a CLI do Vercel: `npm i -g vercel`
2. Execute: `vercel`
3. Configure as variáveis de ambiente no dashboard

### Heroku
1. Crie um app no Heroku
2. Configure as variáveis de ambiente
3. Conecte com MongoDB Atlas
4. Deploy via Git

### VPS/Servidor Próprio
1. Configure Node.js e MongoDB
2. Clone o repositório
3. Configure variáveis de ambiente
4. Use PM2 para gerenciar o processo
5. Configure nginx como proxy reverso

## 📧 Configuração de Email

O sistema envia emails automáticos para:
- Confirmação para o cliente
- Notificação para a equipe

Templates HTML responsivos incluídos.

## 🔒 Segurança

- Validação de dados no backend
- Sanitização de inputs
- Rate limiting (recomendado para produção)
- CORS configurado
- Variáveis de ambiente para dados sensíveis

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com MongoDB**
   - Verifique se o MongoDB está rodando
   - Confirme a string de conexão
   - Verifique permissões de rede (Atlas)

2. **Emails não são enviados**
   - Verifique credenciais de email
   - Confirme configurações SMTP
   - Verifique logs do servidor

3. **Formulários não funcionam**
   - Verifique console do navegador
   - Confirme se a API está rodando
   - Verifique CORS

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👥 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📞 Suporte

Para suporte, entre em contato:
- Email: contato@magnorumforyou.com.br
- Telefone: (11) 99999-9999
