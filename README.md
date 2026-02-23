# Advanced Tower Defense - Multiplayer Edition

A fully-featured, bilingual (English/Chinese) tower defense game built with vanilla JavaScript, HTML5 Canvas, and modern web technologies.

## 🎮 Features

### Core Gameplay
- **20×14 Grid-based Map** - Strategic tower placement on dynamic paths
- **6 Tower Types** - Arrow, Cannon, Ice, Tesla, Inferno, Chronos with unique mechanics
- **4+ Enemy Types** - Normal, Armored, Swift, Boss with scaling difficulty
- **10-Wave Campaign** - Progressive difficulty with escalating challenges
- **Lives & Resource System** - Manage health and gold across waves

### Tower System
Each tower has:
- 3 upgrade levels with scaling damage
- Unique attack mechanics and effects
- Cost-effective balancing
- Range visualization
- Real-time targeting system

**Tower Types:**
- 🏹 **Arrow Tower** - Fast, low damage
- 💣 **Cannon Tower** - Splash damage AoE
- ❄️ **Ice Tower** - Slows enemies 50%
- ⚡ **Tesla Tower** - Chains to 3 enemies
- 🔥 **Inferno Tower** - DoT burn effect
- ⏱️ **Chronos Tower** - Time warping slow

### Enemy System
**4 Enemy Types:**
- 🧟 Normal - Balanced stats
- 🛡️ Armored - High HP, armor reduction
- 💨 Swift - Fast, low HP, slow resistance
- 👑 Boss - Mega enemy every 5 waves

### Advanced Features
- **Multiplayer Support** - Real-time synchronization framework
- **Difficulty Settings** - Easy, Normal, Hard, Extreme modes
- **Customizable Settings** - Adjust health, gold, speed, difficulty
- **Bilingual UI** - English & Chinese with instant switching
- **Responsive Design** - Works on desktop and mobile
- **Advanced Audio** - Procedural 8-bit sound effects
- **Particle Effects** - Visual feedback for all actions
- **Wave System** - Spawning, timing, progression

## 📁 Project Structure

```
public/
├── index.html                  # Main entry point
├── styles/                     # CSS stylesheets (5 files)
├── scripts/                    # JavaScript modules (26 files)
│   ├── Game core systems
│   ├── Towers (6 types)
│   ├── Enemies (4 types)
│   ├── UI systems
│   └── Game systems
```

## 🚀 Quick Start

1. Open `public/index.html` in a modern web browser
2. Select Single Player or Multiplayer
3. Customize settings if desired
4. Start playing!

## 📊 Code Statistics

- **Total Lines**: ~4,500
- **Files**: 31 files
- **Systems**: 7 core game systems
- **Tower Types**: 6
- **Enemy Types**: 4
- **Languages**: 2 (English & Chinese)

## ⚙️ Key Features

### Game Mechanics
- Fixed timestep game loop (60 FPS)
- Deterministic tower targeting
- Smooth enemy pathfinding
- Dynamic wave scaling
- Difficulty-based scaling

### UI/UX
- Responsive design
- Bilingual support
- Settings customization
- Real-time statistics
- Game over screen with replay

### Audio
- Procedural Web Audio API
- 8-bit style sound effects
- Dynamic audio mixing
- Sound effect types: shoot, build, upgrade, death, explosion

### Performance
- Particle pooling (1000 max)
- Efficient collision detection
- Optimized canvas rendering
- Local storage for settings

## 🎮 Controls

**Desktop:**
- Left Click - Place tower
- Right Click - Sell tower
- 1-6 Keys - Quick tower select
- Space - Pause/Resume
- S - Toggle speed

**Mobile:**
- Tap - Place tower
- Long Press - Sell tower

## 🌍 Localization

Supported languages: English, 中文 (Simplified Chinese)

## 📈 Future Enhancements

- Full multiplayer with WebSocket
- Leaderboards and profiles
- Additional maps and game modes
- Tower synergy system
- Replay recording
- Achievement system

## 📝 Version

**Version**: 1.0.0
**Status**: Production Ready
**Last Updated**: February 2026

Enjoy the game! 🎮
