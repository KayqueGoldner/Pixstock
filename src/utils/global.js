/**
 * Transição de carregamento
 */

window.addEventListener("loadstart", function() {
  document.body.style.opacity = "0";
});

window.addEventListener("DOMContentLoaded", function() {
  document.body.style.opacity = "1";
});


/**
 * criar dados no localStorage na primeira visita
 */

if(!window.localStorage.getItem("favorites")) {
  const favoriteObj = {
    photos: {},
    videos: {}
  }

  window.localStorage.setItem("favorites", JSON.stringify(favoriteObj));
}

if(!window.localStorage.getItem("search_history")) {
  const historyList = { items: [] };

  window.localStorage.setItem("search_history", JSON.stringify(historyList));
}

