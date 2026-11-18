//import { useState } from 'react'
import NavBar from './components/Navbar'
import MainSection from './components/FirstPage'
import './App.css'

function App() {
  //const [page, setPage] = useState()

  return (


    <>
      <div className='main'>
        
        <NavBar/>

        <MainSection/>

        <div className='endOfPage'>
          <footer>

            <p>This is simple web page for our software engineering course project</p>

          </footer>

        </div>
      </div>
    </>
  )
}

export default App
