import { useState } from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import PokemonPages from './pages/PokemonPages.jsx'
import PokemonInfo from './pages/PokemonInfo.jsx'
const App = () => {

  return (
    <>
      <div className="bg-gray-400 min-h-screen">
        <header>
          <h1 className="text-[1.5rem] text-blue-200">Pokemon Webapp</h1>
          <nav style={{ display: "flex", gap: "1rem" }}>
            <Link to="/" className="text-lg font-semibold text-green-600 hover:text-green-300 transition-colors duration-200">Home</Link>
            <Link to="/pokemon/page/0" className="text-lg font-semibold text-green-600 hover:text-green-300 transition-colors duration-200">Pokemon</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pokemon/page/:pagenum" element={<PokemonPages />} />
          <Route path="/pokemon/:id" element={<PokemonInfo />} />
        </Routes>
      </div>
    </>
  )
}

export default App
