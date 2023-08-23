export const collectionCard = (element) => {

  const card = document.createElement("div");
  card.classList.add("collection-grid");

  card.innerHTML = `
    <a href="colecoes/${element.id}" class="grid-link">
      <h3 class="grid-title title-medium">${element.title}</h3>
      <p class="grid-subtitle body-medium">${element.media_count} media</p>
    </a>
  `;

  return card;

}