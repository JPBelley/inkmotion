/* ═══════════════════════════════════════════════════════════════════════════
   SPRING TEXT — jeanphilippebelley.com
   ─────────────────────────────────────────────────────────────────────────
   HTML — paste in the HTML pane:
   ─────────────────────────────────────────────────────────────────────────

   <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">

   <div id="stage">
     <span class="label">spring physics</span>
     <h1 class="text">Always cooking</h1>
     <div class="baseline"></div>
     <button id="replay">↺ replay</button>
   </div>

   <a href="https://jeanphilippebelley.com/" target="_blank" id="credit">
     JP<span>.</span>
   </a>

   ─────────────────────────────────────────────────────────────────────────
   CSS — paste in the CSS pane:
   ─────────────────────────────────────────────────────────────────────────

   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

   body {
     background: #F0EAE0;
     display: flex;
     align-items: center;
     justify-content: center;
     min-height: 100vh;
     font-family: 'DM Mono', monospace;
   }

   #stage {
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     padding: 40px 48px;
     position: relative;
   }

   .label {
     font-family: 'DM Mono', monospace;
     font-size: 10px;
     font-weight: 300;
     letter-spacing: 0.18em;
     text-transform: uppercase;
     color: #B0A090;
     margin-bottom: 20px;
   }

   .text {
     font-family: 'Instrument Serif', Georgia, serif;
     font-size: clamp(48px, 9vw, 110px);
     font-weight: 400;
     font-style: italic;
     color: #0E0C09;
     letter-spacing: -0.025em;
     line-height: 1;
     display: flex;
     flex-wrap: wrap;
   }

   .char { display: inline-block; white-space: pre; opacity: 0; }

   .baseline {
     width: 100%;
     height: 1px;
     background: #0E0C09;
     margin-top: 18px;
     opacity: 0.18;
   }

   #replay {
     margin-top: 28px;
     padding: 0;
     background: none;
     border: none;
     font-family: 'DM Mono', monospace;
     font-size: 11px;
     font-weight: 300;
     letter-spacing: 0.12em;
     color: #E6100F;
     cursor: pointer;
     text-transform: lowercase;
     transition: opacity 0.2s;
   }
   #replay:hover { opacity: 0.6; }

   #credit {
     position: fixed;
     bottom: 20px;
     right: 24px;
     font-family: 'DM Mono', monospace;
     font-size: 11px;
     font-weight: 300;
     letter-spacing: 0.1em;
     color: rgba(14,12,9,0.25);
     text-decoration: none;
     transition: color 0.2s;
   }
   #credit span { color: #E6100F; }
   #credit:hover { color: rgba(14,12,9,0.6); }

   ═══════════════════════════════════════════════════════════════════════════
   In the JS pane keep only ONE call at the bottom:
     run(anim_XX)   ← change XX (01–20) to switch
   ═══════════════════════════════════════════════════════════════════════ */
