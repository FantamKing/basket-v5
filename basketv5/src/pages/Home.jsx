import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h2>Fresh Groceries Delivered to Your Door</h2>
          <p>Get fresh produce, pantry staples, and more delivered in 30 minutes</p>
          <Link to="/categories" className="shop-btn">Shop Now</Link>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Why Choose Express Basket?</h2>
        <div className="feature-cards">
          <div className="card">
            <i className="express-basket_bolt"></i>
            <h3>Fast Delivery</h3>
            <p>Delivery in 30 minutes or less</p>
          </div>
          <div className="card">
            <i className="express-basket_leaf"></i>
            <h3>Fresh Products</h3>
            <p>100% fresh and quality checked</p>
          </div>
          <div className="card">
            <i className="express-basket_shield-alt"></i>
            <h3>Safe Packaging</h3>
            <p>Hygienic and secure packaging</p>
          </div>
          <div className="card">
            <i className="express-basket_tags"></i>
            <h3>Best Prices</h3>
            <p>Guaranteed best prices everyday</p>
          </div>
        </div>
      </section>

      <section className="popular">
        <h2 className="section-title">Popular Categories</h2>
        <div className="category-cards">
          <div className="cat-card">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Fruits" />
            <h3>Fresh Fruits</h3>
            <p>Apples, bananas, oranges and more</p>
          </div>
          <div className="cat-card">
            <img src="https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Dairy" />
            <h3>Dairy & Eggs</h3>
            <p>Milk, cheese, butter, eggs</p>
          </div>
          <div className="cat-card">
            <img src="https://images.unsplash.com/photo-1604503468506-a8da13d82791?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Meat" />
            <h3>Meat & Seafood</h3>
            <p>Chicken, fish, prawns, mutton</p>
          </div>
        </div>
      </section>
    </main>
  )
}
