import { useEffect, useRef } from "react"

function FairyCursor() {
  const canvasRef = useRef(null)
  const wandCanvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.imageSmoothingEnabled = false

    const wandCanvas = wandCanvasRef.current
    const wCtx = wandCanvas.getContext("2d")
    wCtx.imageSmoothingEnabled = false

    const PX = 4

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    wandCanvas.width = 80
    wandCanvas.height = 100

    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })

    function px(c, x, y, color, alpha = 1) {
      c.globalAlpha = alpha
      c.fillStyle = color
      c.fillRect(x * PX, y * PX, PX, PX)
    }

    // Draw the pixel wand onto wandCanvas once
    function drawWand() {
      wCtx.clearRect(0, 0, 80, 100)

      // Stick (brown, gnarled)
      const stickColors = ["#6B4226", "#8B5E3C", "#5C3A1E", "#7a5030"]
      for (let y = 8; y < 22; y++) {
        const wobble = Math.round(Math.sin(y * 0.4) * 0.5)
        px(wCtx, 6 + wobble, y, stickColors[y % stickColors.length])
        px(wCtx, 7 + wobble, y, stickColors[(y + 1) % stickColors.length])
        // Dark edge
        px(wCtx, 5 + wobble, y, "#3d2210", y % 3 === 0 ? 0.4 : 0)
      }

      // Vine wrapping
      for (let y = 9; y < 21; y += 2) {
        const vx = y % 4 < 2 ? 8 : 5
        px(wCtx, vx, y, "#3D6B4F", 0.7)
        // Leaf
        if (y % 4 === 0) {
          px(wCtx, vx + 1, y, "#4A7C59", 0.6)
          px(wCtx, vx + 2, y, "#5C8A4A", 0.5)
        }
      }

      // Crescent moon top
      const crescentPixels = [
        // Outer crescent arc (brown/golden stone)
        [3,5],[4,4],[5,3],[6,2],[7,2],[8,1],[9,1],[10,1],[11,2],[12,2],[13,3],[14,4],[15,5],
        [3,6],[15,6],
        [2,7],[16,7],
        // Inner arc
        [5,5],[6,4],[7,3],[8,3],[9,2],[10,3],[11,3],[12,4],[13,5],
      ]
      const crescentColors = ["#5c4a38", "#6b5a48", "#4a3828", "#7a6850"]
      for (const [cx, cy] of crescentPixels) {
        px(wCtx, cx, cy, crescentColors[Math.floor(Math.random() * crescentColors.length)])
      }

      // Moss on crescent
      const mossPixels = [[4,4],[5,3],[8,1],[9,1],[13,3],[14,4],[3,6],[15,6]]
      for (const [cx, cy] of mossPixels) {
        if (Math.random() < 0.6) {
          px(wCtx, cx, cy, ["#3D6B4F", "#4A7C59", "#2E5939"][Math.floor(Math.random() * 3)], 0.7)
        }
      }

      // Crystal orb in center of crescent
      px(wCtx, 8, 4, "#7FFFD4", 0.8)
      px(wCtx, 9, 4, "#3CB371", 0.7)
      px(wCtx, 8, 5, "#3CB371", 0.6)
      px(wCtx, 9, 5, "#7FFFD4", 0.5)
      // Bright spot
      px(wCtx, 8, 4, "#FFFFFF", 0.3)

      // Hanging charm
      px(wCtx, 6, 7, "#DAA520", 0.5)
      px(wCtx, 6, 8, "#FFD700", 0.6)

      px(wCtx, 12, 7, "#DAA520", 0.5)
      px(wCtx, 12, 8, "#E8C547", 0.6)

      // Twine wrap at junction
      px(wCtx, 6, 7, "#C4A35A", 0.5)
      px(wCtx, 7, 7, "#C4A35A", 0.6)
    }

    drawWand()

    let mx = -200, my = -200
    let particles = []
    let leafParticles = []
    let frame = 0

    const goldColors = ["#FFD700", "#DAA520", "#F5DEB3", "#FFFACD", "#E8C547"]
    const leafColors = ["#4A7C59", "#6B8F5E", "#3D6B4F", "#5C8A4A"]

    function spawnPixelParticles(x, y) {
      const count = 1 + Math.floor(Math.random() * 3)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          color: goldColors[Math.floor(Math.random() * goldColors.length)],
          life: 1,
          decay: 0.01 + Math.random() * 0.02,
          twinkle: 0.5 + Math.random() * 1.5,
        })
      }
    }

    function spawnPixelLeaf(x, y) {
      if (Math.random() > 0.12) return
      leafParticles.push({
        x: x + (Math.random() - 0.5) * 30,
        y,
        vx: (Math.random() - 0.5) * 0.8,
        vy: 0.3 + Math.random() * 0.8,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        life: 1,
        decay: 0.006 + Math.random() * 0.01,
        wobble: Math.random() * Math.PI * 2,
        age: 0,
      })
    }

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      if (frame % 2 === 0) spawnPixelParticles(mx, my)
      if (frame % 3 === 0) spawnPixelLeaf(mx, my)

      particles = particles.filter(p => p.life > 0)
      leafParticles = leafParticles.filter(p => p.life > 0)

      // Draw gold sparkle trail (pixelated)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.02
        p.life -= p.decay

        const pulse = 0.3 + 0.7 * ((Math.sin(frame * 0.1 * p.twinkle) + 1) / 2)
        const alpha = p.life * pulse
        const size = PX * (pulse > 0.6 ? 2 : 1)

        // Snap to pixel grid
        const sx = Math.round(p.x / PX) * PX
        const sy = Math.round(p.y / PX) * PX

        ctx.globalAlpha = alpha
        ctx.fillStyle = p.color
        ctx.fillRect(sx, sy, size, size)

        // Cross sparkle at peak brightness
        if (pulse > 0.7 && p.life > 0.5) {
          ctx.globalAlpha = alpha * 0.4
          ctx.fillRect(sx - PX, sy, PX, PX)
          ctx.fillRect(sx + size, sy, PX, PX)
          ctx.fillRect(sx, sy - PX, PX, PX)
          ctx.fillRect(sx, sy + size, PX, PX)
        }
      }

      // Draw leaf particles (pixelated)
      for (const lp of leafParticles) {
        lp.age++
        lp.x += lp.vx + Math.sin(lp.age * 0.04 + lp.wobble) * 0.5
        lp.y += lp.vy
        lp.vy += 0.008
        lp.life -= lp.decay

        const sx = Math.round(lp.x / PX) * PX
        const sy = Math.round(lp.y / PX) * PX

        ctx.globalAlpha = lp.life * 0.8
        ctx.fillStyle = lp.color
        // Pixel leaf shape: 3-pixel L
        ctx.fillRect(sx, sy, PX, PX)
        ctx.fillRect(sx + PX, sy, PX, PX)
        ctx.fillRect(sx, sy + PX, PX, PX)
      }

      ctx.globalAlpha = 1
      requestAnimationFrame(loop)
    }

    const handleMouseMove = (e) => {
      mx = e.clientX
      my = e.clientY
      wandCanvas.style.left = (mx - 24) + "px"
      wandCanvas.style.top = (my - 8) + "px"
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
          zIndex: 99999,
          imageRendering: "pixelated",
        }}
      />

      <canvas
        ref={wandCanvasRef}
        width={80}
        height={100}
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 100000,
          imageRendering: "pixelated",
          transform: "rotate(-25deg)",
        }}
      />
    </>
  )
}

export default FairyCursor