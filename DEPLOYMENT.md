# Deployment Guide

Complete guide for deploying Mission Control to various platforms.

## 🚀 Vercel (Recommended)

Mission Control is optimized for Vercel deployment and benefits from their Next.js optimizations.

### Current Deployment
**Live URL**: https://mission-control-mu-ten.vercel.app

### Initial Setup

1. **Install Vercel CLI (optional):**
   ```bash
   npm i -g vercel
   ```

2. **Link Project:**
   ```bash
   cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/Alex\ -\ MiniMe/mission-control
   vercel link
   ```

3. **Configure Environment Variables:**
   Go to Vercel Dashboard → Project Settings → Environment Variables
   
   Add:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase anon/public key

### Deploy from CLI

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod
```

### Deploy from Git

**Recommended Method** - Auto-deploys on push:

1. Push to GitHub:
   ```bash
   git add .
   git commit -m "Update Mission Control"
   git push origin main
   ```

2. Vercel automatically:
   - Detects the push
   - Runs build
   - Deploys to production
   - Invalidates cache

### Build Settings (Vercel Dashboard)

```yaml
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### Environment Variables Required

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 📦 Netlify

### Setup

1. **Create `netlify.toml`:**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **Deploy:**
   ```bash
   # Install Netlify CLI
   npm i -g netlify-cli

   # Login
   netlify login

   # Initialize
   netlify init

   # Deploy
   netlify deploy --prod
   ```

## 🐳 Docker

### Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build & Run

```bash
# Build image
docker build -t mission-control .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  mission-control
```

## ☁️ AWS (EC2 + PM2)

### Prerequisites
- EC2 instance (t3.small or larger)
- Node.js 18+ installed
- Domain configured (optional)

### Setup

1. **SSH into EC2:**
   ```bash
   ssh -i your-key.pem ubuntu@your-ec2-ip
   ```

2. **Install dependencies:**
   ```bash
   # Install Node.js 18
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2
   sudo npm install -g pm2
   ```

3. **Clone and build:**
   ```bash
   git clone <your-repo>
   cd mission-control
   npm install
   npm run build
   ```

4. **Create PM2 ecosystem file:**
   ```javascript
   // ecosystem.config.js
   module.exports = {
     apps: [{
       name: 'mission-control',
       script: 'npm',
       args: 'start',
       env: {
         NODE_ENV: 'production',
         NEXT_PUBLIC_SUPABASE_URL: 'your_url',
         NEXT_PUBLIC_SUPABASE_ANON_KEY: 'your_key',
       }
     }]
   }
   ```

5. **Start with PM2:**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

## 🌐 Custom Server

### Using Node.js

```bash
# Build
npm run build

# Start
npm start

# Or with custom port
PORT=8080 npm start
```

### Using a Process Manager

**PM2:**
```bash
pm2 start npm --name "mission-control" -- start
pm2 save
```

**Forever:**
```bash
forever start -c "npm start" ./
```

## 🔒 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | `eyJhbGc...` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port | `3000` |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | `1` |

## 📊 Post-Deployment Checklist

After deploying, verify:

- [ ] Homepage loads (dashboard with 6 widgets)
- [ ] All routes work (`/kanban`, `/tasks`, etc.)
- [ ] Sidebar navigation functions
- [ ] Data loads from Supabase
- [ ] Theme toggle works
- [ ] Mobile responsive layout
- [ ] No console errors
- [ ] SSL certificate valid (for custom domains)

## 🔍 Monitoring & Analytics

### Vercel Analytics (Recommended)

Enable in Vercel Dashboard:
- Web Vitals
- Real User Monitoring
- Server Function Analytics

### Custom Analytics

Add to `layout.tsx`:

```tsx
// Google Analytics
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

## 🚨 Troubleshooting

### Build Fails

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**Error: TypeScript errors**
```bash
# Check types
npx tsc --noEmit

# Fix and rebuild
npm run build
```

### Runtime Issues

**Error: Supabase connection failed**
- Verify environment variables are set
- Check Supabase project is active
- Confirm API keys are correct

**Error: Page not found (404)**
- Ensure all page files are in correct directories
- Check Next.js routing configuration
- Rebuild application

### Performance Issues

**Slow page loads:**
- Enable Vercel caching
- Optimize images
- Check Supabase query performance
- Monitor network requests

## 🔄 Continuous Deployment

### GitHub Actions (Example)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📈 Scaling

### Horizontal Scaling
- Use Vercel's automatic scaling
- Or deploy behind load balancer (AWS ELB, Nginx)

### Database Optimization
- Enable Supabase connection pooling
- Add database indexes
- Use row-level security

### Caching Strategy
- Vercel Edge Network (automatic)
- Add Redis for session storage (if needed)
- Configure `Cache-Control` headers

## 🔐 Security

### Best Practices
- ✅ Use environment variables for secrets
- ✅ Enable HTTPS (automatic on Vercel)
- ✅ Implement Supabase RLS policies
- ✅ Keep dependencies updated
- ✅ Use security headers

### Headers Configuration

```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
    ]
  },
}
```

## 🎯 Deployment Checklist

Before going live:

- [ ] Build succeeds locally
- [ ] All tests pass
- [ ] Environment variables configured
- [ ] Database migrations complete
- [ ] SSL certificate active
- [ ] Analytics configured
- [ ] Error monitoring setup
- [ ] Backup strategy in place
- [ ] Documentation updated
- [ ] Team notified

---

**Ready to deploy? Let's launch! 🚀**
