import rippleEffect from "./ripple.js";
import { favorite } from "./favorite.js";


export const videoCard = (element) => {
  const favoriteObj = JSON.parse(localStorage.getItem("favorites"));

  const {
    height,
    width,
    id,
    image,
    video_files
  } = element;
  const sdVideo = video_files.find(item => item.quality === "sd" && item.width < 1000);
  const { file_type, link } = sdVideo;

  const card = document.createElement("div");
  card.classList.add("grid-item");
  card.innerHTML = `
    <div
      class="card-banner"
      style="--width: ${width}; --height: ${height}"
    >
      <video
        poster="${image}"
        muted
        loop
        preload="none"
        data-video
      >
        <source src="${link}" type="${file_type}"></source>
      </video>
    </div>
    <div class="card-badge">
        <span class="material-symbols-outlined" aria-hidden="true">play_arrow</span>
      </div>
    <div class="card-content">
      <button class="card-btn ${favoriteObj.videos[id] ? "active" : ""}" data-favorite-toggler>
        <span class="material-symbols-outlined" aria-hidden="true">favorite</span>
      </button>
    </div>
    <a href="/videos/${element.id}" class="card-link btn-ripple"></a>
  `;

  const video = card.querySelector("[data-video]");
  const rippleBtn = card.querySelector(".btn-ripple");
  const favoriteBtn = card.querySelector("[data-favorite-toggler]");

  favoriteBtn.addEventListener("click", function() {
    this.classList.toggle("active");
  });

  favorite(favoriteBtn, "videos", element.id);
  rippleBtn.addEventListener("click", function(e) {
    rippleEffect(e);
  });

  let isPlaying;

  card.addEventListener("mouseover", () => {
    card.querySelector(".card-badge").classList.add("playing");
    video.play().then(res => {
      isPlaying = true;
    }).catch(err => {
      isPlaying = false;
    });;
  });

  card.addEventListener("mouseleave", () => {
    card.querySelector(".card-badge").classList.remove("playing");
    if(isPlaying) video.pause();
  });

  return card;

}