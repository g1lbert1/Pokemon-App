import {useParams, Link} from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { gql } from '@apollo/client'
import { GET_POKEMONS } from '../queries/getPokemons.js'

const PokemonPages = () => {
  const totalPages = 66
  const {pagenum} = useParams()
  const currPage = Number(pagenum)
  if(isNaN(currPage) || !Number.isInteger(currPage) || currPage < 0){
    //need to initialize 404 page and pass this as a prop
    return <p>Error 404: Page not Found</p>
  }
  const {data, loading, error} = useQuery(GET_POKEMONS, {
    variables: {page: currPage}
  })

  if(loading) return <p>Loading...</p> 
  if(error) return <p>Error: {error.message}</p>
  return (
    <>
      {data.getPokemons.pokemons.map((pokemon) => (
        <div key={pokemon.name}>
          <Link to={`/pokemon/${pokemon.id}`}>
            <img src={pokemon.image || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png"} alt={pokemon.name} />
          </Link>
          <h3>{pokemon.name}</h3>
          <p>Types: {pokemon.types.join(", ")}</p>
          <p>Id: {pokemon.id}</p>
        </div>
      ))}
      {/*Page buttons*/}
      <div>
        {currPage > 0 && (
          <Link to={`/pokemon/page/${currPage - 1}`}>Previous</Link>
        )}
        {currPage < data.getPokemons.maxPage && (
          <Link to={`/pokemon/page/${currPage + 1}`}>Next</Link>
        )}
      </div>
    </>
  )
}
export default PokemonPages
