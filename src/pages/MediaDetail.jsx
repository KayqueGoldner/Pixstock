import { useEffect, useRef } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

import "./MediaDetail.css";
import { client } from "../utils/api";
import { gridInit, updateGrid } from "../utils/masonry_grid";
import { imageCard } from "../utils/imageCard";
import { handleFavorite } from "../utils/favorite";
import { HiArrowLeft } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";

const MediaDetail = () => {
  const { data: mediaData, similar, content, title, isFavorite } = useLoaderData();
  const menuRef = useRef();
  const similarGrid = useRef();
  const favoriteBtnRef = useRef();

  const {
    width,
    height,
    image,
    user,
    video_files
  } = mediaData;

  const hdVideo = video_files?.find(item => item.quality === "hd");

  const openMenu = () => {
    if(menuRef.current) {
      menuRef.current.classList.toggle("expanded");
    }
  }

  const handleRenderCards = (content, { $columns: columns, columnsHeight: columnsHeight }) => {
    content.map(item => {
      return updateGrid(imageCard(item), columnsHeight, columns);
    });
  }

  const handleFavoriteBtn = async () => {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    favoriteBtnRef.current.classList.toggle("active");

    if(favorites[content][mediaData.id]) {
      delete favorites[content][mediaData.id];
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      const data = await client[content].detail(mediaData.id);
      favorites[content][mediaData.id] = data;
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }

  useEffect(() => {
    const initRender = async () => {
      if(mediaData.src && similarGrid.current) {
        const layout = await gridInit(similarGrid.current);
        handleRenderCards(similar, layout);
      };
    }

    initRender();
  }, []);


  return (
    <section className="mediaDetail">
      <div className="container">

        <div className="mediaDetail-wrapper">
          <div className="mediaDetail-header">

            <button className="btn-primary mediaDetail-back" onClick={() => window.history.back()}>
              <HiArrowLeft size={25} />
            </button>
            <Link 
              to={mediaData.photographer_url || mediaData.user.url} 
              target="_blank" 
              className="mediaDetail-title body-large btn-primary"
              title={title}
            >
              <AiOutlineUser size={23} />
            </Link>

            <div className="mediaDetail-actions btn-primary">
              <Link 
                className="action-link label-large" 
                to={mediaData.src && mediaData.src.original || hdVideo.link}
              >
                Download
              </Link>

              <button
                className="actions-menu"
                onClick={openMenu}>
                <FiChevronDown size={20} />
              </button>

              <div className="menu" ref={menuRef}>
                {mediaData.src ? 
                  Object.entries(mediaData.src).map(([key, val]) => (
                    <Link to={val} target="_blank" className="menu-link label-large" key={key}>{key}</Link>
                  ))
                  :
                  mediaData.video_files.map((val) => (
                    <Link to={val["link"]} target="_blank" className="menu-link label-large" key={val["id"]}>
                      <span className="span">{val["quality"]}</span>
                      {val["width"]}x{val["height"]}
                    </Link>
                  ))
                }
              </div>
            </div>

          </div>

          {mediaData.src ? (
            <figure className="mediaDetail-banner" style={{ aspectRatio: `${mediaData.width} / ${mediaData.height}` }}>
              <img src={mediaData.src.original} width={mediaData.width} height={mediaData.height} alt={mediaData.alt} />
              <button className={`card-btn ${isFavorite}`} ref={favoriteBtnRef} onClick={handleFavoriteBtn}>
                <span className="material-symbols-outlined" aria-hidden="true">favorite</span>
              </button>
            </figure>
          ) : (
            <div className="mediaDetail-banner" style={{ aspectRatio: `${width} / ${height}` }}>
              <video className="mediaDetail-banner img-cover" typeof={hdVideo.file_type} poster={image} src={hdVideo.link} controls></video>
              <button className={`card-btn ${isFavorite}`} ref={favoriteBtnRef} onClick={handleFavoriteBtn}>
                <span className="material-symbols-outlined" aria-hidden="true">favorite</span>
              </button>
            </div>
          )}
        </div>
        
        {mediaData.src && similar?.length > 0 && (
          <div className="mediaDetail-subcontent">
            <h1 className="subcontent-title title-large">Sugestões relacionadas</h1>
            <div className="subcontent-grid layout-grid" ref={similarGrid}></div>
          </div>
        )}

      </div>
    </section>
  )
}

export default MediaDetail