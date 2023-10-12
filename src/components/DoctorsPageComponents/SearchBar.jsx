import React from 'react'
import style from './SearchBar.module.css'
import { BsSearch } from 'react-icons/bs'

const SearchBar = () => {
  return (
    <div className={style.container}>
        <input type="text" placeholder='search'/>
        <a>
            <BsSearch />
        </a>
    </div>
  )
}

export default SearchBar