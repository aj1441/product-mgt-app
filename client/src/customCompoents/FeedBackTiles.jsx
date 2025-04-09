import './FeedBackTiles.css'

function FeedBackTiles({ feedback }) {
  return (
    <div className="feedback-tile">
      <h2>{feedback.title}</h2>
      <p>{feedback.detail}</p>
      <span className="feedback-category">{feedback.category}</span>
    </div>
  )
}

export default FeedBackTiles
