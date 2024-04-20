import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar1 from './components/NavBar1'
import Base from './components/Base'
import Contact from './components/Contact'
import { Routes, Route } from 'react-router-dom'
import AccountContextProvider from './context/AccountContextProvider'

function App() {

  return (
    <AccountContextProvider>
      <div className='flex flex-col w-screen h-screen'>
        <div className=''>
          <NavBar1></NavBar1>
        </div>
        <div className='flex-1'>
          <Routes>
            <Route path='/' element={<Base></Base>}></Route>
            <Route path='/contact' element={<Contact></Contact>}></Route>
          </Routes>
        </div>
      </div>
    </AccountContextProvider>
  )
}

export default App
