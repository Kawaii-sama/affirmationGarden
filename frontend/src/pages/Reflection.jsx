import { useState } from "react"
import { useNavigate } from "react-router-dom"
import affirmations from "../api/affirmations"
import API from "../api/axios"

function Reflection() {
  const [category, setCategory]         = useState("")
  const [customCategory, setCustomCategory] = useState("")
  const [affirmation, setAffirmation]   = useState("")
  const [customAffirmation, setCustomAffirmation] = useState("")
  const [error, setError]               = useState("")

  const navigate = useNavigate()

  // Get the list of predefined categories
  const categories = Object.keys(affirmations)

  // Get affirmations for the selected category
  const currentAffirmations = affirmations[category] || []

  const handleSubmit = async () => {
    setError("")

    // Figure out final category and affirmation
    const finalCategory    = category === "Custom" ? customCategory : category
    const finalAffirmation = affirmation === "custom" ? customAffirmation : affirmation

    // Basic validation
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

      await API.post(
        "/reflections",
        { category: finalCategory, affirmation: finalAffirmation },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      // Go back to dashboard after saving
      navigate("/dashboard")

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <div>
      <h1>Today's Reflection 🌱</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Step 1 — Choose Category */}
      <div>
        <h2>Step 1 — Choose a category</h2>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value)
            setAffirmation("")  // reset affirmation when category changes
          }}
        >
          <option value="">-- Select a category --</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
          <option value="Custom">Custom (write your own)</option>
        </select>

        {/* Show text input if Custom category selected */}
        {category === "Custom" && (
          <input
            type="text"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            placeholder="Name your category..."
          />
        )}
      </div>

      {/* Step 2 — Choose Affirmation (only shows after category is picked) */}
      {category && (
        <div>
          <h2>Step 2 — Choose an affirmation</h2>

          {/* Show predefined affirmations if not custom category */}
          {category !== "Custom" && currentAffirmations.map((aff) => (
            <div key={aff}>
              <input
                type="radio"
                name="affirmation"
                value={aff}
                checked={affirmation === aff}
                onChange={(e) => setAffirmation(e.target.value)}
              />
              <label>{aff}</label>
            </div>
          ))}

          {/* Always show write your own option */}
          <div>
            <input
              type="radio"
              name="affirmation"
              value="custom"
              checked={affirmation === "custom"}
              onChange={(e) => setAffirmation(e.target.value)}
            />
            <label>Write your own</label>
          </div>

          {/* Show text input if write your own is selected */}
          {affirmation === "custom" && (
            <input
              type="text"
              value={customAffirmation}
              onChange={(e) => setCustomAffirmation(e.target.value)}
              placeholder="Write your affirmation..."
            />
          )}
        </div>
      )}

      {/* Step 3 — Submit */}
      <button onClick={handleSubmit}>
        Complete Reflection 🌿
      </button>
    </div>
  )
}

export default Reflection