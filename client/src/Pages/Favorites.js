import React, { useEffect, useState } from 'react';
import Movies from '../components/Movies';
import Nav from '../components/Nav';

const Favorites = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('/api/favorites');
      if (!response.ok) {
        throw new Error('La requête a échoué');
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      setError('Impossible de charger les favoris.');
      console.error('Erreur lors de la récupération des favoris:', error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleDelete = (imdbID) => {
    setMovies(movies.filter((movie) => movie.imdbID !== imdbID));
  };

  return (
    <>
      <Nav />
      <h1>Favorites</h1>
      {error && <p className="error">{error}</p>}
      <div>
        <Movies movies={movies} onDelete={handleDelete} isFavoritesPage={true} />
      </div>
    </>
  );
};

export default Favorites;
