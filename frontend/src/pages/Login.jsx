import { useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api/axios"

function Login() {
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      const response = await API.post("/auth/login", {
        email,
        password
      })

      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard")

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f6f0] flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <p className="text-5xl mb-4">🌸</p>
          <h1 className="text-4xl text-[#5c4a3a] mb-2">
            Affirmation Garden
          </h1>
          <p className="text-[#9c8572]">
            Welcome back, your garden missed you.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm">

          {error && (
            <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-sm text-[#9c8572] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full border border-[#e0d8d0] rounded-2xl px-4 py-3 text-[#5c4a3a] focus:outline-none focus:border-[#7c9a6e] bg-[#faf8f5]"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-[#9c8572] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-[#e0d8d0] rounded-2xl px-4 py-3 text-[#5c4a3a] focus:outline-none focus:border-[#7c9a6e] bg-[#faf8f5]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#7c9a6e] hover:bg-[#6a8860] text-white py-3 rounded-2xl text-lg transition-colors"
            >
              Enter my garden 🌿
            </button>
          </form>

          <p className="text-center text-sm text-[#9c8572] mt-6">
            New here?{" "}
            <a href="/register" className="text-[#7c9a6e] underline">
              Create an account
            </a>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login