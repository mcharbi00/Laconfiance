const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const annonceRoutes = require('./routes/annonces')
const app = express();

mongoose.set('strictQuery', true);

// Middleware pour le parsing du body en JSON
app.use(express.json());

// Connexion à la base de données
mongoose.connect('mongodb+srv://mcharbi000:nzc5qs89@laconfiance.z2reyuf.mongodb.net/nom-de-votre-base-de-donnees?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connexion à la base de données établie avec succès'))
    .catch(err => console.error('Erreur de connexion à la base de données :', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/annonces', annonceRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
