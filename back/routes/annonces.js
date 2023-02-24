const express = require('express');
const Annonce = require('../models/Annonce');
const app = express();
const router = express.Router();

// Créer une nouvelle annonce
app.post('/annonces', (req, res) => {
    const annonce = new Annonce({
        titre: req.body.titre,
        description: req.body.description,
        prix: req.body.prix,
        utilisateurId: req.body.utilisateurId
    });
    annonce.save((err, result) => {
        if (err) {
            console.log('Erreur lors de la création de l\'annonce :', err);
            res.status(500).send('Erreur lors de la création de l\'annonce');
        } else {
            res.send(result);
        }
    });
});

// Récupérer toutes les annonces

module.exports = router;
