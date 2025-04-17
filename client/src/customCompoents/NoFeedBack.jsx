import { useNavigate } from 'react-router-dom'
import './NoFeedBack.css'; // Assuming you have a CSS file for styling
// import {noFeedbackImage} from '../assets/no_feedback.png'; // Adjust the path as necessary

function NoFeedback() {
  const navigate = useNavigate()
  return (
    <div className="no-feedback">
      <img src="/no_feedback.png" alt="No Feedback" />
      <h2>There is no feedback.</h2>
      <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
      <button className="add-feedback-btn" onClick={() => navigate('/add-feedback')}>
        + Add Feedback
      </button>
    </div>
  )
}

export default NoFeedback
