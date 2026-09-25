# MATCHED — The Memory Game

A responsive memory game built from scratch using **HTML, CSS, and JavaScript**.

This project was created as the **final project for a Domestika course**, with the main goal of putting into practice the fundamentals of HTML, CSS, and JavaScript, while experimenting with layouts, responsive design, DOM manipulation, and interactive game logic.

🔗 **[Live Demo](https://matched-memorygame.netlify.app/)**

---

## About the Project

**MATCHED** is a browser-based memory game where the player has to find and match every pair of cards while managing a limited number of moves.

The game includes **14 levels**, progressively increasing the number of cards from **4 to 30**. Each game keeps track of the player's total time and available moves, creating a simple progression where the difficulty increases as the player advances.

The project was intentionally kept within **vanilla HTML, CSS, and JavaScript**, without frameworks or libraries, so that the focus remained on practicing the fundamentals of front-end development.

---

## How It Works

The objective is simple: reveal cards two at a time and find their matching pairs.

Each level:

* Starts with a different number of cards.
* Randomizes the position of the cards.
* Tracks the player's total time.
* Tracks the number of moves used and the remaining moves.
* Keeps successfully matched pairs revealed.
* Ends when all pairs have been matched or the player runs out of moves.

When a level is completed, the player can continue to the next one. Completing all 14 levels displays a final results screen with final stats.

---

## Features

* **14 playable levels**
* **4–30 cards**, increasing progressively between levels
* Card shuffling
* Pair matching system
* Move counter with a maximum number of moves
* Total game timer
* Match counter
* Win and loss screens
* Level progression
* Final screen after completing all levels
* Retry and replay functionality
* Interactive card animations
* Sound effects for interactions
* Responsive layout for different screen sizes
* Mobile navigation
* Dynamic DOM manipulation using JavaScript

---

## UI & UX

### User Interface

The visual design was created around a bold, editorial-inspired interface with strong typography, defined borders, large visual elements, and a deliberately simple color palette.

The initial visual direction was inspired by **Neo-Brutalism**, particularly its use of:

* Strong borders
* High visual contrast
* Large typography
* Simple geometric layouts
* Bold buttons and UI elements
* Minimal decorative elements

However, as the project developed, the design gradually moved away from a strict Neo-Brutalist style. The final result keeps some of those characteristics while developing its own visual direction, with a cleaner and more game-oriented interface.

The design was also created with responsiveness in mind, adapting the layout and card grid to smaller screens rather than treating the desktop version as the only target.

### User Experience

The interface was designed to keep the game state visible while the player is playing.

The top section provides the main game information, including:

* Current time
* Current moves
* Number of matched pairs

The level selection allows the player to choose their starting difficulty, while the win and loss screens provide clear feedback about the result of each game.

The limited-move mechanic also gives the game a simple risk/reward element: the player has to remember previous cards while making efficient use of their available moves.

---

## Design Process & Inspiration

The project started from an interest in experimenting with a **Neo-Brutalist visual style**.

The intention was not to reproduce a strict Neo-Brutalist design system, but to use some of its visual characteristics as a starting point and adapt them to a memory game.

During development, the original idea evolved naturally as different layouts, typography, spacing, colors, and game components were implemented. As a result, the final interface is influenced by Neo-Brutalism without being a direct example of the style.

The project was developed as a learning exercise, so the visual design and implementation were created specifically for this project while using external references and assets where appropriate.

---

## Technologies

### HTML5

Used to build the semantic structure of the game and its different sections, screens, controls, and game elements.

### CSS3

Used for:

* Layout
* Flexbox
* CSS Grid
* Responsive design
* Animations and transitions
* Card flipping effects
* Typography
* UI styling

### JavaScript

Used for the game logic and dynamic behavior, including:

* DOM manipulation
* Event handling
* Card generation
* Card matching
* Randomization
* Level management
* Move tracking
* Timer functionality
* Game state management
* Win/loss conditions
* Dynamic UI updates

No JavaScript frameworks or external libraries were used.

---

## Project Structure

```text
MATCHED/
├── SVGs/
├── audio/
├── css/
├── js/
└── index.html
```

The project keeps the main HTML, styling, JavaScript, SVG assets, and audio files separated into their respective directories.

---

## Assets & Credits

This project uses external assets for some of its visual and audio elements.

All third-party assets used in the project are credited below, including their original source whenever applicable.

### Design References

The following websites were used as visual references and sources of inspiration during the design process:

- **[ALEBRIJES — MEMORY GAME](https://alebrijes.netlify.app/)** — I used it as a reference for the project structure and to refresh my JavaScript fundamentals.
- **[Flagly](https://flagly.vercel.app/)** — My main visual inspiration, whose style I wanted to recreate with my own adaptations.

> Thanks to both projects for the inspiration and for helping me shape both the visual design and project structure of MATCHED!

### Icons & SVGs

- **[antimateria +194 (brutalism inspired icon set)](https://klimkowska.gumroad.com/l/antimateria194)** by Justyna Klimkowska.
- **[Book of Shapes](https://bookofshapes.com/)** — A fun and easy-to-use resource that helped me experiment with different SVG shapes.

### Audio

- **[Kenney — UI Audio](https://kenney.nl/assets/ui-audio)** — Thanks to Kenney for providing this excellent UI sound pack, which I used for the buttons and interface interactions.
- **[Mixkit — Interface Sound Effects](https://mixkit.co/free-sound-effects/interface/)** — A simple and easy-to-use resource that helped me find the success and error sounds used throughout the game.

### Fonts

- **[Google Fonts](https://fonts.google.com/)** — The project uses **DM Serif Text** and **Inter** for its typography.

> The external assets listed above are not original creations of this project. They are used for educational and non-commercial purposes as part of a practice project.

---

## What I Practiced

This project was mainly an opportunity to reinforce the fundamentals I had previously learned and put them together in a complete interactive webpage.

Some of the main concepts practiced were:

* CSS Flexbox
* CSS Grid
* Responsive layouts
* DOM manipulation
* JavaScript event handling
* Arrays and objects
* Functions and control flow
* Dynamic HTML generation
* Managing application state with vanilla JavaScript
* CSS transitions and animations
* Building an interactive interface without a framework

Rather than relying on a framework, the project was intentionally developed using vanilla JavaScript to better understand what is happening underneath the abstractions provided by modern front-end tools.

---

## Course Context

MATCHED was created as the **final project for a Domestika course**.

The project was developed as a practical exercise to revisit and reinforce HTML, CSS, and JavaScript fundamentals, with particular attention to **Flexbox, CSS Grid, responsive design, and basic JavaScript interaction**.

Although the project is relatively simple in scope, it was useful as a way to bring several front-end concepts together into a complete, functional application.

---

## Live Demo

**[Play MATCHED](https://matched-memorygame.netlify.app/)**

---

## Author

**Antonio Jesus**

Designed and built from scratch as a personal practice project.

**GitHub:** [@Galaceon](https://github.com/Galaceon)  
**Email:** [antoniogarcialtr@gmail.com](mailto:antoniogarcialtr@gmail.com)
