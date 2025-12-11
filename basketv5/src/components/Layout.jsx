import { Outlet, NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Layout() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignup, setShowSignup] = useState(false)

  async function handleLogin(e) {
    e.preventDefault()
    const form = e.target
    const data = {
      email: form.email.value,
      password: form.password.value,
    }

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (res.ok) {
        alert('Login successful: ' + (json.message || 'OK'))
        setShowLogin(false)
      } else {
        alert('Login failed: ' + (json.message || res.status))
      }
    } catch (err) {
      alert('Login error: ' + err.message)
    }
  }

  async function handleSignup(e) {
    e.preventDefault()
    const form = e.target
    const data = {
      name: form.name.value,
      email: form.email.value,
      password: form.password.value,
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (res.ok) {
        alert('Signup successful: ' + (json.message || 'OK'))
        setShowSignup(false)
      } else {
        alert('Signup failed: ' + (json.message || res.status))
      }
    } catch (err) {
      alert('Signup error: ' + err.message)
    }
  }

  return (
    <>
      <div className="top-bar">
        <p><i className="express-basket_truck"></i> Delivery in 30 minutes</p>
        <p><i className="express-basket_phone"></i> Call: 1800-999999999</p>
      </div>

      <header className="header">
        <div className="logo">
          <i className="express-basket_shopping-basket"></i>
          <h1>Express Basket</h1>
        </div>

        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/store">Store</NavLink>
          <NavLink to="/cart">Cart</NavLink>
        </nav>

        <div className="search">
          <input type="text" placeholder="Search products..." />
          <button><i className="express-basket_search"></i></button>
        </div>

        <div className="user-btns">
          <button className="login-btn" onClick={() => setShowLogin(true)}>Login</button>
          <button className="signup-btn" onClick={() => setShowSignup(true)}>Sign Up</button>
        </div>
      </header>

      <Outlet />

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Express Basket</h3>
            <p>Fresh groceries delivered to your home</p>
            <div className="social">
              <i className="ebSocial_facebook"></i>
              <i className="ebSocial_twitter"></i>
              <i className="ebSocial_instagram"></i>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="#">Home</a>
            <a href="#">Categories</a>
            <a href="#">Store</a>
            <a href="#">Cart</a>
          </div>

          <div className="footer-section">
            <h3>Help</h3>
            <a href="#">Contact Us</a>
            <a href="#">FAQs</a>
            <a href="#">Delivery Info</a>
            <a href="#">Return Policy</a>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p><i className="express-basket_map-marker-alt"></i> 123 Grocery Street</p>
            <p><i className="express-basket_phone"></i> 1800-999999999</p>
            <p><i className="express-basket_envelope"></i> expressbasket@grocery.com</p>
          </div>
        </div>

        <div className="copyright">
          <p>© 2025 Express Basket. All rights reserved.</p>
        </div>
      </footer>

      {/* Login Modal */}
      <div className={"modal" + (showLogin ? ' show' : '')}>
        <div className="modal-content">
          <button className="close-btn" onClick={() => setShowLogin(false)}>×</button>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit" className="green-btn">Login</button>
          </form>
          <p>No account? <button onClick={() => { setShowLogin(false); setShowSignup(true); }} className="link-like">Sign Up</button></p>
        </div>
      </div>

      {/* Signup Modal */}
      <div className={"modal" + (showSignup ? ' show' : '')}>
        <div className="modal-content">
          <button className="close-btn" onClick={() => setShowSignup(false)}>×</button>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <input name="name" type="text" placeholder="Full Name" required />
            <input name="email" type="email" placeholder="Email" required />
            <input name="password" type="password" placeholder="Password" required />
            <button type="submit" className="green-btn">Sign Up</button>
          </form>
          <p>Have account? <button onClick={() => { setShowSignup(false); setShowLogin(true); }} className="link-like">Login</button></p>
        </div>
      </div>
    </>
  )
}
