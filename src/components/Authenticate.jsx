import { useState } from "react"; // Import useState
import PropTypes from 'prop-types'; // Import PropTypes from prop-types module

export default function Authenticate({ token }) { // Deconstruct token from props
  Authenticate.propTypes = {
    token: PropTypes.string.isRequired,
  }; // Validate token prop

  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const [error, setError] = useState(null); // State for error
  const [username, setUsername] = useState(null); // State for username

  async function handleClick() { // Define handleClick function
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
        }
      );
      const result = await response.json(); // Parse response
      setSuccessMessage(result.message); // Set success message from API response
      setUsername(result.data.username); // Set username from data property
    } catch (error) {
      setError(error.message); // Set error message
    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>} {/* Conditionally render success message */}
      {username && <p>Logged in as: {username}</p>} {/* Display username */}
      {error && <p>{error}</p>} {/* Conditionally render error message */}
      <button onClick={handleClick}>Authenticate Token!</button> {/* Attach handleClick to button */}
    </div>
  );
}