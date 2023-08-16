const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.login = async (req, res) => {
    try {
        const secret = process.env.JWT_SECRET || crypto.randomBytes(48).toString('hex');
        const { email, senha } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ error: 'Usuário não encontrado' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(senha, user.senha);

        if (!isPasswordValid) {
            res.status(401).json({ error: 'Senha inválida' });
            return;
        }

        const token = jwt.sign(
            {
                id: user._id,
                nome: user.nome,
            },
            secret,
            { expiresIn: '7d' }
        );

        const userWithoutPassword = { ...user._doc };
        delete userWithoutPassword.senha;

        res.json({
            message: 'Login realizado com sucesso!',
            token,
            user: user._doc
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Falha no login' });
    }
};
