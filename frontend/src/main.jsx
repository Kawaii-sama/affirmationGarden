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

 // UI click sound
  const ctx = new AudioContext()

  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()

  osc.connect(gainNode)
  gainNode.connect(ctx.destination)

  osc.type = "sine"

  // High to low pitch sweep
  osc.frequency.setValueAtTime(1200, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.08)

  // Quick fade out
  gainNode.gain.setValueAtTime(0.4, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)

  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.08)


})