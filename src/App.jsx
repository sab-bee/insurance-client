import React, { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import Navbar from './components/Navbar'
import NotFound from './pages/404/NotFound'
import About from './pages/About/About'
import Account from './pages/account/Account'
import Login from './pages/account/Login'
import Register from './pages/account/Register'
import Admin from './pages/dashboard/Admin'
import Dashboard from './pages/dashboard/Dashboard'
import Client from './pages/dashboard/Client'
import Home from './pages/home/Home'
import Payment from './pages/Purchase/Payment'
import Estimate from './pages/services/Estimate'
import Services from './pages/services/Services'
import Subscription from './pages/services/Subscription'
import { AdminRoute } from './auth/AdminRoute'
import { UserRoute } from './auth/UserRoute'

const App = () => {
  useEffect(() => {
    var chatbox = document.getElementById('fb-customer-chat');
    chatbox.setAttribute("page_id", "111684071793449");
    chatbox.setAttribute("attribution", "biz_inbox");
    window.fbAsyncInit = function () {
      FB.init({
        xfbml: true,
        version: 'v15.0'
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, [])

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
          <Route path='/about' element={<About />}></Route>
          <Route path='/estimate/:_id' element={<ProtectedRoute><Estimate /></ProtectedRoute>}></Route>
          <Route path='/subscription/:_id' element={<ProtectedRoute><Subscription /></ProtectedRoute>}></Route>
          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route path='admin' element={<AdminRoute><Admin /></AdminRoute>}></Route>
            {/* <Route path='agent' element={<Admin></Admin>}></Route> */}
            <Route index element={<UserRoute><Client /></UserRoute>}></Route>
          </Route>
          <Route path='/payment' element={<ProtectedRoute><Payment></Payment></ProtectedRoute>}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </Navbar>
      <div id="fb-root"></div>
      <div id="fb-customer-chat" className="fb-customerchat">
      </div>
    </>

  )
}

export default App