import React from 'react';
import search from '../../Assets/images/search.svg';
import './SearchBox.css'


export default function SearchBox({ updateInputValue, searchPokemon }) {
    return (
        <div className='searchBox'>
            <div className='searchBox__holder'>
                <input className='searchBox__input' placeholder='Type the name or id of pokemon' type="text" onChange={updateInputValue} />
                <button className='searchBox__button' 
                // onClick={searchPokemon}
                >
                    <img src={search} alt="search"/>
                </button>
            </div>
        </div>
    )
}
