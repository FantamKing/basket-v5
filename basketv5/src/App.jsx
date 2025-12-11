// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Store from './pages/Store'
import Cart from './pages/Cart'

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="store" element={<Store />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </CartProvider>
  )
}

export default App