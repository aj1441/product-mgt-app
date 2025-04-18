import { useState } from "react";
import "./AddFeedbackForm.css";

function AddFeedbackForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    detail: "",
  });

  // handle input changes
  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(`${name}: ${value}`); // Debugging log
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const newFeedback = { title, detail, category }
    console.log(`${import.meta.env.VITE_API_URL}/api/add-feedback`);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/add-feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            category: formData.category,
            detail: formData.detail,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Feedback submitted successfully:", data);
      onSubmitSuccess(formData);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <label>
        Feedback Title <br />
        <span className="label-description">
          Add a short, descritptive headline
        </span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </label>

      <label>
        Category <br />
        <span className="label-description">
          Choose a category for your feedback
        </span>
        <select
          value={formData.category}
          name="category"
          onChange={handleChange}
        >
          <option value="Feature">Feature</option>
          <option value="UI">UI</option>
          <option value="UX">UX</option>
          <option value="Enhancement">Enhancement</option>
          <option value="Bug">Bug</option>
        </select>
      </label>

      <label>
        Feedback Detail <br />
        <span className="label-description">
          Include any specific comments on what should be improved, added, etc.
        </span>
        <textarea
          value={formData.detail}
          name="detail"
          rows="7"
          cols="30"
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Feedback</button>
    </form>
  );
}

export default AddFeedbackForm;
