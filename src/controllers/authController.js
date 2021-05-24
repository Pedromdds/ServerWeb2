const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, { expiresIn: 31104000 });
}

router.post('/register', async (req, res) => {
    const { email } = req.body;
    try {

        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'Este Email já está cadastrado !' })

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id })
        });

    } catch (err) {
        return res.status(400).send({ error: 'Falha ao registrar' });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).send({ erro: 'Usuário não cadastrado !' });
    }

    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ erro: 'Senha inválida, tente novamente' });
    }

    user.password = undefined;

    res.send({
        user,
        token: generateToken({ id: user.id })
    });

});

router.get('/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).populate();
        return res.send({ user });
    } catch (err) {
        return res.status(400).send({ error: 'Erro' });
    }
});

module.exports = app => app.use('/auth', router);