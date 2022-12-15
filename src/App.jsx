import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import Navbar from './components/Navbar'
import Account from './pages/account/Account'
import Login from './pages/account/Login'
import Register from './pages/account/Register'
import Admin from './pages/dashboard/Admin'
import Dashboard from './pages/dashboard/Dashboard'
import MyPackage from './pages/dashboard/MyPackage'
import Home from './pages/home/Home'
import Estimate from './pages/services/Estimate'
import Services from './pages/services/Services'
import Subscription from './pages/services/Subscription'

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
          <Route path='/service' element={<Services />}></Route>
          <Route path='/estimate/:_id' element={<ProtectedRoute><Estimate /></ProtectedRoute>}></Route>
          <Route path='/subscription/:_id' element={<ProtectedRoute><Subscription /></ProtectedRoute>}></Route>
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route index element={<Admin></Admin>}></Route>
            <Route path='package' element={<MyPackage></MyPackage>}></Route>
          </Route>
        </Routes>
      </Navbar>
    </>

  )
}

export default App