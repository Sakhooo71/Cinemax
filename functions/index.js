require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const Save = require('./Save');
const Delete = require('./delete');

const PORT = process.env.PORT || 3002;
const OMDB_API_KEY = process.env.OMDB_API_KEY;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));

app.post('/api/save', (req, res) => {
  const { imdbID } = req.body;
  const saveStatus = Save(imdbID);
  if (saveStatus) {
    res.status(200).json({ message: 'Favori ajouté avec succès' });
  } else {
    res.status(409).json({ message: 'Ce film est déjà dans vos favoris.' });
  }
});

app.get('/api/favorites', async (req, res) => {
  try {
    const data = fs.readFileSync('./data.json', 'utf8');
    const favoritesData = JSON.parse(data);
    const favoriteMovies = [];

    for (const fav of favoritesData.favorites) {
      const response = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${fav.id}`);
      const movieData = await response.json();
      favoriteMovies.push(movieData);
    }

    res.json(favoriteMovies);
  } catch (error) {
    console.error('Erreur lors de la récupération des favoris:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

app.post('/api/delete', (req, res) => {
  const { imdbID } = req.body;
  const deleteStatus = Delete({ imdbID });
  if (deleteStatus) {
    res.status(200).json({ message: 'Favori supprimé avec succès' });
  } else {
    res.status(404).json({ message: 'Favori non trouvé' });
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => console.log(`Le serveur est lancé sur le port ${PORT}`));
