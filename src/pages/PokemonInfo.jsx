import {Link, useParams} from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { gql } from '@apollo/client'
import { GET_POKEMON_BY_ID } from '../queries/getPokemonById.js'
const PokemonInfo = () => {
  const {id} = useParams()
  const pokeid = Number(id)

  if(isNaN(pokeid) || !Number.isInteger(pokeid) || pokeid < 0){
    //need to initialize 404 page and pass this as a prop
    return <p>Error 404: Pokemon not Found</p>
  }
  const {data, loading, error} = useQuery(GET_POKEMON_BY_ID, {
    variables: {id: pokeid}
  })
  if(loading) return <p>Loading...</p> 
  if(error) return <p>Error: {error.message}</p>
  return (
    <>
      <h1>{data.getPokemonById.name}</h1>
    </>
  )
}
export default PokemonInfo
