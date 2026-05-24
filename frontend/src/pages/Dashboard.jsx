import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Dashboard() {
  const [user, setUser]     = useState(null)
  const navigate            = useNavigate()

  useEffect(() => {
    // When dashboard loads, check if user is logged in
    const savedUser = localStorage.getItem("user")

    if (!savedUser) {
      // If no user found, send them back to login
      navigate("/")
      return
    }

    // If user found, save it to state
    setUser(JSON.parse(savedUser))
  }, [])

  // Show nothing while checking
  if (!user) return null

  return (
    <div>
      <h1>Welcome back, {user.name} 🌱</h1>

      <div>
        <h2>Your Garden Progress</h2>

        <div>
          <p>🔥 Streak</p>
          <p>{user.streak} {user.streak === 1 ? "day" : "days"}</p>
        </div>

        <div>
          <p>✅ Completed Days</p>
          <p>{user.completedDays} days</p>
        </div>

        <div>
          <p>🌿 Garden Stage</p>
          <p>{user.gardenStage}</p>
        </div>
      </div>

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