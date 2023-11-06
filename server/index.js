// on charge express a fin de pouvoir s'en servir ds notre aplli
const express = require('express');

// on met express dans un constante
const app = express();

// ici on creer une route pour afficher un message simple
app.get('/api/movie', (req, res) => {
    res.send('Build something amazing! 🚀');
});


//on lance 
app.listen(5000, () => console.log('le serveur est lancé sur le port 5000'));