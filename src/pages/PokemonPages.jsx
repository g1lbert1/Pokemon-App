import {useParams, Link} from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { gql } from '@apollo/client'
import { GET_POKEMONS } from '../queries/getPokemons.js'

const PokemonPages = () => {
  const {pagenum} = useParams()
  const currPage = Number(pagenum)
  if(isNaN(currPage) || !Number.isInteger(currPage) || currPage < 0){
    //need to initialize 404 page and pass this as a prop
    return <p>Not a page #</p>
  }
  const {data, loading, error} = useQuery(GET_POKEMONS, {
    variables: {page: currPage}
  })

  if(loading) return <p>Loading...</p> 
  if(error) return <p>Error: {error.message}</p>
  return (
    <>
      {data.getPokemons.map((pokemon) => (
        <div key={pokemon.name}>
          <img src={pokemon.image || "/fallback.png"} alt={pokemon.name} />
          <h3>{pokemon.name}</h3>
          <p>Types: {pokemon.types.join(", ")}</p>
        </div>
      ))}
    </>
  )
}
export default PokemonPages
