# Deployment Guide - Tower Defense Pro

This guide covers deploying Tower Defense Pro to Vercel and other platforms.

## 🚀 Quick Deploy to Vercel

### Option 1: Git-based Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git remote add github https://github.com/YOUR_USERNAME/tower-defense.git
   git push github main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `game` repository
   - Click "Deploy"

3. **Automatic Deployments**
   - Every push to main branch will auto-deploy
   - Preview URLs for pull requests

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel

# With custom domain
vercel --prod --name tower-defense-game
```

### Option 3: Direct Upload

```bash
# Using Vercel CLI
cd /home/user/game
vercel
```

## 📋 Project Structure for Vercel

```
/game
├── public/                 # Static files served as root
│   ├── index.html         # Main game entry point
│   ├── scripts/           # JavaScript modules
│   └── styles/            # CSS stylesheets
├── vercel.json            # Vercel configuration
├── package.json           # Project metadata
├── .vercelignore          # Files to exclude
├── .gitignore             # Git exclusions
├── README.md              # Project documentation
└── DEPLOYMENT.md          # This file
```

## ⚙️ Vercel Configuration

The `vercel.json` file is configured with:

- **Version**: 2 (Latest Vercel platform)
- **Output Directory**: `public/` (where the game is served from)
- **Caching**: Optimized headers for index.html and assets
- **Rewrites**: Root `/` redirects to `/public/index.html`

### Cache Strategy

- `index.html`: 1 hour cache (3600s)
- Scripts & Styles: 1 year cache (31536000s) - immutable
- Ensures fresh HTML but cached assets for performance

## 🌐 Custom Domain

### Option 1: Vercel Domain
Your app gets a free domain: `tower-defense-pro.vercel.app`

### Option 2: Custom Domain

1. **Add Domain in Vercel Dashboard**
   - Project Settings → Domains
   - Add your custom domain
   - Update DNS records per Vercel's instructions

2. **Example DNS Records**
   ```
   Type: A
   Name: @
   Value: 76.76.19.139
   ```

## 📊 Monitoring & Analytics

In Vercel Dashboard:
- View analytics
- Monitor performance
- Check deployment history
- Set up notifications

## 🔧 Environment Variables

Currently the game doesn't require environment variables, but to add them:

1. Go to Vercel Project Settings
2. Environment Variables
3. Add key-value pairs
4. Variables available in production/preview

## 📈 Performance Optimization

### Already Configured

- ✅ Minified CSS (consider minifying JS for production)
- ✅ Efficient game loop (60 FPS)
- ✅ Particle pooling (1000 max)
- ✅ Optimized canvas rendering
- ✅ Cache headers configured

### Optional Enhancements

```bash
# Minify JavaScript (if needed)
npm install -g uglify-js
uglifyjs public/scripts/game.js -c -m -o public/scripts/game.min.js
```

## 🐛 Troubleshooting

### Issue: Game not loading at root

**Solution**: Check `vercel.json` rewrites are correct

```json
"rewrites": [
  {
    "source": "/",
    "destination": "/public/index.html"
  }
]
```

### Issue: Assets returning 404

**Solution**: Verify asset paths in HTML use correct relative paths

```html
<!-- ✅ Correct -->
<link rel="stylesheet" href="styles/main.css">

<!-- ❌ Incorrect -->
<link rel="stylesheet" href="/styles/main.css">
```

### Issue: Game loading slowly

**Solutions**:
- Check Network tab in browser DevTools
- Verify cache headers are applied
- Consider compressing assets
- Use Chrome DevTools Performance tab

## 📱 Mobile Considerations

Vercel automatically handles:
- ✅ Responsive CSS
- ✅ Touch events
- ✅ Mobile-optimized canvas scaling
- ✅ Device orientation changes

## 🔒 Security

- No private data exposed (game is client-side)
- Content Security Policy: Can be added if needed
- CORS headers: Configure if using external APIs in future

## 📦 Build Process

This is a **static site** - no build process needed:

```bash
# vercel.json specifies:
"buildCommand": "echo 'Static site - no build needed'"
"outputDirectory": "public"
```

Files in `public/` are directly served.

## 🚢 Production Checklist

Before going live:

- [ ] Test game on https://your-domain.vercel.app
- [ ] Verify all tower types work
- [ ] Check all enemies spawn correctly
- [ ] Test settings customization
- [ ] Verify language switching works
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Verify audio plays (with permission)
- [ ] Test wave progression
- [ ] Confirm score tracking
- [ ] Check game over screen displays stats

## 📊 Analytics & Monitoring

Track with Vercel:
- Page views
- Deployment frequency
- Build times
- Function execution

Optional external tools:
- Google Analytics
- Sentry (error tracking)
- LogRocket (session recording)

## 🔄 Updates & Maintenance

### Deploying Updates

```bash
# Make changes locally
git add .
git commit -m "Update game features"
git push origin main

# Vercel auto-deploys (with GitHub integration)
# Or manually: vercel --prod
```

### Version Management

Update in `package.json`:
```json
"version": "1.1.0"  // Changed from 1.0.0
```

## 💡 Tips

1. **Free Tier**: Vercel free tier includes:
   - Unlimited deployments
   - Bandwidth included
   - Auto-scaling
   - Preview URLs

2. **Team Collaboration**:
   - Add team members in Vercel
   - Share preview links
   - Collaborative deployments

3. **Rollback**: Easy rollback to previous deployments in Vercel Dashboard

4. **CLI Shortcuts**:
   ```bash
   vercel ls              # List deployments
   vercel rm              # Remove deployment
   vercel --prod          # Deploy to production
   ```

## 🆘 Getting Help

### Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://vercel.com/support)
- [GitHub Issues](https://github.com/hell0w0rld300/game/issues)

### Contact
For issues or questions, open a GitHub issue with:
- Deployment URL
- Browser type/version
- Screenshots of the issue
- Console error messages

## 📝 Deployment History

| Date | Version | Status | URL |
|------|---------|--------|-----|
| 2026-02-23 | 1.0.0 | Active | TBD |

---

**Last Updated**: February 2026
**Status**: Ready for Production
