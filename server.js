const express = require('express');
const cors = require('cors');

const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

// Rota inicial
app.get('/', (req, res) => {
    res.json({
        mensagem: '⚽ Bem-vindo à API da Copa!'
    });
});

// Rotas da Copa
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

// 404
app.use((req, res) => {
    res.status(404).json({
        sucesso: false,
        mensagem: `Rota '${req.url}' não encontrada.`
    });
});

// Tratamento de erros
app.use(errorHandler);

const PORTA = process.env.PORT || 3000;

app.listen(PORTA, () => {
    console.log('');
    console.log('🚀 ================================');
    console.log('🚀 API DA COPA ONLINE');
    console.log(`🚀 Porta: ${PORTA}`);
    console.log('🚀 ================================');
    console.log('');

    console.log('📋 Rotas disponíveis:');
    console.log('POST  /api/auth/register');
    console.log('POST  /api/auth/login');
    console.log('GET   /api/posts');
    console.log('POST  /api/posts');
    console.log('');
});

module.exports = app;