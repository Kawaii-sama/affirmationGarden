import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { startGlobalFlute } from "./utils/audioManager"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Reflection from "./pages/Reflection"
import FairyCursor from "./components/FairyCursor"

function SoundOnTransition() {
  const location = useLocation()

  useEffect(() => {
    const ctx = new AudioContext()
    const notes = [523, 659, 784, 1047, 1319]

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.type = "sine"
      osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.08)

      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.08)
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + i * 0.08 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.08 + 0.3)

      osc.start(ctx.currentTime + i * 0.08)
      osc.stop(ctx.currentTime + i * 0.08 + 0.3)
    })
  }, [location])

  return null
}




function App() {
  useEffect(() => {
    const handleInteraction = () => {
      startGlobalFlute()
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
    }
    document.addEventListener("click", handleInteraction)
    document.addEventListener("touchstart", handleInteraction)

    return () => {
      document.removeEventListener("click", handleInteraction)
      document.removeEventListener("touchstart", handleInteraction)
    }
  }, [])
  
  return (
    <BrowserRouter>
      <SoundOnTransition />
      <FairyCursor />
      <Routes>
        <Route path="/"           element={<Login />} />
        <Route path="/register"   element={<Register />} />
        <Route path="/dashboard"  element={<Dashboard />} />
        <Route path="/reflection" element={<Reflection />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App