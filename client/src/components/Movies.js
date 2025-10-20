import React from 'react';

const Movies = ({ movies, onFavorite, onDelete, isFavoritesPage }) => {
  const imdb = "https://imdb.com/title/";

  const handleFavoriteClick = async (imdbID) => {
    try {
      const response = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `imdbID=${imdbID}`,
      });
      if (response.ok) {
        alert("Film ajouté aux favoris !");
      } else {
        alert("Ce film est déjà dans vos favoris.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris:", error);
      alert("Une erreur est survenue.");
    }
  };

  const handleDeleteClick = async (imdbID) => {
    try {
      const response = await fetch('/api/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imdbID }),
      });
      if (response.ok) {
        alert("Film supprimé des favoris !");
        if (onDelete) {
          onDelete(imdbID);
        }
      } else {
        alert("Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Une erreur est survenue.");
    }
  };

  return (
    <div className="movies">
      {movies.map((movie) => (
        <div className="movie" key={movie.imdbID}>
          {!isFavoritesPage ? (
            <button onClick={() => handleFavoriteClick(movie.imdbID)} className="btn-favorite">
              <img src="https://api.iconify.design/mdi:star-circle.svg" alt="star" width="50" />
            </button>
          ) : (
            <button onClick={() => handleDeleteClick(movie.imdbID)} className="btn-delete">
              <img src="https://api.iconify.design/mdi:delete-circle.svg" alt="delete" width="50" />
            </button>
          )}
          <div className="movie-info">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://placehold.co/300x450/000000/FFF?text=Non+disponible"
              }
              alt={movie.Title}
            />
            <h3>{movie.Title}</h3>
            <p>
              Voir les détails
              <a href={imdb + movie.imdbID} target="_blank" rel="noopener noreferrer">
                IMDB
              </a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;