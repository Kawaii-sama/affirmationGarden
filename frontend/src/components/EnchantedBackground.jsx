import { useEffect, useRef } from "react"

function EnchantedBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.imageSmoothingEnabled = false

    const PX = 4
    let W, H, cols, rows

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H
      cols = Math.ceil(W / PX)
      rows = Math.ceil(H / PX)
      drawScene()
    }

    function px(x, y, color, alpha = 1) {
      ctx.globalAlpha = alpha
      ctx.fillStyle = color
      ctx.fillRect(x * PX, y * PX, PX, PX)
    }

    function pxRect(x, y, w, h, color, alpha = 1) {
      ctx.globalAlpha = alpha
      ctx.fillStyle = color
      ctx.fillRect(x * PX, y * PX, w * PX, h * PX)
    }

    function drawTree(tx, topY, width, trunkColor, darkColor) {
      const halfW = Math.floor(width / 2)
      const bottomY = rows
      for (let y = topY; y < bottomY; y++) {
        const wobble = Math.sin(y * 0.15) * 1.5
        for (let x = -halfW; x <= halfW; x++) {
          const px_x = tx + x + Math.round(wobble)
          if (px_x < 0 || px_x >= cols) continue
          const edgeDist = Math.abs(x) / halfW
          const c = edgeDist > 0.7 ? darkColor : trunkColor
          px(px_x, y, c)
          if (y % 8 < 1 && Math.abs(x) < halfW - 1) {
            px(px_x, y, darkColor, 0.3)
          }
        }
      }
    }

    function drawLeafCluster(cx, cy, radius, colors) {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > radius) continue
          if (Math.random() > 0.7) continue
          const c = colors[Math.floor(Math.random() * colors.length)]
          const alpha = 0.6 + Math.random() * 0.4
          px(cx + dx, cy + dy, c, alpha)
        }
      }
    }

    function drawMushroom(mx, my, capColor, stemColor) {
      pxRect(mx, my, 2, 3, stemColor)
      pxRect(mx - 2, my - 2, 6, 2, capColor)
      pxRect(mx - 1, my - 3, 4, 1, capColor)
      px(mx, my - 2, "#FFFFFF", 0.4)
      px(mx + 2, my - 3, "#FFFFFF", 0.3)
    }

    function drawMoonGate(cx, cy, outerR, innerR) {
      const stoneColors = ["#4a3828", "#5c4a38", "#6b5a48", "#3d2e20", "#52412e", "#614e3a", "#70604c"]
      const darkStone = ["#2a1e14", "#33261a", "#3d2e20", "#241a10"]
      const mossColors = ["#3D6B4F", "#4A7C59", "#5C8A4A", "#2E5939", "#6B8F5E", "#3a6030"]
      const vineColor = ["#3D6B4F", "#2E5939", "#4A7C59"]

      // Main thick stone arch
      for (let dy = -outerR; dy <= outerR; dy++) {
        for (let dx = -outerR; dx <= outerR; dx++) {
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > outerR || dist < innerR) continue
          const px_x = cx + dx
          const px_y = cy + dy
          if (px_x < 0 || px_x >= cols || px_y < 0 || px_y >= rows) continue

          const t = (dist - innerR) / (outerR - innerR)

          // Brown/stone base
          let color
          if (t < 0.15) color = "#6b5a48" // inner edge highlight
          else if (t < 0.3) color = stoneColors[Math.floor(Math.random() * stoneColors.length)]
          else if (t < 0.7) color = stoneColors[Math.floor(Math.random() * stoneColors.length)]
          else color = darkStone[Math.floor(Math.random() * darkStone.length)]

          // Stone texture noise
          if (Math.random() < 0.1) color = darkStone[Math.floor(Math.random() * darkStone.length)]

          px(px_x, px_y, color)

          // Moss patches on the arch (heavier on top half)
          const angle = Math.atan2(dy, dx)
          const isTopHalf = dy < 0
          const mossChance = isTopHalf ? 0.3 : 0.12
          if (Math.random() < mossChance) {
            // Thicker moss on outer edge
            if (t > 0.5) {
              px(px_x, px_y, mossColors[Math.floor(Math.random() * mossColors.length)], 0.8)
            } else if (t > 0.2 && Math.random() < 0.5) {
              px(px_x, px_y, mossColors[Math.floor(Math.random() * mossColors.length)], 0.6)
            }
          }
        }
      }

      // Inner golden/brown rim highlight
      for (let dy = -innerR - 1; dy <= innerR + 1; dy++) {
        for (let dx = -innerR - 1; dx <= innerR + 1; dx++) {
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > innerR + 1 || dist < innerR - 1) continue
          const px_x = cx + dx
          const px_y = cy + dy
          if (px_x < 0 || px_x >= cols || px_y < 0 || px_y >= rows) continue
          const highlight = dy < 0 ? "#8a7050" : "#6b5540"
          px(px_x, px_y, highlight, 0.7)
        }
      }

      // Misty interior (looking through the gate)
      for (let dy = -innerR; dy <= innerR; dy++) {
        for (let dx = -innerR; dx <= innerR; dx++) {
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist > innerR - 2) continue
          const px_x = cx + dx
          const px_y = cy + dy
          if (px_x < 0 || px_x >= cols || px_y < 0 || px_y >= rows) continue
          const t = dist / innerR
          // Misty light from behind
          const brightness = (1 - t) * 0.15
          if (dy < -innerR * 0.3) {
            // Light rays from top through gate
            px(px_x, px_y, "#c8d8a0", brightness * 1.3)
          } else {
            px(px_x, px_y, "#8a9a70", brightness)
          }
        }
      }

      // Vines hanging down from top of arch
      const vineStarts = [
        { x: cx - Math.floor(innerR * 0.6), len: Math.floor(innerR * 0.5) },
        { x: cx - Math.floor(innerR * 0.3), len: Math.floor(innerR * 0.7) },
        { x: cx + Math.floor(innerR * 0.1), len: Math.floor(innerR * 0.4) },
        { x: cx + Math.floor(innerR * 0.4), len: Math.floor(innerR * 0.6) },
        { x: cx + Math.floor(innerR * 0.7), len: Math.floor(innerR * 0.3) },
      ]
      for (const vine of vineStarts) {
        let vx = vine.x
        const topY = cy - innerR + 2
        for (let i = 0; i < vine.len; i++) {
          vx += Math.round(Math.sin(i * 0.3) * 0.6)
          const vy = topY + i
          if (vx >= 0 && vx < cols && vy >= 0 && vy < rows) {
            px(vx, vy, vineColor[Math.floor(Math.random() * vineColor.length)], 0.7)
            // Tiny leaves
            if (i % 4 === 0 && Math.random() < 0.7) {
              const leafDir = Math.random() > 0.5 ? 1 : -1
              px(vx + leafDir, vy, "#4A7C59", 0.6)
              px(vx + leafDir * 2, vy, "#5C8A4A", 0.5)
            }
          }
        }
      }

      // Moss clumps on top of the arch (thick, like reference)
      for (let i = 0; i < 30; i++) {
        const angle = -Math.PI * 0.8 + Math.random() * Math.PI * 0.6 // top arc
        const r = outerR + Math.floor(Math.random() * 4)
        const mx = cx + Math.round(Math.cos(angle) * r)
        const my = cy + Math.round(Math.sin(angle) * r)
        const clumpSize = 2 + Math.floor(Math.random() * 4)
        for (let dy = -clumpSize; dy <= clumpSize; dy++) {
          for (let dx = -clumpSize; dx <= clumpSize; dx++) {
            if (Math.abs(dx) + Math.abs(dy) > clumpSize + 1) continue
            if (Math.random() > 0.6) continue
            const px_x = mx + dx
            const px_y = my + dy
            if (px_x >= 0 && px_x < cols && px_y >= 0 && px_y < rows) {
              px(px_x, px_y, mossColors[Math.floor(Math.random() * mossColors.length)], 0.75)
            }
          }
        }
      }

      // Stones at the base of the gate (left and right pillars)
      const baseY = cy + innerR - 2
      const baseStones = [
        { x: cx - outerR + 3, y: baseY, w: 6, h: 4 },
        { x: cx - outerR - 2, y: baseY - 3, w: 5, h: 5 },
        { x: cx - outerR + 1, y: baseY + 2, w: 4, h: 3 },
        { x: cx + outerR - 8, y: baseY, w: 6, h: 4 },
        { x: cx + outerR - 3, y: baseY - 3, w: 5, h: 5 },
        { x: cx + outerR - 1, y: baseY + 2, w: 4, h: 3 },
        // Center bottom stones (stepping stones)
        { x: cx - 3, y: baseY + 3, w: 7, h: 3 },
        { x: cx - 6, y: baseY + 5, w: 5, h: 2 },
        { x: cx + 4, y: baseY + 4, w: 4, h: 2 },
      ]
      for (const s of baseStones) {
        for (let dy = 0; dy < s.h; dy++) {
          for (let dx = 0; dx < s.w; dx++) {
            const px_x = s.x + dx
            const px_y = s.y + dy
            if (px_x >= 0 && px_x < cols && px_y >= 0 && px_y < rows) {
              const sc = stoneColors[Math.floor(Math.random() * stoneColors.length)]
              px(px_x, px_y, sc, 0.85)
              // Moss on top edge of stones
              if (dy === 0 && Math.random() < 0.4) {
                px(px_x, px_y, mossColors[Math.floor(Math.random() * mossColors.length)], 0.6)
              }
            }
          }
        }
      }

      // Ferns/shrubs at base sides of gate
      const fernColors = ["#2a5020", "#3a6030", "#1a4a1a", "#4A7C59", "#3D6B4F"]
      const fernPositions = [
        { x: cx - outerR - 5, y: baseY - 2, w: 8, h: 7 },
        { x: cx - outerR + 5, y: baseY - 4, w: 6, h: 5 },
        { x: cx + outerR - 2, y: baseY - 2, w: 8, h: 7 },
        { x: cx + outerR - 8, y: baseY - 4, w: 6, h: 5 },
      ]
      for (const fern of fernPositions) {
        for (let dy = 0; dy < fern.h; dy++) {
          const rowW = Math.round(fern.w * (1 - dy / fern.h))
          for (let dx = 0; dx < rowW; dx++) {
            if (Math.random() > 0.55) continue
            const px_x = fern.x + dx
            const px_y = fern.y + fern.h - dy
            if (px_x >= 0 && px_x < cols && px_y >= 0 && px_y < rows) {
              px(px_x, px_y, fernColors[Math.floor(Math.random() * fernColors.length)], 0.7)
            }
          }
        }
      }
    }

    function drawWater(startY) {
      const waterColors = ["#1a2e2a", "#1e3530", "#223c36", "#192b28", "#16282e", "#1b3035"]
      const shimmerColors = ["#3a6a5a", "#4a8a6a", "#5a9a7a", "#6aaa8a"]
      const highlightColors = ["#88ccaa", "#99ddbb", "#aaeebb", "#77bb99"]

      for (let y = startY; y < rows; y++) {
        const depth = (y - startY) / (rows - startY)
        for (let x = 0; x < cols; x++) {
          const waveOffset = Math.sin(x * 0.1 + y * 0.2) * 0.3
          const baseColor = waterColors[Math.floor((depth + waveOffset) * waterColors.length) % waterColors.length]
          px(x, y, baseColor, 0.85 + depth * 0.15)

          if (Math.random() < 0.02 && y < startY + 4) {
            const sc = shimmerColors[Math.floor(Math.random() * shimmerColors.length)]
            px(x, y, sc, 0.3 + Math.random() * 0.2)
          }
          if (Math.random() < 0.008 && y < startY + 3) {
            const hc = highlightColors[Math.floor(Math.random() * highlightColors.length)]
            px(x, y, hc, 0.4 + Math.random() * 0.3)
          }
        }
      }

      for (let x = 0; x < cols; x++) {
        if (Math.random() < 0.04) {
          px(x, startY, "#6aaa8a", 0.3)
          if (Math.random() < 0.5) px(x + 1, startY, "#5a9a7a", 0.2)
        }
      }
    }

    function drawTyndallRays(originX, originY) {
      const numRays = 8
      for (let i = 0; i < numRays; i++) {
        const angle = 0.6 + i * 0.12 + (Math.random() * 0.05)
        const length = rows * 0.8 + Math.random() * rows * 0.3
        const rayWidth = 2 + Math.floor(Math.random() * 4)

        for (let d = 0; d < length; d++) {
          const x = Math.round(originX + Math.cos(angle) * d)
          const y = Math.round(originY + Math.sin(angle) * d)
          if (x < 0 || x >= cols || y < 0 || y >= rows) continue

          const falloff = 1 - (d / length)
          const alpha = falloff * (0.06 + Math.random() * 0.04)

          for (let w = -rayWidth; w <= rayWidth; w++) {
            const px_x = x + Math.round(Math.cos(angle + Math.PI / 2) * w)
            const px_y = y + Math.round(Math.sin(angle + Math.PI / 2) * w)
            if (px_x < 0 || px_x >= cols || px_y < 0 || px_y >= rows) continue
            const edgeFade = 1 - Math.abs(w) / (rayWidth + 1)
            const rayColor = d < length * 0.3 ? "#c8e8a0" : d < length * 0.6 ? "#a0c878" : "#80b060"
            px(px_x, px_y, rayColor, alpha * edgeFade)
          }
        }
      }

      for (let d = 0; d < 60; d++) {
        const angle = 0.6 + Math.random() * 1.1
        const dist = Math.random() * rows * 0.7
        const x = Math.round(originX + Math.cos(angle) * dist)
        const y = Math.round(originY + Math.sin(angle) * dist)
        if (x >= 0 && x < cols && y >= 0 && y < rows) {
          px(x, y, "#e8f0c0", 0.15 + Math.random() * 0.15)
        }
      }
    }

    function drawShrub(sx, sy, w, h, colors) {
      for (let dy = 0; dy < h; dy++) {
        const rowW = Math.round(w * (1 - (dy * dy) / (h * h * 1.5)))
        for (let dx = -rowW; dx <= rowW; dx++) {
          if (Math.random() > 0.75) continue
          const c = colors[Math.floor(Math.random() * colors.length)]
          px(sx + dx, sy - dy, c, 0.7 + Math.random() * 0.3)
        }
      }
    }

    function drawStone(sx, sy, w, h) {
      const colors = ["#3a3a30", "#4a4a3a", "#3d3d32", "#444438", "#505040"]
      for (let dy = 0; dy < h; dy++) {
        const rowW = Math.round(w * Math.sqrt(1 - ((dy - h / 2) * (dy - h / 2)) / (h * h / 4 + 1)))
        for (let dx = -rowW; dx <= rowW; dx++) {
          const c = colors[Math.floor(Math.random() * colors.length)]
          const edgeAlpha = 1 - Math.abs(dx) / (rowW + 1) * 0.3
          px(sx + dx, sy + dy - Math.floor(h / 2), c, edgeAlpha * 0.85)
        }
      }
      for (let dx = -Math.floor(w * 0.6); dx <= Math.floor(w * 0.6); dx++) {
        if (Math.random() < 0.4) {
          px(sx + dx, sy - Math.floor(h / 2), "#4A7C59", 0.3)
        }
      }
    }

    function drawScene() {
      ctx.globalAlpha = 1
      ctx.fillStyle = "#0a0f07"
      ctx.fillRect(0, 0, W, H)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const t = y / rows
          const r = Math.floor(10 + t * 18)
          const g = Math.floor(15 + t * 28)
          const b = Math.floor(7 + t * 14)
          px(x, y, `rgb(${r},${g},${b})`)
        }
      }

      // Background trees (distant, faded)
      const bgTreeColors = ["#142810", "#183014", "#1c3818"]
      for (let i = 0; i < 12; i++) {
        const tx = Math.floor(Math.random() * cols)
        const th = Math.floor(rows * 0.3 + Math.random() * rows * 0.3)
        const tw = 2 + Math.floor(Math.random() * 3)
        for (let y = rows - th; y < rows * 0.82; y++) {
          for (let dx = -tw; dx <= tw; dx++) {
            if (tx + dx >= 0 && tx + dx < cols) {
              px(tx + dx, y, bgTreeColors[Math.floor(Math.random() * bgTreeColors.length)], 0.4)
            }
          }
        }
        drawLeafCluster(tx, rows - th - 3, 6 + Math.floor(Math.random() * 5),
          ["#1a3a15", "#1e4018", "#163212", "#224a1c"])
      }

      // Water stream at bottom
      const waterStartY = Math.floor(rows * 0.82)
      drawWater(waterStartY)

      // Ground/bank above water
      const bankY = waterStartY - 2
      const bankColors = ["#1a1208", "#241a0e", "#2a1e12", "#1e1508"]
      for (let y = bankY; y < waterStartY + 1; y++) {
        for (let x = 0; x < cols; x++) {
          const noise = Math.sin(x * 0.3) * 2
          if (y < waterStartY + noise) {
            px(x, y, bankColors[Math.floor(Math.random() * bankColors.length)], 0.8)
          }
        }
      }

      // Mossy ground patches
      for (let i = 0; i < 20; i++) {
        const gx = Math.floor(Math.random() * cols)
        const gy = bankY - Math.floor(Math.random() * 3)
        const gw = 3 + Math.floor(Math.random() * 8)
        for (let dx = 0; dx < gw; dx++) {
          if (Math.random() > 0.5) continue
          px(gx + dx, gy, ["#2a5020", "#3a6030", "#2e5828"][Math.floor(Math.random() * 3)], 0.5)
        }
      }

      // Main trees
      const leftTreeX = Math.floor(cols * 0.08)
      drawTree(leftTreeX, 0, 8, "#2a1f10", "#1a1508")
      drawTree(leftTreeX - 2, 0, 6, "#3d2e18", "#2a1f10")

      const rightTreeX = Math.floor(cols * 0.92)
      drawTree(rightTreeX, 0, 8, "#2a1f10", "#1a1508")
      drawTree(rightTreeX + 2, 0, 6, "#3d2e18", "#2a1f10")

      // Mid trees
      drawTree(Math.floor(cols * 0.22), Math.floor(rows * 0.05), 5, "#1e1508", "#140e05")
      drawTree(Math.floor(cols * 0.78), Math.floor(rows * 0.05), 5, "#1e1508", "#140e05")

      // Canopy leaves
      const canopyColors = ["#1a3a15", "#1e4018", "#163212", "#224a1c", "#2a5020", "#1a4a1a"]
      const brightCanopy = ["#3a7030", "#4a8040", "#3a6a2a", "#5a9040"]

      // Top-left canopy
      for (let i = 0; i < 15; i++) {
        const cx = Math.floor(Math.random() * cols * 0.35)
        const cy = Math.floor(Math.random() * rows * 0.25)
        drawLeafCluster(cx, cy, 5 + Math.floor(Math.random() * 8), canopyColors)
      }
      // Top-right canopy
      for (let i = 0; i < 15; i++) {
        const cx = Math.floor(cols * 0.65 + Math.random() * cols * 0.35)
        const cy = Math.floor(Math.random() * rows * 0.25)
        drawLeafCluster(cx, cy, 5 + Math.floor(Math.random() * 8), canopyColors)
      }
      // Center top (sparse, light comes through)
      for (let i = 0; i < 6; i++) {
        const cx = Math.floor(cols * 0.3 + Math.random() * cols * 0.4)
        const cy = Math.floor(Math.random() * rows * 0.12)
        drawLeafCluster(cx, cy, 3 + Math.floor(Math.random() * 4), [...canopyColors, ...brightCanopy])
      }

      // Side foliage (dense)
      for (let i = 0; i < 20; i++) {
        const side = Math.random() > 0.5
        const cx = side
          ? Math.floor(cols * 0.82 + Math.random() * cols * 0.18)
          : Math.floor(Math.random() * cols * 0.18)
        const cy = Math.floor(rows * 0.2 + Math.random() * rows * 0.55)
        drawLeafCluster(cx, cy, 4 + Math.floor(Math.random() * 6), canopyColors)
      }

      // Moon gate (center-top area)
      const gateX = Math.floor(cols / 2)
      const gateY = Math.floor(rows * 0.38)
      const outerR = Math.floor(Math.min(cols, rows) * 0.22)
      const innerR = Math.floor(outerR * 0.68)
      drawMoonGate(gateX, gateY, outerR, innerR)

      // Tyndall effect rays from top-left
      drawTyndallRays(Math.floor(cols * 0.25), -5)

      // Stones on the bank
      drawStone(Math.floor(cols * 0.15), bankY - 1, 5, 4)
      drawStone(Math.floor(cols * 0.35), bankY, 4, 3)
      drawStone(Math.floor(cols * 0.55), bankY - 1, 3, 3)
      drawStone(Math.floor(cols * 0.7), bankY, 5, 4)
      drawStone(Math.floor(cols * 0.85), bankY - 1, 4, 3)
      drawStone(Math.floor(cols * 0.45), bankY, 3, 2)

      // Shrubs
      const shrubDark = ["#1a3a15", "#1e4018", "#163212"]
      const shrubMid = ["#2a5020", "#3a6030", "#2e5828", "#1a4a1a"]
      drawShrub(Math.floor(cols * 0.05), bankY - 1, 8, 6, shrubDark)
      drawShrub(Math.floor(cols * 0.12), bankY, 6, 5, shrubMid)
      drawShrub(Math.floor(cols * 0.88), bankY - 1, 8, 6, shrubDark)
      drawShrub(Math.floor(cols * 0.95), bankY, 6, 5, shrubMid)
      drawShrub(Math.floor(cols * 0.3), bankY, 5, 4, shrubMid)
      drawShrub(Math.floor(cols * 0.72), bankY, 5, 4, shrubMid)

      // Mushrooms
      drawMushroom(Math.floor(cols * 0.18), bankY - 2, "#6B3020", "#c4a070")
      drawMushroom(Math.floor(cols * 0.82), bankY - 2, "#6B3020", "#c4a070")
      drawMushroom(Math.floor(cols * 0.6), bankY - 1, "#804028", "#d4b080")

      // Hanging vines from canopy
      const vineStartXs = [cols * 0.15, cols * 0.28, cols * 0.72, cols * 0.85]
      for (const vsx of vineStartXs) {
        let vx = Math.floor(vsx)
        for (let vy = 0; vy < rows * 0.35; vy++) {
          vx += Math.round(Math.sin(vy * 0.2) * 0.8)
          if (vx >= 0 && vx < cols) {
            px(vx, vy, "#3D6B4F", 0.5)
            if (vy % 5 === 0 && Math.random() < 0.6) {
              pxRect(vx + (Math.random() > 0.5 ? 1 : -1), vy, 2, 1, "#4A7C59", 0.5)
            }
          }
        }
      }

      // Light patch on ground (where rays hit)
      const lightX = Math.floor(cols * 0.45)
      const lightY = bankY - 3
      for (let dy = -4; dy <= 2; dy++) {
        for (let dx = -10; dx <= 10; dx++) {
          const dist = Math.sqrt(dx * dx + dy * dy * 4)
          if (dist > 11) continue
          const alpha = (1 - dist / 11) * 0.15
          px(lightX + dx, lightY + dy, "#c8e8a0", alpha)
        }
      }
    }

    resize()
    window.addEventListener("resize", resize)

    // Sparkle animation layer
    const sparkleCanvas = document.createElement("canvas")
    sparkleCanvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;"
    canvas.parentElement.appendChild(sparkleCanvas)
    const sCtx = sparkleCanvas.getContext("2d")
    sCtx.imageSmoothingEnabled = false

    function resizeSparkle() {
      sparkleCanvas.width = W
      sparkleCanvas.height = H
    }
    resizeSparkle()

    const sparkles = []
    for (let i = 0; i < 50; i++) {
      sparkles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        baseSize: PX * (1 + Math.floor(Math.random() * 2)),
        speed: 0.005 + Math.random() * 0.015,
        phase: Math.random() * Math.PI * 2,
        color: ["#FFD700", "#FFF8DC", "#FFFACD", "#E8C547", "#F5DEB3", "#c8e8a0", "#a0c878"][Math.floor(Math.random() * 7)],
      })
    }

    const fireflies = []
    for (let i = 0; i < 14; i++) {
      fireflies.push({
        x: Math.random() * W,
        y: Math.random() * H * 0.8,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        size: PX,
        phase: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.015,
      })
    }

    let frame = 0
    function animLoop() {
      frame++
      sCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height)

      for (const s of sparkles) {
        const pulse = 0.1 + 0.9 * ((Math.sin(frame * s.speed + s.phase) + 1) / 2)
        const size = Math.max(PX, Math.round(s.baseSize * pulse))
        sCtx.globalAlpha = 0.15 + 0.85 * pulse
        sCtx.fillStyle = s.color

        const sx = Math.round(s.x / PX) * PX
        const sy = Math.round(s.y / PX) * PX
        sCtx.fillRect(sx, sy, size, size)

        if (pulse > 0.7) {
          sCtx.globalAlpha = (pulse - 0.7) / 0.3 * 0.3
          sCtx.fillRect(sx - PX, sy, PX, size)
          sCtx.fillRect(sx + size, sy, PX, size)
          sCtx.fillRect(sx, sy - PX, size, PX)
          sCtx.fillRect(sx, sy + size, size, PX)
        }
      }

      for (const f of fireflies) {
        f.x += f.vx
        f.y += f.vy
        if (f.x < 0 || f.x > W) f.vx *= -1
        if (f.y < 0 || f.y > H * 0.8) f.vy *= -1
        f.vx += (Math.random() - 0.5) * 0.03
        f.vy += (Math.random() - 0.5) * 0.03
        f.vx = Math.max(-0.5, Math.min(0.5, f.vx))
        f.vy = Math.max(-0.4, Math.min(0.4, f.vy))

        const glow = 0.3 + 0.7 * ((Math.sin(frame * f.speed + f.phase) + 1) / 2)
        const fx = Math.round(f.x / PX) * PX
        const fy = Math.round(f.y / PX) * PX

        sCtx.globalAlpha = glow * 0.15
        sCtx.fillStyle = "#FFE4A0"
        const glowSize = PX * 3
        sCtx.fillRect(fx - PX, fy - PX, glowSize, glowSize)

        sCtx.globalAlpha = 0.5 + glow * 0.5
        sCtx.fillStyle = "#FFFDF0"
        sCtx.fillRect(fx, fy, PX, PX)
      }

      requestAnimationFrame(animLoop)
    }
    animLoop()

    



    const handleResize = () => {
      resize()
      resizeSparkle()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("resize", resize)
      if (sparkleCanvas.parentElement) sparkleCanvas.parentElement.removeChild(sparkleCanvas)
    }
  }, [])

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          imageRendering: "pixelated",
        }}
      />
    </div>
  )
}

export default EnchantedBackground