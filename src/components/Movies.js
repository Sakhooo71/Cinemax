import React from "react";

// Cec composant représenete la barre de recherche
const Movies = ({ movies }) => {
  // Lien IMDB
  const imdb = "https://www.imdb.com/title/";

  return (
    <div className="movies">
      {movies.map((movie) => (
        <div className="movie" key={movie.imdbID}>
          <div className="movie-info">
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : " https://placehold.co/300x450/000000/FFF?text=Non+disponible"
              }
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>
              Voir les détails{" "}
              <a href={imdb + movie.imdbID} target="_blank"></a>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Movies;
