import { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (post) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === post.id)
      if (exists) {
        return prev.map((item) =>
          item.id === post.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...post, quantity: 1 }]
    })
  }

  const removeFromCart = (postId) => {
    setCart((prev) => prev.filter((item) => item.id !== postId))
  }

  const clearCart = () => setCart([])

  const updateQuantity = (postId, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === postId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  )

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)