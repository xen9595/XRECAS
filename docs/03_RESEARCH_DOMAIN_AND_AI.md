# Document 3: Domain & AI Technology Research Report

## Part A: E-Commerce Product Domain Research

### 1. Market & Target Group Analysis
- **Target Audience**:
  - *Direct Consumers*: Online shoppers buying footwear, consumer electronics, and lifestyle goods who hesitate before buying due to lack of physical tactile evaluation.
  - *Merchants & Retailers*: E-commerce brands suffering from high return rates (average 24.4% for apparel and accessories in 2024-2025 according to NRF benchmarks) and stagnant conversion rates.
- **Identified Pain Points**:
  1. *Flat Visual Ambiguity*: 2D photographs fail to accurately convey surface depth, material reflectivity (matte vs. metallic), and true scale.
  2. *Cumbersome Product Customization*: Traditional color pickers offer rigid, pre-baked previews rather than dynamic, personalized visual explorations.
  3. *High Friction of Native Mobile AR*: Many AR solutions force users to download proprietary mobile apps rather than providing instant WebXR previews directly within the browser.

---

### 2. Competitive Landscape & Comparative Benchmarks

| Solution | Key Strengths | Limitations / Weaknesses | SpatialCommerce 3D Advantage |
| :--- | :--- | :--- | :--- |
| **Sketchfab 3D Embed** | High visual fidelity, broad file format support | Heavy iframe embed, limited e-commerce cart hooks, no AI dialogue | Native WebXR widget, lightweight Three.js runtime, zero iframe sandbox |
| **Shopify AR (USDZ/GLTF)** | Built-in Apple QuickLook / Google SceneViewer | Limited to static model placement; cannot customize materials dynamically | Real-time procedural PBR shaders and conversational customizer |
| **Spline 3D Web Viewer** | Modern no-code web animations | High bundle size, paid proprietary cloud export, no agentic AI hooks | Fully open-source, local-first code, agent-orchestrated architecture |

---

## Part B: AI Domain Research & Functional Separation

### 1. AI vs. Non-AI Functional Matrix
To prevent architectural bloat, system capabilities are systematically partitioned between deterministic software engineering and artificial intelligence:

```
+-----------------------------------------------------------------------------------+
|                           System Functional Allocation                            |
+-----------------------------------------------------+-----------------------------+
| Traditional Non-AI Deterministic Execution          | AI-Augmented / Agentic Logic|
+-----------------------------------------------------+-----------------------------+
| • WebGL Canvas Rendering loop (60 FPS)              | • Natural Language Intent   |
| • Matrix transformations & orbit calculations       |   Parsing (Spatial UI)      |
| • Three.js PBR shader compilation                   | • Semantic color & finish   |
| • E-commerce cart state & pricing math              |   attribute mapping         |
| • Local DOM event dispatching & button triggers     | • Multi-agent project tasks |
| • WebXR Device API session initialization           | • Automated code synthesis  |
+-----------------------------------------------------+-----------------------------+
```

---

### 2. AI Workshop Infrastructure Evaluation
- **Google Antigravity**:
  - Provides native multi-agent coordination, progressive skill activation (`SKILL.md`), hierarchical rule enforcement (`AGENTS.md`), and seamless Model Context Protocol (MCP) tool bindings.
- **NotebookLM & Gemini 2.5/Flash**:
  - Leveraged as research assistants during the initial literature and requirements gathering phase, enabling rapid cross-referencing of academic papers on WebXR and agent orchestration.
- **Model Context Protocol (MCP)**:
  - Standardizes two-way communication between local agent runtimes and workspace utilities (filesystem manipulation, real-time documentation retrieval).
