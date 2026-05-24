import { useState } from "react"
import { useNavigate } from "react-router-dom"
import affirmations from "../api/affirmations"
import API from "../api/axios"

function Reflection() {
  const [category, setCategory]               = useState("")
  const [customCategory, setCustomCategory]   = useState("")
  const [affirmation, setAffirmation]         = useState("")
  const [customAffirmation, setCustomAffirmation] = useState("")
  const [error, setError]                     = useState("")

  const navigate = useNavigate()

  const categories = Object.keys(affirmations)
  const currentAffirmations = affirmations[category] || []

  const handleSubmit = async () => {
    setError("")

    const finalCategory    = category === "Custom" ? customCategory : category
    const finalAffirmation = affirmation === "custom" ? customAffirmation : affirmation

    if (!finalCategory) {
      setError("Please select or enter a category")
      return
    }

    if (!finalAffirmation) {
      setError("Please select or write an affirmation")
      return
    }

    try {
      const token = localStorage.getItem("token")

      const response = await API.post(
        "/reflections",
        { category: finalCategory, affirmation: finalAffirmation },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard")

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div className="min-h-screen bg-[#f9f6f0] px-6 py-10 max-w-xl mx-auto">

      {/* Header */}
      <button
        onClick={() => navigate("/dashboard")}
        className="text-[#9c8572] text-sm mb-8 flex items-center gap-1 hover:text-[#5c4a3a] transition-colors"
      >
        ← Back to garden
      </button>

      <h1 className="text-4xl text-[#5c4a3a] mb-2">
        Today's Reflection
      </h1>
      <p className="text-[#9c8572] mb-8">
        Take a moment. Breathe. Choose your intention.
      </p>

      {error && (
        <p className="text-red-400 text-sm mb-4">{error}</p>
      )}

      {/* Step 1 — Category */}
      <div className="bg-white rounded-3xl p-6 shadow-sm mb-4">
        <h2 className="text-lg text-[#5c4a3a] mb-4">
          Step 1 — Choose a category
        </h2>

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
            setAffirmation("")
          }}
          className="w-full border border-[#e0d8d0] rounded-2xl px-4 py-3 text-[#5c4a3a] focus:outline-none focus:border-[#7c9a6e] bg-[#faf8f5]"
        >
          <option value="">-- Select a category --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
          <option value="Custom">Custom (write your own)</option>
        </select>

        {category === "Custom" && (
          <input
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            placeholder="Name your category..."
            className="w-full mt-3 border border-[#e0d8d0] rounded-2xl px-4 py-3 text-[#5c4a3a] focus:outline-none focus:border-[#7c9a6e] bg-[#faf8f5]"
          />
        )}
      </div>

      {/* Step 2 — Affirmation */}
      {category && (
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
          <h2 className="text-lg text-[#5c4a3a] mb-4">
            Step 2 — Choose an affirmation
          </h2>

          <div className="space-y-3">
            {category !== "Custom" && currentAffirmations.map((aff) => (
              <label
                key={aff}
                className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-colors ${
                  affirmation === aff
                    ? "border-[#7c9a6e] bg-[#f0f7ec]"
                    : "border-[#e0d8d0] bg-[#faf8f5]"
                }`}
              >
                <input
                  type="radio"
                  name="affirmation"
                  value={aff}
                  checked={affirmation === aff}
                  onChange={(e) => setAffirmation(e.target.value)}
                  className="accent-[#7c9a6e]"
                />
                <span className="text-[#5c4a3a]">{aff}</span>
              </label>
            ))}

            {/* Write your own option */}
            <label
              className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-colors ${
                affirmation === "custom"
                  ? "border-[#7c9a6e] bg-[#f0f7ec]"
                  : "border-[#e0d8d0] bg-[#faf8f5]"
              }`}
            >
              <input
                type="radio"
                name="affirmation"
                value="custom"
                checked={affirmation === "custom"}
                onChange={(e) => setAffirmation(e.target.value)}
                className="accent-[#7c9a6e]"
              />
              <span className="text-[#9c8572] italic">Write your own...</span>
            </label>
          </div>

          {affirmation === "custom" && (
            <input
              type="text"
              value={customAffirmation}
              onChange={(e) => setCustomAffirmation(e.target.value)}
              placeholder="Write your affirmation..."
              className="w-full mt-3 border border-[#e0d8d0] rounded-2xl px-4 py-3 text-[#5c4a3a] focus:outline-none focus:border-[#7c9a6e] bg-[#faf8f5]"
            />
          )}
        </div>
      )}

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="w-full bg-[#7c9a6e] hover:bg-[#6a8860] text-white py-3 rounded-2xl text-lg transition-colors"
      >
        Complete Reflection 🌿
      </button>

    </div>
  )
}

export default Reflection