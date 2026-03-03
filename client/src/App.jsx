import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Homepage from './pages/Homepage'
import {Toaster} from "react-hot-toast"
import Footer from './components/Footer'
import { useAppContext } from './context/AppContext'
import Login from './components/Login'
import AllProducts from './pages/AllProducts'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import Myorders from './pages/Myorders'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import Orders from './pages/seller/Orders'
import ProductList from './pages/seller/ProductList'
import Loading from './components/Loading'

const App = () => {
  const isSellerPath=useLocation().pathname.includes("seller");
  const {showUserLogin, isSeller} =useAppContext();
  return (
    <div className='text-default min-h-screen text-gary-700 bg-white' >
      {isSellerPath? null : <Navbar/>}
      {showUserLogin ? <Login/>:null}
      <Toaster/>
      
      <div className={`${isSellerPath} ? "": "px-6 md:px16 lg:px-25 xl:px-32"` }>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/products' element={<AllProducts/>} />
          <Route path='/products/:category' element={<ProductCategory/>} />
          <Route path='/products/:category/:id' element={<ProductDetails/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/add-address' element={<AddAddress/>} />
          <Route path='/my-orders' element={<Myorders/>} />
          <Route path='/loader' element={<Loading/>} />
          <Route path='/seller' element={isSeller ?<SellerLayout/>: <SellerLogin/>} >
             <Route index element={isSeller ? <AddProduct/> : null} />
             <Route path='product-list' element={<ProductList/>} />
             <Route path='orders' element= {<Orders/>} />
          </Route>
        </Routes>
        {!isSellerPath && <Footer/>}
      </div>
    </div>
  )
}

export default App
