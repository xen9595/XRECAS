---
name: webxr-widget-builder
description: >-
  Use this skill to design, build, test, and document the dynamic Three.js/WebXR interactive 3D product visualizer widget embedded in the e-commerce storefront.
---

# WebXR E-Commerce Widget Builder

This skill provides the engineering specifications and implementation guidelines for creating the 3D / WebXR product visualizer component.

## Architecture

The 3D component is built using standard, framework-agnostic web technologies for maximum portability and zero-friction deployment:
- **Renderer**: Three.js (WebGL & WebXR Device API compliant).
- **Scene Dynamics**: Orbit controls, studio lighting (Key, Fill, Rim), procedural/PBR materials, smooth turntable animation.
- **AI Spatial Interface (Spatial UI)**:
  - Natural Language interface allowing users to instruct the 3D scene (e.g., *"Make it matte black with neon cyan accents"*, *"Explode the mesh view"*, *"Zoom into the sneaker sole"*).
  - Speech-to-Text (Web Speech API) -> Agentic / LLM Command Interpretation -> Direct Three.js Scene Execution.
- **E-Commerce Context**: Embedded alongside product title, SKU, price, variant selector, and responsive checkout cart.

## Implementation Checklist

1. **Create HTML/CSS/JS Shell** in `src/`:
   - `index.html`: Clean, responsive e-commerce layout featuring the 3D viewport canvas.
   - `styles.css`: Modern glassmorphic aesthetic with dark-mode contrast.
   - `app.js`: Three.js scene setup, WebXR session support, procedural geometry generation / GLTF loader, and AI command parser.

2. **Verify Local Launch**:
   - Provide a zero-dependency local dev server script (e.g., Python `http.server` or Node `npx serve`).
   - Test user interaction (mouse drag, touch rotate, zoom, VR/AR launch button).

3. **Capture Visual Evidence**:
   - Record screenshots of the running 3D widget, mesh inspector, and AI spatial commands for inclusion in `FINAL_SYNTHESIS_REPORT.md`.
