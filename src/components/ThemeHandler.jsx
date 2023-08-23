import { useState, useEffect } from "react";
import { BiSun, BiMoon } from "react-icons/bi";

const ThemeHandler = ({ size }) => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if(localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    } else {
      localStorage.setItem("theme", "light");
    }
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const themeHandler = () => {
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    setTheme(localStorage.getItem("theme"));
  }
  

  return (
    <button className="btn-icon theme-btn" onClick={themeHandler}>
      {theme === "light" ? (
        <BiMoon size={size} />
      ) : (
        <BiSun size={size} />
      )
      }
    </button>
  )
}

export default ThemeHandler;