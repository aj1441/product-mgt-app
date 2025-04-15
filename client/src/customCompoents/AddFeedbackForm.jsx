import { useState } from 'react'
import './AddFeedbackForm.css'

function AddFeedbackForm({ onSubmitSuccess }) {
  const [title, setTitle] = useState('')
  const [detail, setDetail] = useState('')
  const [category, setCategory] = useState('Feature')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newFeedback = { title, detail, category }

    try {
      const res = await fetch('http://localhost:3001/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeedback),
      })

      if (res.ok) {
        setTitle('')
        setDetail('')
        setCategory('Feature')
        onSubmitSuccess?.() // optional callback for parent
      } else {
        console.error('Failed to add feedback')
      }
    } catch (err) {
      console.error('Error submitting form:', err)
    }
  }

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <label>
        Feedback Title <br />
        <span className='label-description'>Add a short, descritptive headline</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </label>

      <label>
        Category <br />
        <span className='label-description'>Choose a category for your feedback</span>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Feature</option>
          <option>UI</option>
          <option>UX</option>
          <option>Enhancement</option>
          <option>Bug</option>
        </select>
      </label>

      <label>
        Feedback Detail <br />
        <span className='label-description'>Include any specific comments on what should be improved, added, etc.</span>
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          required
        />
      </label>

      <button type="submit">Add Feedback</button>
    </form>
  )
}

export default AddFeedbackForm
