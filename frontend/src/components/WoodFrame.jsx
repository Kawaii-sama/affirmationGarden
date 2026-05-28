function WoodFrame({ children, className = "", style = {} }) {
  return (
    <div className={`relative ${className}`} style={{ padding: "10px", ...style }}>
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          overflow: "visible",
        }}
        viewBox="0 0 200 120"
        preserveAspectRatio="none"
      >
        {/* Main vine border rectangle */}
        <path d="M10 5 Q0 5 0 15 L0 105 Q0 115 10 115 L190 115 Q200 115 200 105 L200 15 Q200 5 190 5 Z"
          fill="none" stroke="#4A7C59" strokeWidth="2.5" opacity="0.8" />

        {/* Top vine with leaves */}
        <path d="M5 5 Q25 2 50 6 Q75 3 100 5 Q125 3 150 6 Q175 4 195 5"
          stroke="#3D6B4F" fill="none" strokeWidth="2" opacity="0.7" />
        <ellipse cx="30" cy="4" rx="5" ry="2.5" fill="#5C8A4A" transform="rotate(-10,30,4)" opacity="0.7" />
        <ellipse cx="75" cy="5" rx="4.5" ry="2" fill="#4A7C59" transform="rotate(12,75,5)" opacity="0.65" />
        <ellipse cx="120" cy="4" rx="5" ry="2.5" fill="#6B8F5E" transform="rotate(-8,120,4)" opacity="0.7" />
        <ellipse cx="165" cy="5" rx="4" ry="2" fill="#3D6B4F" transform="rotate(15,165,5)" opacity="0.6" />

        {/* Bottom vine with leaves */}
        <path d="M5 115 Q30 118 60 115 Q90 117 120 115 Q150 118 175 115 Q190 117 195 115"
          stroke="#2E5939" fill="none" strokeWidth="2" opacity="0.65" />
        <ellipse cx="45" cy="116" rx="4.5" ry="2" fill="#5C8A4A" transform="rotate(8,45,116)" opacity="0.6" />
        <ellipse cx="105" cy="116" rx="5" ry="2.5" fill="#4A7C59" transform="rotate(-12,105,116)" opacity="0.65" />
        <ellipse cx="160" cy="117" rx="4" ry="2" fill="#6B8F5E" transform="rotate(10,160,117)" opacity="0.55" />

        {/* Left vine with leaves */}
        <path d="M0 15 Q-2 35 0 55 Q-1 75 0 95 Q-2 105 0 110"
          stroke="#3D6B4F" fill="none" strokeWidth="2" opacity="0.6" />
        <ellipse cx="-1" cy="35" rx="2" ry="5" fill="#4A7C59" transform="rotate(-15,-1,35)" opacity="0.6" />
        <ellipse cx="0" cy="70" rx="2" ry="5" fill="#5C8A4A" transform="rotate(10,0,70)" opacity="0.55" />

        {/* Right vine with leaves */}
        <path d="M200 15 Q202 35 200 55 Q201 75 200 95 Q202 105 200 110"
          stroke="#2E5939" fill="none" strokeWidth="2" opacity="0.6" />
        <ellipse cx="201" cy="45" rx="2" ry="5" fill="#6B8F5E" transform="rotate(12,201,45)" opacity="0.55" />
        <ellipse cx="200" cy="80" rx="2" ry="4.5" fill="#4A7C59" transform="rotate(-10,200,80)" opacity="0.5" />

        {/* Mushroom 1 - bottom left */}
        <rect x="25" y="113" width="3" height="5" fill="#c4a070" rx="1" />
        <ellipse cx="26.5" cy="111.5" rx="5" ry="3.5" fill="#6B3020" />
        <ellipse cx="25" cy="110.5" rx="1.5" ry="1" fill="#FFFFFF" opacity="0.35" />
        <ellipse cx="28" cy="111.5" rx="1" ry="0.8" fill="#FFFFFF" opacity="0.3" />

        {/* Mushroom 2 - bottom right */}
        <rect x="165" y="113" width="3" height="4" fill="#d4b080" rx="1" />
        <ellipse cx="166.5" cy="111.5" rx="4.5" ry="3" fill="#804028" />
        <ellipse cx="165" cy="111" rx="1.2" ry="0.8" fill="#FFFFFF" opacity="0.3" />

        {/* Mushroom 3 - left side */}
        <rect x="-1" y="90" width="2.5" height="4" fill="#c4a070" rx="1" />
        <ellipse cx="0.2" cy="88.5" rx="4" ry="2.8" fill="#6B3020" />
        <ellipse cx="-1" cy="88" rx="1" ry="0.7" fill="#FFFFFF" opacity="0.3" />

      </svg>

      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}

export default WoodFrame