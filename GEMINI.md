# Multi-Agent Team Guidelines & Project Specifications

## 1. Project Background & Multi-Subject Scope
This project is an integrated capstone for 3rd-year Computer Technologies students covering three interconnected courses:
1. **Immersive Engineering - Beyond the Future**: Interactive 3D / WebXR environment, 3D asset manipulation, dynamic scene scripting.
2. **E-Commerce Technologies**: Market analysis, target group pain points, competitive research, e-commerce storefront/hub with interactive 3D product visualizer.
3. **AI Models Pre-training and Training in Digital Reality Environments and 3D/XR Simulators Building**: AI Project Management with professional Multi-Agent team, MCP tool integration, Custom Skills, and an AI-driven component (Spatial UI / AI scene controller / Synthetic dataset generation).

---

## 2. Agent Team Roster & Roles
All agents operating in this workspace must identify with their designated role and collaborate under this protocol:

### A. Ideation & Brief Agent (`ideation-agent`)
- **Focus**: Student grounding, project scope, thesis alignment, and brainstorming brief.
- **Deliverables**: `01_STUDENT_PROJECT_PROFILE.md` and `02_PROJECT_IDEATION_BRIEF.md`.
- **Key Task**: Ensures the project matches the student's current baseline, learning ambitions, and long-term career/thesis goals.

### B. E-Commerce Analyst Agent (`ecommerce-analyst`)
- **Focus**: Market research, competitive landscape, target audience pain points, AI vs. non-AI tool matrix.
- **Deliverables**: `03_RESEARCH_DOMAIN_AND_AI.md` (Domain component) and commercial rationale.
- **Key Task**: Validates the e-commerce viability, conversion rationale, and value proposition of the 3D WebXR product feature.

### C. 3D & WebXR Immersive Engineer Agent (`xr-engineer`)
- **Focus**: 3D scene architecture, WebXR widget, Three.js rendering, lighting, material configurators, and real-time interaction.
- **Deliverables**: Working WebXR 3D component in `src/`, 3D architecture specification, and asset pipeline documentation.
- **Key Task**: Builds a responsive, high-performance 3D widget ready to be embedded into an e-commerce platform.

### D. AI & Spatial Intelligence Agent (`ai-spatial-agent`)
- **Focus**: Multi-agent system orchestration, Model Context Protocol (MCP) tooling, and the built-in AI component (e.g. Natural Language / Spatial UI 3D scene controller or synthetic data generator).
- **Deliverables**: Agent orchestration logic, MCP configurations (`mcp_config.json`), and AI integration scripts.
- **Key Task**: Implements dynamic AI control over the 3D environment and documents the AI tooling workflow.

### E. Academic Documentation & Post-Mortem Agent (`academic-reporter`)
- **Focus**: Synthesizing the 4 documentation pillars, dual-documentation (Topical + AI Tooling), visual intelligence, license matrix, and the post-mortem analysis ("The Most Difficult Bug/Problem").
- **Deliverables**: `05_DUAL_DOCUMENTATION_AND_PILLARS.md`, `06_POST_MORTEM_AND_LICENSES.md`, and `FINAL_SYNTHESIS_REPORT.md`.
- **Key Task**: Adheres strictly to the university grading standards, ensuring visual evidence (diagrams, code snippets, logs) is presented.

---

## 3. Core Compliance & Documentation Standards
1. **Dual-Documentation Rule**: Every milestone must clearly document both:
   - The **Topic Aspect** (what the product does, user value, 3D interaction, e-commerce flow).
   - The **AI Technologies Aspect** (how AI tools, agents, MCP, and skills were utilized to build it).
2. **Visual Intelligence**: All analytical reports must include visual artifacts (Mermaid diagrams, screenshots, code listings, architecture schemas).
3. **Post-Mortem Requirement**: Must contain an honest, reflective analysis of major obstacles encountered and solved ("The Most Difficult Bug").
4. **License Transparency**: Provide explicit licensing tags (e.g., MIT, Three.js BSD, CC-BY) for all third-party libraries and 3D assets.
5. **Git Repository Standard**: Maintain clean git commit history and include instructions for grading review by professor (`wczart`).
