import {gql} from '@apollo/client'

export const GET_POKEMON_BY_ID = gql `
  query getPokemonById($id: Int!){
    getPokemonById(id: $id){
      name
      image
      types
    }
  }
`
