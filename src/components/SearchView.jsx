import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import { AiOutlineSearch } from "react-icons/ai";
import { HiArrowLeft } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { SlPicture } from "react-icons/sl";
import { BsCameraVideo } from "react-icons/bs";
import { BiHistory } from "react-icons/bi";

import "./SearchView.css";
import rippleEffect from "../utils/ripple";

const SearchView = ({ sidebarState }) => {
  const { showSearchView, setShowSearchView } = sidebarState;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState(JSON.parse(localStorage.getItem("search_history")).items);
  const [searchFilter, setSearchFilter] = useState("imagens");
  const inputRef = useRef();
  const navigate = useNavigate();

  const handleSearch = (query) => {
    const history = JSON.parse(localStorage.getItem("search_history"));
    const value = query || searchQuery;
    setShowSearchView(!showSearchView);
    if(inputRef.current) inputRef.current.blur();
    if(value) {
      setSearchQuery("");
      if(history.items.includes(value)) {
        history.items.splice(history.items.indexOf(value), 1);
      }
      history.items.unshift(value);
      setSearchHistory(history.items);
      localStorage.setItem("search_history", JSON.stringify(history));
      navigate(`pesquisar/search?type=${searchFilter}&query=${value}`);
    }
  }

  return (
    <div className={`search-view ${showSearchView ? "active" : ""}`}>
      
      <div className="search-bar">

        <button className="btn-icon search-bar-close" onClick={() => setShowSearchView(!showSearchView)}>
          <HiArrowLeft size={22} />
        </button>

        <div className="input-wrapper">
          <span className="input-icon">
            <AiOutlineSearch size={24} />
          </span>

          <input 
            type="text" 
            className="input-field body-large" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Pesquisar..." 
            autoComplete="off"
            ref={inputRef}
          />
        </div>

        <div className="search-bar-actions">
          {searchQuery && (
            <button className="btn-icon search-bar-clear" onClick={() => setSearchQuery("")}>
              <IoClose size={25} />
            </button>
          )}

          <button
            className="btn-icon search-bar-search"
            onClick={() => handleSearch()}
          >
            <AiOutlineSearch size={23} />
          </button>
        </div>
      </div>

      <div className="search-view-content">

        <div className="btn-group">
          
          <button 
            className={`btn-filter ${searchFilter === "imagens" ? "active" : ""}`}
            onClick={(e) => {
              rippleEffect(e);
              setSearchFilter("imagens");
            }}
          >
            <SlPicture size={18} />
            <span className="span body-medium">Imagens</span>
          </button>
          
          <button 
            className={`btn-filter ${searchFilter === "videos" ? "active" : ""}`}
            onClick={(e) => {
              rippleEffect(e);
              setSearchFilter("videos");
            }}
          >
            <BsCameraVideo size={18} />
            <span className="span body-medium">Vídeos</span>
          </button>

        </div>

        <hr />

        <ul className="search-view-list">
          {searchHistory?.slice(0, 5).map((item, index) => (
            <li
              className="list-item"
              key={index}
              onClick={(e) => {
                handleSearch(item);
                e.target.blur();
              }}
            >
              <Link to="/" className="list-link">
                <BiHistory size={22} className="link-icon" />
                <span className="span body-large">{item}</span>
              </Link>
            </li>
          ))}
        </ul>

      </div>

    </div>
  )
}

export default SearchView;
