import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

// Single shared AudioContext for the whole app
export const sharedAudioCtx = new AudioContext();

document.addEventListener(
  "click",
  () => {
    if (sharedAudioCtx.state === "suspended") {
      sharedAudioCtx.resume();
    }
  },
  { once: false }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Reusable hover sound
function playHoverSound() {
  const ctx = sharedAudioCtx;

  if (ctx.state === "suspended") return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = "sine";
  osc.frequency.setValueAtTime(700, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(
    500,
    ctx.currentTime + 0.04
  );

  gain.gain.setValueAtTime(0.06, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + 0.04
  );

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.04);
}

// Button click animation + sparkle sound
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  // Spring animation
  btn.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(0.92)" },
      { transform: "scale(1.05)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 400,
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
    }
  );

  // Glittery fairy button sound
  const ctx = sharedAudioCtx;
  const notes = [1047, 1319, 1568];

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(
      freq,
      ctx.currentTime + i * 0.05
    );

    gain.gain.setValueAtTime(
      0,
      ctx.currentTime + i * 0.05
    );

    gain.gain.linearRampToValueAtTime(
      0.12,
      ctx.currentTime + i * 0.05 + 0.01
    );

    gain.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + i * 0.05 + 0.15
    );

    osc.start(ctx.currentTime + i * 0.05);
    osc.stop(ctx.currentTime + i * 0.05 + 0.15);
  });
});

// Hover sound for buttons, inputs, selects, textareas
document.addEventListener("mouseover", (e) => {
  const isHoverable = e.target.closest(
    "button, input, select, textarea"
  );

  if (!isHoverable) return;

  playHoverSound();
});

// Focus/click sound for inputs, selects, textareas
// SAME sound as hover
document.addEventListener("mousedown", (e) => {
  const isInput = e.target.closest(
    "input, select, textarea, label"
  );

  if (!isInput) return;

  playHoverSound();
});


document.addEventListener("keydown", (e) => {
  const isTypingField = e.target.matches(
    "input, textarea"
  )

  if (!isTypingField) return

  const ctx = sharedAudioCtx

  if (ctx.state === "suspended") return

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.type = "triangle"

  osc.frequency.setValueAtTime(
    1200,
    ctx.currentTime
  )

  osc.frequency.exponentialRampToValueAtTime(
    900,
    ctx.currentTime + 0.03
  )

  gain.gain.setValueAtTime(
    0.03,
    ctx.currentTime
  )

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + 0.03
  )

  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.03)
});