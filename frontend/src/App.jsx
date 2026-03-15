import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import Navbar          from './components/Navbar'
import ProtectedRoute  from './components/ProtectedRoute'

// Páginas públicas
import Home            from './pages/Home'
import Login           from './pages/Login'
import Register        from './pages/Register'
import GalleryDemo from './pages/GalleryDemo'

// Páginas privadas
import Gallery         from './pages/Gallery'
import ProductDetail   from './pages/ProductDetail'
import Profile         from './pages/Profile'
import CreatePost      from './pages/CreatePost'


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/login"      element={<Login />} />
          <Route path="/register"   element={<Register />} />
          <Route path="/gallerydemo" element={<GalleryDemo />} />

  // Quito el ProtectedRoute para visualizacion de las paginas privadas.
          <Route path="/gallery"    element={<Gallery />
          }/>
          <Route path="/product/:id" element={<ProductDetail />
          }/>
          <Route path="/profile"    element={<Profile />
          }/>
          <Route path="/create"     element={<CreatePost />
          }/>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App