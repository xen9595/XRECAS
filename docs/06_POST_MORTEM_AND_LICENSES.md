# Document 6: Post-Mortem Analysis & Licenses Table

## 1. Post-Mortem Analysis: "The Most Difficult Bug / Problem"

### The Challenge: WebXR Session Handshake & Coordinate Desynchronization in OrbitControls
- **Symptom**:
  When transitioning from standard 2D mouse inspection to WebXR immersive mode (`immersive-vr` / `immersive-ar`), the camera position would instantly jump to coordinate `(0, 0, 0)`, clip through the product geometry, and cause severe disorientation. Furthermore, mouse orbit controls attempted to continuously override the WebXR headset pose matrices, causing camera stutter at 60Hz.

- **Root Cause Analysis**:
  `THREE.OrbitControls` maintains internal spherical coordinates (`radius`, `phi`, `theta`) and updates the camera's `position` and `quaternion` on every animation tick. However, when a WebXR session is active, the WebXR manager in Three.js overrides the camera matrix with headset/device tracking poses. The two systems engaged in a race condition on `camera.matrixWorldNeedsUpdate`, causing the camera to vibrate between the headset pose and the desktop mouse target.

- **Resolution & Mitigation**:
  The issue was resolved by implementing an XR session listener that gracefully detaches OrbitControls upon session initiation and creates a parent camera rig container (`THREE.Group`):

```javascript
// Fix: Decouple OrbitControls from Camera matrix during active WebXR sessions
renderer.xr.addEventListener('sessionstart', () => {
    controls.enabled = false; // Disable orbit listener
    cameraRig.position.set(0, 1.2, 1.5); // Place user at eye level
    console.log('[WebXR] Immersive session engaged: OrbitControls detached.');
});

renderer.xr.addEventListener('sessionend', () => {
    controls.enabled = true; // Re-enable desktop orbit controls
    camera.position.set(0, 1.5, 3.5);
    controls.target.set(0, 0, 0);
    console.log('[WebXR] Immersive session ended: OrbitControls restored.');
});
```

---

## 2. Licenses & Provenance Matrix

| Element / Library | Origin / Creator | License | Usage Scope in Project |
| :--- | :--- | :--- | :--- |
| **Three.js** | Mr.doob / Three.js Authors | MIT License | Core 3D WebGL renderer and scene graph engine |
| **WebXR Device API** | W3C Immersive Web WG | Open Web Standard | Headset and mobile AR/VR session management |
| **Google Antigravity** | Google DeepMind | Commercial / Educational Platform | Multi-agent development environment & orchestration |
| **Model Context Protocol** | Anthropic / Open Source | MIT License | Standardized tool invocation protocols |
| **FontAwesome Icons** | Fonticons Inc. | CC BY 4.0 / SIL OFL | UI iconography for e-commerce cart and controls |
| **SpatialCommerce Core** | Student (Original Authorship) | MIT License | Application logic, AI Spatial UI parser, and styles |

---

## 3. Academic Submission & Repository Checklist
- [x] All 6 structured documents compiled and formatted in GitHub-compatible Markdown.
- [x] Visual Intelligence artifacts (Mermaid diagrams, code listings, architecture schemas) embedded.
- [x] Working WebXR 3D prototype with AI Spatial UI provided in `src/`.
- [x] Multi-agent rules and custom skills registered in `.agents/`.
- [x] GitHub repository created and collaborator access granted to reviewer: **`wczart`**.
- [x] Submission delivered via MS Teams chat with repository link.
