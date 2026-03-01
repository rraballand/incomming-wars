# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Incoming Wars** is a browser-based 1v1 turn-based strategy game with medieval fantasy theme. The entire application is a single `index.html` file (~735 lines) with embedded CSS and JavaScript. No build system, no package manager, no external JS dependencies.

## How to Run

Open `index.html` directly in a browser. No build step or server required.

## Tech Stack

- Pure HTML5, CSS3, Vanilla JavaScript (ES5 compatible)
- HTML5 Canvas API for battle animations
- Google Fonts (Cinzel, Almendra) loaded via CDN
- No frameworks, no npm, no build tools

## Architecture

### Single-File Structure (`index.html`)

| Section | Lines | Content |
|---------|-------|---------|
| `<style>` | ~9-126 | CSS with variables, flexbox layout, responsive breakpoints |
| HTML | ~127-187 | Two screens: start screen + game screen with overlays |
| `<script>` | ~188-732 | IIFE containing all game logic |

### State Management

Global state object `S` tracks turn number, phase (`"prep"` or `"battle"`), and per-player data (gold, income, HP, units, forge levels).

### Game Data Arrays

- **`ATK[]`** — 6 attack unit types (cost, atk, hp, income boost, speed, unlock turn)
- **`DEF[]`** — 5 defense unit types (cost, defense, hp, income boost, unlock turn)
- **`FRG[]`** — 4 forge upgrades (exponential cost scaling, multiplicative stat bonuses)

### Game Flow

1. **Prep phase** — Players buy attack/defense units and forge upgrades from shop panels
2. **Battle phase** — 5-step animated sequence on canvas: March → Defend1 → Defend2 → Attack → Impact
3. **Results** — Damage applied to castles, income awarded, next turn or game over

### Canvas Animation System

- `requestAnimationFrame` loop at 60fps
- Particle system for explosions/dust effects
- Projectile system with ballistic arcs for defensive fire
- Screen shake effects array
- Phase-based animation state machine (`battleAnim.name`)

### Key Helper Functions

- `E(id)` — DOM element getter
- `find(arr, id)` — Linear search in data arrays
- `fm(p, eff)` — Forge multiplier calculator
- `simCombat()` — Pre-calculates battle results before animation
- `buildArmy()` — Creates positioned unit instances for canvas rendering

### Screen Management

Screens toggle via CSS classes (`.screen` / `.active`). Two main screens: `#start` and `#game`, plus result/game-over overlays.

## Code Conventions

- ES5 style: `var` declarations, no arrow functions, no `let`/`const`
- Short variable names throughout (e.g., `S` for state, `E` for element getter, `p` for player)
- Section comments use `// ══════ SECTION ══════` format
- CSS uses custom properties (`--gold`, `--p1`, `--p2`)