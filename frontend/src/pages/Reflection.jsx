import { useState } from "react"
import { useNavigate } from "react-router-dom"
import affirmations from "../api/affirmations"
import API from "../api/axios"
import CategoryDropdown from "../components/CategoryDropdown"
import { sharedAudioCtx } from "../main.jsx"
import EnchantedBackground from "../components/EnchantedBackground"
import WoodFrame from "../components/WoodFrame"

function Reflection() {
  const [category, setCategory] = useState("")
  const [customCategory, setCustomCategory] = useState("")
  const [affirmation, setAffirmation] = useState("")
  const [customAffirmation, setCustomAffirmation] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const categories = Object.keys(affirmations)
  const currentAffirmations = affirmations[category] || []

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

  const handleSubmit = async () => {
    setError("")
    const finalCategory = category === "Custom" ? customCategory : category
    const finalAffirmation = affirmation === "custom" ? customAffirmation : affirmation
    if (!finalCategory) { setError("Please select or enter a category"); return }
    if (!finalAffirmation) { setError("Please select or write an affirmation"); return }
    try {
      const token = localStorage.getItem("token")
      const response = await API.post("/reflections", { category: finalCategory, affirmation: finalAffirmation }, { headers: { Authorization: `Bearer ${token}` } })
      localStorage.setItem("user", JSON.stringify(response.data.user))
      navigate("/dashboard")
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
    }
  }

  return (
    <>
      <EnchantedBackground />

      {/* Apothecary Tree */}
      <svg
        style={{
          position: "fixed",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 3,
          pointerEvents: "none",
          imageRendering: "pixelated",
          filter: "contrast(1.3) brightness(1.2)",
        }}
        viewBox="0 0 360 210"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
      >
        {/* RIGHT TREE TRUNK */}
        <rect x="330" y="0" width="30" height="225" fill="#2a1f10" />
        <rect x="332" y="0" width="8" height="225" fill="#3d2e18" opacity="0.6" />
        <rect x="345" y="0" width="5" height="225" fill="#1a1508" opacity="0.5" />
        <rect x="333" y="20" width="12" height="2" fill="#1a1508" opacity="0.3" />
        <rect x="335" y="45" width="10" height="2" fill="#1e1508" opacity="0.25" />
        <rect x="332" y="70" width="14" height="1" fill="#1a1508" opacity="0.3" />
        <rect x="334" y="100" width="11" height="2" fill="#1e1508" opacity="0.25" />
        <rect x="333" y="130" width="13" height="1" fill="#1a1508" opacity="0.3" />
        <rect x="335" y="155" width="9" height="2" fill="#1a1508" opacity="0.25" />
        <rect x="332" y="180" width="14" height="1" fill="#1e1508" opacity="0.3" />
        <rect x="330" y="40" width="4" height="3" fill="#3D6B4F" opacity="0.5" />
        <rect x="330" y="90" width="5" height="4" fill="#4A7C59" opacity="0.45" />
        <rect x="330" y="150" width="4" height="3" fill="#2E5939" opacity="0.5" />
        <rect x="338" y="60" width="4" height="4" rx="2" fill="#1a1508" opacity="0.4" />
        <rect x="336" y="120" width="3" height="3" rx="1" fill="#1e1508" opacity="0.35" />

        {/* HORIZONTAL BRANCH */}
        <path d="M340 120 Q300 117 260 121 Q220 119 180 123 Q140 121 100 125 Q80 127 65 130" stroke="#2a1f10" fill="none" strokeWidth="7" strokeLinecap="round" />
        <path d="M340 120 Q300 117 260 121 Q220 119 180 123 Q140 121 100 125 Q80 127 65 130" stroke="#3d2e18" fill="none" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        <path d="M340 120 Q300 117 260 121 Q220 119 180 123 Q140 121 100 125 Q80 127 65 130" stroke="#1a1508" fill="none" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <rect x="120" y="120" width="8" height="3" fill="#3D6B4F" opacity="0.5" />
        <rect x="200" y="117" width="6" height="3" fill="#4A7C59" opacity="0.45" />
        <rect x="280" y="116" width="7" height="3" fill="#2E5939" opacity="0.5" />
        <line x1="250" y1="121" x2="245" y2="113" stroke="#2a1f10" strokeWidth="2" opacity="0.7" />
        <line x1="170" y1="122" x2="168" y2="115" stroke="#2a1f10" strokeWidth="2" opacity="0.6" />
        <line x1="110" y1="124" x2="106" y2="117" stroke="#2a1f10" strokeWidth="1.5" opacity="0.6" />

        {/* CANDLE ON SAUCER */}
        <rect x="64" y="127" width="12" height="1" fill="#e8e0d8" opacity="0.9" />
        <rect x="65" y="128" width="10" height="1" fill="#d4ccc4" opacity="0.8" />
        <rect x="66" y="126" width="8" height="1" fill="#f0ebe4" opacity="0.7" />
        <rect x="68" y="127" width="4" height="1" fill="#e8dcc8" opacity="0.4" />
        <rect x="69" y="120" width="3" height="7" fill="#e8dcc8" opacity="0.9" />
        <rect x="69" y="120" width="1" height="7" fill="#d4c8b0" opacity="0.4" />
        <rect x="71" y="120" width="1" height="7" fill="#f0e6d4" opacity="0.3" />
        <rect x="68" y="122" width="1" height="2" fill="#e8dcc8" opacity="0.7" />
        <rect x="72" y="121" width="1" height="2" fill="#e8dcc8" opacity="0.65" />
        <rect x="70" y="118" width="1" height="2" fill="#2a1e14" opacity="0.8" />
        <rect x="67" y="112" width="7" height="8" fill="#FFD700" opacity="0.04" />
        <rect x="68" y="113" width="5" height="6" fill="#FFD700" opacity="0.06" />
        <rect x="69" y="114" width="3" height="4" fill="#E8A030" opacity="0.8" />
        <rect x="69" y="113" width="3" height="1" fill="#E8A030" opacity="0.7" />
        <rect x="70" y="112" width="1" height="1" fill="#E8A030" opacity="0.6" />
        <rect x="69" y="115" width="3" height="2" fill="#FFD700" opacity="0.85" />
        <rect x="70" y="113" width="1" height="2" fill="#FFD700" opacity="0.8" />
        <rect x="70" y="115" width="1" height="2" fill="#FFFACD" opacity="0.9" />
        <rect x="70" y="114" width="1" height="1" fill="#FFFFFF" opacity="0.6" />
        <rect x="65" y="125" width="10" height="2" fill="#FFD700" opacity="0.04" />

        {/* HANGING HERB BUNDLES */}
        <rect x="89" y="127" width="3" height="2" fill="#8B7355" opacity="0.8" />
        <rect x="90" y="129" width="1" height="16" fill="#5C8A4A" opacity="0.7" />
        <rect x="89" y="130" width="1" height="15" fill="#4A7C59" opacity="0.7" />
        <rect x="91" y="130" width="1" height="15" fill="#3D6B4F" opacity="0.7" />
        <rect x="88" y="132" width="1" height="12" fill="#6B8F5E" opacity="0.6" />
        <rect x="92" y="132" width="1" height="12" fill="#4A7C59" opacity="0.6" />
        <rect x="87" y="134" width="1" height="9" fill="#5C8A4A" opacity="0.5" />
        <rect x="93" y="134" width="1" height="9" fill="#3D6B4F" opacity="0.5" />
        <rect x="87" y="143" width="1" height="2" fill="#DAA520" opacity="0.6" />
        <rect x="88" y="144" width="1" height="2" fill="#E8C547" opacity="0.65" />
        <rect x="89" y="145" width="1" height="2" fill="#FFD700" opacity="0.7" />
        <rect x="90" y="145" width="1" height="2" fill="#DAA520" opacity="0.7" />
        <rect x="91" y="145" width="1" height="2" fill="#E8C547" opacity="0.7" />
        <rect x="92" y="144" width="1" height="2" fill="#DAA520" opacity="0.65" />
        <rect x="93" y="143" width="1" height="2" fill="#FFD700" opacity="0.6" />

        <rect x="109" y="126" width="3" height="2" fill="#8B7355" opacity="0.8" />
        <rect x="110" y="128" width="1" height="16" fill="#4A7C59" opacity="0.7" />
        <rect x="109" y="129" width="1" height="15" fill="#3D6B4F" opacity="0.7" />
        <rect x="111" y="129" width="1" height="15" fill="#5C8A4A" opacity="0.7" />
        <rect x="108" y="131" width="1" height="12" fill="#2E5939" opacity="0.6" />
        <rect x="112" y="131" width="1" height="12" fill="#4A7C59" opacity="0.6" />
        <rect x="107" y="133" width="1" height="9" fill="#3D6B4F" opacity="0.5" />
        <rect x="113" y="133" width="1" height="9" fill="#5C8A4A" opacity="0.5" />
        <rect x="107" y="142" width="1" height="2" fill="#8B3A3A" opacity="0.6" />
        <rect x="108" y="143" width="1" height="2" fill="#A04040" opacity="0.65" />
        <rect x="109" y="144" width="1" height="2" fill="#8B3A3A" opacity="0.7" />
        <rect x="110" y="144" width="1" height="2" fill="#A04040" opacity="0.7" />
        <rect x="111" y="144" width="1" height="2" fill="#993333" opacity="0.7" />
        <rect x="112" y="143" width="1" height="2" fill="#A04040" opacity="0.65" />
        <rect x="113" y="142" width="1" height="2" fill="#8B3A3A" opacity="0.6" />

        <rect x="131" y="124" width="3" height="2" fill="#8B7355" opacity="0.8" />
        <rect x="132" y="126" width="1" height="17" fill="#3D6B4F" opacity="0.7" />
        <rect x="131" y="127" width="1" height="16" fill="#4A7C59" opacity="0.7" />
        <rect x="133" y="127" width="1" height="16" fill="#5C8A4A" opacity="0.7" />
        <rect x="130" y="129" width="1" height="13" fill="#6B8F5E" opacity="0.6" />
        <rect x="134" y="129" width="1" height="13" fill="#3D6B4F" opacity="0.6" />
        <rect x="129" y="131" width="1" height="10" fill="#4A7C59" opacity="0.5" />
        <rect x="135" y="131" width="1" height="10" fill="#5C8A4A" opacity="0.5" />
        <rect x="129" y="141" width="1" height="2" fill="#9370DB" opacity="0.6" />
        <rect x="130" y="142" width="1" height="2" fill="#8A65C8" opacity="0.65" />
        <rect x="131" y="143" width="1" height="2" fill="#9370DB" opacity="0.7" />
        <rect x="132" y="143" width="1" height="2" fill="#8A65C8" opacity="0.7" />
        <rect x="133" y="143" width="1" height="2" fill="#9370DB" opacity="0.7" />
        <rect x="134" y="142" width="1" height="2" fill="#7B5BB0" opacity="0.65" />
        <rect x="135" y="141" width="1" height="2" fill="#9370DB" opacity="0.6" />

        <rect x="152" y="123" width="3" height="2" fill="#8B7355" opacity="0.8" />
        <rect x="153" y="125" width="1" height="18" fill="#4A7C59" opacity="0.7" />
        <rect x="152" y="126" width="1" height="17" fill="#3D6B4F" opacity="0.7" />
        <rect x="154" y="126" width="1" height="17" fill="#5C8A4A" opacity="0.7" />
        <rect x="151" y="128" width="1" height="14" fill="#6B8F5E" opacity="0.6" />
        <rect x="155" y="128" width="1" height="14" fill="#4A7C59" opacity="0.6" />
        <rect x="150" y="130" width="1" height="11" fill="#3D6B4F" opacity="0.5" />
        <rect x="156" y="130" width="1" height="11" fill="#5C8A4A" opacity="0.5" />
        <rect x="149" y="133" width="1" height="8" fill="#4A7C59" opacity="0.4" />
        <rect x="157" y="133" width="1" height="8" fill="#6B8F5E" opacity="0.4" />
        <rect x="149" y="141" width="1" height="2" fill="#C87090" opacity="0.55" />
        <rect x="150" y="141" width="1" height="2" fill="#D8809A" opacity="0.6" />
        <rect x="151" y="142" width="1" height="2" fill="#C87090" opacity="0.65" />
        <rect x="152" y="143" width="1" height="2" fill="#D8809A" opacity="0.7" />
        <rect x="153" y="143" width="1" height="2" fill="#E890A8" opacity="0.7" />
        <rect x="154" y="143" width="1" height="2" fill="#D8809A" opacity="0.7" />
        <rect x="155" y="142" width="1" height="2" fill="#C87090" opacity="0.65" />
        <rect x="156" y="141" width="1" height="2" fill="#D8809A" opacity="0.6" />
        <rect x="157" y="141" width="1" height="2" fill="#C87090" opacity="0.55" />

        <rect x="178" y="123" width="3" height="2" fill="#8B7355" opacity="0.8" />
        <rect x="179" y="125" width="1" height="17" fill="#9E8B60" opacity="0.7" />
        <rect x="178" y="126" width="1" height="16" fill="#8B7A50" opacity="0.7" />
        <rect x="180" y="126" width="1" height="16" fill="#A89468" opacity="0.7" />
        <rect x="177" y="128" width="1" height="13" fill="#9E8B60" opacity="0.6" />
        <rect x="181" y="128" width="1" height="13" fill="#8B7A50" opacity="0.6" />
        <rect x="176" y="130" width="1" height="10" fill="#A89468" opacity="0.5" />
        <rect x="182" y="130" width="1" height="10" fill="#9E8B60" opacity="0.5" />
        <rect x="176" y="140" width="1" height="3" fill="#C4A860" opacity="0.55" />
        <rect x="177" y="141" width="1" height="3" fill="#D4B870" opacity="0.6" />
        <rect x="178" y="142" width="1" height="3" fill="#C4A860" opacity="0.65" />
        <rect x="179" y="142" width="1" height="3" fill="#D4B870" opacity="0.7" />
        <rect x="180" y="142" width="1" height="3" fill="#C4A860" opacity="0.7" />
        <rect x="181" y="141" width="1" height="3" fill="#D4B870" opacity="0.6" />
        <rect x="182" y="140" width="1" height="3" fill="#C4A860" opacity="0.55" />

        <rect x="200" y="122" width="3" height="2" fill="#8B7355" opacity="0.8" />
        <rect x="201" y="124" width="1" height="15" fill="#1a3a15" opacity="0.7" />
        <rect x="200" y="125" width="1" height="14" fill="#2E5939" opacity="0.7" />
        <rect x="202" y="125" width="1" height="14" fill="#1a3a15" opacity="0.7" />
        <rect x="199" y="127" width="1" height="11" fill="#3D6B4F" opacity="0.6" />
        <rect x="203" y="127" width="1" height="11" fill="#2E5939" opacity="0.6" />
        <rect x="198" y="129" width="1" height="8" fill="#1a3a15" opacity="0.5" />
        <rect x="204" y="129" width="1" height="8" fill="#3D6B4F" opacity="0.5" />

        <rect x="222" y="121" width="3" height="2" fill="#8B7355" opacity="0.8" />
        <rect x="223" y="123" width="1" height="15" fill="#4A7C59" opacity="0.7" />
        <rect x="222" y="124" width="1" height="14" fill="#6B8F5E" opacity="0.7" />
        <rect x="224" y="124" width="1" height="14" fill="#3D6B4F" opacity="0.7" />
        <rect x="221" y="126" width="1" height="11" fill="#5C8A4A" opacity="0.6" />
        <rect x="225" y="126" width="1" height="11" fill="#4A7C59" opacity="0.6" />
        <rect x="220" y="128" width="1" height="8" fill="#6B8F5E" opacity="0.5" />
        <rect x="226" y="128" width="1" height="8" fill="#3D6B4F" opacity="0.5" />
        <rect x="220" y="136" width="1" height="2" fill="#C4A870" opacity="0.55" />
        <rect x="221" y="137" width="1" height="2" fill="#B89860" opacity="0.6" />
        <rect x="222" y="138" width="1" height="2" fill="#C4A870" opacity="0.65" />
        <rect x="223" y="138" width="1" height="2" fill="#B89860" opacity="0.7" />
        <rect x="224" y="138" width="1" height="2" fill="#C4A870" opacity="0.65" />
        <rect x="225" y="137" width="1" height="2" fill="#B89860" opacity="0.6" />
        <rect x="226" y="136" width="1" height="2" fill="#C4A870" opacity="0.55" />

        <rect x="246" y="121" width="3" height="2" fill="#8B7355" opacity="0.8" />
        <rect x="247" y="123" width="1" height="16" fill="#3D6B4F" opacity="0.7" />
        <rect x="246" y="124" width="1" height="15" fill="#4A7C59" opacity="0.7" />
        <rect x="248" y="124" width="1" height="15" fill="#5C8A4A" opacity="0.7" />
        <rect x="245" y="126" width="1" height="12" fill="#3D6B4F" opacity="0.6" />
        <rect x="249" y="126" width="1" height="12" fill="#4A7C59" opacity="0.6" />
        <rect x="244" y="128" width="1" height="9" fill="#5C8A4A" opacity="0.5" />
        <rect x="250" y="128" width="1" height="9" fill="#3D6B4F" opacity="0.5" />
        <rect x="244" y="137" width="1" height="2" fill="#B05080" opacity="0.55" />
        <rect x="245" y="138" width="1" height="2" fill="#C06090" opacity="0.6" />
        <rect x="246" y="139" width="1" height="2" fill="#B05080" opacity="0.65" />
        <rect x="247" y="139" width="1" height="2" fill="#C06090" opacity="0.7" />
        <rect x="248" y="139" width="1" height="2" fill="#B05080" opacity="0.7" />
        <rect x="249" y="138" width="1" height="2" fill="#C06090" opacity="0.6" />
        <rect x="250" y="137" width="1" height="2" fill="#B05080" opacity="0.55" />

        <rect x="269" y="120" width="3" height="2" fill="#8B7355" opacity="0.8" />
        <rect x="270" y="122" width="1" height="18" fill="#9E8B60" opacity="0.7" />
        <rect x="269" y="123" width="1" height="17" fill="#8B7A50" opacity="0.7" />
        <rect x="271" y="123" width="1" height="17" fill="#A89468" opacity="0.7" />
        <rect x="268" y="125" width="1" height="14" fill="#9E8B60" opacity="0.6" />
        <rect x="272" y="125" width="1" height="14" fill="#8B7A50" opacity="0.6" />
        <rect x="267" y="127" width="1" height="11" fill="#A89468" opacity="0.5" />
        <rect x="273" y="127" width="1" height="11" fill="#9E8B60" opacity="0.5" />
        <rect x="266" y="130" width="1" height="8" fill="#8B7A50" opacity="0.4" />
        <rect x="274" y="130" width="1" height="8" fill="#A89468" opacity="0.4" />

        <rect x="291" y="119" width="3" height="2" fill="#8B7355" opacity="0.8" />
        <rect x="292" y="121" width="1" height="15" fill="#2E5939" opacity="0.7" />
        <rect x="291" y="122" width="1" height="14" fill="#4A7C59" opacity="0.7" />
        <rect x="293" y="122" width="1" height="14" fill="#3D6B4F" opacity="0.7" />
        <rect x="290" y="124" width="1" height="11" fill="#5C8A4A" opacity="0.6" />
        <rect x="294" y="124" width="1" height="11" fill="#4A7C59" opacity="0.6" />
        <rect x="289" y="126" width="1" height="8" fill="#3D6B4F" opacity="0.5" />
        <rect x="295" y="126" width="1" height="8" fill="#6B8F5E" opacity="0.5" />

        {/* Crystal charms */}
        <line x1="120" y1="125" x2="120" y2="133" stroke="#DAA520" strokeWidth="0.3" opacity="0.5" />
        <polygon points="120,133 118,137 120,140 122,137" fill="#7FFFD4" opacity="0.5" />
        <line x1="165" y1="122" x2="165" y2="130" stroke="#DAA520" strokeWidth="0.3" opacity="0.5" />
        <polygon points="165,130 163,134 165,137 167,134" fill="#FFD700" opacity="0.5" />
        <line x1="235" y1="120" x2="235" y2="128" stroke="#DAA520" strokeWidth="0.3" opacity="0.5" />
        <polygon points="235,128 233,132 235,135 237,132" fill="#7FFFD4" opacity="0.45" />
        <line x1="280" y1="119" x2="280" y2="126" stroke="#DAA520" strokeWidth="0.3" opacity="0.5" />
        <polygon points="280,126 278,130 280,133 282,130" fill="#E8C547" opacity="0.45" />

        {/* SHELF */}
        <rect x="65" y="195" width="270" height="3" fill="#2a1e14" />
        <rect x="65" y="195" width="270" height="1" fill="#4a3828" opacity="0.8" />
        <rect x="65" y="197" width="270" height="1" fill="#1a1208" opacity="0.9" />
        <rect x="99" y="198" width="2" height="6" fill="#2a1e14" opacity="0.8" />
        <rect x="93" y="203" width="7" height="2" fill="#2a1e14" opacity="0.8" />
        <rect x="299" y="198" width="2" height="6" fill="#2a1e14" opacity="0.8" />
        <rect x="300" y="203" width="7" height="2" fill="#2a1e14" opacity="0.8" />

        {/* BOWLS */}
        <rect x="78" y="193" width="18" height="2" fill="#3d2e20" opacity="0.9" />
        <rect x="76" y="191" width="20" height="2" fill="#3d2e20" opacity="0.85" />
        <rect x="78" y="189" width="18" height="2" fill="#3d2e20" opacity="0.8" />
        <rect x="80" y="187" width="14" height="2" fill="#3d2e20" opacity="0.75" />
        <rect x="82" y="186" width="10" height="1" fill="#2a1e14" opacity="0.5" />
        <rect x="83" y="186" width="8" height="1" fill="#1a1208" opacity="0.3" />
        <rect x="84" y="186" width="1" height="1" fill="#C87090" opacity="0.5" />
        <rect x="86" y="186" width="1" height="1" fill="#DAA520" opacity="0.5" />
        <rect x="88" y="186" width="1" height="1" fill="#9370DB" opacity="0.5" />
        <rect x="90" y="186" width="1" height="1" fill="#C87090" opacity="0.4" />
        <rect x="70" y="193" width="13" height="2" fill="#4a3828" opacity="0.85" />
        <rect x="69" y="191" width="13" height="2" fill="#4a3828" opacity="0.8" />
        <rect x="70" y="189" width="12" height="2" fill="#4a3828" opacity="0.75" />
        <rect x="71" y="188" width="10" height="1" fill="#2a1e14" opacity="0.4" />
        <rect x="99" y="193" width="10" height="2" fill="#3d2e20" opacity="0.85" />
        <rect x="100" y="191" width="8" height="2" fill="#3d2e20" opacity="0.8" />
        <rect x="101" y="190" width="6" height="1" fill="#2a1e14" opacity="0.35" />
        <rect x="102" y="190" width="4" height="1" fill="#DAA520" opacity="0.3" />

        {/* CAULDRON */}
        <rect x="113" y="193" width="18" height="2" fill="#1a1208" opacity="0.95" />
        <rect x="112" y="191" width="20" height="2" fill="#1a1208" opacity="0.9" />
        <rect x="112" y="189" width="20" height="2" fill="#1a1208" opacity="0.88" />
        <rect x="113" y="187" width="18" height="2" fill="#1a1208" opacity="0.85" />
        <rect x="114" y="185" width="16" height="2" fill="#1a1208" opacity="0.82" />
        <rect x="115" y="183" width="14" height="2" fill="#1a1208" opacity="0.8" />
        <rect x="113" y="183" width="16" height="1" fill="#2a1e14" opacity="0.7" />
        <rect x="114" y="182" width="14" height="1" fill="#3d2e20" opacity="0.5" />
        <rect x="116" y="183" width="10" height="1" fill="#3D6B4F" opacity="0.35" />
        <rect x="118" y="183" width="6" height="1" fill="#5C8A4A" opacity="0.2" />
        <rect x="110" y="186" width="2" height="4" fill="#2a1e14" opacity="0.7" />
        <rect x="109" y="187" width="2" height="2" fill="#2a1e14" opacity="0.5" />
        <rect x="132" y="186" width="2" height="4" fill="#2a1e14" opacity="0.7" />
        <rect x="133" y="187" width="2" height="2" fill="#2a1e14" opacity="0.5" />
        <rect x="115" y="195" width="2" height="2" fill="#1a1208" opacity="0.7" />
        <rect x="127" y="195" width="2" height="2" fill="#1a1208" opacity="0.7" />

        {/* GRIMOIRE BOOK */}
        <rect x="147" y="193" width="1" height="2" fill="#2a1e14" opacity="0.7" />
        <rect x="146" y="191" width="1" height="2" fill="#2a1e14" opacity="0.6" />
        <rect x="145" y="189" width="1" height="2" fill="#2a1e14" opacity="0.5" />
        <rect x="166" y="193" width="1" height="2" fill="#2a1e14" opacity="0.7" />
        <rect x="167" y="191" width="1" height="2" fill="#2a1e14" opacity="0.6" />
        <rect x="168" y="189" width="1" height="2" fill="#2a1e14" opacity="0.5" />
        <rect x="140" y="188" width="17" height="1" fill="#d4bc96" opacity="0.9" />
        <rect x="140" y="187" width="17" height="1" fill="#d4bc96" opacity="0.88" />
        <rect x="141" y="186" width="16" height="1" fill="#d4bc96" opacity="0.85" />
        <rect x="141" y="185" width="16" height="1" fill="#d4bc96" opacity="0.82" />
        <rect x="142" y="184" width="15" height="1" fill="#d4bc96" opacity="0.8" />
        <rect x="142" y="183" width="15" height="1" fill="#d4bc96" opacity="0.78" />
        <rect x="143" y="182" width="14" height="1" fill="#d4bc96" opacity="0.75" />
        <rect x="143" y="181" width="14" height="1" fill="#d4bc96" opacity="0.72" />
        <rect x="144" y="180" width="13" height="1" fill="#d4bc96" opacity="0.7" />
        <rect x="144" y="179" width="13" height="1" fill="#d4bc96" opacity="0.68" />
        <rect x="157" y="188" width="17" height="1" fill="#e0d0b8" opacity="0.9" />
        <rect x="157" y="187" width="17" height="1" fill="#e0d0b8" opacity="0.88" />
        <rect x="157" y="186" width="17" height="1" fill="#e0d0b8" opacity="0.85" />
        <rect x="157" y="185" width="17" height="1" fill="#e0d0b8" opacity="0.82" />
        <rect x="157" y="184" width="17" height="1" fill="#e0d0b8" opacity="0.8" />
        <rect x="157" y="183" width="17" height="1" fill="#e0d0b8" opacity="0.78" />
        <rect x="157" y="182" width="16" height="1" fill="#e0d0b8" opacity="0.75" />
        <rect x="157" y="181" width="16" height="1" fill="#e0d0b8" opacity="0.72" />
        <rect x="157" y="180" width="15" height="1" fill="#e0d0b8" opacity="0.7" />
        <rect x="157" y="179" width="15" height="1" fill="#e0d0b8" opacity="0.68" />
        <rect x="157" y="179" width="1" height="10" fill="#2a1e14" opacity="0.7" />
        <rect x="145" y="181" width="1" height="1" fill="#3d2e20" opacity="0.5" />
        <rect x="144" y="182" width="3" height="1" fill="#3d2e20" opacity="0.4" />
        <rect x="145" y="183" width="1" height="1" fill="#3d2e20" opacity="0.4" />
        <rect x="142" y="184" width="8" height="1" fill="#3d2e20" opacity="0.3" />
        <rect x="142" y="185" width="7" height="1" fill="#3d2e20" opacity="0.28" />
        <rect x="142" y="186" width="9" height="1" fill="#3d2e20" opacity="0.25" />
        <rect x="142" y="187" width="6" height="1" fill="#3d2e20" opacity="0.22" />
        <rect x="150" y="180" width="1" height="3" fill="#2E5939" opacity="0.5" />
        <rect x="149" y="181" width="1" height="1" fill="#3D6B4F" opacity="0.4" />
        <rect x="151" y="180" width="1" height="1" fill="#4A7C59" opacity="0.4" />
        <rect x="165" y="180" width="1" height="6" fill="#2E5939" opacity="0.7" />
        <rect x="163" y="182" width="2" height="1" fill="#3D6B4F" opacity="0.6" />
        <rect x="166" y="181" width="2" height="1" fill="#3D6B4F" opacity="0.6" />
        <rect x="162" y="183" width="1" height="1" fill="#2E5939" opacity="0.5" />
        <rect x="168" y="182" width="1" height="1" fill="#4A7C59" opacity="0.5" />
        <rect x="164" y="179" width="1" height="1" fill="#9370DB" opacity="0.5" />
        <rect x="165" y="179" width="1" height="1" fill="#DAA520" opacity="0.5" />
        <rect x="166" y="179" width="1" height="1" fill="#9370DB" opacity="0.5" />
        <rect x="165" y="178" width="1" height="1" fill="#8A65C8" opacity="0.4" />
        <rect x="163" y="186" width="1" height="1" fill="#5c4a3a" opacity="0.35" />
        <rect x="167" y="186" width="1" height="1" fill="#5c4a3a" opacity="0.35" />

        {/* MORTAR AND PESTLE */}
        <rect x="181" y="193" width="15" height="2" fill="#3d2e20" opacity="0.9" />
        <rect x="180" y="191" width="16" height="2" fill="#3d2e20" opacity="0.88" />
        <rect x="181" y="189" width="14" height="2" fill="#3d2e20" opacity="0.85" />
        <rect x="182" y="187" width="12" height="2" fill="#3d2e20" opacity="0.82" />
        <rect x="183" y="186" width="10" height="1" fill="#1a1208" opacity="0.4" />
        <rect x="184" y="186" width="8" height="1" fill="#3D6B4F" opacity="0.35" />
        <rect x="181" y="186" width="14" height="1" fill="#2a1e14" opacity="0.7" />
        <rect x="185" y="186" width="1" height="1" fill="#3d2e20" opacity="0.85" />
        <rect x="184" y="185" width="1" height="1" fill="#3d2e20" opacity="0.8" />
        <rect x="183" y="184" width="1" height="1" fill="#4a3828" opacity="0.75" />
        <rect x="182" y="183" width="1" height="1" fill="#3d2e20" opacity="0.7" />
        <rect x="181" y="182" width="1" height="1" fill="#4a3828" opacity="0.65" />
        <rect x="180" y="181" width="1" height="1" fill="#3d2e20" opacity="0.6" />
        <rect x="179" y="180" width="2" height="2" fill="#3d2e20" opacity="0.8" />

        {/* KNIFE */}
        <rect x="200" y="193" width="13" height="1" fill="#a0a0a0" opacity="0.7" />
        <rect x="201" y="192" width="11" height="1" fill="#b0b0b0" opacity="0.5" />
        <rect x="202" y="192" width="9" height="1" fill="#d0d0d0" opacity="0.3" />
        <rect x="197" y="192" width="4" height="2" fill="#3d2e20" opacity="0.85" />
        <rect x="198" y="193" width="1" height="1" fill="#DAA520" opacity="0.5" />
        <rect x="200" y="193" width="1" height="1" fill="#DAA520" opacity="0.5" />

        {/* PILE OF BOOKS */}
        <rect x="220" y="191" width="18" height="4" fill="#2a1e14" opacity="0.9" />
        <rect x="220" y="191" width="1" height="3" fill="#DAA520" opacity="0.35" />
        <rect x="221" y="192" width="16" height="1" fill="#1a1208" opacity="0.3" />
        <rect x="221" y="187" width="16" height="4" fill="#6B3020" opacity="0.85" />
        <rect x="221" y="188" width="1" height="2" fill="#DAA520" opacity="0.3" />
        <rect x="222" y="184" width="14" height="3" fill="#1a3a15" opacity="0.85" />
        <rect x="222" y="185" width="1" height="1" fill="#DAA520" opacity="0.25" />
        <rect x="223" y="182" width="12" height="2" fill="#3d2e20" opacity="0.8" />

        {/* SCROLLS */}
        <rect x="215" y="193" width="7" height="2" fill="#c4a87c" opacity="0.75" />
        <rect x="214" y="193" width="1" height="2" fill="#b39568" opacity="0.7" />
        <rect x="222" y="193" width="1" height="2" fill="#b39568" opacity="0.7" />
        <rect x="239" y="185" width="2" height="10" fill="#c4a87c" opacity="0.75" />
        <rect x="239" y="184" width="2" height="1" fill="#b39568" opacity="0.7" />
        <rect x="239" y="195" width="2" height="1" fill="#b39568" opacity="0.7" />
        <rect x="241" y="186" width="2" height="9" fill="#d4bc96" opacity="0.7" />
        <rect x="241" y="185" width="2" height="1" fill="#b39568" opacity="0.65" />

        {/* POTION BOTTLES */}
        <rect x="255" y="186" width="4" height="9" fill="#1a3a15" fillOpacity="0.3" opacity="0.8" />
        <rect x="255" y="186" width="4" height="9" fill="none" stroke="#4A7C59" strokeWidth="0.4" opacity="0.8" />
        <rect x="256" y="184" width="2" height="2" fill="#1a3a15" fillOpacity="0.2" opacity="0.7" />
        <rect x="256" y="183" width="2" height="1" fill="#6b5a48" opacity="0.8" />
        <rect x="257" y="189" width="1" height="3" fill="#3D6B4F" opacity="0.4" />
        <rect x="261" y="185" width="5" height="10" fill="#1a3a15" fillOpacity="0.25" opacity="0.8" />
        <rect x="261" y="185" width="5" height="10" fill="none" stroke="#3D6B4F" strokeWidth="0.4" opacity="0.8" />
        <rect x="262" y="183" width="3" height="2" fill="#1a3a15" fillOpacity="0.15" opacity="0.7" />
        <rect x="262" y="182" width="3" height="1" fill="#6b5a48" opacity="0.8" />
        <rect x="263" y="190" width="1" height="1" fill="#DAA520" opacity="0.4" />
        <rect x="267" y="188" width="5" height="7" fill="#1a3a15" fillOpacity="0.25" opacity="0.8" />
        <rect x="266" y="189" width="7" height="5" fill="#1a3a15" fillOpacity="0.15" opacity="0.6" />
        <rect x="268" y="185" width="2" height="1" fill="#6b5a48" opacity="0.8" />
        <rect x="268" y="192" width="3" height="2" fill="#2E5939" opacity="0.2" />
        <rect x="274" y="184" width="3" height="11" fill="#1a3a15" fillOpacity="0.2" opacity="0.8" />
        <rect x="274" y="181" width="3" height="1" fill="#6b5a48" opacity="0.8" />
        <rect x="275" y="188" width="1" height="2" fill="#4A7C59" opacity="0.4" />
        <rect x="279" y="187" width="5" height="8" fill="#1a3a15" fillOpacity="0.3" opacity="0.8" />
        <rect x="280" y="184" width="3" height="1" fill="#6b5a48" opacity="0.8" />
        <rect x="280" y="189" width="1" height="2" fill="#4A7C59" opacity="0.3" />
        <rect x="281" y="188" width="1" height="3" fill="#3D6B4F" opacity="0.3" />
        <rect x="286" y="189" width="4" height="6" fill="#1a3a15" fillOpacity="0.25" opacity="0.8" />
        <rect x="285" y="190" width="6" height="4" fill="#1a3a15" fillOpacity="0.1" opacity="0.6" />
        <rect x="287" y="186" width="2" height="1" fill="#6b5a48" opacity="0.8" />
        <rect x="293" y="189" width="3" height="6" fill="#1a3a15" fillOpacity="0.2" opacity="0.75" />
        <rect x="293" y="186" width="3" height="1" fill="#6b5a48" opacity="0.75" />
        <rect x="255" y="192" width="45" height="3" fill="#3D6B4F" opacity="0.03" />

        {/* SCEPTER */}
        <rect x="320" y="139" width="3" height="4" fill="#6B4226" opacity="0.85" />
        <rect x="319" y="143" width="3" height="4" fill="#5C3A1E" opacity="0.85" />
        <rect x="319" y="147" width="3" height="4" fill="#6B4226" opacity="0.85" />
        <rect x="318" y="151" width="3" height="4" fill="#5C3A1E" opacity="0.85" />
        <rect x="318" y="155" width="3" height="4" fill="#6B4226" opacity="0.85" />
        <rect x="317" y="159" width="3" height="4" fill="#5C3A1E" opacity="0.85" />
        <rect x="317" y="163" width="3" height="4" fill="#6B4226" opacity="0.85" />
        <rect x="316" y="167" width="3" height="4" fill="#5C3A1E" opacity="0.85" />
        <rect x="316" y="171" width="3" height="4" fill="#6B4226" opacity="0.85" />
        <rect x="315" y="175" width="3" height="4" fill="#5C3A1E" opacity="0.85" />
        <rect x="315" y="179" width="3" height="4" fill="#6B4226" opacity="0.85" />
        <rect x="314" y="183" width="3" height="4" fill="#5C3A1E" opacity="0.85" />
        <rect x="314" y="187" width="3" height="4" fill="#6B4226" opacity="0.85" />
        <rect x="313" y="191" width="3" height="4" fill="#5C3A1E" opacity="0.85" />
        <rect x="322" y="139" width="1" height="4" fill="#8B5E3C" opacity="0.3" />
        <rect x="321" y="143" width="1" height="8" fill="#8B5E3C" opacity="0.3" />
        <rect x="320" y="151" width="1" height="8" fill="#8B5E3C" opacity="0.3" />
        <rect x="319" y="159" width="1" height="8" fill="#8B5E3C" opacity="0.3" />
        <rect x="318" y="167" width="1" height="8" fill="#8B5E3C" opacity="0.3" />
        <rect x="317" y="175" width="1" height="8" fill="#8B5E3C" opacity="0.3" />
        <rect x="316" y="183" width="1" height="12" fill="#8B5E3C" opacity="0.3" />
        <rect x="322" y="187" width="1" height="1" fill="#3D6B4F" opacity="0.7" />
        <rect x="317" y="184" width="1" height="1" fill="#3D6B4F" opacity="0.7" />
        <rect x="321" y="179" width="1" height="1" fill="#2E5939" opacity="0.7" />
        <rect x="316" y="176" width="1" height="1" fill="#3D6B4F" opacity="0.7" />
        <rect x="320" y="172" width="1" height="1" fill="#4A7C59" opacity="0.65" />
        <rect x="316" y="168" width="1" height="1" fill="#3D6B4F" opacity="0.65" />
        <rect x="320" y="164" width="1" height="1" fill="#2E5939" opacity="0.65" />
        <rect x="316" y="160" width="1" height="1" fill="#3D6B4F" opacity="0.6" />
        <rect x="320" y="156" width="1" height="1" fill="#4A7C59" opacity="0.6" />
        <rect x="317" y="152" width="1" height="1" fill="#3D6B4F" opacity="0.6" />
        <rect x="321" y="148" width="1" height="1" fill="#2E5939" opacity="0.6" />
        <rect x="323" y="186" width="1" height="1" fill="#5C8A4A" opacity="0.6" />
        <rect x="324" y="187" width="1" height="1" fill="#4A7C59" opacity="0.5" />
        <rect x="315" y="183" width="1" height="1" fill="#6B8F5E" opacity="0.55" />
        <rect x="314" y="184" width="1" height="1" fill="#4A7C59" opacity="0.45" />
        <rect x="322" y="178" width="1" height="1" fill="#5C8A4A" opacity="0.55" />
        <rect x="323" y="179" width="1" height="1" fill="#3D6B4F" opacity="0.45" />
        <rect x="314" y="175" width="1" height="1" fill="#6B8F5E" opacity="0.5" />
        <rect x="321" y="171" width="1" height="1" fill="#4A7C59" opacity="0.5" />
        <rect x="322" y="172" width="1" height="1" fill="#5C8A4A" opacity="0.4" />
        <rect x="315" y="167" width="1" height="1" fill="#3D6B4F" opacity="0.5" />
        <rect x="321" y="163" width="1" height="1" fill="#6B8F5E" opacity="0.5" />
        <rect x="315" y="159" width="1" height="1" fill="#5C8A4A" opacity="0.45" />
        <rect x="321" y="155" width="1" height="1" fill="#4A7C59" opacity="0.45" />
        <rect x="316" y="151" width="1" height="1" fill="#5C8A4A" opacity="0.45" />
        <rect x="324" y="185" width="1" height="1" fill="#C87090" opacity="0.6" />
        <rect x="325" y="186" width="1" height="1" fill="#D8809A" opacity="0.5" />
        <rect x="323" y="186" width="1" height="1" fill="#C87090" opacity="0.5" />
        <rect x="324" y="186" width="1" height="1" fill="#DAA520" opacity="0.4" />
        <rect x="314" y="174" width="1" height="1" fill="#9370DB" opacity="0.55" />
        <rect x="313" y="175" width="1" height="1" fill="#8A65C8" opacity="0.45" />
        <rect x="315" y="175" width="1" height="1" fill="#9370DB" opacity="0.45" />
        <rect x="314" y="175" width="1" height="1" fill="#DAA520" opacity="0.35" />
        <rect x="322" y="163" width="1" height="1" fill="#E8C547" opacity="0.55" />
        <rect x="321" y="164" width="1" height="1" fill="#DAA520" opacity="0.45" />
        <rect x="323" y="164" width="1" height="1" fill="#FFD700" opacity="0.45" />
        <rect x="315" y="165" width="1" height="2" fill="#7FFFD4" opacity="0.4" />
        <rect x="314" y="166" width="1" height="2" fill="#3CB371" opacity="0.35" />
        <rect x="316" y="166" width="1" height="1" fill="#7FFFD4" opacity="0.3" />
        <rect x="313" y="189" width="1" height="2" fill="#9370DB" opacity="0.35" />
        <rect x="312" y="190" width="1" height="1" fill="#8A65C8" opacity="0.3" />
        <rect x="319" y="153" width="1" height="1" fill="#DAA520" opacity="0.45" />
        <rect x="319" y="154" width="1" height="1" fill="#E8C547" opacity="0.35" />
        <rect x="319" y="141" width="4" height="1" fill="#4a2018" opacity="0.65" />
        <rect x="318" y="149" width="4" height="1" fill="#3d1a12" opacity="0.55" />
        <rect x="316" y="169" width="4" height="1" fill="#4a2018" opacity="0.45" />
        <rect x="314" y="185" width="4" height="1" fill="#3d1a12" opacity="0.4" />
        <rect x="318" y="125" width="1" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="319" y="123" width="1" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="320" y="122" width="1" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="321" y="121" width="2" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="323" y="120" width="3" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="326" y="120" width="2" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="328" y="121" width="1" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="329" y="122" width="1" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="330" y="123" width="1" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="331" y="125" width="1" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="332" y="126" width="1" height="2" fill="#3d2e20" opacity="0.9" />
        <rect x="332" y="128" width="1" height="2" fill="#3d2e20" opacity="0.9" />
        <rect x="332" y="130" width="1" height="2" fill="#3d2e20" opacity="0.9" />
        <rect x="331" y="132" width="1" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="330" y="133" width="1" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="329" y="134" width="1" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="328" y="135" width="1" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="326" y="136" width="2" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="323" y="137" width="3" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="321" y="136" width="2" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="320" y="135" width="1" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="319" y="134" width="1" height="1" fill="#3d2e20" opacity="0.9" />
        <rect x="318" y="132" width="1" height="2" fill="#3d2e20" opacity="0.9" />
        <rect x="317" y="128" width="1" height="4" fill="#3d2e20" opacity="0.9" />
        <rect x="318" y="126" width="1" height="2" fill="#3d2e20" opacity="0.9" />
        <rect x="319" y="122" width="2" height="1" fill="#3D6B4F" opacity="0.75" />
        <rect x="322" y="120" width="2" height="1" fill="#4A7C59" opacity="0.7" />
        <rect x="325" y="120" width="2" height="1" fill="#2E5939" opacity="0.75" />
        <rect x="329" y="122" width="1" height="2" fill="#3D6B4F" opacity="0.65" />
        <rect x="332" y="127" width="1" height="2" fill="#4A7C59" opacity="0.6" />
        <rect x="317" y="129" width="1" height="2" fill="#2E5939" opacity="0.6" />
        <rect x="322" y="136" width="2" height="1" fill="#3D6B4F" opacity="0.6" />
        <rect x="327" y="135" width="2" height="1" fill="#4A7C59" opacity="0.55" />
        <rect x="324" y="119" width="1" height="1" fill="#5C8A4A" opacity="0.6" />
        <rect x="325" y="118" width="1" height="1" fill="#6B8F5E" opacity="0.5" />
        <rect x="330" y="122" width="1" height="1" fill="#5C8A4A" opacity="0.55" />
        <rect x="333" y="128" width="1" height="1" fill="#6B8F5E" opacity="0.45" />
        <rect x="316" y="130" width="1" height="1" fill="#5C8A4A" opacity="0.45" />
        <rect x="326" y="119" width="1" height="1" fill="#C87090" opacity="0.6" />
        <rect x="325" y="119" width="1" height="1" fill="#D8809A" opacity="0.5" />
        <rect x="327" y="119" width="1" height="1" fill="#C87090" opacity="0.5" />
        <rect x="333" y="129" width="1" height="1" fill="#9370DB" opacity="0.5" />
        <rect x="333" y="130" width="1" height="1" fill="#8A65C8" opacity="0.4" />
        <rect x="321" y="124" width="9" height="9" fill="#7FFFD4" opacity="0.05" />
        <rect x="322" y="125" width="7" height="7" fill="#7FFFD4" opacity="0.06" />
        <rect x="323" y="126" width="5" height="1" fill="#7FFFD4" opacity="0.55" />
        <rect x="322" y="127" width="7" height="1" fill="#7FFFD4" opacity="0.6" />
        <rect x="322" y="128" width="7" height="1" fill="#3CB371" opacity="0.55" />
        <rect x="322" y="129" width="7" height="1" fill="#7FFFD4" opacity="0.6" />
        <rect x="322" y="130" width="7" height="1" fill="#3CB371" opacity="0.5" />
        <rect x="323" y="131" width="5" height="1" fill="#7FFFD4" opacity="0.55" />
        <rect x="324" y="127" width="2" height="2" fill="#AAFFDD" opacity="0.3" />
        <rect x="323" y="127" width="1" height="1" fill="#FFFFFF" opacity="0.5" />
        <rect x="324" y="126" width="1" height="1" fill="#FFFFFF" opacity="0.35" />
        <rect x="321" y="126" width="1" height="1" fill="#4a2018" opacity="0.75" />
        <rect x="329" y="126" width="1" height="1" fill="#4a2018" opacity="0.75" />
        <rect x="321" y="131" width="1" height="1" fill="#4a2018" opacity="0.75" />
        <rect x="329" y="131" width="1" height="1" fill="#4a2018" opacity="0.75" />
        <rect x="321" y="128" width="1" height="2" fill="#3d1a12" opacity="0.65" />
        <rect x="329" y="128" width="1" height="2" fill="#3d1a12" opacity="0.65" />
        <rect x="329" y="134" width="1" height="2" fill="#8B7355" opacity="0.5" />
        <rect x="329" y="136" width="1" height="1" fill="#7FFFD4" opacity="0.55" />
        <rect x="329" y="137" width="1" height="1" fill="#3CB371" opacity="0.45" />
        <rect x="329" y="138" width="1" height="1" fill="#7FFFD4" opacity="0.35" />
        <rect x="325" y="137" width="1" height="2" fill="#DAA520" opacity="0.45" />
        <rect x="324" y="139" width="2" height="1" fill="#FFD700" opacity="0.5" />
        <rect x="324" y="140" width="2" height="1" fill="#DAA520" opacity="0.45" />
        <rect x="321" y="136" width="1" height="4" fill="#9E8B60" opacity="0.45" />
        <rect x="320" y="137" width="1" height="3" fill="#A89468" opacity="0.35" />
        <rect x="322" y="138" width="1" height="2" fill="#8B7A50" opacity="0.35" />
        <rect x="327" y="136" width="1" height="2" fill="#8B7355" opacity="0.4" />
        <rect x="326" y="138" width="2" height="2" fill="#e8e0d8" opacity="0.5" />
        <rect x="319" y="138" width="3" height="2" fill="#4a2018" opacity="0.75" />
        <rect x="318" y="139" width="2" height="2" fill="#3d1a12" opacity="0.65" />
        <rect x="321" y="139" width="2" height="2" fill="#4a2018" opacity="0.6" />
        <rect x="319" y="141" width="1" height="1" fill="#7FFFD4" opacity="0.35" />
        <rect x="320" y="142" width="1" height="1" fill="#3CB371" opacity="0.3" />
        <rect x="320" y="140" width="1" height="1" fill="#DAA520" opacity="0.4" />
        <rect x="318" y="140" width="1" height="1" fill="#E8C547" opacity="0.3" />
        <rect x="322" y="140" width="1" height="1" fill="#FFD700" opacity="0.3" />
      </svg>

      {/* LEVITATING CLOAK */}
      <div style={{
        position: "fixed",
        top: "8%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2,
        pointerEvents: "none",
        animation: "cloakFloat 4s ease-in-out infinite",
        transformOrigin: "top center",
      }}>

        <svg width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id="pixelate2">
              <feFlood x="2" y="2" height="1" width="1"/>
              <feComposite width="3" height="3"/>
              <feTile result="a"/>
              <feComposite in="SourceGraphic" in2="a" operator="in"/>
              <feMorphology operator="dilate" radius="1"/>
            </filter>
          </defs>
        </svg>
        
        <style>{`
          @keyframes cloakFloat {
            0% { transform: translateX(-50%) translateY(0px); }
            50% { transform: translateX(-50%) translateY(-12px); }
            100% { transform: translateX(-50%) translateY(0px); }
          }
          @keyframes cloakShadowPulse {
            0% { opacity: 0.25; transform: translateX(-50%) scaleX(1); }
            50% { opacity: 0.12; transform: translateX(-50%) scaleX(0.85); }
            100% { opacity: 0.25; transform: translateX(-50%) scaleX(1); }
          }
        `}</style>

        <div style={{
          position: "absolute",
          bottom: "-30px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "300px",
          height: "20px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)",
          animation: "cloakShadowPulse 4s ease-in-out infinite",
        }} />

        <svg width="520" height="620" viewBox="0 0 520 620"
          style={{
            imageRendering: "pixelated",
            overflow: "visible",
          }}>
          <line x1="90" y1="0" x2="90" y2="25" stroke="#6B5540" strokeWidth="2" opacity="0.7" />
          <rect x="87" y="0" width="6" height="4" fill="#5c4a3a" opacity="0.8" />
          <line x1="430" y1="0" x2="430" y2="15" stroke="#6B5540" strokeWidth="2" opacity="0.7" />
          <rect x="427" y="0" width="6" height="4" fill="#5c4a3a" opacity="0.8" />
          <path d={`M90 25 Q85 30 80 50 Q70 100 60 180 Q45 280 35 380 Q25 460 15 540 Q10 580 5 610 L515 610 Q510 580 505 540 Q500 480 490 400 Q480 300 470 200 Q460 120 450 60 Q445 30 430 15 Q380 20 330 22 Q260 25 200 24 Q150 23 90 25`} fill="#c4a67a" />
          <path d="M90 25 Q85 30 80 50 Q70 100 65 150 Q80 140 95 130 Q100 80 95 40 Z" fill="#8B6F4E" opacity="0.6" />
          <path d="M90 25 Q92 35 88 55 Q82 80 78 100" stroke="#5c4a3a" fill="none" strokeWidth="8" opacity="0.3" />
          <path d="M5 610 Q10 580 15 540 Q25 500 30 460 Q45 470 55 490 Q40 530 25 570 Q15 595 10 610 Z" fill="#8B6F4E" opacity="0.55" />
          <path d="M20 560 Q35 530 40 500 Q50 510 45 540 Q35 570 25 590" fill="#5c4a3a" opacity="0.3" />
          <path d="M515 610 Q510 580 505 540 Q500 500 495 470 Q480 480 470 500 Q485 540 495 580 Q505 600 510 610 Z" fill="#8B6F4E" opacity="0.55" />
          <path d="M500 570 Q490 540 485 510 Q475 520 480 550 Q490 580 498 600" fill="#5c4a3a" opacity="0.3" />
          <path d="M430 15 Q445 30 450 60 Q455 100 458 140 Q445 130 435 110 Q432 60 430 30 Z" fill="#8B6F4E" opacity="0.5" />
          <path d="M470 200 Q475 250 480 300 Q485 350 488 380 Q478 370 472 340 Q468 280 465 230 Z" fill="#9E7E58" opacity="0.35" />
          <path d="M60 180 Q55 230 50 280 Q47 320 45 350 Q55 340 60 310 Q63 260 65 220 Z" fill="#9E7E58" opacity="0.35" />
          <ellipse cx="200" cy="560" rx="35" ry="20" fill="#9E7E58" opacity="0.2" />
          <ellipse cx="350" cy="540" rx="25" ry="15" fill="#8B6F4E" opacity="0.15" />
          <ellipse cx="150" cy="500" rx="20" ry="12" fill="#9E7E58" opacity="0.12" />
          <ellipse cx="150" cy="80" rx="15" ry="10" fill="#8B6F4E" opacity="0.2" />
          <ellipse cx="320" cy="60" rx="12" ry="8" fill="#9E7E58" opacity="0.15" />
          <circle cx="180" cy="120" r="5" fill="#5c4a3a" opacity="0.15" />
          <circle cx="260" cy="310" r="4" fill="#6B5540" opacity="0.2" />
          <path d="M90 25 Q130 80 160 180 Q190 300 210 430 Q225 520 235 610" stroke="#a08560" fill="none" strokeWidth="2" opacity="0.35" />
          <path d="M92 25 Q132 82 162 182 Q192 302 212 432 Q227 522 237 610" stroke="#d4bc96" fill="none" strokeWidth="1" opacity="0.2" />
          <path d="M430 15 Q400 70 380 160 Q355 280 340 400 Q325 500 315 610" stroke="#a08560" fill="none" strokeWidth="2" opacity="0.35" />
          <path d="M428 15 Q398 68 378 158 Q353 278 338 398 Q323 498 313 610" stroke="#d4bc96" fill="none" strokeWidth="1" opacity="0.2" />
          <path d="M260 24 Q258 100 256 200 Q254 350 252 500 Q251 560 250 610" stroke="#a08560" fill="none" strokeWidth="1.5" opacity="0.25" />
          <path d="M90 25 Q110 60 115 120 Q118 180 120 250" stroke="#b39568" fill="none" strokeWidth="1" opacity="0.2" />
          <path d="M430 15 Q415 45 412 100 Q410 160 408 220" stroke="#b39568" fill="none" strokeWidth="1" opacity="0.2" />
          <path d="M100 40 Q200 35 300 38 Q400 33 440 30" stroke="#b39568" fill="none" strokeWidth="0.8" opacity="0.2" />
          <path d="M95 55 Q180 50 280 53 Q380 48 445 45" stroke="#b39568" fill="none" strokeWidth="0.8" opacity="0.18" />
          <path d="M90 70 Q170 68 270 70 Q370 66 450 63" stroke="#b39568" fill="none" strokeWidth="0.7" opacity="0.15" />
          <path d="M70 200 Q150 195 260 200 Q370 195 465 190" stroke="#b39568" fill="none" strokeWidth="0.7" opacity="0.12" />
          <path d="M55 320 Q160 315 260 320 Q370 315 475 310" stroke="#b39568" fill="none" strokeWidth="0.7" opacity="0.1" />
          <path d="M40 420 Q150 415 260 420 Q370 415 485 410" stroke="#b39568" fill="none" strokeWidth="0.7" opacity="0.1" />
          <path d="M25 520 Q140 515 260 520 Q380 515 495 510" stroke="#b39568" fill="none" strokeWidth="0.6" opacity="0.08" />
          <path d="M90 25 Q75 100 70 200 Q65 300 55 400" stroke="#a08560" fill="none" strokeWidth="1.2" opacity="0.2" />
          <path d="M90 25 Q105 90 140 200 Q170 320 185 450" stroke="#b39568" fill="none" strokeWidth="0.8" opacity="0.15" />
          <path d="M430 15 Q445 80 450 170 Q458 280 465 380" stroke="#a08560" fill="none" strokeWidth="1.2" opacity="0.2" />
          <path d="M430 15 Q410 80 385 180 Q360 300 345 430" stroke="#b39568" fill="none" strokeWidth="0.8" opacity="0.15" />
          <path d={`M90 25 Q85 30 80 50 Q70 100 60 180 Q45 280 35 380 Q25 460 15 540 Q10 580 5 610 L515 610 Q510 580 505 540 Q500 480 490 400 Q480 300 470 200 Q460 120 450 60 Q445 30 430 15 Q380 20 330 22 Q260 25 200 24 Q150 23 90 25`} fill="none" stroke="#6B5540" strokeWidth="3" opacity="0.4" />
          <path d="M90 25 Q110 28 140 26 Q170 24 200 25 Q230 23 260 24 Q290 22 320 23 Q350 21 380 20 Q410 18 430 15" stroke="#6B5540" fill="none" strokeWidth="2.5" opacity="0.5" />
          <ellipse cx="260" cy="280" rx="70" ry="180" fill="#d8c4a0" opacity="0.12" />

          {/* Scribbles */}
          <ellipse cx="120" cy="320" rx="35" ry="40" fill="#5c4a3a" fillOpacity="0.06" stroke="#5c4a3a" strokeWidth="1.5" opacity="0.45" />
          <rect x="112" y="275" width="16" height="8" fill="#5c4a3a" fillOpacity="0.04" stroke="#5c4a3a" strokeWidth="1.2" opacity="0.45" rx="1" />
          <rect x="114" y="268" width="12" height="8" fill="#5c4a3a" fillOpacity="0.08" stroke="#5c4a3a" strokeWidth="1.5" opacity="0.45" rx="1" />
          <path d="M108 330 Q115 325 120 328 Q125 325 132 330 Q132 345 128 355 Q122 362 112 355 Q108 345 108 330 Z" fill="#5c4a3a" opacity="0.12" stroke="#5c4a3a" strokeWidth="0.6" />
          <path d="M380 250 Q370 230 385 220 Q400 212 415 220 Q430 230 420 250 Z" fill="#5c4a3a" fillOpacity="0.1" stroke="#5c4a3a" strokeWidth="1.5" opacity="0.45" />
          <circle cx="395" cy="228" r="3" fill="#5c4a3a" opacity="0.12" stroke="#5c4a3a" strokeWidth="0.6" />
          <circle cx="405" cy="232" r="2" fill="#5c4a3a" opacity="0.1" stroke="#5c4a3a" strokeWidth="0.5" />
          <path d="M393 250 Q392 265 390 280 Q389 290 391 295 L409 295 Q411 290 410 280 Q408 265 407 250 Z" fill="#5c4a3a" fillOpacity="0.06" stroke="#5c4a3a" strokeWidth="1.2" opacity="0.4" />
          <ellipse cx="400" cy="298" rx="12" ry="6" fill="#5c4a3a" fillOpacity="0.06" stroke="#5c4a3a" strokeWidth="1.2" opacity="0.4" />
          <path d="M430 275 Q425 265 432 260 Q440 258 445 265 Q448 275 440 278 Z" fill="#5c4a3a" fillOpacity="0.08" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <line x1="436" y1="278" x2="437" y2="292" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <path d="M260 440 Q258 460 255 480 Q253 500 255 520 Q257 540 260 555" stroke="#5c4a3a" fill="none" strokeWidth="1.5" opacity="0.4" />
          <path d="M260 555 Q250 562 242 570" stroke="#5c4a3a" fill="none" strokeWidth="1" opacity="0.3" />
          <path d="M260 555 Q265 565 270 572" stroke="#5c4a3a" fill="none" strokeWidth="1" opacity="0.3" />
          <path d="M255 460 Q235 450 225 455 Q220 460 230 465 Q245 468 255 462 Z" fill="#5c4a3a" fillOpacity="0.08" stroke="#5c4a3a" strokeWidth="1" opacity="0.38" />
          <path d="M253 485 Q238 478 228 482 Q222 488 232 492 Q245 494 254 487 Z" fill="#5c4a3a" fillOpacity="0.07" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <path d="M258 470 Q275 462 285 467 Q290 472 280 476 Q268 478 258 472 Z" fill="#5c4a3a" fillOpacity="0.08" stroke="#5c4a3a" strokeWidth="1" opacity="0.38" />
          <path d="M256 495 Q272 490 280 494 Q285 500 275 503 Q265 504 257 498 Z" fill="#5c4a3a" fillOpacity="0.07" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <ellipse cx="258" cy="438" rx="6" ry="8" fill="#5c4a3a" fillOpacity="0.08" stroke="#5c4a3a" strokeWidth="1" opacity="0.38" />
          <circle cx="400" cy="130" r="30" fill="#5c4a3a" fillOpacity="0.03" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <circle cx="400" cy="130" r="25" fill="none" stroke="#5c4a3a" strokeWidth="0.7" opacity="0.3" />
          <polygon points="400,105 378,148 422,148" fill="none" stroke="#5c4a3a" strokeWidth="0.8" opacity="0.32" />
          <line x1="400" y1="100" x2="400" y2="160" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.25" />
          <line x1="370" y1="130" x2="430" y2="130" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.25" />
          <circle cx="400" cy="100" r="2" fill="#5c4a3a" opacity="0.3" />
          <circle cx="400" cy="160" r="2" fill="#5c4a3a" opacity="0.3" />
          <circle cx="370" cy="130" r="2" fill="#5c4a3a" opacity="0.3" />
          <circle cx="430" cy="130" r="2" fill="#5c4a3a" opacity="0.3" />
          <circle cx="230" cy="80" r="6" fill="none" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <circle cx="248" cy="80" r="6" fill="none" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <path d="M248 74 Q252 80 248 86" fill="#c4a67a" stroke="none" />
          <circle cx="266" cy="80" r="6" fill="none" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <path d="M266 74 Q270 80 266 86" fill="#c4a67a" stroke="none" />
          <circle cx="284" cy="80" r="6" fill="none" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <path d="M284 74 Q290 80 284 86" fill="#c4a67a" stroke="none" />
          <circle cx="302" cy="80" r="6" fill="#5c4a3a" opacity="0.25" stroke="#5c4a3a" strokeWidth="1" />
          <circle cx="100" cy="480" r="18" fill="#5c4a3a" fillOpacity="0.03" stroke="#5c4a3a" strokeWidth="0.8" opacity="0.32" />
          <polygon points="100,464 104,474 115,474 106,481 110,492 100,485 90,492 94,481 85,474 96,474" fill="#5c4a3a" fillOpacity="0.06" stroke="#5c4a3a" strokeWidth="0.6" opacity="0.3" />
          <polygon points="420,400 445,430 420,460 395,430" fill="#5c4a3a" fillOpacity="0.05" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <polygon points="420,410 435,430 420,450 405,430" fill="#5c4a3a" fillOpacity="0.04" stroke="#5c4a3a" strokeWidth="0.6" opacity="0.28" />
          <ellipse cx="420" cy="430" rx="8" ry="5" fill="#5c4a3a" fillOpacity="0.06" stroke="#5c4a3a" strokeWidth="0.8" opacity="0.32" />
          <circle cx="420" cy="430" r="2.5" fill="#5c4a3a" opacity="0.25" />
          <path d="M170 180 Q175 178 177 182 Q178 187 173 188 Q168 188 167 183 Q167 177 173 175 Q180 174 182 182 Q183 190 175 192" stroke="#5c4a3a" fill="none" strokeWidth="0.7" opacity="0.28" />
          <path d="M330 180 Q340 170 345 180 Q340 190 330 180 Q320 170 315 180 Q320 190 330 180" fill="none" stroke="#5c4a3a" strokeWidth="0.7" opacity="0.28" />
          <path d="M80 220 Q72 230 80 240 Q90 230 80 220 Z" fill="#5c4a3a" fillOpacity="0.06" stroke="#5c4a3a" strokeWidth="0.8" opacity="0.28" />
          <ellipse cx="260" cy="280" rx="70" ry="180" fill="#d8c4a0" opacity="0.12" />
        </svg>
      </div>

      {/* ACTUAL CONTENT */}
      <div style={{ position: "relative", zIndex: 4 }} className="min-h-screen px-6 py-10 max-w-xl mx-auto">

        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm mb-8 flex items-center gap-1 transition-colors"
          style={{ color: "#d4c4a8" }}
        >
          ← Back to garden
        </button>

        <h1 className="text-4xl mb-2" style={{ color: "#f0e0c8" }}>
          Today's Reflection
        </h1>

        <p className="mb-8" style={{ color: "#d4c4a8" }}>
          Take a moment. Breathe. Choose your intention.
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        <WoodFrame className="mb-4">
          <div className="p-2">
            <h2 className="text-lg mb-4" style={{ color: "#f0e0c8" }}>
              Step 1 — Choose a category
            </h2>
            <CategoryDropdown
              categories={categories}
              value={category}
              onChange={(val) => {
                setCategory(val)
                setAffirmation("")
              }}
            />
            {category === "Custom" && (
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Name your category..."
                className="w-full mt-3 rounded-2xl px-4 py-3 focus:outline-none"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#e8dcc8" }}
              />
            )}
          </div>
        </WoodFrame>

        {category && (
          <WoodFrame className="mb-6">
            <div className="p-2">
              <h2 className="text-lg mb-4" style={{ color: "#f0e0c8" }}>
                Step 2 — Choose an affirmation
              </h2>
              <div className="space-y-3">
                {category !== "Custom" && currentAffirmations.map((aff) => (
                  <label
                    key={aff}
                    onMouseEnter={playHoverSound}
                    className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-colors"
                    style={{
                      background: affirmation === aff ? "rgba(124,154,110,0.15)" : "rgba(255,255,255,0.04)",
                      border: affirmation === aff ? "1px solid rgba(124,154,110,0.4)" : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <input
                      type="radio"
                      name="affirmation"
                      value={aff}
                      checked={affirmation === aff}
                      onChange={(e) => setAffirmation(e.target.value)}
                      className="accent-[#7c9a6e]"
                    />
                    <span style={{ color: "#e8dcc8" }}>{aff}</span>
                  </label>
                ))}
                <label
                  onMouseEnter={playHoverSound}
                  className="flex items-center gap-3 p-4 rounded-2xl cursor-pointer transition-colors"
                  style={{
                    background: affirmation === "custom" ? "rgba(124,154,110,0.15)" : "rgba(255,255,255,0.04)",
                    border: affirmation === "custom" ? "1px solid rgba(124,154,110,0.4)" : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <input
                    type="radio"
                    name="affirmation"
                    value="custom"
                    checked={affirmation === "custom"}
                    onChange={(e) => setAffirmation(e.target.value)}
                    className="accent-[#7c9a6e]"
                  />
                  <span style={{ color: "#d4c4a8" }} className="italic">Write your own...</span>
                </label>
              </div>
              {affirmation === "custom" && (
                <input
                  type="text"
                  value={customAffirmation}
                  onChange={(e) => setCustomAffirmation(e.target.value)}
                  placeholder="Write your affirmation..."
                  className="w-full mt-3 rounded-2xl px-4 py-3 focus:outline-none"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#e8dcc8" }}
                />
              )}
            </div>
          </WoodFrame>
        )}

        <WoodFrame>
          <button
            onClick={handleSubmit}
            className="w-full py-3 text-lg transition-all hover:scale-[1.02]"
            style={{ background: "transparent", border: "none", color: "#f0e0c8", pointerEvents: "auto" }}
          >
            Complete Reflection 🌿
          </button>
        </WoodFrame>

      </div>
    </>
  )
}

export default Reflection