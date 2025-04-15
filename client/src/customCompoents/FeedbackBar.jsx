import { useNavigate } from 'react-router-dom'
import './FeedbackBar.css'

function FeedbackBar() {
  const navigate = useNavigate()

  return (
    <div className="feedback-bar">
      <button className="add-feedback-btn" onClick={() => navigate('/add-feedback')}>
        + Add Feedback
      </button>
    </div>
  )
}

export default FeedbackBar

