import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Garden from "../components/Garden"
import EnchantedBackground from "../components/EnchantedBackground"

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
    <>
      <EnchantedBackground />

      {/* Apothecary Tree - right trunk + horizontal branch + hanging herbs */}
      <svg
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
          imageRendering: "pixelated",
        }}
        viewBox="0 0 360 225"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* ===== RIGHT TREE TRUNK (thick, old, gnarled) ===== */}
        <rect x="330" y="0" width="30" height="225" fill="#2a1f10" />
        <rect x="332" y="0" width="8" height="225" fill="#3d2e18" opacity="0.6" />
        <rect x="345" y="0" width="5" height="225" fill="#1a1508" opacity="0.5" />
        {/* Bark texture */}
        <rect x="333" y="20" width="12" height="2" fill="#1a1508" opacity="0.3" />
        <rect x="335" y="45" width="10" height="2" fill="#1e1508" opacity="0.25" />
        <rect x="332" y="70" width="14" height="1" fill="#1a1508" opacity="0.3" />
        <rect x="334" y="100" width="11" height="2" fill="#1e1508" opacity="0.25" />
        <rect x="333" y="130" width="13" height="1" fill="#1a1508" opacity="0.3" />
        <rect x="335" y="155" width="9" height="2" fill="#1a1508" opacity="0.25" />
        <rect x="332" y="180" width="14" height="1" fill="#1e1508" opacity="0.3" />
        {/* Moss on trunk */}
        <rect x="330" y="40" width="4" height="3" fill="#3D6B4F" opacity="0.5" />
        <rect x="330" y="90" width="5" height="4" fill="#4A7C59" opacity="0.45" />
        <rect x="330" y="150" width="4" height="3" fill="#2E5939" opacity="0.5" />
        {/* Knots */}
        <rect x="338" y="60" width="4" height="4" rx="2" fill="#1a1508" opacity="0.4" />
        <rect x="336" y="120" width="3" height="3" rx="1" fill="#1e1508" opacity="0.35" />

        {/* ===== HORIZONTAL BRANCH (old, meek, extending left) ===== */}
        <path d="M340 120 Q300 117 260 121 Q220 119 180 123 Q140 121 100 125 Q80 127 65 130"
          stroke="#2a1f10" fill="none" strokeWidth="7" strokeLinecap="round" />
        <path d="M340 120 Q300 117 260 121 Q220 119 180 123 Q140 121 100 125 Q80 127 65 130"
          stroke="#3d2e18" fill="none" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        <path d="M340 120 Q300 117 260 121 Q220 119 180 123 Q140 121 100 125 Q80 127 65 130"
          stroke="#1a1508" fill="none" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        {/* Moss patches on branch */}
        <rect x="120" y="120" width="8" height="3" fill="#3D6B4F" opacity="0.5" />
        <rect x="200" y="117" width="6" height="3" fill="#4A7C59" opacity="0.45" />
        <rect x="280" y="116" width="7" height="3" fill="#2E5939" opacity="0.5" />
        {/* Small sub-branches */}
        <line x1="250" y1="121" x2="245" y2="113" stroke="#2a1f10" strokeWidth="2" opacity="0.7" />
        <line x1="170" y1="122" x2="168" y2="115" stroke="#2a1f10" strokeWidth="2" opacity="0.6" />
        <line x1="110" y1="124" x2="106" y2="117" stroke="#2a1f10" strokeWidth="1.5" opacity="0.6" />

        {/* ===== HANGING HERBS / PLANTS / FLOWERS ===== */}

        {/* Herb bundle 1 - lavender */}
        <line x1="100" y1="127" x2="100" y2="145" stroke="#8B7355" strokeWidth="0.5" opacity="0.6" />
        <rect x="98" y="145" width="1" height="8" fill="#4A7C59" opacity="0.7" />
        <rect x="100" y="143" width="1" height="10" fill="#3D6B4F" opacity="0.7" />
        <rect x="102" y="145" width="1" height="7" fill="#5C8A4A" opacity="0.65" />
        <rect x="99" y="142" width="1" height="2" fill="#9370DB" opacity="0.6" />
        <rect x="101" y="141" width="1" height="2" fill="#8A65C8" opacity="0.55" />
        <rect x="97" y="144" width="1" height="2" fill="#9370DB" opacity="0.5" />

        {/* Herb bundle 2 - dried flowers */}
        <line x1="140" y1="123" x2="140" y2="140" stroke="#8B7355" strokeWidth="0.5" opacity="0.6" />
        <rect x="138" y="140" width="1" height="9" fill="#6B8F5E" opacity="0.7" />
        <rect x="140" y="138" width="1" height="11" fill="#4A7C59" opacity="0.7" />
        <rect x="142" y="139" width="1" height="8" fill="#5C8A4A" opacity="0.65" />
        <rect x="139" y="137" width="1" height="2" fill="#DAA520" opacity="0.6" />
        <rect x="141" y="136" width="1" height="2" fill="#E8C547" opacity="0.55" />
        <rect x="143" y="138" width="1" height="2" fill="#D4AF37" opacity="0.5" />

        {/* Herb bundle 3 - rosemary */}
        <line x1="180" y1="123" x2="180" y2="143" stroke="#8B7355" strokeWidth="0.5" opacity="0.6" />
        <rect x="178" y="143" width="1" height="10" fill="#2E5939" opacity="0.7" />
        <rect x="180" y="141" width="1" height="12" fill="#3D6B4F" opacity="0.7" />
        <rect x="182" y="142" width="1" height="9" fill="#4A7C59" opacity="0.65" />
        <rect x="179" y="140" width="1" height="3" fill="#2E5939" opacity="0.5" />

        {/* Herb bundle 4 - dried red flowers */}
        <line x1="220" y1="120" x2="220" y2="137" stroke="#8B7355" strokeWidth="0.5" opacity="0.6" />
        <rect x="218" y="137" width="1" height="8" fill="#4A7C59" opacity="0.7" />
        <rect x="220" y="135" width="1" height="10" fill="#3D6B4F" opacity="0.7" />
        <rect x="222" y="136" width="1" height="7" fill="#5C8A4A" opacity="0.65" />
        <rect x="219" y="134" width="1" height="2" fill="#8B3A3A" opacity="0.6" />
        <rect x="221" y="133" width="1" height="2" fill="#A04040" opacity="0.55" />

        {/* Herb bundle 5 - chamomile */}
        <line x1="260" y1="120" x2="260" y2="135" stroke="#8B7355" strokeWidth="0.5" opacity="0.6" />
        <rect x="258" y="135" width="1" height="7" fill="#6B8F5E" opacity="0.7" />
        <rect x="260" y="133" width="1" height="9" fill="#4A7C59" opacity="0.7" />
        <rect x="262" y="134" width="1" height="6" fill="#5C8A4A" opacity="0.65" />
        <rect x="259" y="132" width="1" height="2" fill="#FFFACD" opacity="0.6" />
        <rect x="261" y="131" width="1" height="2" fill="#FFF8DC" opacity="0.55" />
        <rect x="257" y="134" width="1" height="2" fill="#FFFACD" opacity="0.5" />

        {/* Herb bundle 6 - sage */}
        <line x1="300" y1="118" x2="300" y2="133" stroke="#8B7355" strokeWidth="0.5" opacity="0.6" />
        <rect x="298" y="133" width="1" height="8" fill="#5C8A4A" opacity="0.7" />
        <rect x="300" y="131" width="1" height="10" fill="#6B8F5E" opacity="0.7" />
        <rect x="302" y="132" width="1" height="7" fill="#7BA05B" opacity="0.65" />
        <rect x="299" y="130" width="1" height="2" fill="#808080" opacity="0.4" />

        {/* Crystal hanging from branch */}
        <line x1="160" y1="122" x2="160" y2="133" stroke="#DAA520" strokeWidth="0.3" opacity="0.5" />
        <polygon points="160,133 158,138 160,141 162,138" fill="#7FFFD4" opacity="0.5" />

        <line x1="240" y1="120" x2="240" y2="130" stroke="#DAA520" strokeWidth="0.3" opacity="0.5" />
        <polygon points="240,130 238,135 240,138 242,135" fill="#FFD700" opacity="0.5" />

      </svg>

      {/* ===== LEVITATING CLOAK ===== */}
      <div style={{
        position: "fixed",
        top: "8%",
        left: "50%",
        transform: "translate(-50%)",
        zIndex: 2,
        pointerEvents: "none",
      }}>
        <svg
          width="520" height="620"
          viewBox="0 0 520 620"
          style={{ imageRendering: "pixelated", overflow: "visible" }}
        >
          {/* Hanging strings/hooks */}
          {/* Left hook (lower) */}
          <line x1="90" y1="0" x2="90" y2="25" stroke="#8B7355" strokeWidth="2" opacity="0.6" />
          <rect x="88" y="0" width="4" height="3" fill="#5c4a3a" opacity="0.7" />

          {/* Right hook (higher) */}
          <line x1="430" y1="0" x2="430" y2="15" stroke="#8B7355" strokeWidth="2" opacity="0.6" />
          <rect x="428" y="0" width="4" height="3" fill="#5c4a3a" opacity="0.7" />

          {/* Cloak body */}
          <path d={`
            M90 25
            Q85 30 80 50
            Q70 100 60 180
            Q45 280 35 380
            Q25 460 15 540
            Q10 580 5 610

            L515 610

            Q510 580 505 540
            Q500 480 490 400
            Q480 300 470 200
            Q460 120 450 60
            Q445 30 430 15

            Q380 20 330 22
            Q260 25 200 24
            Q150 23 90 25
          `}
            fill="#c4a87c"
            opacity="0.92"
          />

          {/* Cloak shading - left fold */}
          <path d={`
            M90 25
            Q100 80 95 150
            Q90 250 85 350
            Q75 450 65 530
            Q60 570 55 610
            L5 610
            Q10 580 15 540
            Q25 460 35 380
            Q45 280 60 180
            Q70 100 80 50
            Q85 30 90 25
          `}
            fill="#b39568"
            opacity="0.4"
          />

          {/* Cloak shading - right fold */}
          <path d={`
            M430 15
            Q435 60 440 120
            Q445 200 450 300
            Q455 380 460 450
            Q465 520 470 610
            L515 610
            Q510 580 505 540
            Q500 480 490 400
            Q480 300 470 200
            Q460 120 450 60
            Q445 30 430 15
          `}
            fill="#b39568"
            opacity="0.35"
          />

          {/* Center vertical fold line */}
          <path d="M260 24 Q258 150 255 300 Q252 450 250 610"
            stroke="#b39568" fill="none" strokeWidth="1.5" opacity="0.3" />

          {/* Diagonal fold creases */}
          <path d="M90 25 Q170 120 200 300 Q220 430 230 610"
            stroke="#b39568" fill="none" strokeWidth="1" opacity="0.2" />
          <path d="M430 15 Q360 100 340 280 Q320 430 310 610"
            stroke="#b39568" fill="none" strokeWidth="1" opacity="0.2" />

          {/* Fabric texture - subtle horizontal lines */}
          <line x1="70" y1="150" x2="460" y2="140" stroke="#b39568" strokeWidth="0.5" opacity="0.15" />
          <line x1="60" y1="250" x2="470" y2="240" stroke="#b39568" strokeWidth="0.5" opacity="0.12" />
          <line x1="45" y1="350" x2="480" y2="340" stroke="#b39568" strokeWidth="0.5" opacity="0.1" />
          <line x1="30" y1="450" x2="490" y2="440" stroke="#b39568" strokeWidth="0.5" opacity="0.1" />
          <line x1="20" y1="550" x2="500" y2="540" stroke="#b39568" strokeWidth="0.5" opacity="0.08" />

          {/* Top edge - gathered fabric */}
          <path d="M90 25 Q120 28 160 26 Q200 24 240 25 Q280 23 320 24 Q360 22 400 20 Q420 17 430 15"
            stroke="#a08560" fill="none" strokeWidth="2" opacity="0.4" />

          {/* Light highlight on center */}
          <ellipse cx="260" cy="300" rx="80" ry="200" fill="#d4bc96" opacity="0.15" />

        </svg>
      </div>

      {/* ===== ACTUAL CONTENT (on top of cloak) ===== */}
      <div style={{ position: "relative", zIndex: 3 }} className="min-h-screen flex justify-center px-6 py-10">
        <div className="w-full max-w-md">

          <h1 className="text-4xl mb-2" style={{ color: "#5c4a3a" }}>
            Welcome back, {user.name} 🌱
          </h1>
          <p className="mb-8" style={{ color: "#9c8572" }}>
            Your daily reflection awaits you.
          </p>

          <Garden gardenStage={user.gardenStage} />

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }} className="rounded-2xl p-4 text-center">
              <p className="text-2xl">🔥</p>
              <p className="text-xl font-medium" style={{ color: "#5c4a3a" }}>{user.streak}</p>
              <p className="text-xs" style={{ color: "#9c8572" }}>day streak</p>
            </div>

            <div style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }} className="rounded-2xl p-4 text-center">
              <p className="text-2xl">✅</p>
              <p className="text-xl font-medium" style={{ color: "#5c4a3a" }}>{user.completedDays}</p>
              <p className="text-xs" style={{ color: "#9c8572" }}>days done</p>
            </div>

            <div style={{
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }} className="rounded-2xl p-4 text-center">
              <p className="text-2xl">🌿</p>
              <p className="text-xl font-medium" style={{ color: "#5c4a3a" }}>{user.gardenStage}</p>
              <p className="text-xs" style={{ color: "#9c8572" }}>garden stage</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/reflection")}
            className="w-full mt-8 py-3 rounded-2xl text-lg transition-all hover:scale-[1.02]"
            style={{
              background: "rgba(124, 154, 110, 0.6)",
              border: "1px solid rgba(124, 154, 110, 0.3)",
              color: "#e8f0e0",
              pointerEvents: "auto",
            }}
          >
            Add Today's Reflection 🌿
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("token")
              localStorage.removeItem("user")
              navigate("/")
            }}
            className="w-full mt-3 py-3 rounded-2xl text-lg transition-all hover:scale-[1.02]"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#9c8572",
              pointerEvents: "auto",
            }}
          >
            Logout
          </button>

        </div>
      </div>
    </>
  )
}

export default Dashboard