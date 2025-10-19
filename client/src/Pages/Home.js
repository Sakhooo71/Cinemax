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
  const API = "https://www.omdbapi.com/?apikey=78620d47";

  // States (états)
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  // Fonction : searchMovies()
  const searchMovies = async (searchValue) => {
    // Fetch de l'API OMDB
    const response = await fetch(API + "&s=" + searchValue);
    const data = await response.json();
    // On modifie le tableau si l'API retourne des données
    if (data.Search) {
      setMovies(data.Search);
    }
    console.log(data.Search);
    // Vérifier les infos reçu par l'API
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
          <Movies movies={movies} />
        </main>
      
    </>
  );
}
