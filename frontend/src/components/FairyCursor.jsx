import { useEffect, useRef } from "react"

function FairyCursor() {
  const canvasRef = useRef(null)
  const wandRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const wand = wandRef.current

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })

    let mx = -200, my = -200
    let particles = []
    let leafParticles = []
    let frame = 0

    const goldColors = ["#FFD700", "#DAA520", "#F5DEB3", "#FFFACD", "#FFF8DC", "#E8C547", "#D4AF37"]
    const leafColors = ["#4A7C59", "#6B8F5E", "#8FBC5A", "#3D6B4F", "#2E5939", "#7BA05B", "#5C8A4A"]

    function randomBetween(a, b) { return a + Math.random() * (b - a) }

    function spawnGoldParticles(x, y) {
      const count = Math.floor(randomBetween(1, 4))
      for (let i = 0; i < count; i++) {
        const angle = randomBetween(0, Math.PI * 2)
        const speed = randomBetween(0.3, 1.8)
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - randomBetween(0.3, 1.2),
          size: randomBetween(2, 6),
          color: goldColors[Math.floor(Math.random() * goldColors.length)],
          shape: Math.random() > 0.5 ? "star" : "circle",
          life: 1,
          decay: randomBetween(0.01, 0.025),
          rotation: randomBetween(0, Math.PI * 2),
          rotSpeed: randomBetween(-0.04, 0.04),
          twinkle: randomBetween(0.5, 1.5),
        })
      }
    }

    function spawnLeafParticle(x, y) {
      if (Math.random() > 0.15) return
      const angle = randomBetween(0, Math.PI * 2)
      const speed = randomBetween(0.2, 1.0)
      leafParticles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: randomBetween(0.3, 1.2),
        size: randomBetween(5, 12),
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        life: 1,
        decay: randomBetween(0.006, 0.014),
        rotation: randomBetween(0, Math.PI * 2),
        rotSpeed: randomBetween(-0.05, 0.05),
        wobble: randomBetween(0.5, 2),
        wobbleSpeed: randomBetween(0.02, 0.06),
        wobblePhase: randomBetween(0, Math.PI * 2),
        age: 0,
      })
    }

    function drawStar(c, x, y, r) {
      const step = Math.PI / 5
      c.beginPath()
      for (let i = 0; i < 10; i++) {
        const radius = i % 2 === 0 ? r : r * 0.4
        const a = i * step - Math.PI / 2
        i === 0
          ? c.moveTo(x + radius * Math.cos(a), y + radius * Math.sin(a))
          : c.lineTo(x + radius * Math.cos(a), y + radius * Math.sin(a))
      }
      c.closePath()
    }

    function drawLeaf(c, x, y, size) {
      c.beginPath()
      c.moveTo(x, y - size)
      c.bezierCurveTo(
        x + size * 0.8, y - size * 0.6,
        x + size * 0.6, y + size * 0.2,
        x, y + size
      )
      c.bezierCurveTo(
        x - size * 0.6, y + size * 0.2,
        x - size * 0.8, y - size * 0.6,
        x, y - size
      )
      c.closePath()
      c.fill()

      c.save()
      c.globalAlpha *= 0.4
      c.strokeStyle = "#2E5939"
      c.lineWidth = 0.5
      c.beginPath()
      c.moveTo(x, y - size * 0.8)
      c.lineTo(x, y + size * 0.7)
      c.stroke()
      c.beginPath()
      c.moveTo(x, y - size * 0.3)
      c.lineTo(x + size * 0.3, y - size * 0.5)
      c.stroke()
      c.beginPath()
      c.moveTo(x, y + size * 0.1)
      c.lineTo(x - size * 0.3, y - size * 0.1)
      c.stroke()
      c.restore()
    }

    function drawParticle(p) {
      ctx.save()
      const twinkleAlpha = p.life * (0.6 + 0.4 * Math.sin(frame * 0.1 * p.twinkle))
      ctx.globalAlpha = twinkleAlpha
      ctx.fillStyle = p.color
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rotation)

      if (p.shape === "star") {
        drawStar(ctx, 0, 0, p.size)
        ctx.fill()
        ctx.globalAlpha = twinkleAlpha * 0.3
        ctx.fillStyle = "#FFFFFF"
        drawStar(ctx, 0, 0, p.size * 0.5)
        ctx.fill()
      } else {
        ctx.beginPath()
        ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = twinkleAlpha * 0.5
        ctx.fillStyle = "#FFFFFF"
        ctx.beginPath()
        ctx.arc(-p.size * 0.1, -p.size * 0.1, p.size * 0.15, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    function drawLeafParticle(lp) {
      ctx.save()
      ctx.globalAlpha = lp.life * 0.85
      ctx.fillStyle = lp.color
      ctx.translate(lp.x, lp.y)
      ctx.rotate(lp.rotation)
      drawLeaf(ctx, 0, 0, lp.size)
      ctx.restore()
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      if (frame % 2 === 0) spawnGoldParticles(mx, my)
      if (frame % 3 === 0) spawnLeafParticle(mx, my)

      particles = particles.filter(p => p.life > 0)
      leafParticles = leafParticles.filter(lp => lp.life > 0)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.02
        p.life -= p.decay
        p.rotation += p.rotSpeed
        drawParticle(p)
      }

      for (const lp of leafParticles) {
        lp.age++
        lp.x += lp.vx + Math.sin(lp.age * lp.wobbleSpeed + lp.wobblePhase) * lp.wobble * 0.3
        lp.y += lp.vy
        lp.vy += 0.01
        lp.life -= lp.decay
        lp.rotation += lp.rotSpeed
        drawLeafParticle(lp)
      }

      requestAnimationFrame(loop)
    }

    const handleMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
      wand.style.left = (mx - 12) + "px"
      wand.style.top = (my - 4) + "px"
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    loop()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <style>{`* { cursor: none !important; }`}</style>

      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: "100%", height: "100%",
          pointerEvents: "none",
          zIndex: 99999
        }}
      />

      <svg
        ref={wandRef}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 100000,
          transform: "rotate(-25deg)"
        }}
        width="60" height="80" viewBox="0 0 60 80"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wandStick" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B6914"/>
            <stop offset="30%" stopColor="#6B4226"/>
            <stop offset="60%" stopColor="#8B5E3C"/>
            <stop offset="100%" stopColor="#5C3A1E"/>
          </linearGradient>
          <linearGradient id="crescentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37"/>
            <stop offset="40%" stopColor="#C5A028"/>
            <stop offset="100%" stopColor="#B8860B"/>
          </linearGradient>
          <radialGradient id="crystalGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#7FFFD4" stopOpacity="0.9"/>
            <stop offset="50%" stopColor="#3CB371" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#2E8B57" stopOpacity="0.3"/>
          </radialGradient>
          <radialGradient id="orbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8"/>
            <stop offset="70%" stopColor="#DAA520" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#B8860B" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Wand stick */}
        <path d="M28 30 Q26 40 27 50 Q29 60 28 72 Q27 76 28 78"
          stroke="url(#wandStick)" strokeWidth="5" fill="none" strokeLinecap="round"/>
        <path d="M28 30 Q30 40 29 50 Q27 60 28 72"
          stroke="#A0734B" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.3"/>

        {/* Vine wrapping around stick */}
        <path d="M26 35 Q32 38 26 42 Q32 46 26 50 Q32 54 27 58 Q32 62 27 66 Q31 70 28 74"
          stroke="#4A7C59" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.8"/>

        {/* Tiny leaves on vine */}
        <ellipse cx="32" cy="38" rx="2.5" ry="1.2" fill="#6B8F5E" transform="rotate(-30,32,38)" opacity="0.9"/>
        <ellipse cx="25" cy="42" rx="2.5" ry="1.2" fill="#5C8A4A" transform="rotate(25,25,42)" opacity="0.9"/>
        <ellipse cx="32" cy="46" rx="2" ry="1" fill="#7BA05B" transform="rotate(-20,32,46)" opacity="0.8"/>
        <ellipse cx="25" cy="50" rx="2.5" ry="1.2" fill="#4A7C59" transform="rotate(30,25,50)" opacity="0.9"/>
        <ellipse cx="32" cy="54" rx="2" ry="1" fill="#6B8F5E" transform="rotate(-25,32,54)" opacity="0.8"/>
        <ellipse cx="26" cy="58" rx="2.5" ry="1.2" fill="#5C8A4A" transform="rotate(20,26,58)" opacity="0.9"/>
        <ellipse cx="31" cy="62" rx="2" ry="1" fill="#7BA05B" transform="rotate(-15,31,62)" opacity="0.8"/>

        {/* Crescent moon top */}
        <path d="M14 6 Q8 12 10 20 Q12 26 20 28 Q14 26 12 20 Q8 14 14 6 Z"
          fill="url(#crescentGrad)" opacity="0.95"/>
        <path d="M14 6 Q20 2 28 4 Q36 8 38 16 Q38 24 32 28 Q36 22 34 14 Q30 6 22 4 Q18 4 14 6 Z"
          fill="url(#crescentGrad)" opacity="0.95"/>

        {/* Moss on crescent */}
        <ellipse cx="16" cy="8" rx="3" ry="1.5" fill="#4A7C59" opacity="0.6"/>
        <ellipse cx="34" cy="10" rx="2.5" ry="1.2" fill="#6B8F5E" opacity="0.5"/>
        <ellipse cx="12" cy="18" rx="2" ry="1" fill="#5C8A4A" opacity="0.5"/>
        <ellipse cx="36" cy="20" rx="2.5" ry="1" fill="#4A7C59" opacity="0.4"/>

        {/* Crystal orb in crescent center */}
        <circle cx="24" cy="16" r="5" fill="url(#crystalGlow)"/>
        <circle cx="24" cy="16" r="6" fill="url(#orbGlow)" opacity="0.5"/>
        <ellipse cx="22" cy="14" rx="1.5" ry="1" fill="white" opacity="0.5" transform="rotate(-20,22,14)"/>

        {/* Hanging charms */}
        <line x1="18" y1="26" x2="16" y2="32" stroke="#DAA520" strokeWidth="0.4" opacity="0.6"/>
        <circle cx="16" cy="33" r="1.2" fill="#7FFFD4" opacity="0.7"/>

        <line x1="30" y1="26" x2="33" y2="33" stroke="#DAA520" strokeWidth="0.4" opacity="0.6"/>
        <circle cx="33" cy="34" r="1" fill="#DAA520" opacity="0.7"/>

        <line x1="24" y1="28" x2="24" y2="34" stroke="#DAA520" strokeWidth="0.4" opacity="0.5"/>
        <ellipse cx="24" cy="35" rx="1.5" ry="1" fill="#F5DEB3" opacity="0.6"/>

        {/* Twine wrap at junction */}
        <rect x="25" y="28" width="6" height="3" rx="1" fill="#C4A35A" opacity="0.7"/>
        <line x1="25" y1="29" x2="31" y2="29" stroke="#A08030" strokeWidth="0.3" opacity="0.5"/>
        <line x1="25" y1="30" x2="31" y2="30" stroke="#A08030" strokeWidth="0.3" opacity="0.5"/>

        {/* Twinkling sparkles */}
        <circle cx="20" cy="10" r="0.8" fill="#FFD700" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="1.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="30" cy="8" r="0.6" fill="#FFD700" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="38" cy="18" r="0.7" fill="#FFFACD" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.15;0.7" dur="1.8s" repeatCount="indefinite"/>
        </circle>
      </svg>
    </>
  )
}

export default FairyCursor