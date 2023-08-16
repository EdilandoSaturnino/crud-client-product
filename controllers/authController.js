const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const user = await User.findOne({ nome, email });

        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if (!isPasswordValid) {
            res.status(401).json({ error: 'Senha inválida' });
            return;
        }

        res.json({ message: 'Login realizado com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: 'Falha no login' });
    }
};
