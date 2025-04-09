import './Category.css'

function Category({ selected, onSelect }) {
  const categories = ['All', 'UI', 'UX', 'Enhancement', 'Bug', 'Feature']

  return (
    <nav className="category-bar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`category-btn ${selected === cat ? 'active' : ''}`}
        >
          {cat}
        </button>
      ))}
    </nav>
  )
}

export default Category
