import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
)

// Add spring click effect + sound to all buttons
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button")
  if (!btn) return

  // Spring animation
  btn.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(0.92)" },
      { transform: "scale(1.05)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 400,
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
    }
  )

 // Glittery fairy button sound
  const ctx = new AudioContext()
  const notes = [1047, 1319, 1568]  // higher notes — tiny sparkle

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.type = "sine"
    osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.05)

    gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.05)
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + i * 0.05 + 0.01)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.05 + 0.15)

    osc.start(ctx.currentTime + i * 0.05)
    osc.stop(ctx.currentTime + i * 0.05 + 0.15)
  })




})
