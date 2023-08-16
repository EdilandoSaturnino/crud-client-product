const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const senhaHashed = await bcrypt.hash(senha, 10);

        const novoUsuario = await User.create({ email, senha: senhaHashed });
        return res.status(201).json({ msg: "Usuário criado com sucesso", user: novoUsuario });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao criar um usuário' });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao recuperar usuários' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { nome, email, senha } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, { nome, email, senha }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao atualizar usuário' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json({ message: 'Usuário deletado' });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao deletar usuário' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params; 
        const usuario = await User.findById(id);

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao recuperar usuário' });
    }
};


exports.deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany({});
        res.json({ message: 'Todos os usuários foram deletados' });
    } catch (err) {
        res.status(500).json({ error: 'Falha ao deletar todos usuários' });
    }
};

exports.getUserProducts = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('produtos');
        res.json(user.produtos);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao recuperar produtos' });
    }
};