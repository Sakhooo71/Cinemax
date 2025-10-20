import { useEffect, useState } from "react";
import "../styles.css";
// Import du logo pour interpolation dans jsx
import cinemaxLogo from "../assets/cinemax-lg.png";

// Nos composants
import Search from "../components/Search";
import Movies from "../components/Movies";
import Nav from "../components/Nav"

export default function App() {
  // OMDB API
  const API = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

  // States (états)
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  // Fonction : searchMovies()
  const searchMovies = async (searchValue) => {
    try {
      const response = await fetch(API + "&s=" + searchValue);
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
        setError(null);
      } else {
        setMovies([]);
        setError('Aucun film trouvé pour cette recherche.');
      }
    } catch (error) {
      setError('Impossible de charger les films.');
      console.error('Erreur lors de la recherche de films:', error);
    }
  };
  //useEffect pour lancer la rechcerche des films
  useEffect(() => {
    searchMovies("Hunger Games");
  }, []);
  return (
    <>
      
      <Nav />
        <header>
          <img src={cinemaxLogo} className="logo" alt="logo cinema" />
            <Search
              search={search}
              setSearch={setSearch}
              searchMovies={searchMovies}
            />
        </header>
        <main>
          {error && <p className="error">{error}</p>}
          <Movies movies={movies} isFavoritesPage={false} />
        </main>
      
    </>
  );
}