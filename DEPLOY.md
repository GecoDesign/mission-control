# Mission Control - Deployment Guide

## 🚀 Automatic Deployment (Current Setup)

Mission Control is configured for automatic deployment via GitHub + Vercel integration.

### How It Works
1. **Make changes** to code in `mission-control/` folder
2. **Commit** your changes:
   ```bash
   cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/Alex\ -\ MiniMe/mission-control
   git add .
   git commit -m "Your update message"
   ```
3. **Push** to GitHub:
   ```bash
   git push origin main
   ```
4. **Vercel automatically deploys** (takes 2-3 minutes)
5. Changes go live at: https://mission-control-mu-ten.vercel.app

### Quick Deploy Script
For MiniMe to run when deploying updates:
```bash
cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/Alex\ -\ MiniMe/mission-control && \
git add . && \
git commit -m "Update from MiniMe" && \
git push origin main
```

## 📦 Repository Info
- **GitHub:** https://github.com/GecoDesign/mission-control
- **Vercel Project:** mission-control
- **Production Branch:** main

## 🔑 Credentials
- **GitHub Token:** Stored in `~/clawd/secrets/github-token.txt`
- **Vercel Token:** Stored in memory (for manual deploys)
- **GitHub Token Expiry:** May 16, 2026 (reminder scheduled)

## 🔄 Manual Deploy (if needed)
If auto-deploy fails or you need to force a deployment:
```bash
cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/Alex\ -\ MiniMe/mission-control
vercel --prod --token="YOUR_VERCEL_TOKEN_HERE"
```
(MiniMe has the actual token stored securely)

## 📊 Environment Variables
Configured in Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🎯 Deployment Checklist
- ✅ GitHub repository created
- ✅ Vercel project linked to GitHub
- ✅ Auto-deploy on push configured
- ✅ Environment variables set
- ✅ Production URL aliased
- ✅ RLS policies configured
