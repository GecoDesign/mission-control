# Quick Setup Guide for Mission Control

## 🚀 Getting Started (5 minutes)

### Step 1: Install Dependencies
```bash
cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/Alex\ -\ MiniMe/mission-control
npm install
```

### Step 2: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click **"New Project"**
3. Fill in:
   - Name: `mission-control`
   - Database Password: (generate a strong one)
   - Region: Select closest to UK (e.g., London)
4. Click **"Create new project"** (takes ~2 minutes)

### Step 3: Set Up Database

1. In your Supabase project, click **"SQL Editor"** in the left menu
2. Click **"New Query"**
3. Copy everything from `supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL Editor
5. Click **"Run"** (bottom right)
6. You should see "Success. No rows returned"

### Step 4: Get Your Supabase Credentials

1. In Supabase, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
   - **anon public** key (under "Project API keys")

### Step 5: Configure Environment Variables

```bash
# Create .env.local file
cp .env.local.example .env.local

# Edit .env.local and paste your values
nano .env.local  # or use any text editor
```

Your `.env.local` should look like:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-long-anon-key-here
```

Save and close.

### Step 6: Run Locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser! 🎉

---

## 🌐 Deploy to Vercel (2 minutes)

### Option A: One-Click Deploy

```bash
npm i -g vercel
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? (select your account)
- Link to existing project? **N**
- Project name? **mission-control** (or press Enter)
- Directory? **./** (press Enter)
- Override settings? **N**

After deployment, add environment variables:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste your Supabase URL, press Enter

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste your Supabase anon key, press Enter
```

Redeploy with the new variables:
```bash
vercel --prod
```

### Option B: Via Vercel Dashboard

1. Go to https://vercel.com/new
2. Import Git repository (or drag the folder)
3. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
4. Click **Deploy**

Your site will be live at `https://mission-control-xxx.vercel.app`

---

## ✅ Verification Checklist

- [ ] Dependencies installed (`npm install` succeeded)
- [ ] Supabase project created
- [ ] Database schema migration run successfully
- [ ] `.env.local` file created with correct credentials
- [ ] App runs locally at http://localhost:3000
- [ ] Can create a Kanban card (tests database connection)
- [ ] Deployed to Vercel (optional)
- [ ] Environment variables added to Vercel (if deployed)

---

## 🆘 Common Issues

**"Failed to fetch" errors:**
- Double-check your Supabase URL and anon key in `.env.local`
- Make sure the SQL migration ran successfully

**"npm install" fails:**
- Make sure you have Node.js 18+ installed: `node --version`
- Try `rm -rf node_modules package-lock.json && npm install`

**Database errors:**
- Check Supabase project is active (not paused)
- Verify RLS policies are enabled (they're in the migration script)

**Deployment fails:**
- Make sure you added environment variables to Vercel
- Check build logs for specific errors

---

## 📱 Access from Both Macs

Once deployed to Vercel, both you and Alex can access Mission Control from:
- **Production URL**: `https://your-project.vercel.app`
- **Local development**: `http://localhost:3000` (when running `npm run dev`)

All data is stored in Supabase and syncs in real-time between devices!

---

## 🎯 Next Steps

1. **Customize**: Edit colors in `src/app/globals.css`
2. **Add users**: Invite Alex via Supabase Authentication (if you want login)
3. **Backup**: Export Supabase data regularly
4. **Monitor**: Check Vercel analytics and Supabase usage

Enjoy Mission Control! 🚀
