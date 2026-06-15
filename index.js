const express = require('express');
const app = express();

app.use(express.json());

// Array que guarda as mensagens
let mensagens = [];

// ===================== ROTAS =====================

// Buscar mensagens (GET)
app.get('/chat', (req, res) => {
    res.json(mensagens);   // ← Importante: sempre retornar JSON
});

// Enviar mensagem (POST)
app.post('/chat', (req, res) => {
    const { usuario, texto } = req.body;

    if (!usuario || !texto) {
        return res.status(400).json({ erro: "Usuário e texto são obrigatórios" });
    }

    mensagens.push({
        usuario: usuario,
        texto: texto,
        timestamp: Date.now()
    });

    // Limita o histórico (máximo 30 mensagens)
    if (mensagens.length > 30) {
        mensagens.shift();
    }

    res.status(201).json({ status: "ok" });
});

// Rota de teste
app.get('/', (req, res) => {
    res.send('Chat Server Online - Use /chat');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
