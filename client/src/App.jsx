import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const iditarod = [
    {stop: "Anchorage", miles: 0},
    {stop: "Campbell Airstrip", miles: 11},
    {stop: "Willow", miles: 42},
    {stop: "Yetna Station", miles: 53},
    {stop: "Skwentna", miles: 83},
    {stop: "Finger Lake", miles: 123},
    {stop: "Rainy Pass", miles: 153},
    {stop: "Rohn", miles: 188},
    {stop: "Nikolai", miles: 263},
    {stop: "McGrath", miles: 311},
    {stop: "Takotna", miles: 329},
    {stop: "Ophir", miles: 352},
    {stop: "Cripple", miles: 425},
    {stop: "Ruby", miles: 495},
    {stop: "Galena", miles: 545},
    {stop: "Nulato", miles: 582},
    {stop: "Kaltag", miles: 629},
    {stop: "Unalakleet", miles: 714},
    {stop: "Shaktoolik", miles: 754},
    {stop: "Koyuk", miles: 804},
    {stop: "Elim", miles: 852},
    {stop: "Golovin", miles: 880},
    {stop: "White Mountain", miles: 898},
    {stop: "Safety", miles: 953},
    {stop: "Nome", miles: 975}
  ]

  const [users, setProgress] = useState([
    {name: "Ryan", progress: 260},
    {name: "Sofa", progress: 98}
  ])

  function getLocation(progress) {
    return iditarod.filter(checkpoint => checkpoint.miles <= progress);
  }

  return (
    <>
      <div class = "border-b-2 p-4 rounded">
        <h1 class="font-bold text-5xl">Iditarod Training Tracker</h1>
      </div>
      <div>
        <ul class = "p-1 space-y-1">
          {users.map((user,index) => (
            <li class = "border p-3 rounded" key={index}>
                <h2 class="text-2xl">{user.name}</h2> 
                <p class="flex flex-row justify-between text-2xl">{user.progress} 
                <progress value={user.progress/975}/>
                975</p>
              {
                (() => {
                  const locations = getLocation(user.progress);
                  const last = locations[locations.length - 1];
                  return (
                    <div class = "flex flex-row justify-between text-2xl">
                    <span>
                      Last Checkpoint Reached: {last ? last.stop : "Not started"}
                    </span>
                    <span>
                      Next Checkpoint: {iditarod[locations.length] ? iditarod[locations.length].stop : "Finished"}
                    </span>
                    </div>
                  );
                })()
              }
            </li>
          ))}
        </ul>
      </div>
    </>
    /*<>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>*/
  )
}

export default App
