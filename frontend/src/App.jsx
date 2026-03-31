import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

import Navbar          from './components/Navbar'
import ProtectedRoute  from './components/ProtectedRoute'

// Páginas públicas
import Home            from './pages/Home'
import Login           from './pages/Login'
import Register        from './pages/Register'
import GalleryDemo from './pages/GalleryDemo'
import Gallery         from './pages/Gallery'
import Cart            from './pages/Cart'

// Páginas privadas
import ProductDetail   from './pages/ProductDetail'
import Profile         from './pages/Profile'
import CreatePost      from './pages/CreatePost'
import EditPost        from './pages/EditPost'
import Checkout        from './pages/Checkout'


const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/login"      element={<Login />} />
          <Route path="/register"   element={<Register />} />
          <Route path="/gallery"      element={<Gallery />} />
          <Route path="/gallerydemo" element={<GalleryDemo />} />
          <Route path="/cart"         element={<Cart />}  />
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/profile"     element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          }/>
          <Route path="/create"      element={
            <ProtectedRoute><CreatePost /></ProtectedRoute>
          }/>
          <Route path="/edit/:id" element={
            <ProtectedRoute><EditPost /></ProtectedRoute>
          }/>
          <Route path="/checkout" element={
            <ProtectedRoute><Checkout /></ProtectedRoute>
          }/>

        </Routes>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App