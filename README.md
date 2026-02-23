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

### Play Online
- **Deployment**: Ready for Vercel, Netlify, or any static host
- **Default Domain**: Deploy to `tower-defense-pro.vercel.app`
- See [DEPLOYMENT.md](DEPLOYMENT.md) for hosting guide

### Play Locally

```bash
# Option 1: Python HTTP Server (Recommended)
python3 -m http.server 8000
# Visit: http://localhost:8000/public

# Option 2: Using npm
npm run serve

# Option 3: VS Code Live Server
# Right-click public/index.html → Open with Live Server
```

**Then**: Select Single Player or Multiplayer → Customize settings (optional) → Start playing!

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

## 🚢 Deployment

### One-Click Deploy to Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hell0w0rld300/game)

### Manual Deployment

**Vercel CLI**
```bash
npm install -g vercel
vercel --prod
```

**GitHub → Vercel**
1. Push to GitHub
2. Connect repository at [vercel.com](https://vercel.com)
3. Auto-deploys on push

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment guide including:
- Vercel setup
- Custom domains
- Performance optimization
- Troubleshooting
- Monitoring

## 💻 Development

### Local Setup
```bash
git clone https://github.com/hell0w0rld300/game.git
cd game
npm run serve
# Visit http://localhost:8000/public
```

### Project Structure
- `public/index.html` - Main entry point
- `public/scripts/` - Game logic (26 files)
- `public/styles/` - Styling (5 files)
- `vercel.json` - Deployment configuration

### Making Changes
1. Edit files in `public/` directory
2. Refresh browser (or use Live Server for auto-reload)
3. Test changes
4. Commit and push

See [DEVELOPMENT.md](DEVELOPMENT.md) for:
- Development workflow
- Code organization
- Adding new towers/enemies
- Testing checklist
- Performance tips

## 🤝 Contributing

Contributions welcome! Please:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes with clear messages
4. **Push** to branch
5. **Open** a Pull Request

### Code Guidelines
- Use clear, descriptive variable names
- Add comments for complex logic
- Test on multiple browsers
- Follow existing code style
- Keep commits atomic and focused

## 📋 Project Stats

| Metric | Value |
|--------|-------|
| Total Lines | ~4,600 |
| Files | 31 |
| Languages | JavaScript, CSS, HTML |
| Systems | 7 core systems |
| Towers | 6 types |
| Enemies | 4 types |
| UI Languages | 2 (EN, ZH) |
| Dependencies | 0 external |
| Browser Support | Chrome, Firefox, Safari, Edge |

## 📝 Version

**Version**: 1.0.0
**Status**: Production Ready
**Last Updated**: February 2026
**License**: MIT

## 📚 Documentation

- [README.md](README.md) - Project overview (this file)
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment and hosting guide
- [DEVELOPMENT.md](DEVELOPMENT.md) - Development and contribution guide

## 🎮 Play Now!

**Local**: Open `public/index.html` in your browser
**Online**: Deploy to Vercel with one click
**Contribute**: Fork and submit PRs

Enjoy the game! 🎮✨
