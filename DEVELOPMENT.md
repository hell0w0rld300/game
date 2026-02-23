# Development Guide - Tower Defense Pro

This guide helps developers set up the project locally and contribute.

## 🔧 Local Development Setup

### Prerequisites
- Node.js 14+ (optional, for serving files)
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code recommended)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/hell0w0rld300/game.git
cd game

# No npm dependencies needed! This is a vanilla JS game
```

### Running Locally

#### Option 1: Python HTTP Server (Recommended)
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Visit: http://localhost:8000/public
```

#### Option 2: Node HTTP Server
```bash
npm install -g http-server
http-server public
# Visit: http://localhost:8080
```

#### Option 3: VS Code Live Server
- Install "Live Server" extension
- Right-click `public/index.html`
- Select "Open with Live Server"

#### Option 4: Using npm scripts
```bash
npm run serve
```

## 📁 Project Structure

```
public/
├── index.html                # Main entry point (1 file)
│
├── styles/                   # Stylesheets (5 files, ~800 lines)
│   ├── main.css             # Global styles, theme
│   ├── hud.css              # HUD and layout
│   ├── towers.css           # Tower UI, menu screens
│   ├── enemies.css          # Enemy visuals
│   └── settings.css         # Settings and lobby
│
└── scripts/                  # Game logic (26 files, ~3,700 lines)
    ├── config.js            # Game configuration
    ├── constants.js         # Game constants and formulas
    ├── i18n.js              # Bilingual system
    ├── gameState.js         # Central state manager
    ├── game.js              # Main game loop
    │
    ├── towers/              # Tower implementations (7 files)
    │   ├── tower.js         # Base Tower class
    │   ├── arrow.js         # ArrowTower class
    │   ├── cannon.js        # CannonTower class
    │   ├── ice.js           # IceTower class
    │   ├── tesla.js         # TeslaTower class
    │   ├── inferno.js       # InfernoTower class
    │   └── chronos.js       # ChronosTower class
    │
    ├── enemies/             # Enemy implementations (5 files)
    │   ├── enemy.js         # Base Enemy class
    │   ├── normal.js        # NormalEnemy class
    │   ├── armored.js       # ArmoredEnemy class
    │   ├── swift.js         # SwiftEnemy class
    │   └── boss.js          # BossEnemy class
    │
    ├── systems/             # Core game systems (7 files)
    │   ├── audio.js         # Audio system
    │   ├── particles.js     # Particle effects
    │   ├── physics.js       # Collision and projectiles
    │   ├── renderer.js      # Canvas rendering
    │   ├── waves.js         # Wave spawning system
    │   └── multiplayer.js   # Multiplayer framework
    │
    └── ui/                  # User interface (2 files)
        ├── hud.js           # HUD updates and management
        └── menu.js          # Menu navigation
```

## 🎯 Code Organization

### Initialization Flow
1. `index.html` loads all CSS and JS files
2. Configuration loaded from `config.js`
3. Game state initialized in `gameState.js`
4. Game loop starts in `game.js`
5. Menu displayed by `ui/menu.js`

### Game Loop
```
game.js: tick() → game loop
  ├─ Input handling
  ├─ Update phase:
  │  ├─ Tower shooting
  │  ├─ Enemy movement
  │  ├─ Projectile motion
  │  ├─ Wave system
  │  └─ Particle updates
  └─ Render phase:
     ├─ Canvas clear/background
     ├─ Draw path, enemies, towers
     ├─ Draw projectiles, particles
     └─ Update HUD
```

### Class Hierarchy

```
Tower (abstract base)
├── ArrowTower
├── CannonTower
├── IceTower
├── TeslaTower
├── InfernoTower
└── ChronosTower

Enemy (abstract base)
├── NormalEnemy
├── ArmoredEnemy
├── SwiftEnemy
└── BossEnemy
```

## 🔨 Development Workflow

### Making Changes

1. **Edit a file**
   ```bash
   # Example: Modify tower damage
   nano public/scripts/constants.js
   ```

2. **Reload in browser**
   - Live Server: Auto-reloads
   - Manual: Press F5 or Cmd+R

3. **Check console for errors**
   - Press F12 to open DevTools
   - Check Console tab for errors

4. **Test your changes**
   - Play through a full game
   - Test all affected features
   - Check mobile responsiveness

### Common Development Tasks

#### Add a new tower type

1. **Create tower class**
   ```javascript
   // public/scripts/towers/mythic.js
   class MythicTower extends Tower {
       constructor(gridX, gridY) {
           super(gridX, gridY, 'mythic');
       }

       onShoot(target, allTargets) {
           // Implementation
       }
   }
   ```

2. **Add to constants**
   ```javascript
   // In constants.js TOWER_TYPES object
   mythic: {
       name: 'mythic',
       emoji: '✨',
       baseCost: 400,
       baseStats: {
           damage: 30,
           fireRate: 8,
           range: 5,
       }
   }
   ```

3. **Add HTML script tag**
   ```html
   <!-- In index.html -->
   <script src="scripts/towers/mythic.js"></script>
   ```

4. **Add to tower selector**
   ```javascript
   // In getTowerClass() function in game.js
   mythic: MythicTower,
   ```

