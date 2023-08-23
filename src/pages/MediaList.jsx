import { useState, useRef, useEffect } from "react";
import { useLoaderData, useMatches, useSearchParams } from "react-router-dom";
import { RiZzzFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import { BsCheckLg } from "react-icons/bs";

import "./MediaList.css";
import { gridInit, updateGrid } from "../utils/masonry_grid";
import { imageCard } from "../utils/imageCard";
import { videoCard } from "../utils/videoCard";
import { collectionCard } from "../utils/collectionCard";

const MediaList = () => {
  const { data: mediaData, content, title } = useLoaderData();
  const [nextPage, setNextPage] = useState(mediaData.next_page);
  const [maxResults, setMaxResults] = useState(30);
  const [gridLayout, setGridLayout] = useState(null);
  const [searchColor, setSearchColor] = useState("");
  const [searchParams, setsearchParams] = useSearchParams();
  const showMoreBtn = useRef(null);
  const layoutContainer = useRef(null);
  const orientationRef = useRef(null);
  const sizeRef = useRef(null);
  const colorRef = useRef(null);
  const colorField = useRef(null);
  const matches = useMatches();
  
  
  const handleShowMore = async (e) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const headers = new Headers();
    headers.append("Authorization", API_KEY);
    const requestOption = { headers };
    e.target.setAttribute("disabled", "true");
    if(nextPage && mediaData.page < maxResults) {
      try {
        const dataRes = await fetch(nextPage, requestOption);
        if(dataRes.ok) {
          const data = await dataRes.json();
          setNextPage(data.next_page);
          setMaxResults(prev => prev + 30);
          data[content].map(item => {
            if(item.src) return updateGrid(imageCard(item), gridLayout.columnsHeight, gridLayout.$columns);
            if(item.video_files) return updateGrid(videoCard(item), gridLayout.columnsHeight, gridLayout.$columns);
            if(item.media_count) return updateGrid(collectionCard(item), gridLayout.columnsHeight, gridLayout.$columns);
          });
        }
        e.target.removeAttribute("disabled");
      } catch(error) {
        console.log(error);
        throw Error({ message: "Could not fetch the data." });
      }
    }
  }

  const handleRenderCards = ({ $columns: columns, columnsHeight: columnsHeight }) => {
    mediaData[content].map(item => {
      if(item.src) return updateGrid(imageCard(item), columnsHeight, columns);
      if(item.video_files) return updateGrid(videoCard(item), columnsHeight, columns);
      if(item.media_count) return updateGrid(collectionCard(item), columnsHeight, columns);
    });
  }

  const openMenu = (menu) => {
    switch(menu) {
      case "orientation":
        if(orientationRef.current) orientationRef.current.classList.toggle("expanded");
        break;
      case "size":
        if(sizeRef.current) sizeRef.current.classList.toggle("expanded");
        break;
      case "color":
        if(colorRef.current) colorRef.current.classList.toggle("expanded");
        break;
    }
  }

  const handleSearchParams = (param, paramValue) => {
    setsearchParams(prevParams => {
      if(!paramValue) {
        prevParams.delete(param);
        return prevParams;
      } else{
        prevParams.set(param, paramValue);
        return prevParams;
      }
    });
    setTimeout(() => {
      location.replace(location.href);
    }, 1000);
  }

  useEffect(() => {
    if(colorField.current) {
      colorField.current.addEventListener("change", function() {
        handleSearchParams("color", this.value);
      });
    }
  }, [searchColor]);

  useEffect(() => {
    if(gridLayout) {
      handleRenderCards(gridLayout);
    }
  }, [mediaData]);

  useEffect(() => {
    if(layoutContainer.current) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    }
    const initRender = async () => {
      if(layoutContainer.current && mediaData[content].length > 0) {
        const layout = await gridInit(layoutContainer.current);
        setNextPage(mediaData.next_page);
        setGridLayout(layout);
        handleRenderCards(layout);
      }
    }
  
    initRender();
  }, [content, title]);


  return (
    <section className="images-container">
        <h1 className="images-title headline-large">{title}</h1>

        {matches[1].pathname === "/pesquisar/search" && mediaData[content].length > 0 && (
          <div className="filter-bar">

            <div className={`filter-menu ${searchParams.get("orientation") ? "active" : ""}`} ref={orientationRef} onClick={() => openMenu("orientation")}>

              <div className="filter-header">
                <button className="filter-title label-large">
                  <span className="span">
                    {searchParams.get("orientation") == "portrait" && "Vertical"}
                    {searchParams.get("orientation") == "landscape" && "Horizontal"}
                    {searchParams.get("orientation") == "square" && "Quadrado"}
                    {!searchParams.get("orientation") && "Orientação"}
                    {searchParams.get("orientation") && <BsCheckLg size={18} />}
                  </span>
                  {!searchParams.get("orientation") && <FiChevronDown />}
                </button>

                <button 
                  className={`filter-clear ${searchParams.get("orientation") ? "active" : ""}`}
                  onClick={() => handleSearchParams("orientation")}
                >
                  <IoMdClose />
                </button>
              </div>
              
              <div className="menu">
                <button onClick={() => handleSearchParams("orientation", "portrait")} className="menu-item body-medium">Vertical</button>
                <button onClick={() => handleSearchParams("orientation", "landscape")} className="menu-item body-medium">Horizontal</button>
                <button onClick={() => handleSearchParams("orientation", "square")} className="menu-item body-medium">Quadrado</button>
              </div>

            </div>

            <div className={`filter-menu ${searchParams.get("size") ? "active" : ""}`} ref={sizeRef} onClick={() => openMenu("size")}>

              <div className="filter-header">
                <button className="filter-title label-large">
                  <span className="span">
                    {searchParams.get("size") == "small" && "Pequeno"}
                    {searchParams.get("size") == "medium" && "Médio"}
                    {searchParams.get("size") == "large" && "Grande"}
                    {!searchParams.get("size") && "Tamanho"}
                    {searchParams.get("size") && <BsCheckLg size={18} />}
                  </span>
                  {!searchParams.get("size") && <FiChevronDown />}
                </button>

                <button 
                  className={`filter-clear ${searchParams.get("size") ? "active" : ""}`}
                  onClick={() => handleSearchParams("size")}
                >
                  <IoMdClose />
                </button>
              </div>
              
              <div className="menu">
                <button onClick={() => handleSearchParams("size", "small")} className="menu-item body-medium">Pequeno</button>
                <button onClick={() => handleSearchParams("size", "medium")} className="menu-item body-medium">Médio</button>
                <button onClick={() => handleSearchParams("size", "large")} className="menu-item body-medium">Grande</button>
              </div>

            </div>

            {content !== "videos" && (
              <div className={`filter-menu ${searchParams.get("color") ? "active" : ""}`} ref={colorRef} onClick={() => openMenu("color")}>

                <div className="filter-header">
                  <button className="filter-title label-large">
                    <input type="color" ref={colorField} className="color-field" />
                    <span className="span">
                      {searchParams.get("color") || "Cor"}
                      {searchParams.get("color") && <BsCheckLg size={18} />}
                    </span>
                    {!searchParams.get("color") && <FiChevronDown />}
                  </button>

                  <button 
                    className={`filter-clear ${searchParams.get("color") ? "active" : ""}`}
                    onClick={() => handleSearchParams("color")}
                  >
                    <IoMdClose />
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

        <div className="layout-grid" key={mediaData[content][0]?.id} ref={layoutContainer}>
          {mediaData[content].length <= 0 && (
            <h1 className="empty-grid headline-small">
              Sem resultados
              <RiZzzFill className="empty-icon" size={25} />
            </h1>
          )}
        </div>

        {mediaData.total_results >= maxResults && (
          <button
            className="btn btn-primary"
            ref={showMoreBtn}
            onClick={(e) => handleShowMore(e)}
          >
            Carregar Mais
          </button>
        )}
    </section>
  )
}

export default MediaList;