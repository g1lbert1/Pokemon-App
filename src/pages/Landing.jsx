import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
const Landing = () => {
  const [loading, setLoading] = useState(true)
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-[1.5rem] font-semibold">Welcome!</h1>
      <p>This is the Pokemon Webapp! It utilizes the Pokemon API *pokeapi* in order to allow you to become a trainer and catch pokemon! Click on any pokemon throughout the pages to learn more!</p>
      <p className="text-[1.5rem]">Browse:</p>

      <ul>
        <li>
          <Link to="/pokemon/page/0" className="text-lg font-semibold text-red-600 hover:text-red-400 hover:underline transition-colors duration-200">Pokemon List</Link>
        </li>
      </ul>
    </div>
  )
}
export default Landing 
