import { useState } from "react"
import { sharedAudioCtx } from "../main.jsx"

function CategoryDropdown({ categories, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const playHoverSound = () => {
  const ctx = sharedAudioCtx
  if (ctx.state === "suspended") return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.type = "sine"
  osc.frequency.setValueAtTime(600, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.04)

  gain.gain.setValueAtTime(0.08, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.04)
}

  const handleSelect = (cat) => {
    onChange(cat)
    setIsOpen(false)
  }

  return (
    <div className="relative">

      {/* Dropdown trigger button */}
       <div
            onClick={() => {
                playHoverSound()
                setIsOpen(!isOpen)
            }}
            onMouseEnter={playHoverSound}
            className="w-full rounded-2xl px-4 py-3 cursor-pointer flex justify-between items-center transition-colors"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#e8dcc8" }}
        >
        <span className={value ? "" : "opacity-60"}>
          {value || "-- Select a category --"}
        </span>
        <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          ▾
        </span>
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 rounded-2xl overflow-hidden" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
          {[...categories, "Custom"].map((cat) => (
            <div
              key={cat}
              onClick={() => handleSelect(cat)}
              onMouseEnter={playHoverSound}
              className="px-4 py-3 cursor-pointer transition-colors"
              style={{
                color: "#e8dcc8",
                backgroundColor: value === cat ? "rgba(255,255,255,0.12)" : "transparent",
              }}
            >
              {cat === "Custom" ? "✏️ Custom (write your own)" : cat}
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default CategoryDropdown