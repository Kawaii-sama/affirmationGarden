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
            className="w-full border border-[#e0d8d0] rounded-2xl px-4 py-3 text-[#5c4a3a] bg-[#faf8f5] cursor-pointer flex justify-between items-center"
        >
        <span className={value ? "text-[#5c4a3a]" : "text-[#b0a090]"}>
          {value || "-- Select a category --"}
        </span>
        <span className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          ▾
        </span>
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-[#e0d8d0] rounded-2xl shadow-md overflow-hidden">
          {[...categories, "Custom"].map((cat) => (
            <div
              key={cat}
              onClick={() => handleSelect(cat)}
              onMouseEnter={playHoverSound}
              className={`px-4 py-3 cursor-pointer transition-colors text-[#5c4a3a] hover:bg-[#f0f7ec] ${
                value === cat ? "bg-[#e8f5e0] font-medium" : ""
              }`}
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