import { AiOutlineSearch } from "react-icons/ai";

const SearchBtn = ({ sidebarState, size }) => {
  const { showSearchView, setShowSearchView } = sidebarState;
  
  return (
    <button className="btn-icon search-btn" onClick={() => setShowSearchView(!showSearchView)}>
      <AiOutlineSearch size={size} />
    </button>
  )
}

export default SearchBtn;