#### Add a new enemy type

1. **Create enemy class**
   ```javascript
   // public/scripts/enemies/laser.js
   class LaserEnemy extends Enemy {
       constructor(waveNumber) {
           super('laser', waveNumber);
           // Custom properties
       }
   }
   ```

2. **Add to constants**
   ```javascript
   // In constants.js ENEMY_TYPES object
   laser: {
       name: 'laser',
       emoji: '🔴',
       baseHealth: 60,
       baseSpeed: 2,
       baseReward: 20,
       armor: 0.15,
   }
   ```

3. **Add HTML script tag and to wave spawning**

#### Modify game balance

Edit `public/scripts/config.js`:
- `GAME.STARTING_LIVES` - Initial health
- `GAME.STARTING_GOLD` - Starting resources
- `DIFFICULTY` - Difficulty multipliers
- `TOWERS.UPGRADE_COST_MULTIPLIER` - Tower upgrade costs
- `ENEMIES.BASE_HP_MULTIPLIER` - Enemy scaling

#### Change UI text

Edit `public/scripts/i18n.js`:
- Modify English strings in `I18N.en`
- Modify Chinese strings in `I18N.zh`
- Add new string keys as needed

#### Debug issues

1. **Open DevTools** (F12)
2. **Check Console for errors**
3. **Use debugger statements**
   ```javascript
   debugger; // Execution pauses here
   ```
4. **Log to console**
   ```javascript
   console.log('Debug:', variable);
   ```

## 🧪 Testing

### Manual Testing Checklist

#### Game Mechanics
- [ ] All 6 towers can be placed
- [ ] Towers shoot at enemies
- [ ] Towers can be upgraded to level 3
- [ ] Towers sell for 60% refund
- [ ] All 4 enemy types spawn correctly
- [ ] Boss spawns every 5 waves
- [ ] Enemies follow the path
- [ ] Lives decrease when enemies escape
- [ ] Gold earned on kill matches reward
- [ ] Score increases with kills

#### UI
- [ ] All buttons clickable
- [ ] Settings save correctly
- [ ] Language switching works
- [ ] HUD updates in real-time
- [ ] Pause/Resume works
- [ ] Speed toggle works (1× and 2×)
- [ ] Game over screen shows stats
- [ ] Play again button restarts game

#### Audio
- [ ] Sound effects play (mute/unmute works)
- [ ] No console audio errors

#### Responsive
- [ ] Desktop: 1920×1080 resolution
- [ ] Tablet: iPad size
- [ ] Mobile: iPhone size (375×667)
- [ ] Landscape and portrait

### Browser Compatibility
Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome
- [ ] Mobile Safari

## 📊 Performance Profiling

1. **Open DevTools** (F12)
2. **Go to Performance tab**
3. **Click Record**
4. **Play game for 30 seconds**
5. **Stop recording**
6. **Analyze frame rate and memory**

Target metrics:
- ✅ 60 FPS during gameplay
- ✅ < 50MB memory usage
- ✅ < 16ms per frame

## 🔍 Code Quality

### Style Guidelines

```javascript
// ✅ Good: Clear variable names
const enemySpeed = 1.5;

// ✅ Good: Comments for complex logic
// Calculate armor reduction
const actualDamage = damage * (1 - enemy.armor);

// ❌ Bad: Unclear abbreviations
const es = 1.5;

// ❌ Bad: No comments on complex code
const ad = d * (1 - e.a);
```

### Performance Tips

1. **Cache calculations**
   ```javascript
   // ❌ Bad: Recalculating each frame
   for (let i = 0; i < towers.length; i++) {
       const cost = getTowerUpgradeCost(tower.cost, tower.level);
   }

   // ✅ Good: Cache the value
   const upgradeCost = getTowerUpgradeCost(tower.cost, tower.level);
   ```

2. **Reuse objects**
   ```javascript
   // Use particle pooling instead of creating new objects
   particleSystem.emit(x, y, type);
   ```

3. **Batch operations**
   ```javascript
   // Update all towers at once
   gameState.towers.forEach(tower => tower.update());
   ```

## 📝 Committing Changes

```bash
# View changes
git status

# Add specific files
git add public/scripts/game.js

# Or add all
git add -A

# Commit with message
git commit -m "Fix: Tower range calculation for ice towers"

# Push to remote
git push origin main
```

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `docs`: Documentation
- `style`: CSS/style changes
- `test`: Testing

**Example:**
```bash
git commit -m "feat: Add laser tower with beam attack

- Implements new tower type with instant laser beam
- Beam travels through multiple enemies
- High fire rate, medium damage
- Cost: 280 gold

Closes #42"
```

## 🚀 Building for Production

### Minification (Optional)

```bash
# Install minifiers
npm install -g terser

# Minify JavaScript
terser public/scripts/game.js -c -m -o public/scripts/game.min.js

# Update HTML to use minified version
# Change: <script src="scripts/game.js"></script>
# To: <script src="scripts/game.min.js"></script>
```

### Compression

Images and assets are already optimized.

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📞 Getting Help

- Check existing GitHub issues
- Review code comments
- Test in browser DevTools
- Ask in project discussions

---

**Last Updated**: February 2026
**Happy Coding!** 🎮
