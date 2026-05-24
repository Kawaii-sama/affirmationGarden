import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Garden from "../components/Garden"

function Dashboard() {
  const [user, setUser]   = useState(null)
  const navigate          = useNavigate()

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
    <div>
      <h1>Welcome back, {user.name} 🌱</h1>

      {/* Garden visualization */}
      <Garden gardenStage={user.gardenStage} />

      {/* Stats */}
      <div>
        <h2>Your Progress</h2>

        <div>
          <p>🔥 Streak</p>
          <p>{user.streak} {user.streak === 1 ? "day" : "days"}</p>
        </div>

        <div>
          <p>✅ Completed Days</p>
          <p>{user.completedDays}</p>
        </div>

        <div>
          <p>🌿 Garden Stage</p>
          <p>Stage {user.gardenStage}</p>
        </div>
      </div>

      {/* Buttons */}
      <button onClick={() => navigate("/reflection")}>
        Add Today's Reflection 🌿
      </button>

      <button onClick={() => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        navigate("/")
      }}>
        Logout
      </button>

    </div>
  )
}

export default Dashboard