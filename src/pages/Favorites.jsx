import { useState, useRef, useEffect } from "react";
import { useLoaderData } from "react-router-dom";

import "./MediaList.css";
import { gridInit, updateGrid } from "../utils/masonry_grid";
import { imageCard } from "../utils/imageCard";
import { videoCard } from "../utils/videoCard";
import { SlPicture } from "react-icons/sl";
import { BsCameraVideo } from "react-icons/bs";
import rippleEffect from "../utils/ripple";

const Favorites = () => {
  const { data: mediaData, content, title } = useLoaderData();
  const [filter, setFilter] = useState("photos");
  const layoutContainer = useRef(null);

  const handleRenderCards = ({ $columns: columns, columnsHeight: columnsHeight }) => {
    Object.entries(mediaData[filter]).map(item => {
      if(item[1].src) return updateGrid(imageCard(item[1], true), columnsHeight, columns);
      if(item[1].video_files) return updateGrid(videoCard(item[1], true), columnsHeight, columns);
    });
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
      if(layoutContainer.current) {
        const layout = await gridInit(layoutContainer.current);
        handleRenderCards(layout);
      }
    }
  
    initRender();
  }, [filter]);

  return (
    <section className="images-container">
      <div className="container">

        <h1 className="images-title headline-large">{title}</h1>

          <div className="btn-group">
          
            <button 
              className={`btn-filter ${filter === "photos" ? "active" : ""}`}
              onClick={(e) => {
                rippleEffect(e);
                setFilter("photos");
              }}
            >
              <SlPicture size={18} />
              <span className="span body-medium">Imagens</span>
            </button>
            
            <button 
              className={`btn-filter ${filter === "videos" ? "active" : ""}`}
              onClick={(e) => {
                rippleEffect(e);
                setFilter("videos");
              }}
            >
              <BsCameraVideo size={18} />
              <span className="span body-medium">Vídeos</span>
            </button>

          </div>
        
        <div className="layout-grid" key={filter} ref={layoutContainer}></div>

      </div>
    </section>
  )
}

export default Favorites;