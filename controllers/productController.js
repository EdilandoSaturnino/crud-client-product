const Product = require("../models/Product");
const User = require('../models/User');


exports.createProduct = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const produto = new Product(req.body);
        const novoProduto = await produto.save();

        return res.status(201).json(novoProduto);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Falha ao criar o produto' });
    }
};


exports.getProductsByClient = async (req, res) => {
    try {
        const clientId = req.params.clientId;
        console.log("Buscando produtos para o cliente:", clientId);
        const products = await Product.find({ userId: clientId });
        console.log("Produtos encontrados:", products);
        if (products.length === 0) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        }
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Falha ao buscar os produtos' });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const produtos = await Product.find();
        res.json(produtos);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao recuperar produtos' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Product.findOne({ id });
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (err) {
        res.status(500).json({ error: 'Falha ao recuperar produto' });
    }
};