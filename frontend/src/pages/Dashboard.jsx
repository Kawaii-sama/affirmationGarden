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
          zIndex: 3,
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
        <rect x="333" y="20" width="12" height="2" fill="#1a1508" opacity="0.3" />
        <rect x="335" y="45" width="10" height="2" fill="#1e1508" opacity="0.25" />
        <rect x="332" y="70" width="14" height="1" fill="#1a1508" opacity="0.3" />
        <rect x="334" y="100" width="11" height="2" fill="#1e1508" opacity="0.25" />
        <rect x="333" y="130" width="13" height="1" fill="#1a1508" opacity="0.3" />
        <rect x="335" y="155" width="9" height="2" fill="#1a1508" opacity="0.25" />
        <rect x="332" y="180" width="14" height="1" fill="#1e1508" opacity="0.3" />
        <rect x="330" y="40" width="4" height="3" fill="#3D6B4F" opacity="0.5" />
        <rect x="330" y="90" width="5" height="4" fill="#4A7C59" opacity="0.45" />
        <rect x="330" y="150" width="4" height="3" fill="#2E5939" opacity="0.5" />
        <rect x="338" y="60" width="4" height="4" rx="2" fill="#1a1508" opacity="0.4" />
        <rect x="336" y="120" width="3" height="3" rx="1" fill="#1e1508" opacity="0.35" />

        {/* ===== HORIZONTAL BRANCH ===== */}
        <path d="M340 120 Q300 117 260 121 Q220 119 180 123 Q140 121 100 125 Q80 127 65 130"
          stroke="#2a1f10" fill="none" strokeWidth="7" strokeLinecap="round" />
        <path d="M340 120 Q300 117 260 121 Q220 119 180 123 Q140 121 100 125 Q80 127 65 130"
          stroke="#3d2e18" fill="none" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        <path d="M340 120 Q300 117 260 121 Q220 119 180 123 Q140 121 100 125 Q80 127 65 130"
          stroke="#1a1508" fill="none" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <rect x="120" y="120" width="8" height="3" fill="#3D6B4F" opacity="0.5" />
        <rect x="200" y="117" width="6" height="3" fill="#4A7C59" opacity="0.45" />
        <rect x="280" y="116" width="7" height="3" fill="#2E5939" opacity="0.5" />
        <line x1="250" y1="121" x2="245" y2="113" stroke="#2a1f10" strokeWidth="2" opacity="0.7" />
        <line x1="170" y1="122" x2="168" y2="115" stroke="#2a1f10" strokeWidth="2" opacity="0.6" />
        <line x1="110" y1="124" x2="106" y2="117" stroke="#2a1f10" strokeWidth="1.5" opacity="0.6" />

        {/* ===== HANGING HERBS ===== */}
        <line x1="100" y1="127" x2="100" y2="145" stroke="#8B7355" strokeWidth="0.5" opacity="0.6" />
        <rect x="98" y="145" width="1" height="8" fill="#4A7C59" opacity="0.7" />
        <rect x="100" y="143" width="1" height="10" fill="#3D6B4F" opacity="0.7" />
        <rect x="102" y="145" width="1" height="7" fill="#5C8A4A" opacity="0.65" />
        <rect x="99" y="142" width="1" height="2" fill="#9370DB" opacity="0.6" />
        <rect x="101" y="141" width="1" height="2" fill="#8A65C8" opacity="0.55" />
        <rect x="97" y="144" width="1" height="2" fill="#9370DB" opacity="0.5" />

        <line x1="140" y1="123" x2="140" y2="140" stroke="#8B7355" strokeWidth="0.5" opacity="0.6" />
        <rect x="138" y="140" width="1" height="9" fill="#6B8F5E" opacity="0.7" />
        <rect x="140" y="138" width="1" height="11" fill="#4A7C59" opacity="0.7" />
        <rect x="142" y="139" width="1" height="8" fill="#5C8A4A" opacity="0.65" />
        <rect x="139" y="137" width="1" height="2" fill="#DAA520" opacity="0.6" />
        <rect x="141" y="136" width="1" height="2" fill="#E8C547" opacity="0.55" />
        <rect x="143" y="138" width="1" height="2" fill="#D4AF37" opacity="0.5" />

        <line x1="180" y1="123" x2="180" y2="143" stroke="#8B7355" strokeWidth="0.5" opacity="0.6" />
        <rect x="178" y="143" width="1" height="10" fill="#2E5939" opacity="0.7" />
        <rect x="180" y="141" width="1" height="12" fill="#3D6B4F" opacity="0.7" />
        <rect x="182" y="142" width="1" height="9" fill="#4A7C59" opacity="0.65" />
        <rect x="179" y="140" width="1" height="3" fill="#2E5939" opacity="0.5" />

        <line x1="220" y1="120" x2="220" y2="137" stroke="#8B7355" strokeWidth="0.5" opacity="0.6" />
        <rect x="218" y="137" width="1" height="8" fill="#4A7C59" opacity="0.7" />
        <rect x="220" y="135" width="1" height="10" fill="#3D6B4F" opacity="0.7" />
        <rect x="222" y="136" width="1" height="7" fill="#5C8A4A" opacity="0.65" />
        <rect x="219" y="134" width="1" height="2" fill="#8B3A3A" opacity="0.6" />
        <rect x="221" y="133" width="1" height="2" fill="#A04040" opacity="0.55" />

        <line x1="260" y1="120" x2="260" y2="135" stroke="#8B7355" strokeWidth="0.5" opacity="0.6" />
        <rect x="258" y="135" width="1" height="7" fill="#6B8F5E" opacity="0.7" />
        <rect x="260" y="133" width="1" height="9" fill="#4A7C59" opacity="0.7" />
        <rect x="262" y="134" width="1" height="6" fill="#5C8A4A" opacity="0.65" />
        <rect x="259" y="132" width="1" height="2" fill="#FFFACD" opacity="0.6" />
        <rect x="261" y="131" width="1" height="2" fill="#FFF8DC" opacity="0.55" />
        <rect x="257" y="134" width="1" height="2" fill="#FFFACD" opacity="0.5" />

        <line x1="300" y1="118" x2="300" y2="133" stroke="#8B7355" strokeWidth="0.5" opacity="0.6" />
        <rect x="298" y="133" width="1" height="8" fill="#5C8A4A" opacity="0.7" />
        <rect x="300" y="131" width="1" height="10" fill="#6B8F5E" opacity="0.7" />
        <rect x="302" y="132" width="1" height="7" fill="#7BA05B" opacity="0.65" />
        <rect x="299" y="130" width="1" height="2" fill="#808080" opacity="0.4" />

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
        transform: "translateX(-50%)",
        zIndex: 2,
        pointerEvents: "none",
        animation: "cloakFloat 4s ease-in-out infinite",
      }}>
        <style>{`
          @keyframes cloakFloat {
            0% { transform: translateX(-50%) translateY(0px); }
            50% { transform: translateX(-50%) translateY(-12px); }
            100% { transform: translateX(-50%) translateY(0px); }
          }
          @keyframes cloakShadowPulse {
            0% { opacity: 0.25; transform: translateX(-50%) scaleX(1); }
            50% { opacity: 0.12; transform: translateX(-50%) scaleX(0.85); }
            100% { opacity: 0.25; transform: translateX(-50%) scaleX(1); }
          }
        `}</style>

        <div style={{
          position: "absolute",
          bottom: "-30px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "300px",
          height: "20px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)",
          animation: "cloakShadowPulse 4s ease-in-out infinite",
        }} />

        <svg
          width="520" height="620"
          viewBox="0 0 520 620"
          style={{ imageRendering: "pixelated", overflow: "visible" }}
        >
          <line x1="90" y1="0" x2="90" y2="25" stroke="#6B5540" strokeWidth="2" opacity="0.7" />
          <rect x="87" y="0" width="6" height="4" fill="#5c4a3a" opacity="0.8" />
          <line x1="430" y1="0" x2="430" y2="15" stroke="#6B5540" strokeWidth="2" opacity="0.7" />
          <rect x="427" y="0" width="6" height="4" fill="#5c4a3a" opacity="0.8" />

          <path d={`
            M90 25 Q85 30 80 50 Q70 100 60 180 Q45 280 35 380
            Q25 460 15 540 Q10 580 5 610 L515 610
            Q510 580 505 540 Q500 480 490 400 Q480 300 470 200
            Q460 120 450 60 Q445 30 430 15 Q380 20 330 22
            Q260 25 200 24 Q150 23 90 25
          `} fill="#c4a67a" />

          <path d="M90 25 Q85 30 80 50 Q70 100 65 150 Q80 140 95 130 Q100 80 95 40 Z" fill="#8B6F4E" opacity="0.6" />
          <path d="M90 25 Q92 35 88 55 Q82 80 78 100" stroke="#7A5E3D" fill="none" strokeWidth="8" opacity="0.3" />
          <path d="M5 610 Q10 580 15 540 Q25 500 30 460 Q45 470 55 490 Q40 530 25 570 Q15 595 10 610 Z" fill="#8B6F4E" opacity="0.55" />
          <path d="M20 560 Q35 530 40 500 Q50 510 45 540 Q35 570 25 590" fill="#7A5E3D" opacity="0.3" />
          <path d="M515 610 Q510 580 505 540 Q500 500 495 470 Q480 480 470 500 Q485 540 495 580 Q505 600 510 610 Z" fill="#8B6F4E" opacity="0.55" />
          <path d="M500 570 Q490 540 485 510 Q475 520 480 550 Q490 580 498 600" fill="#7A5E3D" opacity="0.3" />
          <path d="M430 15 Q445 30 450 60 Q455 100 458 140 Q445 130 435 110 Q432 60 430 30 Z" fill="#8B6F4E" opacity="0.5" />
          <path d="M470 200 Q475 250 480 300 Q485 350 488 380 Q478 370 472 340 Q468 280 465 230 Z" fill="#9E7E58" opacity="0.35" />
          <path d="M60 180 Q55 230 50 280 Q47 320 45 350 Q55 340 60 310 Q63 260 65 220 Z" fill="#9E7E58" opacity="0.35" />
          <ellipse cx="200" cy="560" rx="35" ry="20" fill="#9E7E58" opacity="0.2" />
          <ellipse cx="350" cy="540" rx="25" ry="15" fill="#8B6F4E" opacity="0.15" />
          <ellipse cx="150" cy="500" rx="20" ry="12" fill="#9E7E58" opacity="0.12" />
          <ellipse cx="150" cy="80" rx="15" ry="10" fill="#8B6F4E" opacity="0.2" />
          <ellipse cx="320" cy="60" rx="12" ry="8" fill="#9E7E58" opacity="0.15" />
          <circle cx="180" cy="120" r="5" fill="#7A5E3D" opacity="0.15" />
          <circle cx="260" cy="310" r="4" fill="#6B5540" opacity="0.2" />

          <path d="M90 25 Q130 80 160 180 Q190 300 210 430 Q225 520 235 610" stroke="#a08560" fill="none" strokeWidth="2" opacity="0.35" />
          <path d="M92 25 Q132 82 162 182 Q192 302 212 432 Q227 522 237 610" stroke="#d4bc96" fill="none" strokeWidth="1" opacity="0.2" />
          <path d="M430 15 Q400 70 380 160 Q355 280 340 400 Q325 500 315 610" stroke="#a08560" fill="none" strokeWidth="2" opacity="0.35" />
          <path d="M428 15 Q398 68 378 158 Q353 278 338 398 Q323 498 313 610" stroke="#d4bc96" fill="none" strokeWidth="1" opacity="0.2" />
          <path d="M260 24 Q258 100 256 200 Q254 350 252 500 Q251 560 250 610" stroke="#a08560" fill="none" strokeWidth="1.5" opacity="0.25" />
          <path d="M90 25 Q110 60 115 120 Q118 180 120 250" stroke="#b39568" fill="none" strokeWidth="1" opacity="0.2" />
          <path d="M430 15 Q415 45 412 100 Q410 160 408 220" stroke="#b39568" fill="none" strokeWidth="1" opacity="0.2" />
          <path d="M100 40 Q200 35 300 38 Q400 33 440 30" stroke="#b39568" fill="none" strokeWidth="0.8" opacity="0.2" />
          <path d="M95 55 Q180 50 280 53 Q380 48 445 45" stroke="#b39568" fill="none" strokeWidth="0.8" opacity="0.18" />
          <path d="M90 70 Q170 68 270 70 Q370 66 450 63" stroke="#b39568" fill="none" strokeWidth="0.7" opacity="0.15" />
          <path d="M70 200 Q150 195 260 200 Q370 195 465 190" stroke="#b39568" fill="none" strokeWidth="0.7" opacity="0.12" />
          <path d="M55 320 Q160 315 260 320 Q370 315 475 310" stroke="#b39568" fill="none" strokeWidth="0.7" opacity="0.1" />
          <path d="M40 420 Q150 415 260 420 Q370 415 485 410" stroke="#b39568" fill="none" strokeWidth="0.7" opacity="0.1" />
          <path d="M25 520 Q140 515 260 520 Q380 515 495 510" stroke="#b39568" fill="none" strokeWidth="0.6" opacity="0.08" />
          <path d="M90 25 Q75 100 70 200 Q65 300 55 400" stroke="#a08560" fill="none" strokeWidth="1.2" opacity="0.2" />
          <path d="M90 25 Q105 90 140 200 Q170 320 185 450" stroke="#b39568" fill="none" strokeWidth="0.8" opacity="0.15" />
          <path d="M430 15 Q445 80 450 170 Q458 280 465 380" stroke="#a08560" fill="none" strokeWidth="1.2" opacity="0.2" />
          <path d="M430 15 Q410 80 385 180 Q360 300 345 430" stroke="#b39568" fill="none" strokeWidth="0.8" opacity="0.15" />

          <path d={`
            M90 25 Q85 30 80 50 Q70 100 60 180 Q45 280 35 380
            Q25 460 15 540 Q10 580 5 610 L515 610
            Q510 580 505 540 Q500 480 490 400 Q480 300 470 200
            Q460 120 450 60 Q445 30 430 15 Q380 20 330 22
            Q260 25 200 24 Q150 23 90 25
          `} fill="none" stroke="#6B5540" strokeWidth="3" opacity="0.4" />

          <path d="M90 25 Q110 28 140 26 Q170 24 200 25 Q230 23 260 24 Q290 22 320 23 Q350 21 380 20 Q410 18 430 15"
            stroke="#6B5540" fill="none" strokeWidth="2.5" opacity="0.5" />

          <ellipse cx="260" cy="280" rx="70" ry="180" fill="#d8c4a0" opacity="0.12" />
        </svg>
      </div>

      {/* ===== ACTUAL CONTENT ===== */}
      <div style={{ position: "relative", zIndex: 4 }} className="min-h-screen flex justify-center px-6 py-10">
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
              background: "transparent",
              border: "2px solid rgba(92, 74, 58, 0.5)",
            }} className="rounded-2xl p-4 text-center">
              <p className="text-2xl">🔥</p>
              <p className="text-xl font-medium" style={{ color: "#5c4a3a" }}>{user.streak}</p>
              <p className="text-xs" style={{ color: "#9c8572" }}>day streak</p>
            </div>

            <div style={{
              background: "transparent",
              border: "2px solid rgba(92, 74, 58, 0.5)",
            }} className="rounded-2xl p-4 text-center">
              <p className="text-2xl">✅</p>
              <p className="text-xl font-medium" style={{ color: "#5c4a3a" }}>{user.completedDays}</p>
              <p className="text-xs" style={{ color: "#9c8572" }}>days done</p>
            </div>

            <div style={{
              background: "transparent",
              border: "2px solid rgba(92, 74, 58, 0.5)",
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
              background: "transparent",
              border: "2px solid rgba(92, 74, 58, 0.5)",
              color: "#5c4a3a",
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
              background: "transparent",
              border: "2px solid rgba(92, 74, 58, 0.35)",
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