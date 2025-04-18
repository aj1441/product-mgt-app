import { useEffect, useState } from "react";
import Header from "../customCompoents/Header";
import Category from "../customCompoents/Category";
import FeedBackTiles from "../customCompoents/FeedBackTiles";
import NoFeedback from "../customCompoents/NoFeedBack";
import FeedbackBar from "../customCompoents/FeedbackBar";

function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/feedback`)
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredFeedbacks =
    category === "All"
      ? feedbacks
      : feedbacks.filter((fb) => fb.category === category);

  return (
    <div className="home">
      <div className="top-bar">
        <Header onToggleSidebar={setShowSidebar} />
        <div className="category-inline">
          <Category selected={category} onSelect={setCategory} />
        </div>
      </div>

      {showSidebar && (
        <>
          <div className="grey-out" onClick={() => setShowSidebar(false)} />
          <div className="mobile-sidebar-overlay">
            <Category selected={category} onSelect={setCategory} />
          </div>
        </>
      )}
      <section className="desktop-main">
      <FeedbackBar />
      <main className="main-content">
        {filteredFeedbacks.length === 0
          ? <NoFeedback />
          : filteredFeedbacks.map(fb => <FeedBackTiles key={fb.id} feedback={fb} />)
        }
      </main>
      </section>
    </div>
  );
}

export default Home;
