import {createContext, useState, useEffect} from "react"

export const TrainerContext = createContext()

export const TrainerProvider = ({children}) => {
  const [trainers, setTrainers] = useState(() => {

    const stored = localStorage.getItem("trainers")
    return stored ? JSON.parse(stored) : []
  })

  const [selectedTrainerId, setSelectedTrainerId] = useState(() => {
    return localStorage.getItem('selectedTrainer') || null
  })


  // Persist in localStorage
  useEffect(() => {
    localStorage.setItem("trainers", JSON.stringify(trainers))
  }, [trainers])


  useEffect(() => {
    if(selectedTrainerId){
      localStorage.setItem("selectedTrainer", selectedTrainerId)
    }
  }, [selectedTrainerId])

  const addTrainer = (name) => {
    const newTrainer = {id: crypto.randomUUID(), name, team: []}
    setTrainers(prev => [...prev, newTrainer])
    setSelectedTrainerId(newTrainer.id)
  }

  const removeTrainer = (id) => {
    setTrainers(prev => prev.filter(trainer => trainer.id !== id))
    if(selectedTrainerId === id){
      const remaining = trainers.filter(trainer => trainer.id !== id)
      setSelectedTrainerId(remaining[0]?.id || null)
    }
  }

  //add pokemon to trainer
  const addPokemonToTrainer = (selectedTrainerId, pokemon) => {
    if(!selectedTrainerId) return
    const poke = {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image, 
      types: pokemon.types
    }
    setTrainers(prev => 
      prev.map(trainer => {
        if(trainer.id !== selectedTrainerId) return trainer
        //duplicates case
        if(trainer.team.some(poke => poke.id === pokemon.id)) return trainer
        if(trainer.team.length >= 6) return trainer
        return {...trainer, team: [...trainer.team, pokemon]}

    }))
  }

  const removePokemonFromTrainer = (trainerId, pokemonId) => {
    setTrainers(prev => 
      prev.map(trainer => 
        trainer.id === trainerId ? {...trainer, team: trainer.team.filter(poke => poke.id !== pokemonId)} : trainer
    ))
  }
  console.log("hello")


  return (
    <TrainerContext.Provider value={{trainers, addTrainer, removeTrainer, selectedTrainerId, setSelectedTrainerId, addPokemonToTrainer, removePokemonFromTrainer}}>
      {children}
    </TrainerContext.Provider>
  )
}

