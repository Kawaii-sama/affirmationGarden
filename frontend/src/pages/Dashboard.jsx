import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Garden from "../components/Garden"
import EnchantedBackground from "../components/EnchantedBackground"
import WoodFrame from "../components/WoodFrame"

function Dashboard() {
  const [user, setUser] = useState(null)
  const navigate        = useNavigate()

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (!savedUser) {
      navigate("/")
      return
    }
    setUser(JSON.parse(savedUser))
  }, [])

  if (!user) return null

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
        }}
        viewBox="0 0 360 225"
        preserveAspectRatio="xMidYMid slice"
        shapeRendering="crispEdges"
      >
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

        <path d="M340 120 Q300 117 260 121 Q220 119 180 123 Q140 121 100 125 Q80 127 65 130" stroke="#2a1f10" fill="none" strokeWidth="7" strokeLinecap="round" />
        <path d="M340 120 Q300 117 260 121 Q220 119 180 123 Q140 121 100 125 Q80 127 65 130" stroke="#3d2e18" fill="none" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
        <path d="M340 120 Q300 117 260 121 Q220 119 180 123 Q140 121 100 125 Q80 127 65 130" stroke="#1a1508" fill="none" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
        <rect x="120" y="120" width="8" height="3" fill="#3D6B4F" opacity="0.5" />
        <rect x="200" y="117" width="6" height="3" fill="#4A7C59" opacity="0.45" />
        <rect x="280" y="116" width="7" height="3" fill="#2E5939" opacity="0.5" />
        <line x1="250" y1="121" x2="245" y2="113" stroke="#2a1f10" strokeWidth="2" opacity="0.7" />
        <line x1="170" y1="122" x2="168" y2="115" stroke="#2a1f10" strokeWidth="2" opacity="0.6" />
        <line x1="110" y1="124" x2="106" y2="117" stroke="#2a1f10" strokeWidth="1.5" opacity="0.6" />

        {/* ===== CANDLE ON SAUCER (left tip of branch) ===== */}
        {/* Saucer */}
        <rect x="64" y="127" width="12" height="1" fill="#e8e0d8" opacity="0.9" />
        <rect x="65" y="128" width="10" height="1" fill="#d4ccc4" opacity="0.8" />
        <rect x="66" y="126" width="8" height="1" fill="#f0ebe4" opacity="0.7" />

        {/* Wax pool on saucer */}
        <rect x="68" y="127" width="4" height="1" fill="#e8dcc8" opacity="0.4" />

        {/* Candle body */}
        <rect x="69" y="120" width="3" height="7" fill="#e8dcc8" opacity="0.9" />
        <rect x="69" y="120" width="1" height="7" fill="#d4c8b0" opacity="0.4" />
        <rect x="71" y="120" width="1" height="7" fill="#f0e6d4" opacity="0.3" />

        {/* Dripping wax */}
        <rect x="68" y="122" width="1" height="2" fill="#e8dcc8" opacity="0.7" />
        <rect x="72" y="121" width="1" height="2" fill="#e8dcc8" opacity="0.65" />
        <rect x="68" y="124" width="1" height="1" fill="#d4c8b0" opacity="0.5" />

        {/* Wick */}
        <rect x="70" y="118" width="1" height="2" fill="#2a1e14" opacity="0.8" />

        {/* Flame - outer glow */}
        <rect x="67" y="112" width="7" height="8" fill="#FFD700" opacity="0.04" />
        <rect x="68" y="113" width="5" height="6" fill="#FFD700" opacity="0.06" />

        {/* Flame - outer */}
        <rect x="69" y="114" width="3" height="4" fill="#E8A030" opacity="0.8" />
        <rect x="69" y="113" width="3" height="1" fill="#E8A030" opacity="0.7" />
        <rect x="70" y="112" width="1" height="1" fill="#E8A030" opacity="0.6" />

        {/* Flame - middle */}
        <rect x="69" y="115" width="3" height="2" fill="#FFD700" opacity="0.85" />
        <rect x="70" y="113" width="1" height="2" fill="#FFD700" opacity="0.8" />

        {/* Flame - core */}
        <rect x="70" y="115" width="1" height="2" fill="#FFFACD" opacity="0.9" />
        <rect x="70" y="114" width="1" height="1" fill="#FFFFFF" opacity="0.6" />

        {/* Light cast on branch */}
        <rect x="65" y="125" width="10" height="2" fill="#FFD700" opacity="0.04" />

        {/* ===== HANGING HERB BUNDLES (upside down cones) ===== */}

        {/* Bundle 1 - Yellow yarrow */}
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

        {/* Bundle 2 - Red dried flowers */}
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

        {/* Bundle 3 - Lavender */}
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

        {/* Bundle 4 - Pink blooms (bigger) */}
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

        {/* Bundle 5 - Wheat/grass */}
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

        {/* Bundle 6 - Dark sage */}
        <rect x="200" y="122" width="3" height="2" fill="#8B7355" opacity="0.8" />
        <rect x="201" y="124" width="1" height="15" fill="#1a3a15" opacity="0.7" />
        <rect x="200" y="125" width="1" height="14" fill="#2E5939" opacity="0.7" />
        <rect x="202" y="125" width="1" height="14" fill="#1a3a15" opacity="0.7" />
        <rect x="199" y="127" width="1" height="11" fill="#3D6B4F" opacity="0.6" />
        <rect x="203" y="127" width="1" height="11" fill="#2E5939" opacity="0.6" />
        <rect x="198" y="129" width="1" height="8" fill="#1a3a15" opacity="0.5" />
        <rect x="204" y="129" width="1" height="8" fill="#3D6B4F" opacity="0.5" />

        {/* Bundle 7 - Beige dried */}
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

        {/* Bundle 8 - Magenta */}
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

        {/* Bundle 9 - Tall reed */}
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

        {/* Bundle 10 - Mixed green herbs */}
        <rect x="291" y="119" width="3" height="2" fill="#8B7355" opacity="0.8" />
        <rect x="292" y="121" width="1" height="15" fill="#2E5939" opacity="0.7" />
        <rect x="291" y="122" width="1" height="14" fill="#4A7C59" opacity="0.7" />
        <rect x="293" y="122" width="1" height="14" fill="#3D6B4F" opacity="0.7" />
        <rect x="290" y="124" width="1" height="11" fill="#5C8A4A" opacity="0.6" />
        <rect x="294" y="124" width="1" height="11" fill="#4A7C59" opacity="0.6" />
        <rect x="289" y="126" width="1" height="8" fill="#3D6B4F" opacity="0.5" />
        <rect x="295" y="126" width="1" height="8" fill="#6B8F5E" opacity="0.5" />

        {/* Crystal charms between bundles */}
        <line x1="120" y1="125" x2="120" y2="133" stroke="#DAA520" strokeWidth="0.3" opacity="0.5" />
        <polygon points="120,133 118,137 120,140 122,137" fill="#7FFFD4" opacity="0.5" />

        <line x1="165" y1="122" x2="165" y2="130" stroke="#DAA520" strokeWidth="0.3" opacity="0.5" />
        <polygon points="165,130 163,134 165,137 167,134" fill="#FFD700" opacity="0.5" />

        <line x1="235" y1="120" x2="235" y2="128" stroke="#DAA520" strokeWidth="0.3" opacity="0.5" />
        <polygon points="235,128 233,132 235,135 237,132" fill="#7FFFD4" opacity="0.45" />

        <line x1="280" y1="119" x2="280" y2="126" stroke="#DAA520" strokeWidth="0.3" opacity="0.5" />
        <polygon points="280,126 278,130 280,133 282,130" fill="#E8C547" opacity="0.45" />

        {/* ===== SHELF ===== */}
        <rect x="65" y="195" width="270" height="3" fill="#2a1e14" />
        <rect x="65" y="195" width="270" height="1" fill="#4a3828" opacity="0.8" />
        <rect x="65" y="197" width="270" height="1" fill="#1a1208" opacity="0.9" />
        {/* Brackets */}
        <line x1="100" y1="198" x2="100" y2="204" stroke="#2a1e14" strokeWidth="1.5" opacity="0.8" />
        <line x1="100" y1="204" x2="94" y2="204" stroke="#2a1e14" strokeWidth="1.5" opacity="0.8" />
        <line x1="300" y1="198" x2="300" y2="204" stroke="#2a1e14" strokeWidth="1.5" opacity="0.8" />
        <line x1="300" y1="204" x2="306" y2="204" stroke="#2a1e14" strokeWidth="1.5" opacity="0.8" />

        {/* ===== BOWLS (left side) ===== */}
        {/* Bowl 1 - large wooden */}
        <path d="M78 195 Q76 190 78 188 Q82 186 88 186 Q94 186 96 188 Q98 190 96 195 Z"
          fill="#3d2e20" stroke="#2a1e14" strokeWidth="0.8" opacity="0.9" />
        <ellipse cx="87" cy="188" rx="7" ry="2.5" fill="#2a1e14" opacity="0.5" />
        <ellipse cx="87" cy="187.5" rx="6" ry="1.8" fill="#1a1208" opacity="0.3" />
        {/* Contents */}
        <rect x="84" y="187" width="1" height="1" fill="#C87090" opacity="0.5" />
        <rect x="86" y="186.5" width="1" height="1" fill="#DAA520" opacity="0.5" />
        <rect x="88" y="187" width="1" height="1" fill="#9370DB" opacity="0.5" />
        <rect x="90" y="186.5" width="1" height="1" fill="#C87090" opacity="0.4" />

        {/* Bowl 2 - small ceramic */}
        <path d="M70 195 Q69 192 70 190 Q72 189 76 189 Q80 189 82 190 Q83 192 82 195 Z"
          fill="#4a3828" stroke="#2a1e14" strokeWidth="0.6" opacity="0.85" />
        <ellipse cx="76" cy="190" rx="5" ry="1.5" fill="#2a1e14" opacity="0.4" />

        {/* Bowl 3 - tiny */}
        <path d="M99 195 Q98 193 99 191.5 Q101 190.5 104 190.5 Q107 190.5 108 191.5 Q109 193 108 195 Z"
          fill="#3d2e20" stroke="#2a1e14" strokeWidth="0.5" opacity="0.85" />
        <ellipse cx="103.5" cy="191.5" rx="4" ry="1.2" fill="#2a1e14" opacity="0.35" />
        {/* Yellow powder inside */}
        <ellipse cx="103.5" cy="192" rx="2.5" ry="0.8" fill="#DAA520" opacity="0.3" />

        {/* ===== CAULDRON (center-left) ===== */}
        <path d="M115 195 Q112 189 113 185 Q116 182 122 181 Q128 182 131 185 Q132 189 129 195 Z"
          fill="#1a1208" stroke="#0a0f07" strokeWidth="0.8" opacity="0.95" />
        <ellipse cx="122" cy="183" rx="8" ry="3" fill="#0a0f07" opacity="0.5" />
        <ellipse cx="122" cy="182.5" rx="7" ry="2.5" fill="none" stroke="#3d2e20" strokeWidth="0.5" opacity="0.6" />
        {/* Rim */}
        <ellipse cx="122" cy="183" rx="8.5" ry="2" fill="none" stroke="#2a1e14" strokeWidth="0.8" opacity="0.7" />
        {/* Glowing contents */}
        <ellipse cx="122" cy="184" rx="5" ry="1.5" fill="#3D6B4F" opacity="0.35" />
        <ellipse cx="121" cy="183.5" rx="2" ry="0.8" fill="#5C8A4A" opacity="0.2" />
        {/* Handles */}
        <path d="M113 186 Q110 186 110 188 Q110 190 113 190" stroke="#2a1e14" fill="none" strokeWidth="0.6" opacity="0.7" />
        <path d="M131 186 Q134 186 134 188 Q134 190 131 190" stroke="#2a1e14" fill="none" strokeWidth="0.6" opacity="0.7" />
        {/* Legs */}
        <line x1="116" y1="195" x2="115" y2="197" stroke="#1a1208" strokeWidth="0.8" opacity="0.7" />
        <line x1="128" y1="195" x2="129" y2="197" stroke="#1a1208" strokeWidth="0.8" opacity="0.7" />

        {/* ===== OPEN GRIMOIRE BOOK (center) ===== */}
        {/* Stand legs */}
        <line x1="148" y1="195" x2="146" y2="189" stroke="#2a1e14" strokeWidth="0.8" opacity="0.7" />
        <line x1="166" y1="195" x2="168" y2="189" stroke="#2a1e14" strokeWidth="0.8" opacity="0.7" />
        {/* Left page */}
        <path d="M140 189 Q144 187 157 186.5 L157 178 Q144 178.5 140 181 Z"
          fill="#d4bc96" stroke="#3d2e20" strokeWidth="0.5" opacity="0.9" />
        {/* Right page */}
        <path d="M157 186.5 Q170 187 174 189 L174 181 Q170 178.5 157 178 Z"
          fill="#e0d0b8" stroke="#3d2e20" strokeWidth="0.5" opacity="0.9" />
        {/* Spine */}
        <line x1="157" y1="178" x2="157" y2="186.5" stroke="#2a1e14" strokeWidth="0.8" opacity="0.7" />
        {/* Book cover edges */}
        <path d="M140 189 Q139 189.5 140 190" stroke="#3d2e20" strokeWidth="0.5" opacity="0.6" />
        <path d="M174 189 Q175 189.5 174 190" stroke="#3d2e20" strokeWidth="0.5" opacity="0.6" />

        {/* Left page - sigil + text */}
        {/* Small sigil circle */}
        <circle cx="145" cy="181" r="2" fill="none" stroke="#3d2e20" strokeWidth="0.3" opacity="0.5" />
        <polygon points="145,179.5 143.5,182 146.5,182" fill="none" stroke="#3d2e20" strokeWidth="0.2" opacity="0.4" />
        {/* Text lines */}
        <line x1="142" y1="184" x2="155" y2="183.5" stroke="#3d2e20" strokeWidth="0.2" opacity="0.4" />
        <line x1="142" y1="185" x2="154" y2="184.7" stroke="#3d2e20" strokeWidth="0.2" opacity="0.35" />
        <line x1="142" y1="186" x2="153" y2="185.7" stroke="#3d2e20" strokeWidth="0.2" opacity="0.35" />
        <line x1="142" y1="187" x2="155" y2="186.8" stroke="#3d2e20" strokeWidth="0.2" opacity="0.3" />
        {/* Small herb sketch on left */}
        <line x1="150" y1="180" x2="150" y2="183" stroke="#2E5939" strokeWidth="0.3" opacity="0.5" />
        <ellipse cx="149" cy="180.5" rx="1" ry="0.5" fill="#3D6B4F" opacity="0.4" transform="rotate(-20,149,180.5)" />
        <ellipse cx="151" cy="180" rx="1" ry="0.5" fill="#4A7C59" opacity="0.4" transform="rotate(20,151,180)" />

        {/* Right page - botanical herb drawing */}
        {/* Main stem */}
        <line x1="165" y1="186" x2="165" y2="179.5" stroke="#2E5939" strokeWidth="0.5" opacity="0.7" />
        {/* Branches */}
        <line x1="165" y1="185" x2="162" y2="183.5" stroke="#3D6B4F" strokeWidth="0.3" opacity="0.6" />
        <line x1="165" y1="184" x2="168" y2="182.5" stroke="#3D6B4F" strokeWidth="0.3" opacity="0.6" />
        <line x1="165" y1="182.5" x2="162.5" y2="181" stroke="#3D6B4F" strokeWidth="0.3" opacity="0.55" />
        <line x1="165" y1="181.5" x2="167.5" y2="180" stroke="#3D6B4F" strokeWidth="0.3" opacity="0.55" />
        {/* Leaves */}
        <ellipse cx="161" cy="183" rx="1.5" ry="0.7" fill="#2E5939" opacity="0.5" transform="rotate(-30,161,183)" />
        <ellipse cx="169" cy="182" rx="1.5" ry="0.7" fill="#3D6B4F" opacity="0.5" transform="rotate(25,169,182)" />
        <ellipse cx="162" cy="180.5" rx="1.2" ry="0.6" fill="#4A7C59" opacity="0.45" transform="rotate(-35,162,180.5)" />
        <ellipse cx="168" cy="179.5" rx="1.2" ry="0.6" fill="#2E5939" opacity="0.45" transform="rotate(30,168,179.5)" />
        {/* Flower at top */}
        <circle cx="165" cy="179" r="1" fill="#9370DB" opacity="0.5" />
        <ellipse cx="164" cy="179.5" rx="0.8" ry="1" fill="#8A65C8" opacity="0.4" transform="rotate(-20,164,179.5)" />
        <ellipse cx="166" cy="179.5" rx="0.8" ry="1" fill="#9370DB" opacity="0.4" transform="rotate(20,166,179.5)" />
        <circle cx="165" cy="179.2" r="0.4" fill="#DAA520" opacity="0.5" />
        {/* Root lines at bottom */}
        <path d="M165 186 Q163 187 161 188" stroke="#5c4a3a" fill="none" strokeWidth="0.2" opacity="0.35" />
        <path d="M165 186 Q167 187 169 188" stroke="#5c4a3a" fill="none" strokeWidth="0.2" opacity="0.35" />

        {/* ===== MORTAR AND PESTLE ===== */}
        <path d="M182 195 Q180 191 181 188 Q183 186 188 186 Q193 186 195 188 Q196 191 194 195 Z"
          fill="#3d2e20" stroke="#1a1208" strokeWidth="0.6" opacity="0.9" />
        <ellipse cx="188" cy="188" rx="6" ry="2" fill="#1a1208" opacity="0.4" />
        <ellipse cx="188" cy="187.5" rx="6.5" ry="1.5" fill="none" stroke="#2a1e14" strokeWidth="0.6" opacity="0.7" />
        {/* Pestle */}
        <line x1="186" y1="187" x2="179" y2="180" stroke="#3d2e20" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
        <line x1="186" y1="187" x2="179" y2="180" stroke="#4a3828" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <ellipse cx="178.5" cy="179.5" rx="1.2" ry="1.5" fill="#3d2e20" opacity="0.8" transform="rotate(-40,178.5,179.5)" />
        {/* Ground herbs */}
        <ellipse cx="188" cy="188.5" rx="3.5" ry="1" fill="#3D6B4F" opacity="0.35" />

        {/* ===== KNIFE ===== */}
        {/* Blade */}
        <path d="M200 193 L212 190 L213 191 L201 194 Z" fill="#a0a0a0" stroke="#808080" strokeWidth="0.2" opacity="0.7" />
        {/* Blade shine */}
        <line x1="203" y1="192.5" x2="211" y2="190.5" stroke="#d0d0d0" strokeWidth="0.2" opacity="0.3" />
        {/* Handle */}
        <rect x="197" y="192.5" width="4" height="2" rx="0.5" fill="#3d2e20" stroke="#2a1e14" strokeWidth="0.3" opacity="0.85" />
        {/* Handle rivets */}
        <circle cx="198.5" cy="193.5" r="0.3" fill="#DAA520" opacity="0.5" />
        <circle cx="200" cy="193.5" r="0.3" fill="#DAA520" opacity="0.5" />

        {/* ===== PILE OF BOOKS (right-center) ===== */}
        {/* Bottom book */}
        <rect x="220" y="191" width="18" height="4" rx="0.3" fill="#2a1e14" stroke="#1a1208" strokeWidth="0.4" opacity="0.9" />
        <rect x="220" y="191.5" width="0.8" height="3" fill="#DAA520" opacity="0.35" />
        <line x1="222" y1="192" x2="236" y2="192" stroke="#1a1208" strokeWidth="0.2" opacity="0.3" />
        {/* Middle book */}
        <rect x="221" y="187.5" width="16" height="3.5" rx="0.3" fill="#6B3020" stroke="#4a2018" strokeWidth="0.4" opacity="0.85" />
        <rect x="221" y="188" width="0.8" height="2.5" fill="#DAA520" opacity="0.3" />
        {/* Top book (askew) */}
        <g transform="rotate(-5, 230, 186)">
          <rect x="222" y="184.5" width="14" height="3" rx="0.3" fill="#1a3a15" stroke="#0a2a0a" strokeWidth="0.4" opacity="0.85" />
          <rect x="222" y="185" width="0.6" height="2" fill="#DAA520" opacity="0.25" />
        </g>
        {/* Thin book on top */}
        <g transform="rotate(7, 230, 183)">
          <rect x="223" y="182" width="12" height="2.5" rx="0.2" fill="#3d2e20" stroke="#2a1e14" strokeWidth="0.3" opacity="0.8" />
        </g>

        {/* ===== SCROLLS ===== */}
        {/* Horizontal scroll */}
        <rect x="215" y="193.5" width="7" height="2" rx="1" fill="#c4a87c" stroke="#5c4a3a" strokeWidth="0.3" opacity="0.75" />
        <ellipse cx="215" cy="194.5" rx="0.8" ry="1" fill="#b39568" stroke="#5c4a3a" strokeWidth="0.2" opacity="0.7" />
        <ellipse cx="222" cy="194.5" rx="0.8" ry="1" fill="#b39568" stroke="#5c4a3a" strokeWidth="0.2" opacity="0.7" />
        {/* Upright scroll */}
        <rect x="239" y="185" width="2" height="10" rx="1" fill="#c4a87c" stroke="#5c4a3a" strokeWidth="0.3" opacity="0.75" />
        <ellipse cx="240" cy="185" rx="1" ry="0.6" fill="#b39568" stroke="#5c4a3a" strokeWidth="0.2" opacity="0.7" />
        {/* Diagonal scroll */}
        <g transform="rotate(-12, 242, 190)">
          <rect x="241" y="186" width="1.8" height="9" rx="0.8" fill="#d4bc96" stroke="#5c4a3a" strokeWidth="0.2" opacity="0.7" />
        </g>

        {/* ===== POTION BOTTLES (right side - like an almirah) ===== */}
        {/* Tall bottle 1 */}
        <rect x="255" y="186" width="4" height="9" rx="0.5" fill="#1a3a15" fillOpacity="0.3" stroke="#4A7C59" strokeWidth="0.4" opacity="0.8" />
        <rect x="256" y="184.5" width="2" height="2" rx="0.3" fill="#1a3a15" fillOpacity="0.2" stroke="#4A7C59" strokeWidth="0.3" opacity="0.7" />
        <rect x="256.2" y="183.5" width="1.6" height="1.5" rx="0.3" fill="#6b5a48" opacity="0.8" />
        {/* Herb inside */}
        <line x1="257" y1="192" x2="257" y2="189" stroke="#3D6B4F" strokeWidth="0.3" opacity="0.5" />
        <ellipse cx="256.5" cy="189.5" rx="0.6" ry="0.4" fill="#4A7C59" opacity="0.4" />
        <ellipse cx="257.5" cy="189" rx="0.6" ry="0.4" fill="#5C8A4A" opacity="0.4" />
        {/* Glow */}
        <ellipse cx="257" cy="191" rx="1.5" ry="3" fill="#4A7C59" opacity="0.08" />

        {/* Tall bottle 2 */}
        <rect x="261" y="185" width="4.5" height="10" rx="0.5" fill="#1a3a15" fillOpacity="0.25" stroke="#3D6B4F" strokeWidth="0.4" opacity="0.8" />
        <rect x="262" y="183" width="2.5" height="2.5" rx="0.3" fill="#1a3a15" fillOpacity="0.15" stroke="#3D6B4F" strokeWidth="0.3" opacity="0.7" />
        <rect x="262.3" y="182" width="1.9" height="1.5" rx="0.3" fill="#6b5a48" opacity="0.8" />
        {/* Flower inside */}
        <circle cx="263.2" cy="190" r="0.8" fill="#DAA520" opacity="0.4" />
        <line x1="263.2" y1="190.8" x2="263.2" y2="193" stroke="#3D6B4F" strokeWidth="0.3" opacity="0.5" />
        <ellipse cx="263.2" cy="191" rx="1.5" ry="3.5" fill="#3D6B4F" opacity="0.06" />

        {/* Short round bottle */}
        <ellipse cx="269" cy="191" rx="3" ry="4" fill="#1a3a15" fillOpacity="0.25" stroke="#4A7C59" strokeWidth="0.4" opacity="0.8" />
        <rect x="268" y="186.5" width="2" height="2" rx="0.3" fill="#1a3a15" fillOpacity="0.15" stroke="#4A7C59" strokeWidth="0.3" opacity="0.7" />
        <rect x="268.2" y="185.5" width="1.6" height="1.5" rx="0.3" fill="#6b5a48" opacity="0.8" />
        {/* Liquid */}
        <ellipse cx="269" cy="192.5" rx="2" ry="2" fill="#2E5939" opacity="0.2" />
        <ellipse cx="269" cy="191" rx="1.5" ry="3" fill="#4A7C59" opacity="0.06" />

        {/* Tall thin bottle */}
        <rect x="274" y="184" width="3" height="11" rx="0.4" fill="#1a3a15" fillOpacity="0.2" stroke="#3D6B4F" strokeWidth="0.4" opacity="0.8" />
        <rect x="274.5" y="182.5" width="2" height="2" rx="0.3" fill="#1a3a15" fillOpacity="0.15" stroke="#3D6B4F" strokeWidth="0.3" opacity="0.7" />
        <rect x="274.7" y="181.5" width="1.6" height="1.5" rx="0.3" fill="#6b5a48" opacity="0.8" />
        {/* Leaves inside */}
        <ellipse cx="275.5" cy="190" rx="0.8" ry="0.5" fill="#4A7C59" opacity="0.45" transform="rotate(-15,275.5,190)" />
        <ellipse cx="275.5" cy="188" rx="0.7" ry="0.5" fill="#5C8A4A" opacity="0.4" transform="rotate(20,275.5,188)" />
        <line x1="275.5" y1="193" x2="275.5" y2="187" stroke="#2E5939" strokeWidth="0.2" opacity="0.4" />
        <ellipse cx="275.5" cy="190" rx="1" ry="4" fill="#3D6B4F" opacity="0.06" />

        {/* Wide bottle */}
        <rect x="279" y="187" width="5" height="8" rx="1" fill="#1a3a15" fillOpacity="0.3" stroke="#4A7C59" strokeWidth="0.4" opacity="0.8" />
        <rect x="280" y="185" width="3" height="2.5" rx="0.4" fill="#1a3a15" fillOpacity="0.15" stroke="#4A7C59" strokeWidth="0.3" opacity="0.7" />
        <rect x="280.3" y="184" width="2.4" height="1.5" rx="0.3" fill="#6b5a48" opacity="0.8" />
        {/* Herbs stuffed */}
        <ellipse cx="281.5" cy="191" rx="1.5" ry="2.5" fill="#2E5939" opacity="0.2" />
        <rect x="280" y="189" width="0.5" height="2" fill="#4A7C59" opacity="0.3" />
        <rect x="281.5" y="188.5" width="0.5" height="2.5" fill="#3D6B4F" opacity="0.3" />
        <rect x="283" y="189" width="0.5" height="2" fill="#5C8A4A" opacity="0.3" />
        <ellipse cx="281.5" cy="190" rx="2" ry="3" fill="#4A7C59" opacity="0.06" />

        {/* Small round bottle */}
        <ellipse cx="288" cy="192" rx="2.5" ry="3" fill="#1a3a15" fillOpacity="0.25" stroke="#3D6B4F" strokeWidth="0.4" opacity="0.8" />
        <rect x="287" y="188.5" width="2" height="1.5" rx="0.3" fill="#1a3a15" fillOpacity="0.15" stroke="#3D6B4F" strokeWidth="0.3" opacity="0.7" />
        <rect x="287.2" y="187.5" width="1.6" height="1.5" rx="0.3" fill="#6b5a48" opacity="0.8" />
        <circle cx="288" cy="192.5" r="1" fill="#DAA520" opacity="0.15" />
        <ellipse cx="288" cy="191.5" rx="1.2" ry="2" fill="#3D6B4F" opacity="0.06" />

        {/* Tiny bottle */}
        <rect x="293" y="189" width="3" height="6" rx="0.4" fill="#1a3a15" fillOpacity="0.2" stroke="#4A7C59" strokeWidth="0.3" opacity="0.75" />
        <rect x="293.5" y="187.5" width="2" height="2" rx="0.3" fill="#1a3a15" fillOpacity="0.15" stroke="#4A7C59" strokeWidth="0.2" opacity="0.65" />
        <rect x="293.7" y="186.5" width="1.6" height="1.5" rx="0.3" fill="#6b5a48" opacity="0.75" />
        <ellipse cx="294.5" cy="192" rx="0.8" ry="1.5" fill="#5C8A4A" opacity="0.15" />

        {/* Bottle glows - subtle green light */}
        <ellipse cx="270" cy="190" rx="20" ry="8" fill="#3D6B4F" opacity="0.04" />
        

        {/* ===== ENCHANTED SCEPTER (on shelf, leaning on trunk) ===== */}
        {/* Main shaft */}
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
        {/* Shaft highlight */}
        <rect x="322" y="139" width="1" height="4" fill="#8B5E3C" opacity="0.3" />
        <rect x="321" y="143" width="1" height="8" fill="#8B5E3C" opacity="0.3" />
        <rect x="320" y="151" width="1" height="8" fill="#8B5E3C" opacity="0.3" />
        <rect x="319" y="159" width="1" height="8" fill="#8B5E3C" opacity="0.3" />
        <rect x="318" y="167" width="1" height="8" fill="#8B5E3C" opacity="0.3" />
        <rect x="317" y="175" width="1" height="8" fill="#8B5E3C" opacity="0.3" />
        <rect x="316" y="183" width="1" height="12" fill="#8B5E3C" opacity="0.3" />

        {/* ===== VINE spiraling up shaft ===== */}
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
        {/* Leaves on vine */}
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

        {/* ===== Small flowers on vine ===== */}
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

        {/* ===== Small crystals on shaft ===== */}
        <rect x="315" y="165" width="1" height="2" fill="#7FFFD4" opacity="0.4" />
        <rect x="314" y="166" width="1" height="2" fill="#3CB371" opacity="0.35" />
        <rect x="316" y="166" width="1" height="1" fill="#7FFFD4" opacity="0.3" />
        <rect x="313" y="189" width="1" height="2" fill="#9370DB" opacity="0.35" />
        <rect x="312" y="190" width="1" height="1" fill="#8A65C8" opacity="0.3" />
        <rect x="319" y="153" width="1" height="1" fill="#DAA520" opacity="0.45" />
        <rect x="319" y="154" width="1" height="1" fill="#E8C547" opacity="0.35" />

        {/* ===== Leather wrappings ===== */}
        <rect x="319" y="141" width="4" height="1" fill="#4a2018" opacity="0.65" />
        <rect x="318" y="149" width="4" height="1" fill="#3d1a12" opacity="0.55" />
        <rect x="316" y="169" width="4" height="1" fill="#4a2018" opacity="0.45" />
        <rect x="314" y="185" width="4" height="1" fill="#3d1a12" opacity="0.4" />

        {/* ===== MOSSY HOOP at top ===== */}
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

        {/* Moss on hoop */}
        <rect x="319" y="122" width="2" height="1" fill="#3D6B4F" opacity="0.75" />
        <rect x="322" y="120" width="2" height="1" fill="#4A7C59" opacity="0.7" />
        <rect x="325" y="120" width="2" height="1" fill="#2E5939" opacity="0.75" />
        <rect x="329" y="122" width="1" height="2" fill="#3D6B4F" opacity="0.65" />
        <rect x="332" y="127" width="1" height="2" fill="#4A7C59" opacity="0.6" />
        <rect x="317" y="129" width="1" height="2" fill="#2E5939" opacity="0.6" />
        <rect x="322" y="136" width="2" height="1" fill="#3D6B4F" opacity="0.6" />
        <rect x="327" y="135" width="2" height="1" fill="#4A7C59" opacity="0.55" />
        {/* Sprouting leaves */}
        <rect x="324" y="119" width="1" height="1" fill="#5C8A4A" opacity="0.6" />
        <rect x="325" y="118" width="1" height="1" fill="#6B8F5E" opacity="0.5" />
        <rect x="330" y="122" width="1" height="1" fill="#5C8A4A" opacity="0.55" />
        <rect x="333" y="128" width="1" height="1" fill="#6B8F5E" opacity="0.45" />
        <rect x="316" y="130" width="1" height="1" fill="#5C8A4A" opacity="0.45" />
        {/* Flowers on hoop */}
        <rect x="326" y="119" width="1" height="1" fill="#C87090" opacity="0.6" />
        <rect x="325" y="119" width="1" height="1" fill="#D8809A" opacity="0.5" />
        <rect x="327" y="119" width="1" height="1" fill="#C87090" opacity="0.5" />
        <rect x="333" y="129" width="1" height="1" fill="#9370DB" opacity="0.5" />
        <rect x="333" y="130" width="1" height="1" fill="#8A65C8" opacity="0.4" />

        {/* ===== CRYSTAL ORB (center of hoop) ===== */}
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
        {/* Leather wraps on orb */}
        <rect x="321" y="126" width="1" height="1" fill="#4a2018" opacity="0.75" />
        <rect x="329" y="126" width="1" height="1" fill="#4a2018" opacity="0.75" />
        <rect x="321" y="131" width="1" height="1" fill="#4a2018" opacity="0.75" />
        <rect x="329" y="131" width="1" height="1" fill="#4a2018" opacity="0.75" />
        <rect x="321" y="128" width="1" height="2" fill="#3d1a12" opacity="0.65" />
        <rect x="329" y="128" width="1" height="2" fill="#3d1a12" opacity="0.65" />

        {/* ===== HANGING CHARMS ===== */}
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

        {/* Dark crystal below hoop */}
        <rect x="319" y="138" width="3" height="2" fill="#4a2018" opacity="0.75" />
        <rect x="318" y="139" width="2" height="2" fill="#3d1a12" opacity="0.65" />
        <rect x="321" y="139" width="2" height="2" fill="#4a2018" opacity="0.6" />
        <rect x="319" y="141" width="1" height="1" fill="#7FFFD4" opacity="0.35" />
        <rect x="320" y="142" width="1" height="1" fill="#3CB371" opacity="0.3" />
        <rect x="320" y="140" width="1" height="1" fill="#DAA520" opacity="0.4" />
        <rect x="318" y="140" width="1" height="1" fill="#E8C547" opacity="0.3" />
        <rect x="322" y="140" width="1" height="1" fill="#FFD700" opacity="0.3" />


      </svg>

      {/* ===== LEVITATING CLOAK ===== */}
      <div style={{
        position: "fixed",
        top: "8%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 2,
        pointerEvents: "none",
        animation: "cloakFloat 4s ease-in-out infinite",
      }}>
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

        <svg width="520" height="620" viewBox="0 0 520 620" style={{ imageRendering: "pixelated", overflow: "visible" }} shapeRendering="crispEdges" >
          <line x1="90" y1="0" x2="90" y2="25" stroke="#6B5540" strokeWidth="2" opacity="0.7" />
          <rect x="87" y="0" width="6" height="4" fill="#f0e0c8" opacity="0.8" />
          <line x1="430" y1="0" x2="430" y2="15" stroke="#6B5540" strokeWidth="2" opacity="0.7" />
          <rect x="427" y="0" width="6" height="4" fill="#5c4a3a" opacity="0.8" />

          <path d={`M90 25 Q85 30 80 50 Q70 100 60 180 Q45 280 35 380 Q25 460 15 540 Q10 580 5 610 L515 610 Q510 580 505 540 Q500 480 490 400 Q480 300 470 200 Q460 120 450 60 Q445 30 430 15 Q380 20 330 22 Q260 25 200 24 Q150 23 90 25`} fill="#c4a67a" />

          <path d="M90 25 Q85 30 80 50 Q70 100 65 150 Q80 140 95 130 Q100 80 95 40 Z" fill="#8B6F4E" opacity="0.6" />
          <path d="M90 25 Q92 35 88 55 Q82 80 78 100" stroke="#7A5E3D" fill="none" strokeWidth="8" opacity="0.3" />
          <path d="M5 610 Q10 580 15 540 Q25 500 30 460 Q45 470 55 490 Q40 530 25 570 Q15 595 10 610 Z" fill="#8B6F4E" opacity="0.55" />
          <path d="M20 560 Q35 530 40 500 Q50 510 45 540 Q35 570 25 590" fill="#7A5E3D" opacity="0.3" />
          <path d="M515 610 Q510 580 505 540 Q500 500 495 470 Q480 480 470 500 Q485 540 495 580 Q505 600 510 610 Z" fill="#8B6F4E" opacity="0.55" />
          <path d="M500 570 Q490 540 485 510 Q475 520 480 550 Q490 580 498 600" fill="#7A5E3D" opacity="0.3" />
          <path d="M430 15 Q445 30 450 60 Q455 100 458 140 Q445 130 435 110 Q432 60 430 30 Z" fill="#8B6F4E" opacity="0.5" />
          <path d="M470 200 Q475 250 480 300 Q485 350 488 380 Q478 370 472 340 Q468 280 465 230 Z" fill="#9E7E58" opacity="0.35" />
          <path d="M60 180 Q55 230 50 280 Q47 320 45 350 Q55 340 60 310 Q63 260 65 220 Z" fill="#9E7E58" opacity="0.35" />
          <ellipse cx="200" cy="560" rx="35" ry="20" fill="#9E7E58" opacity="0.2" />
          <ellipse cx="350" cy="540" rx="25" ry="15" fill="#8B6F4E" opacity="0.15" />
          <ellipse cx="150" cy="500" rx="20" ry="12" fill="#9E7E58" opacity="0.12" />
          <ellipse cx="150" cy="80" rx="15" ry="10" fill="#8B6F4E" opacity="0.2" />
          <ellipse cx="320" cy="60" rx="12" ry="8" fill="#9E7E58" opacity="0.15" />
          <circle cx="180" cy="120" r="5" fill="#7A5E3D" opacity="0.15" />
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



          {/* ===== SCRIBBLES, SIGILS, BOTANICAL DRAWINGS ===== */}

          {/* --- Potion bottle sketch (left side) --- */}
          <ellipse cx="120" cy="320" rx="35" ry="40" fill="#5c4a3a" fillOpacity="0.06" stroke="#5c4a3a" strokeWidth="1.5" opacity="0.45" />
          <ellipse cx="120" cy="320" rx="33" ry="38" fill="none" stroke="#5c4a3a" strokeWidth="0.6" opacity="0.3" />
          <rect x="112" y="275" width="16" height="8" fill="#5c4a3a" fillOpacity="0.04" stroke="#5c4a3a" strokeWidth="1.2" opacity="0.45" rx="1" />
          <path d="M112 283 Q110 290 108 300 Q106 310 108 320" stroke="#5c4a3a" fill="none" strokeWidth="1.2" opacity="0.4" />
          <path d="M128 283 Q130 290 132 300 Q134 310 132 320" stroke="#5c4a3a" fill="none" strokeWidth="1.2" opacity="0.4" />
          <rect x="114" y="268" width="12" height="8" fill="#5c4a3a" fillOpacity="0.08" stroke="#5c4a3a" strokeWidth="1.5" opacity="0.45" rx="1" />
          <line x1="116" y1="270" x2="116" y2="275" stroke="#5c4a3a" strokeWidth="0.6" opacity="0.3" />
          <line x1="120" y1="269" x2="120" y2="275" stroke="#5c4a3a" strokeWidth="0.6" opacity="0.3" />
          <line x1="124" y1="270" x2="124" y2="275" stroke="#5c4a3a" strokeWidth="0.6" opacity="0.3" />
          {/* Liquid fill */}
          <path d="M108 330 Q115 325 120 328 Q125 325 132 330 Q132 345 128 355 Q122 362 112 355 Q108 345 108 330 Z"
            fill="#5c4a3a" opacity="0.12" stroke="#5c4a3a" strokeWidth="0.6" />
          <path d="M100 300 Q102 310 100 320" stroke="#5c4a3a" fill="none" strokeWidth="0.8" opacity="0.2" />
          {/* Label annotation */}
          <path d="M160 290 L140 300" stroke="#5c4a3a" fill="none" strokeWidth="0.6" opacity="0.3" />
          <path d="M160 288 Q170 288 180 289 Q185 289 190 290" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.25" />
          <path d="M158 293 Q168 293 178 294 Q183 294 188 295" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.22" />
          <path d="M162 298 Q170 298 175 299" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.22" />

          {/* --- Mushroom illustration (right side) --- */}
          {/* Large cap - filled */}
          <path d="M380 250 Q370 230 385 220 Q400 212 415 220 Q430 230 420 250 Z"
            fill="#5c4a3a" fillOpacity="0.1" stroke="#5c4a3a" strokeWidth="1.5" opacity="0.45" />
          {/* Cap spots filled */}
          <circle cx="395" cy="228" r="3" fill="#5c4a3a" opacity="0.12" stroke="#5c4a3a" strokeWidth="0.6" />
          <circle cx="405" cy="232" r="2" fill="#5c4a3a" opacity="0.1" stroke="#5c4a3a" strokeWidth="0.5" />
          <circle cx="388" cy="235" r="2.5" fill="#5c4a3a" opacity="0.1" stroke="#5c4a3a" strokeWidth="0.5" />
          {/* Stem filled */}
          <path d="M393 250 Q392 265 390 280 Q389 290 391 295 L409 295 Q411 290 410 280 Q408 265 407 250 Z"
            fill="#5c4a3a" fillOpacity="0.06" stroke="#5c4a3a" strokeWidth="1.2" opacity="0.4" />
          <path d="M393 250 Q400 252 407 250" stroke="#5c4a3a" fill="none" strokeWidth="0.6" opacity="0.3" />
          {/* Bulbous base */}
          <ellipse cx="400" cy="298" rx="12" ry="6" fill="#5c4a3a" fillOpacity="0.06" stroke="#5c4a3a" strokeWidth="1.2" opacity="0.4" />
          {/* Gills */}
          <line x1="387" y1="250" x2="390" y2="260" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.25" />
          <line x1="393" y1="250" x2="394" y2="258" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.25" />
          <line x1="400" y1="250" x2="400" y2="257" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.25" />
          <line x1="407" y1="250" x2="406" y2="258" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.25" />
          <line x1="413" y1="250" x2="410" y2="260" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.25" />
          {/* Small mushroom - filled */}
          <path d="M430 275 Q425 265 432 260 Q440 258 445 265 Q448 275 440 278 Z"
            fill="#5c4a3a" fillOpacity="0.08" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <line x1="436" y1="278" x2="437" y2="292" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          {/* Annotations */}
          <path d="M445 230 L425 225" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.28" />
          <path d="M446 228 Q455 228 465 229" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.22" />
          <path d="M448 233 Q455 233 462 234" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.22" />

          {/* --- Botanical plant (center-bottom) --- */}
          {/* Main stem */}
          <path d="M260 440 Q258 460 255 480 Q253 500 255 520 Q257 540 260 555"
            stroke="#5c4a3a" fill="none" strokeWidth="1.5" opacity="0.4" />
          {/* Roots */}
          <path d="M260 555 Q250 562 242 570" stroke="#5c4a3a" fill="none" strokeWidth="1" opacity="0.3" />
          <path d="M260 555 Q265 565 270 572" stroke="#5c4a3a" fill="none" strokeWidth="1" opacity="0.3" />
          <path d="M260 555 Q255 568 252 575" stroke="#5c4a3a" fill="none" strokeWidth="0.8" opacity="0.25" />
          <path d="M260 555 Q268 560 275 568" stroke="#5c4a3a" fill="none" strokeWidth="0.8" opacity="0.25" />
          <path d="M260 555 Q258 570 260 578" stroke="#5c4a3a" fill="none" strokeWidth="0.6" opacity="0.22" />
          {/* Left leaves - filled */}
          <path d="M255 460 Q235 450 225 455 Q220 460 230 465 Q245 468 255 462 Z"
            fill="#5c4a3a" fillOpacity="0.08" stroke="#5c4a3a" strokeWidth="1" opacity="0.38" />
          <path d="M255 460 L230 460" stroke="#5c4a3a" fill="none" strokeWidth="0.4" opacity="0.22" />
          <path d="M253 485 Q238 478 228 482 Q222 488 232 492 Q245 494 254 487 Z"
            fill="#5c4a3a" fillOpacity="0.07" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <path d="M253 485 L233 487" stroke="#5c4a3a" fill="none" strokeWidth="0.4" opacity="0.22" />
          <path d="M254 510 Q242 505 234 508 Q228 514 238 517 Q248 518 255 512 Z"
            fill="#5c4a3a" fillOpacity="0.06" stroke="#5c4a3a" strokeWidth="1" opacity="0.32" />
          {/* Right leaves - filled */}
          <path d="M258 470 Q275 462 285 467 Q290 472 280 476 Q268 478 258 472 Z"
            fill="#5c4a3a" fillOpacity="0.08" stroke="#5c4a3a" strokeWidth="1" opacity="0.38" />
          <path d="M258 470 L278 472" stroke="#5c4a3a" fill="none" strokeWidth="0.4" opacity="0.22" />
          <path d="M256 495 Q272 490 280 494 Q285 500 275 503 Q265 504 257 498 Z"
            fill="#5c4a3a" fillOpacity="0.07" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <path d="M257 520 Q270 516 278 520 Q282 525 274 528 Q264 529 258 523 Z"
            fill="#5c4a3a" fillOpacity="0.06" stroke="#5c4a3a" strokeWidth="1" opacity="0.32" />
          {/* Flower bud - filled */}
          <ellipse cx="258" cy="438" rx="6" ry="8" fill="#5c4a3a" fillOpacity="0.08" stroke="#5c4a3a" strokeWidth="1" opacity="0.38" />
          <path d="M254 432 Q258 425 262 432" stroke="#5c4a3a" fill="none" strokeWidth="0.8" opacity="0.3" />
          <path d="M252 435 Q258 428 264 435" stroke="#5c4a3a" fill="none" strokeWidth="0.6" opacity="0.25" />

          {/* --- Mystical sigil circle (upper right) --- */}
          <circle cx="400" cy="130" r="30" fill="#5c4a3a" fillOpacity="0.03" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <circle cx="400" cy="130" r="25" fill="none" stroke="#5c4a3a" strokeWidth="0.7" opacity="0.3" />
          <polygon points="400,105 378,148 422,148" fill="none" stroke="#5c4a3a" strokeWidth="0.8" opacity="0.32" />
          <line x1="400" y1="100" x2="400" y2="160" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.25" />
          <line x1="370" y1="130" x2="430" y2="130" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.25" />
          <path d="M375 102 L378 108 L373 108 Z" fill="#5c4a3a" opacity="0.2" />
          <path d="M425 102 L422 108 L427 108 Z" fill="#5c4a3a" opacity="0.2" />
          <path d="M370 150 L374 155 L368 155 Z" fill="#5c4a3a" opacity="0.2" />
          <path d="M430 150 L426 155 L432 155 Z" fill="#5c4a3a" opacity="0.2" />
          <circle cx="400" cy="100" r="2" fill="#5c4a3a" opacity="0.3" />
          <circle cx="400" cy="160" r="2" fill="#5c4a3a" opacity="0.3" />
          <circle cx="370" cy="130" r="2" fill="#5c4a3a" opacity="0.3" />
          <circle cx="430" cy="130" r="2" fill="#5c4a3a" opacity="0.3" />

          {/* --- Moon phases (top center) --- */}
          <circle cx="230" cy="80" r="6" fill="none" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <circle cx="248" cy="80" r="6" fill="none" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <path d="M248 74 Q252 80 248 86" fill="#c4a67a" stroke="none" />
          <circle cx="266" cy="80" r="6" fill="none" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <path d="M266 74 Q270 80 266 86" fill="#c4a67a" stroke="none" />
          <circle cx="284" cy="80" r="6" fill="none" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <path d="M284 74 Q290 80 284 86" fill="#c4a67a" stroke="none" />
          <path d="M284 74 Q286 80 284 86" fill="#c4a67a" stroke="none" />
          <circle cx="302" cy="80" r="6" fill="#5c4a3a" opacity="0.25" stroke="#5c4a3a" strokeWidth="1" />

          {/* --- Star sigil (lower left) --- */}
          <circle cx="100" cy="480" r="18" fill="#5c4a3a" fillOpacity="0.03" stroke="#5c4a3a" strokeWidth="0.8" opacity="0.32" />
          <circle cx="100" cy="480" r="14" fill="none" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.25" />
          <polygon points="100,464 104,474 115,474 106,481 110,492 100,485 90,492 94,481 85,474 96,474"
            fill="#5c4a3a" fillOpacity="0.06" stroke="#5c4a3a" strokeWidth="0.6" opacity="0.3" />
          <circle cx="100" cy="463" r="1.5" fill="#5c4a3a" opacity="0.28" />
          <circle cx="100" cy="497" r="1.5" fill="#5c4a3a" opacity="0.28" />
          <circle cx="82" cy="480" r="1.5" fill="#5c4a3a" opacity="0.28" />
          <circle cx="118" cy="480" r="1.5" fill="#5c4a3a" opacity="0.28" />

          {/* --- Eye talisman (right middle) --- */}
          <polygon points="420,400 445,430 420,460 395,430"
            fill="#5c4a3a" fillOpacity="0.05" stroke="#5c4a3a" strokeWidth="1" opacity="0.35" />
          <polygon points="420,410 435,430 420,450 405,430"
            fill="#5c4a3a" fillOpacity="0.04" stroke="#5c4a3a" strokeWidth="0.6" opacity="0.28" />
          <ellipse cx="420" cy="430" rx="8" ry="5" fill="#5c4a3a" fillOpacity="0.06" stroke="#5c4a3a" strokeWidth="0.8" opacity="0.32" />
          <circle cx="420" cy="430" r="2.5" fill="#5c4a3a" opacity="0.25" />
          <line x1="420" y1="395" x2="420" y2="400" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.25" />
          <line x1="420" y1="460" x2="420" y2="465" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.25" />
          <line x1="390" y1="430" x2="395" y2="430" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.25" />
          <line x1="445" y1="430" x2="450" y2="430" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.25" />

          {/* --- Scribble text lines --- */}
          <path d="M70 380 Q80 379 95 380 Q105 381 115 380" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.22" />
          <path d="M72 385 Q85 384 100 385 Q108 386 112 385" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.2" />
          <path d="M75 390 Q85 389 95 390 Q100 391 105 390" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.18" />
          <path d="M70 395 Q82 394 92 395" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.18" />

          <path d="M350 310 Q365 309 380 310 Q395 311 405 310" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.22" />
          <path d="M355 315 Q370 314 385 315 Q395 316 400 315" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.2" />
          <path d="M360 320 Q372 319 382 320" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.18" />

          <path d="M290 460 Q305 459 320 460 Q335 461 345 460" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.22" />
          <path d="M295 465 Q310 464 325 465 Q335 466 340 465" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.2" />
          <path d="M292 470 Q305 469 318 470 Q328 471 335 470" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.18" />
          <path d="M298 475 Q310 474 320 475" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.18" />

          <path d="M130 110 Q145 109 160 110 Q175 111 185 110" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.2" />
          <path d="M135 115 Q148 114 162 115 Q172 116 178 115" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.18" />
          <path d="M132 120 Q145 119 155 120" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.18" />

          <path d="M150 560 Q170 559 190 560 Q210 561 225 560" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.18" />
          <path d="M155 565 Q175 564 195 565 Q210 566 220 565" stroke="#5c4a3a" fill="none" strokeWidth="0.5" opacity="0.15" />

          {/* --- Small symbols --- */}
          <path d="M170 180 Q175 178 177 182 Q178 187 173 188 Q168 188 167 183 Q167 177 173 175 Q180 174 182 182 Q183 190 175 192"
            stroke="#5c4a3a" fill="none" strokeWidth="0.7" opacity="0.28" />

          <path d="M330 180 Q340 170 345 180 Q340 190 330 180 Q320 170 315 180 Q320 190 330 180"
            fill="none" stroke="#5c4a3a" strokeWidth="0.7" opacity="0.28" />

          <path d="M80 220 Q72 230 80 240 Q90 230 80 220 Z" fill="#5c4a3a" fillOpacity="0.06" stroke="#5c4a3a" strokeWidth="0.8" opacity="0.28" />

          <line x1="440" y1="500" x2="460" y2="520" stroke="#5c4a3a" strokeWidth="0.6" opacity="0.25" />
          <line x1="460" y1="500" x2="440" y2="520" stroke="#5c4a3a" strokeWidth="0.6" opacity="0.25" />
          <path d="M440 500 L443 503 L440 503 Z" fill="#5c4a3a" opacity="0.25" />
          <path d="M460 500 L457 503 L460 503 Z" fill="#5c4a3a" opacity="0.25" />

          <circle cx="155" cy="340" r="3" fill="#5c4a3a" fillOpacity="0.05" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.25" />
          <circle cx="162" cy="332" r="2" fill="#5c4a3a" fillOpacity="0.05" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.22" />
          <circle cx="158" cy="348" r="1.5" fill="#5c4a3a" fillOpacity="0.05" stroke="#5c4a3a" strokeWidth="0.5" opacity="0.22" />

          <circle cx="450" cy="470" r="1.5" fill="#5c4a3a" opacity="0.2" />
          <circle cx="455" cy="472" r="1.5" fill="#5c4a3a" opacity="0.2" />
          <circle cx="460" cy="470" r="1.5" fill="#5c4a3a" opacity="0.2" />
          <circle cx="450" cy="477" r="1.5" fill="#5c4a3a" opacity="0.2" />
          <circle cx="455" cy="479" r="1.5" fill="#5c4a3a" opacity="0.2" />
          <circle cx="460" cy="477" r="1.5" fill="#5c4a3a" opacity="0.2" />


          <ellipse cx="260" cy="280" rx="70" ry="180" fill="#d8c4a0" opacity="0.12" />
        </svg>
      </div>

      {/* ===== ACTUAL CONTENT ===== */}
      <div style={{ position: "relative", zIndex: 4 }} className="min-h-screen flex justify-center px-6 py-10">
        <div className="w-full max-w-md">

          <h1 className="text-4xl mb-2" style={{ color: "#f0e0c8" }}>
            Welcome back, {user.name} 🌱
          </h1>
          <p className="mb-8" style={{ color: "#d4c4a8" }}>
            Your daily reflection awaits you.
          </p>

          <Garden gardenStage={user.gardenStage} />

          <div className="grid grid-cols-3 gap-4 mt-8">
            <WoodFrame>
              <div className="text-center">
                <p className="text-2xl">🔥</p>
                <p className="text-xl font-medium" style={{ color: "#f0e0c8" }}>{user.streak}</p>
                <p className="text-xs" style={{ color: "#d4c4a8" }}>day streak</p>
              </div>
            </WoodFrame>

            <WoodFrame>
              <div className="text-center">
                <p className="text-2xl">✅</p>
                <p className="text-xl font-medium" style={{ color: "#5c4a3a" }}>{user.completedDays}</p>
                <p className="text-xs" style={{ color: "#d4c4a8" }}>days done</p>
              </div>
            </WoodFrame>

            <WoodFrame>
              <div className="text-center">
                <p className="text-2xl">🌿</p>
                <p className="text-xl font-medium" style={{ color: "#5c4a3a" }}>{user.gardenStage}</p>
                <p className="text-xs" style={{ color: "#d4c4a8" }}>garden stage</p>
              </div>
            </WoodFrame>
          </div>

          <WoodFrame className="mt-8">
            <button
              onClick={() => navigate("/reflection")}
              className="w-full py-3 text-lg transition-all hover:scale-[1.02]"
              style={{
                background: "transparent",
                border: "none",
                color: "#5c4a3a",
                pointerEvents: "auto",
              }}
            >
              Add Today's Reflection 🌿
            </button>
          </WoodFrame>

          <WoodFrame className="mt-3">
            <button
              onClick={() => {
                localStorage.removeItem("token")
                localStorage.removeItem("user")
                navigate("/")
              }}
              className="w-full py-3 text-lg transition-all hover:scale-[1.02]"
              style={{
                background: "transparent",
                border: "none",
                color: "#d4c4a8",
                pointerEvents: "auto",
              }}
            >
              Logout
            </button>
          </WoodFrame>

        </div>
      </div>
    </>
  )
}

export default Dashboard