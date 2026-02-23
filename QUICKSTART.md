# Quick Start Guide - Tower Defense Pro

## 🎮 Play Now

### Online (Easiest)
- Deploy to Vercel: Click button in [README.md](README.md)
- Get free domain: `yourapp.vercel.app`

### Local (5 seconds)
```bash
# Start a web server in the project directory
python3 -m http.server 8000

# Open in browser
# Visit: http://localhost:8000/public
```

## 🎯 How to Play

### Objective
Survive 10 waves of enemies by placing towers on a grid.

### Controls

**Desktop**
- **Click** to place selected tower
- **Right-click** to sell tower for 60% refund
- **Number keys (1-6)** to quick-select towers
- **Space** to pause/resume
- **S** to toggle game speed (1×/2×)

**Mobile**
- **Tap** to place tower
- **Long press** to sell tower
- **Buttons** for menu controls

### Game Loop
1. **Select** a tower (click tower button)
2. **Place** it on an empty grid cell
3. **Watch** it shoot enemies
4. **Earn** gold from kills
5. **Upgrade** towers or build more
6. **Survive** all waves to win

### Tower Types

| Tower | Cost | Strength | Weakness |
|-------|------|----------|----------|
| 🏹 Arrow | 100 | Fast | Low damage |
| 💣 Cannon | 200 | Splash AoE | Slow |
| ❄️ Ice | 150 | Slows enemies | Low damage |
| ⚡ Tesla | 300 | Chains enemies | Short range |
| 🔥 Inferno | 250 | Burn DoT | Medium |
| ⏱️ Chronos | 350 | Time warp | Unique |

### Enemy Types

| Enemy | Speed | HP | Reward | Notes |
|-------|-------|----|---------|----|
| 🧟 Normal | Medium | Medium | 10 | Standard |
| 🛡️ Armored | Slow | High | 15 | Resistant |
| 💨 Swift | Fast | Low | 8 | Hard to hit |
| 👑 Boss | Medium | Very High | 50 | Every 5 waves |

### Difficulty Settings

Change before starting:
- **Easy (0.7×)** - Reduced enemy HP/speed
- **Normal (1.0×)** - Balanced
- **Hard (1.5×)** - Increased challenge
- **Extreme (2.0×)** - Maximum difficulty

### Customization

In Settings menu:
- Starting health (10-100)
- Starting gold (100-1000)
- Game speed (0.5×-3.0×)
- Difficulty level
- Language (English/中文)

## 💡 Tips

### Strategy
1. **Early game**: Build cheap Arrow towers
2. **Mid game**: Mix tower types for coverage
3. **Late game**: Upgrade towers to level 3
4. **Bosses**: Focus fire on boss waves

### Resource Management
- 🏹 Arrow towers earn back cost quickly
- 💰 Don't spend all gold early
- 🔄 Sell towers strategically
- ⬆️ Upgrading > Building more towers

### Tower Placement
- Place towers on both sides of path
- Overlap ranges for coverage
- Ice towers slow for other towers
- Tesla towers chain through groups

### Common Mistakes
❌ Building too many towers early
❌ Not upgrading existing towers
❌ Placing towers too far from path
❌ Ignoring boss waves

## 📊 Statistics

Tracked during gameplay:
- Enemies killed
- Towers built
- Gold earned
- Final score
- Waves survived

## 🌍 Language

Switch language in-game:
- Click **EN** or **中** button
- Changes instantly
- Saves preference

## ⚙️ Settings

Pre-game customization:
1. Click **Settings** from main menu
2. Adjust sliders/dropdowns
3. Click **Apply**
4. Start game with new settings

## 🔊 Audio

- Click **⏸** to mute/unmute in game
- Sound effects for:
  - Tower shots
  - Enemy deaths
  - Building/upgrading
  - Wave start/end

## 📱 Mobile

Optimized for touch devices:
- ✅ Auto-scaling canvas
- ✅ Touch-friendly buttons
- ✅ Landscape + portrait
- ✅ No external dependencies

## 🆘 Troubleshooting

### Game won't load
1. Check browser console (F12)
2. Ensure JavaScript enabled
3. Try different browser
4. Clear cache: Ctrl+Shift+Delete

### Game runs slow
1. Close other tabs
2. Lower graphics if possible
3. Try 1× speed instead of 2×
4. Restart browser

### Sound not playing
1. Check if muted (🔇 button)
2. Enable audio in browser settings
3. Check system volume
4. Try Firefox if Chrome fails

### Tower won't place
1. Can't place on path (yellow line)
2. Already have tower there
3. Not enough gold
4. Select tower first

## 🚀 Deploy Your Own

### Option 1: Vercel (Recommended)
1. Fork repository on GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your fork
4. Deploy (auto on push)

### Option 2: Netlify
1. Connect GitHub repository
2. Set build directory to `public/`
3. Deploy

### Option 3: GitHub Pages
1. Enable Pages in Settings
2. Set source to `main` branch `/public`
3. Site goes live at `yourusername.github.io/game`

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📖 Learn More

- [README.md](README.md) - Full documentation
- [DEPLOYMENT.md](DEPLOYMENT.md) - Hosting guide
- [DEVELOPMENT.md](DEVELOPMENT.md) - Development guide
- [GitHub Issues](https://github.com/hell0w0rld300/game/issues)

## 🎓 Game Development

Want to add features?
1. Read [DEVELOPMENT.md](DEVELOPMENT.md)
2. Fork repository
3. Make changes
4. Submit pull request

### Ideas for Extensions
- More tower types
- Additional maps
- Leaderboards
- Online multiplayer
- Achievement system
- Tower synergies

## 🎮 Enjoy!

Have fun defending! Report bugs or suggest features via:
- GitHub Issues
- Pull Requests
- Project Discussions

---

**Version**: 1.0.0
**Status**: Production Ready
**Last Updated**: February 2026

Good luck! 🚀✨
