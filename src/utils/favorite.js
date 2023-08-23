import { client } from "./api";

export function favorite(element, type, id) {
  element.addEventListener("click", async () => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));

    if(favorites[type][id]) {
      delete favorites[type][id];
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      const data = await client[type].detail(id);
      favorites[type][id] = data;
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    return favorites;
  })
}

export function handleFavorite(id, type) {
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  
  for(let item of Object.keys(favorites[type])) {
    if(favorites[type][item].id === id) {
      return true;
    }
  }
}