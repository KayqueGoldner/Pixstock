import { useRef, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";

import "./Home.css";
import photoBanner1 from "../assets/images/photo-banner-1.jpg";
import photoBanner2 from "../assets/images/photo-banner-2.jpg";
import photoBanner3 from "../assets/images/photo-banner-3.jpg";
import photoBanner4 from "../assets/images/photo-banner-4.jpg";
import photoBanner5 from "../assets/images/photo-banner-5.jpg";
import photoBanner6 from "../assets/images/photo-banner-6.jpg";
import videoBanner1 from "../assets/videos/video-banner-1.mp4";
import videoBanner2 from "../assets/videos/video-banner-2.mp4";
import videoBanner3 from "../assets/videos/video-banner-3.mp4";
import videoBanner4 from "../assets/videos/video-banner-4.mp4";
import videoBanner5 from "../assets/videos/video-banner-5.mp4";
import videoBanner6 from "../assets/videos/video-banner-6.mp4";
import collectionBanner1 from "../assets/images/collection-banner-1.jpg";
import collectionBanner2 from "../assets/videos/collection-banner-2.mp4";
import collectionBanner3 from "../assets/images/collection-banner-3.jpg";
import collectionBanner4 from "../assets/images/collection-banner-4.jpg";
import collectionBanner5 from "../assets/videos/collection-banner-5.mp4";
import collectionBanner6 from "../assets/videos/collection-banner-6.mp4";
import { gridInit, updateGrid } from "../utils/masonry_grid";
import { imageCard } from "../utils/imageCard";
import { videoCard } from "../utils/videoCard";
import { collectionCard } from "../utils/collectionCard";

const Home = () => {
  const { curatedPhotos, popularVideos, collection } = useLoaderData();
  const layoutContainer = useRef();
  const imagesContainer = useRef();
  const videosContainer = useRef();
  const collectionContainer = useRef();

  const handleRenderCards = ({ $columns: columns, columnsHeight: columnsHeight }, container) => {
    switch(container) {
      case("images"):
        curatedPhotos.photos.map((item, i) => {
          updateGrid(imageCard(item), columnsHeight, columns);
        });
        break;
      case("videos"):
        popularVideos.videos.map((item, i) => {
          updateGrid(videoCard(item), columnsHeight, columns);
        });
        break;
      case("collection"):
        collection.collections.map((item, i) => {
          updateGrid(collectionCard(item), columnsHeight, columns);
        });
        break;
    }
  }

  useEffect(() => {
    if(layoutContainer.current) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
    const initRender = async () => {
      if(imagesContainer.current && videosContainer.current && collectionContainer.current) {
        const imagesLayout = await gridInit(imagesContainer.current);
        const videosLayout = await gridInit(videosContainer.current);
        const collectionLayout = await gridInit(collectionContainer.current);
        handleRenderCards(imagesLayout, "images");
        handleRenderCards(videosLayout, "videos");
        handleRenderCards(collectionLayout, "collection");
      }
    }
  
    initRender();
  }, []);

  return (
    <>
      <section className="banner" aria-label="Banner" ref={layoutContainer}>

          <div className="banner-card primary">

            <div className="card-content">

              <h3 className="headline-medium card-title">Imagens de alta qualidade sem custo algum!</h3>

              <p className="body-large card-text">
                Explore nossa excepcional coleção de imagens.
              </p>

              <Link to="imagens" className="btn btn-primary">
                <span className="label-large text">Explorar</span>

                <div className="state-layer"></div>
              </Link>

            </div>

            <div className="card-grid">

              <div className="card-banner" style={{gridArea: "b1", backgroundImage: `url(${photoBanner1})`}}></div>

              <div className="card-banner" style={{gridArea: "b2", backgroundImage: `url(${photoBanner2})`}}></div>

              <div className="card-banner" style={{gridArea: "b3", backgroundImage: `url(${photoBanner3})`}}></div>

              <div className="card-banner" style={{gridArea: "b4", backgroundImage: `url(${photoBanner4})`}}></div>

              <div className="card-banner" style={{gridArea: "b5", backgroundImage: `url(${photoBanner5})`}}></div>

              <div className="card-banner" style={{gridArea: "b6", backgroundImage: `url(${photoBanner6})`}}></div>

            </div>

          </div>

          <div className="banner-card secondary">

            <div className="card-content">

              <h3 className="headline-medium card-title">Vídeos de alta classificação sem custo algum!</h3>

              <p className="body-large card-text">
                Nossa seleção criteriosa de vídeos certamente irá te inspirar e cativar.
              </p>

              <Link to="videos" className="btn btn-secondary">
                <span className="label-large text">Explorar</span>

                <div className="state-layer"></div>
              </Link>

            </div>

            <div className="card-grid">

              <div className="card-banner" style={{ gridArea: "b1" }}>
                <video src={videoBanner1} width="360" height={420} loading="lazy" autoPlay muted loop className="video"></video>
              </div>

              <div className="card-banner" style={{ gridArea: "b2" }}>
                <video src={videoBanner2} width="360" height={640} loading="lazy" autoPlay muted loop className="video"></video>
              </div>

              <div className="card-banner" style={{ gridArea: "b3" }}>
                <video src={videoBanner3} width="480" height={360} loading="lazy" autoPlay muted loop className="video"></video>
              </div>

              <div className="card-banner" style={{ gridArea: "b4" }}>
                <video src={videoBanner4} width="360" height={640} loading="lazy" autoPlay muted loop className="video"></video>
              </div>

              <div className="card-banner" style={{ gridArea: "b5" }}>
                <video src={videoBanner5} width="640" height={360} loading="lazy" autoPlay muted loop className="video"></video>
              </div>

              <div className="card-banner" style={{ gridArea: "b6" }}>
                <video src={videoBanner6} width="480" height={360} loading="lazy" autoPlay muted loop className="video"></video>
              </div>


            </div>

          </div>

          <div className="banner-card tertiary">

            <div className="card-content">

              <h3 className="headline-medium card-title">Melhores coleções com as melhores mídias!</h3>

              <p className="body-large card-text">
                Descubra um tesouro de imagens deslumbrantes e vídeos cativantes.
              </p>

              <Link to="colecoes" className="btn btn-tertiary">
                <span className="label-large text">Explorar</span>

                <div className="state-layer"></div>
              </Link>

            </div>

            <div className="card-grid">

              <div className="card-banner" style={{gridArea: "b1", backgroundImage: `url(${collectionBanner1})`}}></div>

              <div className="card-banner" style={{ gridArea: "b2" }}>
                <video src={collectionBanner2} width="360" height={420} loading="lazy" autoPlay muted loop className="video"></video>
              </div>

              <div className="card-banner" style={{gridArea: "b3", backgroundImage: `url(${collectionBanner3})`}}></div>

              <div className="card-banner" style={{gridArea: "b4", backgroundImage: `url(${collectionBanner4})`}}></div>

              <div className="card-banner" style={{ gridArea: "b5" }}>
                <video src={collectionBanner5} width="640" height={360} loading="lazy" autoPlay muted loop className="video"></video>
              </div>

              <div className="card-banner" style={{ gridArea: "b6" }}>
                <video src={collectionBanner6} width="640" height={338} loading="lazy" autoPlay muted loop className="video"></video>
              </div>

            </div>

          </div>

      </section>

      <section className="section featured-section">
        <h1 className="title-large">Adicione aos favoritos</h1>
        <div className="layout-grid" ref={imagesContainer}></div>
        <div className="overlay-btn">
          <Link to="imagens" className="btn btn-primary">Explorar</Link>
        </div>
      </section>

      <section className="section popular-video">
        <h1 className="title-large">Vídeos populares</h1>
        <div className="layout-grid" ref={videosContainer}></div>
        <div className="overlay-btn">
          <Link to="videos" className="btn btn-primary">Explorar</Link>
        </div>
      </section>

      <section className="section collection">
        <h1 className="title-large">Coleções em destaque</h1>
        <div className="layout-grid" ref={collectionContainer}></div>
        <div className="overlay-btn">
          <Link to="colecoes" className="btn btn-primary">Explorar</Link>
        </div>
      </section>
    </>
  )
}

export default Home;