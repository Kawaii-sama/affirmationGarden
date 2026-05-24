function Garden({ gardenStage }) {

  const getGardenState = () => {
    if (gardenStage === 0) return {
      emoji: "🟫",
      label: "Bare soil",
      message: "Your garden is waiting for you...",
      bg: "bg-[#e8ddd0]"
    }
    if (gardenStage <= 2) return {
      emoji: "🌱",
      label: "A tiny seed",
      message: "Something beautiful is beginning to grow!",
      bg: "bg-[#e8f0e0]"
    }
    if (gardenStage <= 4) return {
      emoji: "🌿",
      label: "A small sprout",
      message: "Your garden is waking up!",
      bg: "bg-[#ddeedd]"
    }
    if (gardenStage <= 7) return {
      emoji: "🪴",
      label: "A growing plant",
      message: "Look how far you've come!",
      bg: "bg-[#d4e8d0]"
    }
    if (gardenStage <= 10) return {
      emoji: "🌸",
      label: "A full garden",
      message: "Your garden is blooming beautifully!",
      bg: "bg-[#f0e0f0]"
    }
    return {
      emoji: "✨🌸✨",
      label: "A magical garden",
      message: "You have created something truly magical!",
      bg: "bg-[#f0e8f8]"
    }
  }

  const garden = getGardenState()

  return (
    <div className={`${garden.bg} rounded-3xl p-8 text-center transition-all`}>
      <p className="text-7xl mb-4">{garden.emoji}</p>
      <h3 className="text-2xl text-[#5c4a3a] mb-2">{garden.label}</h3>
      <p className="text-[#9c8572] mb-3">{garden.message}</p>
      <span className="text-xs bg-white px-3 py-1 rounded-full text-[#9c8572]">
        Stage {gardenStage}
      </span>
    </div>
  )
}

export default Garden