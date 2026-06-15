const express = require('express');
const app = express();
app.use(express.json());

let mensagens = [];

app.get('/chat', (req, res) => res.json(mensagens));

app.post('/chat', (req, res) => {
    const { usuario, texto } = req.body;
    const novaMensagem = { usuario, texto, timestamp: Date.now() };
    mensagens.push(novaMensagem);
    setTimeout(() => {
        mensagens = mensagens.filter(m => m !== novaMensagem);
    }, 120000);
    res.status(201).send('Ok');
});

app.listen(process.env.PORT || 3000);
