# User Preferences & Feedback Log

## 1. Core Thematic Preferences
- **Theme Selection:** The user explicitly prefers the **Naruto Theme** over the Clash of Clans (CoC) theme. Any future UI work or asset generation should prioritize Naruto-themed elements (Konoha/Akatsuki aesthetics, chakra glows, hand-sign motifs).
- **Aesthetic Standard:** The user has an extremely high standard for visual fidelity. They rejected earlier versions of the Naruto theme for not matching the "premium" feel of the CoC theme. The UI must look and feel like a high-budget gaming interface.

## 2. UI / UX Design Engineering (Emil Kowalski Philosophy)
The user explicitly invoked Emil Kowalski's design engineering principles. All future components must adhere to:
- **True 3D Depth:** Flat design is unacceptable. Elements should use `framer-motion` springs for hover interactions, `transform-style: preserve-3d`, and `translateZ` on child elements to create authentic parallax depth.
- **Snappy Animations:** Avoid linear or sluggish `ease-in` transitions. Always use custom, punchy cubic-bezier curves (e.g., `cubic-bezier(0.23, 1, 0.32, 1)`).
- **Responsive Interactions:** Buttons and interactive elements must provide instant tactile feedback (e.g., `transform: scale(0.96)` on `:active`).
- **Image Quality:** Raw assets must "POP". Always apply CSS filters (`brightness`, `contrast`, `saturate`) to images to ensure they don't look muted against rich backgrounds.
- **Color Harmony:** Use complex, multi-layered gradients, drop-shadows, and `backdrop-blur` glassmorphism to blend elements together. Avoid basic hex colors.

## 3. Corrections Made During Session
- **Broken 3D Mechanics:** `rotateX` and `rotateY` motion values were initially applied to a plain `<div>` instead of a `<motion.div>`, breaking the 3D tilt. **Lesson:** Always verify `framer-motion` components are used correctly for animated values.
- **Invalid CSS:** An invalid RGBA value (`rgba(24cfebd0...)`) broke the Konoha scroll background. **Lesson:** Double-check hex-to-rgba conversions in `index.css`.
- **Syntax Errors During Batch Editing:** Using multi-line replacements caused temporary syntax errors (unclosed `<div>` and `<h3>` tags) in `Team.jsx` and `Timeline.jsx`. **Lesson:** When doing complex structural replacements, always double-check opening and closing tags, and rely on `run_command` builds (`npm run build`) to catch React compilation errors instantly.

## 4. What to do differently next time
- **Start with Maximum Polish:** Instead of starting with MVP (Minimum Viable Product) UI and waiting for the user to request improvements, default to extreme visual polish (glassmorphism, particle engines, 3D tilts) right out of the gate.
- **Proactive Verification:** Always run `npm run build` after making structural changes across multiple files to ensure zero downtime or broken states for the user.
- **Read the Skill Files:** The user values the `emil-design-eng` skill. Apply its principles proactively to every new component without needing to be prompted.
