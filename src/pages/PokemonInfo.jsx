import {Link, useParams} from 'react-router-dom'
import {useQuery} from '@apollo/client/react'
import {gql} from '@apollo/client'
import {GET_POKEMON_BY_ID} from '../queries/getPokemonById.js'
import {TrainerContext} from '../context/TrainerContext.jsx'
import {useContext} from 'react'

const PokemonInfo = () => {
  const {id} = useParams()
  const pokeid = Number(id)

  if(isNaN(pokeid) || !Number.isInteger(pokeid) || pokeid < 0){
    //need to initialize 404 page and pass this as a prop
    return <p>Error 404: Pokemon not Found</p>
  }
  const {selectedTrainerId, trainers, addPokemonToTrainer} = useContext(TrainerContext)
  const selectedTrainer = trainers.find(trainer => trainer.id === selectedTrainerId)

  const {data, loading, error} = useQuery(GET_POKEMON_BY_ID, {
    variables: {id: pokeid}
  })
  if(loading) return <p>Loading...</p> 
  if(error) return <p>Error: {error.message}</p>

  const pokemon = data.getPokemonById
  const handleAdd = () => {
    addPokemonToTrainer(selectedTrainerId, {
      id: pokeid,
      name: pokemon.name,
      image: pokemon.image,
      types: pokemon.types
    })
  }
  return (
    <>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png"} alt={pokemon.name} />
      <p>Types: {pokemon.types.join(", ")}</p>
      {/*Show add button only if a trainer is selected*/}
      {selectedTrainer ? (
        <>
          {selectedTrainer.team.length >= 6 ? (
            <button disabled>
              Team Full (6/6)
            </button>
          ) : (
            <button onClick={handleAdd}>
              Catch
            </button>
          )}
        </>
      ) : (
        <p>Select a trainer to catch</p>
      )}
    </>
  )
}
export default PokemonInfo
