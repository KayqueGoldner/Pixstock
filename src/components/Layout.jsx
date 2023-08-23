import { useState, useRef } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { HiArrowLeft } from "react-icons/hi";
import { BiHomeAlt2 } from "react-icons/bi";
import { SlPicture } from "react-icons/sl";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCameraVideo, BsGrid1X2 } from "react-icons/bs";

import Logo from "./Logo";
import SearchBtn from "./SearchBtn";
import ThemeHandler from "./ThemeHandler";
import SearchView from "./SearchView";

import "./Layout.css";

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearchView, setShowSearchView] = useState(false);

  /**
   * Transição no header
   */
  const headerRef = useRef(null);
  window.addEventListener("scroll", () => {
    if (headerRef.current) {
      if (window.scrollY > 100) {
        headerRef.current.classList.add("active");
      } else {
        headerRef.current.classList.remove("active");
      }
    }
  });

  return (
    <>
      <header className="header" ref={headerRef}>
        <div className="container">

          <button className="btn-icon header-menu-btn" onClick={() => setShowSidebar(!showSidebar)}>
            <RxHamburgerMenu size={23} />
          </button>

          <nav className={`sidebar ${showSidebar ? "active" : ""}`}>

            <div className="sidebar-top">
              <button className="btn-icon sidebar-toggler" onClick={() => setShowSidebar(!showSidebar)}>
                <HiArrowLeft size={25} />
              </button>

              <Logo size="headline-small" />
            </div>

            <div className="sidebar-content">
              <NavLink to="/" className="sidebar-link" onClick={() => setShowSidebar(!showSidebar)}>
                <BiHomeAlt2 size={22} />
                <span className="span">Início</span>
              </NavLink>
              <NavLink to="imagens" className="sidebar-link" onClick={() => setShowSidebar(!showSidebar)}>
                <SlPicture size={22} />
                <span className="span">Imagens</span>
              </NavLink>
              <NavLink to="videos" className="sidebar-link" onClick={() => setShowSidebar(!showSidebar)}>
                <BsCameraVideo size={22} />
                <span className="span">Vídeos</span>
              </NavLink>
              <NavLink to="colecoes" className="sidebar-link" onClick={() => setShowSidebar(!showSidebar)}>
                <BsGrid1X2 size={22} />
                <span className="span">Coleções</span>
              </NavLink>
              <NavLink to="favoritos" className="sidebar-link" onClick={() => setShowSidebar(!showSidebar)}>
                <AiOutlineHeart size={22} />
                <span className="span">Favoritos</span>
              </NavLink>
            </div>

          </nav>

          <div onClick={() => setShowSidebar(!showSidebar)} className={`scrim ${showSidebar ? "active" : ""}`}></div>

          <Logo size="headline-small" />

          <SearchView sidebarState={{showSearchView, setShowSearchView}} />

          <div className="header-actions">
            <SearchBtn sidebarState={{showSearchView, setShowSearchView}} size={24} />
            <ThemeHandler size={24} />
          </div>
        </div>
      </header>
      <main className="main">
        <article>
          <div className="container">
            <Outlet />
          </div>
        </article>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-card">

            <div className="card-col">
              <Logo size="title-medium" className="col-title" />
              <p className="col-text body-small">
              Com o toque genial de <Link to="/">Kayque Goldner</Link>, nasce o Pixstock - um app de fotos único. 
              Todos os incríveis recursos visuais são gentilmente cedidos pelo <Link to="https://www.pexels.com/" target="_blank">Pexels</Link>.
              </p>
            </div>

            <div className="card-col">
              <p className="col-title body-medium">Siga-nos no</p>
              <div className="col-list">
                <Link to="/" className="body-small">YouTube</Link>
                <Link to="/" className="body-small">GitHub</Link>
                <Link to="/" className="body-small">X</Link>
              </div>
            </div>
            
          </div>
        </div>
      </footer>
    </>
  )
}

export default Layout;