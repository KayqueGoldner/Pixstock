import rippleEffect from "./ripple.js";
import { favorite } from "./favorite.js";

export const imageCard = (element) => {
  const favoriteObj = JSON.parse(localStorage.getItem("favorites"));
  const card = document.createElement("div");
  card.classList.add("grid-item", "btn-ripple");
  card.innerHTML = `
    <figure class="card-banner" style="--width: ${element.width};--height: ${element.height};">
      <img src="${element.src.large}" width="${element.width}" height="${element.height}" loading="lazy" />
    </figure>
    <div class="card-content">
      <button class="card-btn${favoriteObj.photos[element.id] ? " active" : ""}" data-favorite-toggler>
        <span class="material-symbols-outlined" aria-hidden="true">favorite</span>
      </button>
    </div>
    <a href="/imagens/${element.id}" class="card-link"></a>
  `;

  const favoriteBtn = card.querySelector("[data-favorite-toggler]");
  favoriteBtn.addEventListener("click", function() {
    this.classList.toggle("active");
  });
  favorite(favoriteBtn, "photos", element.id);
  card.querySelector(".card-link").addEventListener("click", function(e) {
    rippleEffect(e);
  });

  return card;

}