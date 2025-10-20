const fs = require('fs');

const Delete = (movieID) => {
    let status = false;
    try {
        const data = fs.readFileSync('./data.json', 'utf8');
        const favoritesData = JSON.parse(data);
        
        const initialLength = favoritesData.favorites.length;
        favoritesData.favorites = favoritesData.favorites.filter(fav => fav.id !== movieID.imdbID);
        const finalLength = favoritesData.favorites.length;

        if (initialLength > finalLength) {
            fs.writeFileSync('./data.json', JSON.stringify(favoritesData, null, 2));
            status = true;
        }
    } catch (error) {
        console.error('Erreur lors de la suppression du favori :', error);
        throw error;
    }
    return status;
};

module.exports = Delete;
