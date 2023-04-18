import React, { useEffect, useState, useCallback } from 'react'
// import Api from '../../../Container/Config/Api'
import SideBar from '../SideBar/SideBar';
import SearchBox from '../SearchBox/SearchBox';
import './Home.css'
import axios from 'axios';

export default function Home() {
    const [inputValue, setInputValue] = useState("")
    const [pokemon, setPokemon] = useState({})
    const [totalStat, settotalStat]= useState([])

    const [pokemonList, setPokemonList] = useState([])

    const searchPokemon = (name) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {
            console.log("res-121", res)
            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`).then((detail) => {
                setPokemon({
                    name: res.data.name,
                    img: res.data.sprites.versions["generation-v"]["black-white"].animated.front_default,
                    detail: detail.data.flavor_text_entries[0].flavor_text,
                    abilities: res.data.abilities,
                    stats: res.data.stats,
                    types: res.data.types,                 

                })
                let aryttl = []
                aryttl.push(res.data.types)
            })
        })

    }
    const getPokemon = () => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/`).then(async (res) => {
            if (res.data.results.length > 0) {
                res.data.results.map(async (data) => {
                    axios.get(data.url).then((resp) => {
                        setPokemonList(state => {
                            state = [...state, resp.data]
                            state.sort((a, b) => a.id > b.id ? 1 : -1)
                            return state;
                            // [...pokemonList, resp.data]
                        })
                    })
                })
            }

        })
    }
    useEffect(() => {
        getPokemon()
    }, [])

    const showPokemon = useCallback((name) => {
        setInputValue(name)
        searchPokemon(name)
    }, [pokemon, inputValue])

    const updateInputValue = (e) => {
        // console.log("e.target.value", e.target.value)
        setInputValue(e.target.value)
    }

    const clickFn = () => {
        searchPokemon(inputValue)
    }
    // console.log("pokemon ", pokemon)
    return (

        <>
            <SearchBox updateInputValue={updateInputValue} searchPokemon={clickFn} />
            <div className='mainContent'>
                <SideBar
                    inputValue={inputValue}
                    pokemon={pokemon} />
                <div className='mainContent__continer'>
                    <div className='listHolder'>
                        {pokemonList.length > 0 && pokemonList.map((data, index) => {
                            return (
                                <div className='listBox' key={index} onClick={() => showPokemon(data.name)}>
                                    <div className='listBox__img'>
                                        {/* <img src={data.sprites.front_default} alt='' /> */}
                                        <img src={data.sprites.other.dream_world.front_default} alt=''  />
                                    </div>
                                    <div className='listBox__cntnt'>
                                        <h4 className='listBox__title'>{data.name}</h4>
                                        <ul className='listBox__lstname'>
                                            {data.types.map((cntnt, index) => {
                                                return (
                                                    <li key={index}>{cntnt.type.name}</li>
                                                )
                                            })}
                                        </ul>
                                    </div>


                                </div>
                            )
                        })}

                    </div>
                </div>

            </div>
        </>



    )
}
