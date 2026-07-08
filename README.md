# Interactive Diploma

An interactive 3D recreation of my Liberty University diploma, rendered in the browser with Three.js.

I graduated from Liberty University with a Bachelor of Science in Computer Science (Cybersecurity), and I wanted to do something more with my diploma than let it sit in a drawer. So I rebuilt it digitally — the leather presentation folder, the gold seal, the certificate — as an object you can pick up, rotate, open, and inspect from any angle. A small keepsake I can actually share.

**Live:** https://spairkie.github.io/interactive-diploma/

> A personal portfolio and keepsake project. This is not an official digital credential, a verification document, or a replacement for institutional records.

## Features

- Real-time 3D diploma viewer built on Three.js
- Drag to rotate, drag the cover to open, scroll/pinch to zoom, and hold Space or Shift while dragging to reframe
- Cinematic intro reveal on load
- One-click high-resolution screenshot export
- Procedurally generated textures for leather, moiré silk, paper, and gold foil
- Studio lighting with a real environment map for believable reflections
- Fully responsive, with touch gestures and mobile-tuned framing
- Accessibility-minded: keyboard focus, labels, and reduced-motion support
- Pure static site — no build step, no dependencies to install

## Controls

The public display is intentionally closer to zero UI now: the bottom cover/zoom/reframe dock has been removed so the diploma itself stays the main interface.


| Action | Input |
|---|---|
| Rotate | Drag anywhere on the canvas outside the cover |
| Open / close cover | Drag the cover directly, or double-click / double-tap the cover |
| Zoom | Scroll wheel, trackpad scroll, pinch gesture, or `+` / `-` keys |
| Reframe / pan | Hold `Space` or `Shift` and drag the canvas; on touch, use a two-finger drag. The diploma follows your drag direction naturally. |
| Center framing | `0` key |
| Keyboard orbit | Arrow keys |
| Reset view | Reset button (bottom-right), or `R` key |
| Export image | Export button (top-right) |
| Fullscreen | Fullscreen button (top-right) |

## File layout

- `index.html` loads the split CSS and JavaScript files.
- `404.html` is a fully self-contained copy of the same experience with CSS and local JavaScript inlined. This keeps the GitHub Pages fallback page functional even if someone lands on an unknown route.

## Run locally

It's a static site, so any local server works:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## URL options

| Parameter | Effect |
|---|---|
| `?skipIntro=1` or `?intro=0` | Skip the cinematic intro |
| `?debug=1` | Show the developer camera-tuning panel |

## Tech

Three.js (r128, via CDN) · vanilla JavaScript · procedural canvas textures · Google Fonts. No framework, no bundler.

## Why I built it

Part celebration, part challenge. I wanted to see how faithfully I could recreate a physical object in the browser — the weight of the cover, the way light catches the embossed seal, the texture of the paper — and end up with something personal I could send to family and friends instead of just a photo.

## License

© Hans Nii Torghor Sai. All rights reserved. Shared for viewing as a portfolio and keepsake; please don't reuse or redistribute the diploma artwork or reproduce it as a credential.