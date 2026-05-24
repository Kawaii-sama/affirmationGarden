import { useState } from "react"
import API from "../api/axios"

function Register() {
  // These hold what the user types
  const [name, setName]       = useState("")
  const [email, setEmail]     = useState("")
  const [password, setPassword] = useState("")

  // This holds any error message to show the user
  const [error, setError]     = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()  // stops page from refreshing on submit
    setError("")        // clear any old errors

    try {
      const response = await API.post("/auth/register", {
        name,
        email,
        password
      })

      console.log("Registered!", response.data)
      // We'll add redirect to login after this

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div>
      <h2>Create Account</h2>

      {/* Show error if there is one */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button type="submit">Register</button>
      </form>

      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  )
}

export default Register