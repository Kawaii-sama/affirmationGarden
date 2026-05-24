function Garden({ gardenStage }) {

  // Decide what to show based on garden stage
  const getGardenState = () => {
    if (gardenStage === 0) return {
      emoji: "🟫",
      label: "Bare soil",
      message: "Your garden is waiting for you..."
    }
    if (gardenStage <= 2) return {
      emoji: "🌱",
      label: "A tiny seed",
      message: "Something beautiful is beginning to grow!"
    }
    if (gardenStage <= 4) return {
      emoji: "🌿",
      label: "A small sprout",
      message: "Your garden is waking up!"
    }
    if (gardenStage <= 7) return {
      emoji: "🪴",
      label: "A growing plant",
      message: "Look how far you've come!"
    }
    if (gardenStage <= 10) return {
      emoji: "🌸",
      label: "A full garden",
      message: "Your garden is blooming beautifully!"
    }
    return {
      emoji: "✨🌸✨",
      label: "A magical garden",
      message: "You have created something truly magical!"
    }
  }

  const garden = getGardenState()

  return (
    <div style={{
      textAlign: "center",
      padding: "2rem",
      border: "1px solid #ccc",
      borderRadius: "12px",
      marginTop: "1rem"
    }}>
      <p style={{ fontSize: "4rem", margin: "0" }}>{garden.emoji}</p>
      <h3>{garden.label}</h3>
      <p>{garden.message}</p>
      <p style={{ color: "#888", fontSize: "0.85rem" }}>
        Stage {gardenStage}
      </p>
    </div>
  )
}

export default Garden