const express = require('express');
const bodyParser = require('body-parser');
const videoRoutes = require('./routes/videoRoutes');
const imageRoutes = require('./routes/imageRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const db = require('./config/db');

const app = express();

app.use(bodyParser.json());

app.use('/video', videoRoutes);
app.use('/imagem', imageRoutes);
app.use('/usuario', userRoutes);
app.use('/produto', productRoutes);
app.use('/login', authRoutes);

app.get('/status', (req, res) => {
    res.status(200).json({
        status: 200,
        api: "A API está saudável"
    });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada. Por favor, verifique a URL e tente novamente.' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
