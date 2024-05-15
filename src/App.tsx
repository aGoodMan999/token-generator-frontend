import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'flowbite';
import './App.css'
import NavBar1 from './pages/NavBar1'
import Base from './pages/Base/Base'
import Contact from './pages/Contact/Contact'
import { Routes, Route } from 'react-router-dom'
import AccountContextProvider from './context/AccountContextProvider'
import AccountDeployment from './pages/AccountDeployment/AccountDeployment'

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
            <Route path='/deployment' element={<AccountDeployment />}></Route>
          </Routes>
        </div>
      </div>
    </AccountContextProvider>
  )
}

export default App
