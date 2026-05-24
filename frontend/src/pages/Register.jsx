import { useState } from "react"
import API from "../api/axios"

function Register() {
  const [name, setName]         = useState("")
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")
  const [success, setSuccess]   = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      await API.post("/auth/register", {
        name,
        email,
        password
      })

      setSuccess("Account created! Redirecting...")
      setTimeout(() => {
        window.location.href = "/"
      }, 1500)

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f6f0] flex items-center justify-center px-6">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-5xl mb-4">🌱</p>
          <h1 className="text-4xl text-[#5c4a3a] mb-2">
            Start your garden
          </h1>
          <p className="text-[#9c8572]">
            A new journey begins with a single seed.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-sm">

          {error && (
            <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
          )}

          {success && (
            <p className="text-green-500 text-sm mb-4 text-center">{success}</p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-sm text-[#9c8572] mb-2">
                Your name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="What shall we call you?"
                className="w-full border border-[#e0d8d0] rounded-2xl px-4 py-3 text-[#5c4a3a] focus:outline-none focus:border-[#7c9a6e] bg-[#faf8f5]"
              />
            </div>

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
              Plant my first seed 🌱
            </button>
          </form>

          <p className="text-center text-sm text-[#9c8572] mt-6">
            Already have an account?{" "}
            <a href="/" className="text-[#7c9a6e] underline">
              Login
            </a>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register