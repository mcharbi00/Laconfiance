const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Créer un nouvel utilisateur
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Vérification si l'email est déjà utilisé
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "L'email est déjà utilisé." });
        }

        // Encryption du mot de passe
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        const newUser = await user.save();

        res.status(201).json(newUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur." });
    }
});
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Email ou mot de passe incorrect' });
        }

        res.status(200).json({ message: 'Login réussi' });
    } catch (err) {
        console.log('Erreur lors de la connexion de l\'utilisateur :', err);
        res.status(500).send('Erreur lors de la connexion de l\'utilisateur');
    }
});

// Récupérer tous les utilisateurs
router.get('/users', (req, res) => {
    User.find({}, (err, result) => {
        if (err) {
            console.log('Erreur lors de la récupération des utilisateurs :', err);
            res.status(500).send('Erreur lors de la récupération des utilisateurs');
        } else {
            res.send(result);
        }
    });
});

// Récupérer un utilisateur par son identifiant
router.get('/users/:id', (req, res) => {
    User.findById(req.params.id, (err, result) => {
        if (err) {
            console.log('Erreur lors de la récupération de l\'utilisateur :', err);
            res.status(500).send('Erreur lors de la récupération de l\'utilisateur');
        } else {
            res.send(result);
        }
    });
});

// Mettre à jour un utilisateur
router.put('/users/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }, (err, result) => {
        if (err) {
            console.log('Erreur lors de la mise à jour de l\'utilisateur :', err);
            res.status(500).send('Erreur lors de la mise à jour de l\'utilisateur');
        } else {
            res.send(result);
        }
    });
});

// Supprimer un utilisateur
router.delete('/users/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) {
            console.log('Erreur lors de la suppression de l\'utilisateur :', err);
            res.status(500).send('Erreur lors de la suppression de l\'utilisateur');
        } else {
            res.send(result);
        }
    });
});

module.exports = router;
