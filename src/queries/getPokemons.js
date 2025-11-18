import {gql} from '@apollo/client'

export const GET_POKEMONS = gql`
  query GetPokemons($page: Int!) {
    getPokemons(page: $page){
      name
      image
      types
    }
  }
`

