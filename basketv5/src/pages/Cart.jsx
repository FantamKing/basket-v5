import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// This would typically come from a context or global state
const sampleCartItems = [
  { id: 1, name: "Organic Apples (1kg)", price: 199, quantity: 2, image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" },
  { id: 2, name: "Fresh Milk (1L)", price: 60, quantity: 1, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" }
]

export default function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    // For demo purposes, using sample data
    // In real app, this would come from context/state management
    setCartItems(sampleCartItems)
    setIsEmpty(sampleCartItems.length === 0)
  }, [])

  const updateQuantity = (id, change) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    )
  }

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const deliveryFee = 40
  const subtotal = calculateSubtotal()
  const total = subtotal + deliveryFee

  useEffect(() => {
    setIsEmpty(cartItems.length === 0)
  }, [cartItems])

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!')
      return
    }
    alert(`Proceeding to checkout. Total: ₹${total}`)
    // In real app, navigate to checkout page
  }

  return (
    <main>
      <h1 className="page-title">Your Shopping Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {isEmpty ? (
            <div className="empty-cart">
              <i className="Express-Basket_shopping-cart"></i>
              <h3>Your cart is empty</h3>
              <p>Add some products to your cart</p>
              <Link to="/store" className="shop-now-btn">Shop Now</Link>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="price">₹{item.price}</p>
                  </div>
                  
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                  </div>
                  
                  <div className="item-total">
                    <span>₹{item.price * item.quantity}</span>
                    <button 
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                    >
                      <i className="Express-Basket_trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {!isEmpty && (
          <div className="order-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span id="subtotal">₹{subtotal}</span>
            </div>
            
            <div className="summary-row">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            
            <div className="summary-row total-row">
              <span>Total</span>
              <span id="total">₹{total}</span>
            </div>
            
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            
            <p className="secure-note">
              <i className="Express-Basket_lock"></i> Secure checkout
            </p>
          </div>
        )}
      </div>
    </main>
  )
}