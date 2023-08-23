import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";

import "./main.css";
import "./utils/global";

/**
 * Components
 */
import Layout from "./components/Layout";
import Home from "./pages/Home";
import MediaList from "./pages/MediaList";

/**
 * Loaders
 */
import {
  collectionLoader,
  collectionsLoader, 
  favoritesLoader, 
  homeLoader, 
  imagemLoader, 
  mediaLoader, 
  searchLoader, 
  videoLoader, 
  videosLoader
} from "./utils/loaders";
import Favorites from "./pages/Favorites";
import MediaDetail from "./pages/MediaDetail";
import NotFound from "./pages/NotFound";


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<Home />} loader={homeLoader} />

    <Route path="imagens" element={<MediaList />} loader={mediaLoader} />
    <Route path="imagens/:imagemId" element={<MediaDetail />} loader={imagemLoader} errorElement={<NotFound />} />

    <Route path="videos" element={<MediaList />} loader={videosLoader} />
    <Route path="videos/:videoId" element={<MediaDetail />} loader={videoLoader} errorElement={<NotFound />} />

    <Route path="colecoes" element={<MediaList />} loader={collectionsLoader}/ >
    <Route path="colecoes/:collectionId" element={<MediaList />} loader={collectionLoader} errorElement={<NotFound />} />

    <Route path="favoritos" element={<Favorites />} loader={favoritesLoader} />

    <Route path="pesquisar/:query" element={<MediaList />} loader={searchLoader} errorElement={<NotFound />} />

    <Route path="*" element={<NotFound />} />
  </Route>
));

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

createRoot(document.getElementById("root")).render(
  <App />
);

