# Mission Control Security

## Password Protection

Mission Control now requires password authentication to access the dashboard.

### Current Setup

- **Login page:** `/login`
- **Password location:** Environment variable `MISSION_CONTROL_PASSWORD`
- **Session duration:** 30 days
- **Cookie:** HTTP-only, secure (production only)

### Default Password

**Temporary password:** `MiniMe2026Secure!`

⚠️ **IMPORTANT:** Change this password immediately!

### Changing the Password

#### 1. Local Development

Edit `.env.local` and change:
```
MISSION_CONTROL_PASSWORD=your-new-password-here
```

#### 2. Production (Vercel)

1. Go to https://vercel.com/dashboard
2. Select the Mission Control project
3. Go to Settings → Environment Variables
4. Add or update:
   - **Key:** `MISSION_CONTROL_PASSWORD`
   - **Value:** Your new secure password
   - **Environments:** Production, Preview, Development
5. Redeploy the application

### How It Works

1. **Middleware:** All routes are protected by Next.js middleware
2. **Login page:** Users see `/login` if not authenticated
3. **Authentication:** Password checked against `MISSION_CONTROL_PASSWORD` environment variable
4. **Session:** Secure HTTP-only cookie set for 30 days
5. **Logout:** Available via `/api/auth/logout`

### Security Features

- ✅ Password-protected access
- ✅ Secure HTTP-only cookies
- ✅ Environment variable for password (not hardcoded)
- ✅ Production-only secure cookies
- ✅ 30-day session expiry
- ✅ No external dependencies

### Adding Logout Button (Optional)

To add a logout button to the dashboard, you can call:

```typescript
const handleLogout = async () => {
  await fetch('/api/auth/logout', { method: 'POST' })
  window.location.href = '/login'
}
```

### Password Recommendations

Use a strong password with:
- At least 12 characters
- Mix of uppercase, lowercase, numbers, symbols
- Not easily guessable
- Not reused from other services

Example strong passwords:
- `GecoMC2026!Secure#`
- `Mission@Control$2026`
- `AlexDashboard!2026MC`

### Troubleshooting

**Locked out?**
- Check Vercel deployment logs for errors
- Verify `MISSION_CONTROL_PASSWORD` is set in Vercel env vars
- Clear cookies and try again

**Password not working?**
- Ensure environment variable is exactly the same (case-sensitive)
- Check for trailing spaces in the password
- Redeploy after changing Vercel env vars

### Future Enhancements

Potential security improvements:
- [ ] Multi-user support with individual passwords
- [ ] Two-factor authentication
- [ ] Session activity logging
- [ ] IP allowlisting
- [ ] Role-based access control
