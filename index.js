const express = require('express');
const app = express();

app.use(express.json());

let mensagens = [];

// Rota GET - Buscar mensagens
app.get('/chat', (req, res) => {
    res.json(mensagens);
});

// Rota POST - Enviar mensagem
app.post('/chat', (req, res) => {
    const { usuario, texto } = req.body;
    
    if (!usuario || !texto) {
        return res.status(400).json({ erro: "Usuário e texto são obrigatórios" });
    }

    const novaMensagem = {
        usuario: usuario,
        texto: texto,
        timestamp: Date.now()
    };

    mensagens.push(novaMensagem);

    // Mantém apenas as últimas 50 mensagens
    if (mensagens.length > 50) {
        mensagens.shift();
    }

    res.status(201).json({ status: "ok" });
});

// Rota raiz (para teste)
app.get('/', (req, res) => {
    res.send('Chat server is running! Use /chat');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
