import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import Navbar          from './components/Navbar'
import ProtectedRoute  from './components/ProtectedRoute'

// Páginas públicas
import Home            from './pages/Home'
import Login           from './pages/Login'
import Register        from './pages/Register'
import GalleryDemo from './pages/GalleryDemo'
import Gallery         from './pages/Gallery'

// Páginas privadas
import ProductDetail   from './pages/ProductDetail'
import Profile         from './pages/Profile'
import CreatePost      from './pages/CreatePost'
import EditPost        from './pages/EditPost'


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/login"      element={<Login />} />
          <Route path="/register"   element={<Register />} />
          <Route path="/gallery"      element={<Gallery />} />
          <Route path="/gallerydemo" element={<GalleryDemo />} />

          <Route path="/product/:id" element={
            <ProtectedRoute><ProductDetail /></ProtectedRoute>
          }/>
          <Route path="/profile"     element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          }/>
          <Route path="/create"      element={
            <ProtectedRoute><CreatePost /></ProtectedRoute>
          }/>
          <Route path="/edit/:id" element={
            <ProtectedRoute><EditPost /></ProtectedRoute>
          }/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App