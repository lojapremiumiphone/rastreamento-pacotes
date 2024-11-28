const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs'); // Para manipular arquivos

// Função para carregar os dados do arquivo JSON
const loadTrackingData = () => {
    const data = fs.readFileSync('./trackingData.json', 'utf8'); // Lê o arquivo JSON
    return JSON.parse(data); // Converte o conteúdo para um objeto JavaScript
};

// Cria a aplicação Express
const app = express();

// Porta dinâmica para Render ou localhost
const PORT = process.env.PORT || 3000;

// Middleware para interpretar JSON e servir arquivos estáticos
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota inicial para exibir o front-end
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para rastrear pacotes
app.post('/rastrear', (req, res) => {
    const { code } = req.body; // Extrai o código de rastreio do corpo da requisição
    const trackingDB = loadTrackingData(); // Carrega os dados do JSON

    // Verifica se o código existe no banco de dados
    if (trackingDB[code]) {
        res.json(trackingDB[code]); // Retorna os detalhes do pacote
    } else {
        res.status(404).json({ message: "Código de rastreio não encontrado." }); // Retorna erro se não encontrado
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
