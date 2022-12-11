import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import Navbar from './components/Navbar'
import Account from './pages/account/Account'
import Login from './pages/account/Login'
import Register from './pages/account/Register'
import Home from './pages/home/Home'
import Services from './pages/services/Services'

const App = () => {
  return (
    <>
      <Toaster position="top-center" toastOptions={{ duration: 2000, }} />
      <Navbar>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/account' element={<Account />}>
            <Route index element={<Login />}></Route>
            <Route path='register' element={<Register />}></Route>
          </Route>
          <Route path='/service' element={<ProtectedRoute><Services /></ProtectedRoute>}>
  
          </Route>
        </Routes>
      </Navbar>
    </>

  )
}

export default App