import React from 'react'
import style from './SearchBar.module.css'
import { BsSearch } from 'react-icons/bs'

const SearchBar = ({ setKeyword, keyword }) => {
  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <div className={keyword ? `${style.container} ${style.expanded}` : style.container}>
      <input
        type="text"
        value={keyword}
        onChange={handleInputChange}
        placeholder='search'
      />
      <a>
        <BsSearch />
      </a>
    </div>
  )
}

export default SearchBar;