
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const app = express();
// Créer un nouvel utilisateur
app.post('/register', (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    user.save((err, result) => {
        if (err) {
            console.log('Erreur lors de la création de l\'utilisateur :', err);
            res.status(500).send('Erreur lors de la création de l\'utilisateur');
        } else {
            res.send(result);
        }
    });
});

// Récupérer tous les utilisateurs
app.get('/users', (req, res) => {
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
app.get('/users/:id', (req, res) => {
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
app.put('/users/:id', (req, res) => {
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
app.delete('/users/:id', (req, res) => {
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
