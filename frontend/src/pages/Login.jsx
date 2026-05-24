import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/axios"

function Login() {
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")

  const navigate = useNavigate()  // lets us redirect to another page

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await API.post("/auth/login", {
        email,
        password
      })

      // Save the token to localStorage
      localStorage.setItem("token", response.data.token)

      // Save the user info too
      localStorage.setItem("user", JSON.stringify(response.data.user))

      // Redirect to dashboard
      navigate("/dashboard")

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div>
      <h2>Welcome Back 🌱</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
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

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  )
}

export default Login