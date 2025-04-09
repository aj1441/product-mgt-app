import { useEffect, useState } from 'react'
import Header from '../customCompoents/Header'
import Category from '../customCompoents/Category'
import FeedBackTiles from '../customCompoents/FeedBackTiles'
import NoFeedback from '../customCompoents/NoFeedBack'

function Home() {
  const [showSidebar, setShowSidebar] = useState(false)
  const [feedbacks, setFeedbacks] = useState([])
  const [category, setCategory] = useState('All')

  useEffect(() => {
    fetch('http://localhost:3000/api/feedback')
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error(err))
  }, [])

  const filteredFeedbacks =
    category === 'All' ? feedbacks : feedbacks.filter(fb => fb.category === category)

  return (
    <div className="home">
      <Header onToggleSidebar={setShowSidebar} />

      {/* MOBILE CATEGORY MENU */}
      {showSidebar && (
        <div className="mobile-sidebar-overlay">
          <Category selected={category} onSelect={setCategory} />
        </div>
      )}

      <main className="main-content">
        {filteredFeedbacks.length === 0
          ? <NoFeedback />
          : filteredFeedbacks.map(fb => <FeedBackTiles key={fb.id} feedback={fb} />)
        }
      </main>
    </div>
  )
}

export default Home
