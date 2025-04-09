import './NoFeedback.css'

function NoFeedback() {
  return (
    <div className="no-feedback">
      <img src="/no-feedback.svg" alt="No Feedback" />
      <h2>There is no feedback.</h2>
      <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
      <button className="add-feedback-btn">+ Add Feedback</button>
    </div>
  )
}

export default NoFeedback
