import { useState } from 'react'

const productsData = [
  {
    id: 1,
    name: "Organic Apples (1kg)",
    price: 199,
    category: "Fresh Produce",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    quantity: 1
  },
  {
    id: 2,
    name: "Fresh Bananas (dozen)",
    price: 89,
    category: "Fresh Produce",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    quantity: 1
  },
  {
    id: 3,
    name: "Tomatoes (1kg)",
    price: 49,
    category: "Fresh Produce",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    quantity: 1
  },
  {
    id: 4,
    name: "Fresh Milk (1L)",
    price: 60,
    category: "Dairy and Eggs",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    quantity: 1
  }
]

export default function Store() {
  const [products, setProducts] = useState(productsData)
  const [cart, setCart] = useState([])
  const [categoryFilter, setCategoryFilter] = useState('All Categories')
  const [sortBy, setSortBy] = useState('Sort By')

  const updateQuantity = (id, change) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { ...product, quantity: Math.max(1, product.quantity + change) }
        : product
    ))
  }

  const addToCart = (id) => {
    const product = products.find(p => p.id === id)
    if (product) {
      setCart([...cart, { ...product }])
      alert(`${product.name} added to cart!`)
    }
  }

  const filteredProducts = products.filter(product => 
    categoryFilter === 'All Categories' || product.category === categoryFilter
  )

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'Price: Low to High') return a.price - b.price
    if (sortBy === 'Price: High to Low') return b.price - a.price
    return 0
  })

  return (
    <main>
      <h1 className="page-title">All Products</h1>

      <div className="filters">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option>All Categories</option>
          <option>Fresh Produce</option>
          <option>Dairy and Eggs</option>
          <option>Meat and Seafood</option>
          <option>Pantry Staples</option>
        </select>
        
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option>Sort By</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      <div className="products-grid">
        {sortedProducts.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="price">₹{product.price}</p>
            <p className="category">{product.category}</p>
            
            <div className="quantity">
              <button 
                className="qty-btn" 
                onClick={() => updateQuantity(product.id, -1)}
              >
                -
              </button>
              <span className="qty-value">{product.quantity}</span>
              <button 
                className="qty-btn" 
                onClick={() => updateQuantity(product.id, 1)}
              >
                +
              </button>
            </div>
            
            <button 
              className="add-btn"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </main>
  )
}