import { client } from "./api";
import { handleFavorite } from "./favorite";


export const homeLoader = async () => {
  return {
    curatedPhotos: await client.photos.curated({ page: 1, per_page: 20 }),
    popularVideos: await client.videos.popular({ per_page: 20 }),
    collection: await client.collections.featured({ per_page: 18 })
  };
}

export const mediaLoader = async () => {
  return {
    data: await client.photos.curated({ per_page: 30, page: 1 }),
    content: "photos",
    title: "imagens"
  };
}

export const imagemLoader = async ({ params }) => {
  const response = await client.photos.detail(params.imagemId);
  const favorite = handleFavorite(response.id, "photos");
  let similar;
  if(response.alt) similar = await client.photos.search({ query: response.alt, per_page: 30, page: 1 });
  return {
    data: response,
    similar: similar?.photos,
    content: "photos",
    title: response.photographer,
    isFavorite: favorite ? "active" : ""
  };
}

export const videoLoader = async ({ params }) => {
  const response = await client.videos.detail(params.videoId);
  const favorite = handleFavorite(response.id, "videos");
  return {
    data: response,
    content: "videos",
    title: response.user.name,
    isFavorite: favorite ? "active" : ""
  };
}

export const videosLoader = async () => {
  return {
    data: await client.videos.popular({ per_page: 30, page: 1 }),
    content: "videos",
    title: "vídeos"
  };
}

export const collectionsLoader = async () => {
  return {
    data: await client.collections.featured({ per_page: 30, page: 1 }),
    content: "collections",
    title: "Coleções"
  };
}

export const collectionLoader = async ({ params }) => {
  const data = await client.collections.detail(params.collectionId, { per_page: 30, page: 1 });
  return {
    data: data,
    content: "media",
    title: "Coleção"
  };
}

export const favoritesLoader = async () => {
  return {
    data: await JSON.parse(localStorage.getItem("favorites")),
    content: "favorites",
    title: "Favoritos"
  };
}

export const searchLoader = async ({ request }) => {
  const url = new URL(request.url);
  const searchQuery = url.searchParams.get("query");
  const searchOrientation = url.searchParams.get("orientation");
  const searchSize = url.searchParams.get("size");
  const searchColor = url.searchParams.get("color");
  let searchType = url.searchParams.get("type");
  searchType = searchType === "imagens" ? "photos" : searchType;
  return {
    data: await client[searchType].search({
      query: searchQuery,
      orientation: searchOrientation,
      size: searchSize,
      color: searchColor,
      per_page: 30,
      page: 1
    }),
    content: searchType,
    title: searchQuery
  };
}
