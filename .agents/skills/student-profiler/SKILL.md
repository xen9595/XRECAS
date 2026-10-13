---
name: student-profiler
description: >-
  Use this skill to conduct an interactive grounding interview with the student and formulate Document 1: Student Project Grounding Profile matching the course requirements.
---

# Student Project Grounding Profiler

This skill guides the agent in interviewing the student and building their **Student Project Grounding Profile** (`01_STUDENT_PROJECT_PROFILE.md`).

## Objectives
Ground the project strictly on the three pillars required by the syllabus:
1. Current baseline knowledge and technical skills.
2. New knowledge, frameworks, and AI paradigms the student wants to master.
3. Alignment with the student's final degree thesis and long-term professional career goal.

## Execution Steps

1. **Conduct Grounding Interview**:
   Ask the student targeted questions:
   - What programming languages and 3D/AI tools do you already know? (e.g., JavaScript/TypeScript, Python, Three.js, PyTorch, Unity, Blender).
   - What key technologies do you want to learn in this project? (e.g., WebXR, Autonomous AI Agents, MCP, synthetic data generation).
   - What is your intended Bachelor/Master thesis topic?
   - What are your career aspirations? (e.g., Full-Stack AI Engineer, XR Developer, Creative Technologist).

2. **Generate Document**:
   Populate `docs/01_STUDENT_PROJECT_PROFILE.md` with structured sections:
   - Section 1: Baseline Competencies Matrix.
   - Section 2: Learning Horizons & Target Skills.
   - Section 3: Thesis & Capstone Convergence.
   - Section 4: Long-Term Career Trajectory Alignment.

3. **Validation**:
   Confirm that the selected project scope provides sufficient learning challenge for a grade 5.0 while remaining achievable within the semester timeline.
