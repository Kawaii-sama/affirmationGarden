function Garden({ gardenStage }) {

  const getGardenState = () => {
    if (gardenStage === 0) return {
      emoji: "🟫",
      label: "Bare soil",
      message: "Your garden is waiting for you...",
    }
    if (gardenStage <= 2) return {
      emoji: "🌱",
      label: "A tiny seed",
      message: "Something beautiful is beginning to grow!",
    }
    if (gardenStage <= 4) return {
      emoji: "🌿",
      label: "A small sprout",
      message: "Your garden is waking up!",
    }
    if (gardenStage <= 7) return {
      emoji: "🪴",
      label: "A growing plant",
      message: "Look how far you've come!",
    }
    if (gardenStage <= 10) return {
      emoji: "🌸",
      label: "A full garden",
      message: "Your garden is blooming beautifully!",
    }
    return {
      emoji: "✨🌸✨",
      label: "A magical garden",
      message: "You have created something truly magical!",
    }
  }

  const garden = getGardenState()

  return (
    <div
      className="rounded-3xl p-8 text-center transition-all"
      style={{
        background: "transparent",
        border: "2px solid rgba(92, 74, 58, 0.5)",
      }}
    >
      <p className="text-7xl mb-4">{garden.emoji}</p>
      <h3 className="text-2xl mb-2" style={{ color: "#5c4a3a" }}>{garden.label}</h3>
      <p className="mb-3" style={{ color: "#9c8572" }}>{garden.message}</p>
      <span
        className="text-xs px-3 py-1 rounded-full"
        style={{
          background: "transparent",
          border: "1px solid rgba(92, 74, 58, 0.4)",
          color: "#9c8572",
        }}
      >
        Stage {gardenStage}
      </span>
    </div>
  )
}

export default Garden