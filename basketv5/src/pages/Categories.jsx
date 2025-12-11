import { useState } from 'react'

const categoriesData = [
  {
    id: 1,
    title: "Fresh Produce",
    tag: "Highest demand",
    subcategories: [
      {
        title: "Fruits",
        items: ["Seasonal fruits", "Tropical imports", "Organic options"]
      },
      {
        title: "Vegetables",
        items: ["Leafy greens", "Root vegetables", "Salad kits"]
      },
      {
        title: "Herbs and aromatics",
        items: ["Fresh herbs", "Garlic", "Ginger", "Chili"]
      }
    ]
  },
  {
    id: 2,
    title: "Dairy and Eggs",
    tag: "Daily essentials",
    subcategories: [
      {
        title: "Milk and alternatives",
        items: ["Regular", "Lactose free", "Almond milk", "Oat milk", "Soy milk"]
      },
      {
        title: "Cheese",
        items: ["Blocks", "Shredded", "Slices", "Artisanal", "Vegan"]
      }
    ]
  },
  {
    id: 3,
    title: "Meat and Seafood",
    tag: "Premium",
    subcategories: [
      {
        title: "Chicken",
        items: ["Whole", "Cuts", "Boneless", "Marinated"]
      },
      {
        title: "Red meat",
        items: ["Beef", "Lamb", "Pork"]
      }
    ]
  }
]

export default function Categories() {
  const [expandedCategory, setExpandedCategory] = useState(null)

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id)
  }

  return (
    <main>
      <h1 className="page-title">All Categories</h1>
      <div className="categories-container">
        {categoriesData.map((category) => (
          <div key={category.id} className="category-box">
            <div 
              className="cat-header" 
              onClick={() => toggleCategory(category.id)}
            >
              <h2>{category.title}</h2>
              <span>{category.tag}</span>
              <i className={`Express-Basket_chevron-${expandedCategory === category.id ? 'up' : 'down'}`}></i>
            </div>
            
            {expandedCategory === category.id && (
              <div className="cat-details">
                {category.subcategories.map((subcat, index) => (
                  <div key={index} className="sub-cat">
                    <h3>{subcat.title}</h3>
                    <div className="items">
                      {subcat.items.map((item, i) => (
                        <span key={i}>{item}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}