import React from "react";

// Cec composant représenete la barre de recherche
const Search = ({ search, setSearch, searchMovies }) => {
  // On parametre la fonction handleSubmit pour récupérer la valeur
  const handleSubmit = (e) => {
    e.preventDefault();
    // On affecte la valeur à la fonction de recherche
    searchMovies(search);
  };
  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Quel film recherchez-vous ?"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn" type="submit" >Rechercher</button>
      </form>
    </div>
  );
};

export default Search;