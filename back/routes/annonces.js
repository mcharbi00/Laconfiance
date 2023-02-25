const express = require('express');
const router = express.Router();

// Importer le modèle d'annonce
const Ad = require('../models/Ad');

// Récupérer toutes les annonces
router.get('/ads', async (req, res) => {
    try {
        const ads = await Ad.find();
        res.json(ads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Créer une nouvelle annonce
router.post('/ads', async (req, res) => {
    const ad = new Ad({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        date: req.body.date,
        // Ajouter l'identifiant de l'utilisateur qui a créé l'annonce
        createdBy: req.user._id
    });

    try {
        const newAd = await ad.save();
        res.status(201).json(newAd);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Récupérer une annonce spécifique
router.get('/ads/:id', getAd, (req, res) => {
    res.json(res.ad);
});

// Mettre à jour une annonce
router.patch('/ads/:id', getAd, async (req, res) => {
    if (req.body.title != null) {
        res.ad.title = req.body.title;
    }
    if (req.body.description != null) {
        res.ad.description = req.body.description;
    }
    if (req.body.price != null) {
        res.ad.price = req.body.price;
    }
    try {
        const updatedAd = await res.ad.save();
        res.json(updatedAd);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Supprimer une annonce
router.delete('/ads/:id', getAd, async (req, res) => {
    try {
        await res.ad.remove();
        res.json({ message: 'Annonce supprimée' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware pour récupérer une annonce spécifique par son identifiant
async function getAd(req, res, next) {
    try {
        const ad = await Ad.findById(req.params.id);
        if (ad == null) {
            return res.status(404).json({ message: 'Annonce non trouvée' });
        }
        res.ad = ad;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;
