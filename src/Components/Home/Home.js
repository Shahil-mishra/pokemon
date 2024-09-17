import React, { useEffect, useState, useCallback } from 'react'
// import Api from '../../../Container/Config/Api'
import SideBar from '../SideBar/SideBar';
import SearchBox from '../SearchBox/SearchBox';
import pokemonImg from '../../Assets/images/pokemon.svg';
import './Home.css'
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
export default function Home() {
    const [loading, setloading] = useState(true)
    const [currentpage, setCurrentpage] = useState(0)
    const [inputValue, setInputValue] = useState("")
    const [bringSidebar, setBringSidebar] = useState(false)
    const [wholeDate, setwholeDate] = useState({})
    const [pokemon, setPokemon] = useState({})
    const [totalStat, settotalStat] = useState([])

    const [pokemonList, setPokemonList] = useState([])

    const searchPokemon = (name) => {
        let updatedname = name.toString().toLowerCase()
        setTimeout(() => {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${updatedname}`).then((res) => {
                // console.log("res-121", res)
                let aryttl = []
                aryttl.push(res.data)
                setPokemonList(aryttl)

            }).catch(function (error) {
                // handle error
                toast(error)
            })
        }, 1000);
    }

    const getPokemon = (data) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${data}&limit=20`).then(async (res) => {
            if (res.data.results.length > 0) {
                setwholeDate(res.data)
                res.data.results.map(async (data) => {
                    setPokemonList([])
                    axios.get(data.url).then((resp) => {
                        setPokemonList(state => {
                            state = [...state, resp.data]
                            state.sort((a, b) => a.id > b.id ? 1 : -1)
                            // console.log("pokemonList :-", state)
                            return state;
                            // [...pokemonList, resp.data]
                        })

                        setloading(false)
                    })
                })
            }

        })
    }
    // useEffect(() => {
    //     getPokemon(0)
    // }, [])

    const showPokemon = useCallback((name) => {
        setInputValue(name)
        setBringSidebar(false)


        // searchPokemon(name)
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((res) => {

            // console.log("res-121", res)

            axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`).then((detail) => {
                setPokemon({
                    name: res?.data?.name,
                    img: res?.data?.sprites.versions["generation-v"]["black-white"].animated.front_default,
                    detail: detail?.data?.flavor_text_entries[0].flavor_text,
                    abilities: res?.data?.abilities,
                    stats: res?.data?.stats,
                    types: res?.data?.types,
                    height: res?.data?.height,
                    weight: res?.data?.weight,
                    id:  res?.data?.id,

                })
            })
        })
        setTimeout(() => {
            setBringSidebar(true)

        }, 800);
    }, [pokemon, inputValue])

    const updateInputValue = (e) => {
        // console.log("e.target.value", e.target.value)
        let x = e.target.value
        if (x == "") {
            getPokemon(0)
        }
        else {
            searchPokemon(e.target.value)
        }
        setInputValue(e.target.value)

    }

    const clickFn = () => {
        if (inputValue !== "") {
            searchPokemon(inputValue)
        }
    }
    // console.log("pokemon ", pokemon)
    // console.log("wholeDate ", wholeDate)


    const goToPrevPage = () => {
        if (currentpage > 0) {
            setloading(true)
            setCurrentpage(currentpage - 20)
        }

    }
    const goToNextPage = () => {
        setloading(true)
        setCurrentpage(currentpage + 20)

    }
    useEffect(() => {
        getPokemon(currentpage)

    }, [currentpage])

    console.log("pokemonList ", pokemonList)
    console.log("id ", pokemon?.id )

    // console.log("currentpage ", currentpage)

    return (
        <>
            <SearchBox updateInputValue={updateInputValue} searchPokemon={clickFn} />
            {loading ?
                <div className='loadingBoxMain' >
                    <div className='loadingBoxMain__inner'>
                        <img src={pokemonImg} alt="" width="100" />
                    </div>
                </div> :
                <div className='mainContent'>
                    <SideBar
                        inputValue={inputValue}
                        pokemon={pokemon}
                        showSidebar={bringSidebar}
                    />
                    <div className='mainContent__continer'>
                        <div className='listHolder'>
                            {pokemonList.length > 0 && pokemonList.map((data, index) => {
                                return (
                                    <div className={`listBox ${pokemon?.id == data.id ? "active" : "" }`} key={index} onClick={() => showPokemon(data.name)}>
                                        <div className='listBox__img'>
                                            {/* <img src={data.sprites.front_default} alt='' /> */}
                                            <img src={data.sprites.other.dream_world.front_default} alt='' />
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
                </div>}
            <div className='buttonHolder text-center'>
                {wholeDate.previous ? <button onClick={goToPrevPage}>PreviousPage</button> : null}
                {wholeDate.next ? <button onClick={goToNextPage}>Next Page</button> : null}
            </div>
        </>
    )
}
