import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Garden from "../components/Garden"

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate        = useNavigate()

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (!savedUser) {
      navigate("/")
      return
    }
    setUser(JSON.parse(savedUser))
  }, [])

  if (!user) return null

  return (
    <div className="min-h-screen bg-[#f9f6f0] px-6 py-10 max-w-xl mx-auto">

      {/* Header */}
      <h1 className="text-4xl text-[#5c4a3a] mb-2">
        Welcome back, {user.name} 🌱
      </h1>
      <p className="text-[#9c8572] mb-8">
        Your daily reflection awaits you.
      </p>

      {/* Garden */}
      <Garden gardenStage={user.gardenStage} />

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
          <p className="text-2xl">🔥</p>
          <p className="text-xl font-medium text-[#5c4a3a]">{user.streak}</p>
          <p className="text-xs text-[#9c8572]">
            {user.streak === 1 ? "day streak" : "day streak"}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
          <p className="text-2xl">✅</p>
          <p className="text-xl font-medium text-[#5c4a3a]">{user.completedDays}</p>
          <p className="text-xs text-[#9c8572]">days done</p>
        </div>

        <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
          <p className="text-2xl">🌿</p>
          <p className="text-xl font-medium text-[#5c4a3a]">
            {user.gardenStage}
          </p>
          <p className="text-xs text-[#9c8572]">garden stage</p>
        </div>
      </div>

      {/* Buttons */}
      <button
        onClick={() => navigate("/reflection")}
        className="w-full mt-8 bg-[#7c9a6e] hover:bg-[#6a8860] text-white py-3 rounded-2xl text-lg transition-colors"
      >
        Add Today's Reflection 🌿
      </button>

      <button
        onClick={() => {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          navigate("/")
        }}
        className="w-full mt-3 bg-transparent border border-[#c9b8a8] text-[#9c8572] py-3 rounded-2xl text-lg hover:bg-[#f0ebe4] transition-colors"
      >
        Logout
      </button>

    </div>
  )
}

export default Dashboard