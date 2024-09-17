import React from 'react'
import pokemonImg from '../../Assets/images/pokemon.svg';
import './SideBar.css'

export default function SideBar({ inputValue, pokemon, showSidebar }) {
    console.log("pokemon", pokemon)
    return (
        <div className={`mainContent__sidebar ${showSidebar ? "active" : null}`}>

            {showSidebar ?
                <div className="SearchContent">
                    <div className='SearchContent__img'>
                        <img src={pokemon?.img} alt="" />
                    </div>

                    <div className='SearchContent__content'>
                        <h2 className='SearchContent__contentTitle'>{pokemon.name}</h2>
                        <p dangerouslySetInnerHTML={{ __html: pokemon.detail }}></p>
                        <ul className='abilityHolder'>
                            <li className=' '>
                                <h4>Height</h4>
                                <div >{pokemon?.height / 10}m</div>
                            </li>
                            <li className=' '>
                                <h4>Weight</h4>
                                <div >{pokemon?.weight / 10}kg</div>
                            </li>
                        </ul>

                        <ul className='listBox__lstname mb_10'>
                            {pokemon?.types?.length > 0 && pokemon.types.map((cntnt, index) => {
                                return (
                                    <li key={index}>{cntnt.type.name}</li>
                                )
                            })}
                        </ul>
                        {pokemon?.abilities?.length > 0 ? <>
                            <div className='abilityBox'>
                                <h4>Abilities</h4>
                                <ul className='abilityHolder'>
                                    {pokemon.abilities.map((detail, indx) => {
                                        return (
                                            <li key={indx}>{detail.ability.name}</li>
                                        )
                                    })}

                                </ul>
                            </div>
                        </> : null}

                        {pokemon?.stats?.length > 0 ? <>

                            <ul className='listAtat listNone dflex alignItemsCenter'>
                                {pokemon.stats.map((data, index) => {
                                    return (
                                        <li key={index}>
                                            <div className='listAtat__title'> {
                                                data.stat.name === "attack" ? "atk" : data.stat.name === "defense" ? "def" :
                                                    data.stat.name === "special-attack" ? "spa" : data.stat.name === "special-defense" ? "spd" :
                                                        data.stat.name === "speed" ? "sped" : data.stat.name}</div>
                                            <div className='listAtat__value'> {data.base_stat}</div>
                                        </li>

                                    )
                                })}
                                {/* <li>
                                <div className='listAtat__title'>Tot</div>
                                <div className='listAtat__value'>
                                    {pokemon && pokemon.stats && pokemon.stats.length > 0 && pokemon.stats.map((data, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {data.base_stat.reduce(
                                                (previousValue, currentValue, index) => previousValue + currentValue,
                                                0)}
                                        </React.Fragment>
                                    )
                                })}
                                </div>
                            </li> */}
                            </ul>
                        </> : null}

                    </div>
                </div> :
                <div className="SearchContent SearchContent--loading">
                    <div className='SearchContent__img '>
                        <img src={pokemonImg} alt="" />
                    </div>
                    <div className='SearchContent__content mb-2'>
                        <h3>Select any pokemon to know the Details</h3>
                    </div>
                    <a className="card" id="card-link" target="_blank">
                        <div className="card__header ">
                             
                            <h3 className="card__header header__title" id="card-title">
                                <div className="skeleton skeleton-text"></div>
                                <div className="skeleton skeleton-text"></div>
                            </h3>
                        </div>

                        <div className="card__body">
                            <div className="card__body body__text" id="card-details">
                                <div className="skeleton skeleton-text skeleton-text__body"></div>
                            </div>

                            <div className="card__body body__img">
                                <img className="skeleton" alt="" id="cover-img" />
                            </div>
                        </div>

                    </a>
                </div>
            }
        </div >
    )
}
