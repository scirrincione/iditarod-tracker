import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import {UserProvider} from "./contexts/UserContext";

function App() {




  return (
    <>
      <UserProvider>
        <Navbar />
        <Outlet />
      </ UserProvider>
      {/* <div>
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
      </div> */}
    </>
  )
}

export default App
