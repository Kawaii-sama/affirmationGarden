import { useState } from "react"
import API from "../api/axios"
import EnchantedBackground from "../components/EnchantedBackground"

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
    <>
      <EnchantedBackground />
      <div className="min-h-screen flex items-center justify-center px-6" style={{ position: "relative", zIndex: 1 }}>
        <div className="w-full max-w-md">

          <div className="text-center mb-10">
            <p className="text-5xl mb-4">🌱</p>
            <h1 className="text-4xl mb-2" style={{ color: "#e8dcc8" }}>
              Start your garden
            </h1>
            <p style={{ color: "#b8a892" }}>
              A new journey begins with a single seed.
            </p>
          </div>

          <div style={{
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }} className="rounded-3xl p-8">

            {error && (
              <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
            )}

            {success && (
              <p className="text-green-400 text-sm mb-4 text-center">{success}</p>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-sm mb-2" style={{ color: "#b8a892" }}>
                  Your name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="What shall we call you?"
                  className="w-full rounded-2xl px-4 py-3 focus:outline-none"
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#e8dcc8",
                  }}
                />
              </div>

              <div className="mb-5">
                <label className="block text-sm mb-2" style={{ color: "#b8a892" }}>
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-2xl px-4 py-3 focus:outline-none"
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#e8dcc8",
                  }}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm mb-2" style={{ color: "#b8a892" }}>
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl px-4 py-3 focus:outline-none"
                  style={{
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#e8dcc8",
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl text-lg transition-all hover:scale-[1.02]"
                style={{
                  background: "rgba(124, 154, 110, 0.6)",
                  border: "1px solid rgba(124, 154, 110, 0.3)",
                  color: "#e8f0e0",
                }}
              >
                Plant my first seed 🌱
              </button>
            </form>

            <p className="text-center text-sm mt-6" style={{ color: "#b8a892" }}>
              Already have an account?{" "}
              <a href="/" style={{ color: "#a0c090" }} className="underline">
                Login
              </a>
            </p>

          </div>
        </div>
      </div>
    </>
  )
}

export default Register