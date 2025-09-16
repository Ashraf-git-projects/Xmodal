import { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: ""
  });

  // Open modal
  const openModal = () => setIsOpen(true);

  // Close modal (click outside)
  const closeModal = (e) => {
    if (e.target.className === "modal") setIsOpen(false);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // Validation
  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, phone, dob } = formData;

    // Check empty fields
    if (!username.trim() || !email.trim() || !phone.trim() || !dob.trim()) {
      alert("Please fill all the fields.");
      return;
    }

    // Email validation
    if (!email.includes("@")) {
      alert("Invalid email. Please check your email address.");
      return;
    }

    // Phone number validation (10 digits)
    if (!/^\d{10}$/.test(phone)) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return;
    }

    // DOB validation (not future)
    const dobDate = new Date(dob);
    const today = new Date();
    if (dobDate > today) {
      alert("Invalid date of birth. Please enter a valid date.");
      return;
    }

    // If all validations pass, reset modal and form
    setFormData({ username: "", email: "", phone: "", dob: "" });
    setIsOpen(false);
  };

  return (
    <div className="app">
      <h1>User Details Modal</h1>
      <button onClick={openModal}>Open Form</button>

      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <h1>Fill Details</h1>
              <div>
                <label>Username:</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                   required
                />
              </div>
              <div>
                <label>Phone Number:</label>
                <input
                  id="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                   required
                />
              </div>
              <div>
                <label>Date of Birth:</label>
                <input
                  id="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleChange}
                   required
                />
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
