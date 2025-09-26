
import React from 'react'


import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Contact from './components/Contact'
import About from './components/About'

import Cart from './components/Cart'
import Payment from './components/Payment'
import ProductCard from './components/ProductCard'

import UploadPrd from './admin/UploadPrd'
import CreateItem from './admin/CreateItem'
import EditProduct from './admin/EditProduct'
import AdminPage from './admin/AdminPage'
import ThankYou from './components/ThankYou'



function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
       <Route path='/register' element={<SignUp/>}/>
       <Route path='/contact' element={<Contact/>}/>
       <Route path='/about' element={<About/>}/>
       <Route path='/product' element={<ProductCard/>}/>
       <Route path='/cart' element={<Cart/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path="/thank-you" element={<ThankYou/>} />

        {/* AdminPage  */}
         <Route path='/admin' element={<AdminPage/>}/>
         <Route path='/upload' element={<UploadPrd/>}/>
         <Route path='/create' element={<CreateItem/>}/> 
         <Route path="/edit/:id" element={<EditProduct />} />
     
       
    </Routes>

  )
}

export default App