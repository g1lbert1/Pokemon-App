import {useContext, useState, useEffect} from 'react'
import {TrainerContext} from '../context/TrainerContext.jsx'
import {Link} from 'react-router-dom'

const Trainers = () => {
  const {trainers, addTrainer, removeTrainer, removePokemonFromTrainer, selectedTrainerId, setSelectedTrainerId} = useContext(TrainerContext)
  const [name, setName] = useState("")

  const handleAddTrainer = () => {
    if(!name.trim()) return
    addTrainer(name)
    setName("")
  }
  console.log(JSON.stringify(trainers, null, 2));


  return (
    <>
      <h1 className="font-bold text-2xl">Trainers</h1>
      <input type="text" placeholder="Trainer name... " value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAddTrainer} className="cursor-pointer hover:text-red-700">Add Trainer</button>
      {/*Listing trainers and poke*/}
      {trainers.map(trainer => (
        <div key={trainer.id} 
        className={`
          p-4 border-b border-gray-400 cursor-pointer transition 
          hover:bg-gray-200 ${trainer.id === selectedTrainerId ? 
          "bg-green-200 ring-2 ring-green-500" : ""}`} 
          onClick={() => setSelectedTrainerId(trainer.id)}
        >
          <h2>
            {trainer.name}
            <button onClick={(e) => {
              e.stopPropagation()
              removeTrainer(trainer.id)
            }} className="pl-5 cursor-pointer hover:text-red-500">
              Remove Trainer
            </button>
          </h2>
          <h3>Team Size: ({trainer.team.length}/6)</h3>
          {trainer.team.length === 0 && <p>No Pokémon</p>}
          <div>
            {trainer.team.map((pokemon) => (
              <div key={pokemon.id}>
                <Link to={`/pokemon/${pokemon.id}`}>
                  <img src={pokemon.image || "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png"} alt={pokemon.name} className="w-15 h-15"/>
                </Link>
                <p>{pokemon.name}</p>
                <button onClick={() => removePokemonFromTrainer(trainer.id, pokemon.id)} className="cursor-pointer hover:text-red-500">Release</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
export default Trainers
