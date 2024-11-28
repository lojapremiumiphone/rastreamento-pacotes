const express = require('express'); // Importa o Express
const bodyParser = require('body-parser');
const path = require('path');

const app = express(); // Cria a aplicação Express
const PORT = process.env.PORT || 3000; // Usa a porta definida pelo Render ou 3000 como fallback

// Configuração do servidor
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Exemplo de rota básica
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia o servidor e trata erros de forma robusta
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Erro: A porta ${PORT} já está em uso.`);
    } else {
        console.error(`Erro ao iniciar o servidor: ${err.message}`);
    }
    process.exit(1); // Sai do processo em caso de erro
});






// Banco de dados simulado
const trackingDB = {
    "ABC123": {
        status: "Em trânsito",
        endereco: "Rua das Flores, 123, São Paulo - SP",
        destinatario: "João Silva",
        dataEntrega: "05/12/2024",
        transportadora: "Transportadora Express"
    },
    "DEF456": {
        status: "Em processamento",
        endereco: "Avenida Paulista, 900, São Paulo - SP",
        destinatario: "Maria Oliveira",
        dataEntrega: "10/12/2024",
        transportadora: "Transportadora Express"
    },
    "GHI789": {
        status: "Entrega concluída",
        endereco: "Rua das Palmeiras, 45, Rio de Janeiro - RJ",
        destinatario: "Carlos Eduardo",
        dataEntrega: "01/12/2024",
        transportadora: "Transportadora Express"
    },
    "JKL101": {
        status: "Aguardando pagamento de taxas",
        endereco: "Rua do Comércio, 789, Salvador - BA",
        destinatario: "Fernanda Lima",
        dataEntrega: "Indefinida - aguardando pagamento",
        transportadora: "Transportadora Express",
        observacao: "O pacote foi taxado pela fiscalização. Efetue o pagamento das taxas para liberá-lo.",
        qrCode: "pix.png" // Caminho do QR Code para pagamento
    }
};

// Configurar o servidor para entender JSON
app.use(bodyParser.json());

// Configurar a pasta de arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir o arquivo index.html na raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para rastrear pacotes
app.post('/rastrear', (req, res) => {
    const { code } = req.body;

    if (trackingDB[code]) {
        res.json(trackingDB[code]); // Retorna os detalhes do pacote
    } else {
        res.status(404).json({ message: "Código de rastreio não encontrado." });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// AOS.init();

