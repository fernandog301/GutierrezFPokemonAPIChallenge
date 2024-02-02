const saveToLocalStorage = (pokemon) => {
    let favorites = getLocalStorage();

    let save
    if(!favorites.includes(pokemon)){
        favorites.push(pokemon);
    }
    localStorage.setItem("Favorites", JSON.stringify(favorites));

}
const getLocalStorage = () => {
    let localStorageData = localStorage.getItem("Favorites");

    if(localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData);

}

const removeFromLocalStorage = (pokemon) => {
    let saved = getLocalStorage();

    let namedIndex = saved.indexOf(pokemon);

    
    saved.splice(namedIndex, 1);
    
    localStorage.setItem("Favorites", JSON.stringify(saved));
}

export {saveToLocalStorage, getLocalStorage, removeFromLocalStorage};