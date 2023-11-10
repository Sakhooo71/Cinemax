/**
 * Serveur NodeJS avec Express pour gérer les requêtes HTTP
 * Application : Cinemax
 * Description : Application d'inspiration pour trouver des films et les ajouter à une liste de favoris
 * Auteur : Jensone
 */

// ------------------------- IMPORTS ------------------------- //
const express = require("express"); // Framework pour NodeJS
const app = express(); // Création de l'application
const cors = require("cors") // module pour gerer cors
const PORT = 3002 || 5000; // Définition du port d'écoute
const fs = require("fs"); // Module pour gérer les fichiers
const Save = require("./functions/Save");
const path = require('path'); // module pour gerer les chemins de fichiers
// const Delete = require("./functions/Delete"); // Importation de la fonction Delete



/**
 * Middleware
 * Le middleware est une fonction qui va être exécutée à chaque requête
 * elle va permettre de traiter les données avant de les envoyer au serveur
 * cela agit comme un filtre pour éviter les erreurs et définir des règles.
 * 
 * Dans notre cas, on va utiliser le middleware express.urlencoded qui va
 * nous permettre de récupérer les données envoyées par le formulaire.
 * 
 * Le paramètre extended à true permet de récupérer les données envoyées
 * par le formulaire sous la forme d'un objet.
 * 
 * par la meme occasion nous allons aussi mettre a disposition le CORS 
 * sur notre serveur apres l'avoir installé. On utilisera encore la méthode 
 * `.use` cela donnera accès à toutes les routes de notre serveur.
 * CORS = Cross Origin Resource Sharing 
 */


// ------------------------- ROUTES SERVER EXPRESS------------------------- //

// Route permettant de traiter l'enregistrement d'un film dans la liste des favoris
app.use(express.urlencoded({ extended: true }),cors());
// extention permettant au serveur de lire des requetes
app.use(express.json());  
// Définition du dossier build ou dist pour les fichiers statiques
app.use(express.static("./client/build"));
// Route permettant de traiter l'enregistrement d'un film dans la liste des favoris
app.post("/api/save", (req, res) => {
  const imdbID = req.body.imdbID // On récupère les données envoyées par le formulaire
  const saveStatus = Save(imdbID); // On appelle la fonction Save en lui envoyant les données
  // Vérification du statut de la fonction Save
  if(saveStatus) {
    res.redirect("/favorites?message=votre+favoris+a+bien+été+ajouté")
  } 
});

// route d'accès aux données de data.json

app.get("/api/favorites", (req, res) => {
  res.sendFile(__dirname + "/data.json");
});



// Route permettant de traiter la suppression d'un film dans la liste des favoris
app.post("/api/delete", (req, res) => {
  const imdbID = req.body // On récupère les données envoyées par le formulaire
  Delete(imdbID); // On appelle la fonction Delete en lui envoyant les données
});

// ------------------------- ROUTES CLIENT------------------------- //

// route principale qui redirige vers l'app React
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
})

/** Lancement du serveur
* La méthode listen permet de lancer le serveur sur le port défini
* dans la constante PORT
*/
app.listen(PORT, () => console.log("Le serveur est lancé sur le port " + PORT));