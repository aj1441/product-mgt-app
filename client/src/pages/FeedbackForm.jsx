import AddFeedbackForm from '../customCompoents/AddFeedbackForm'
import { useNavigate } from 'react-router-dom'
// import './App.css'

function FeedbackForm() {
  const navigate = useNavigate()

  return (
    <div className="feedback-form-page">
      <button className="go-back-btn" onClick={() => navigate(-1)}>← Go Back</button>
      <h1 className="page-title">Create New Feedback</h1>
      <AddFeedbackForm onSubmitSuccess={() => navigate('/')} />
    </div>
  )
}

export default FeedbackForm
