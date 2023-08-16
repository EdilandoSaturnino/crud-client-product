const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conectado ao MongoDB'))
  .catch((error) => console.error('Falha na conexão:', error));