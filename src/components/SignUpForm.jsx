import { useState } from "react"; // Import useState
import PropTypes from "prop-types"; // Import PropTypes from prop-types module

SignUpForm.propTypes = {
  setToken: PropTypes.func.isRequired, // Validate setToken prop
};

export default function SignUpForm({ setToken }) {
  // Deconstruct setToken from props
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const [error, setError] = useState(null); // State for error

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent page refresh

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST", // Set method to POST
          headers: {
            "Content-Type": "application/json", // Set content type
          },
          body: JSON.stringify({ username, password }), // Send username and password
        }
      );
      const result = await response.json(); // Parse response
      setToken(result.token); // Set token from API response
    } catch (error) {
      setError(error.message); // Set error message
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Control input
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Control input
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}
