# 🧪 Authentication Testing Guide

## ✅ Pre-Setup Checklist

Before testing, ensure:
- [ ] Clerk API keys are set in `.env.local`
- [ ] `middleware.ts` is in project root
- [ ] Dev server is running: `npm run dev`
- [ ] Browser cache cleared (Ctrl+Shift+Delete)
- [ ] No CSP errors in browser console

---

## 🚀 Complete Testing Workflow

### 1. **Test Sign-Up Flow**

**Goal**: Verify users can create new accounts

**Steps**:
1. Open http://localhost:3000/
2. Click on a navigation link or manually go to http://localhost:3000/auth/signup
3. Enter test data:
   - **Name**: John Doe
   - **Email**: john.doe@test.com
   - **Password**: SecurePass123!
4. Click "Create Account"

**Expected Result**:
- ✅ Form validates input
- ✅ Redirects to `/dashboard`
- ✅ User is signed in (check Clerk session in DevTools)
- ✅ Sidebar shows "Logout" button

**What to Check**:
```bash
# In browser DevTools:
# 1. Application > Cookies > __session (should exist)
# 2. Console > No errors
# 3. Network tab > No CSP violations
```

---

### 2. **Test Sign-In Flow**

**Goal**: Verify users can sign in with existing accounts

**Steps**:
1. Go to http://localhost:3000/auth/signin
2. Enter credentials from previous test:
   - **Email**: john.doe@test.com
   - **Password**: SecurePass123!
3. Click "Continue with email"

**Expected Result**:
- ✅ Signs in successfully
- ✅ Redirects to `/dashboard`
- ✅ User session is created
- ✅ Can see personalized dashboard

---

### 3. **Test Session Persistence**

**Goal**: Verify users stay signed in after page refresh

**Steps**:
1. Sign in as test user (from step 2)
2. Go to http://localhost:3000/dashboard
3. Refresh the page (F5 or Cmd+R)
4. Wait for page to load

**Expected Result**:
- ✅ Still on dashboard (not redirected to signin)
- ✅ User data is displayed
- ✅ Session cookie is still present

---

### 4. **Test Protected Routes**

**Goal**: Verify unauthenticated users cannot access protected routes

**Steps**:
1. Sign out (click "Logout" in sidebar)
2. Try to access http://localhost:3000/dashboard
3. Observe redirect

**Expected Result**:
- ✅ Automatically redirects to `/auth/signin`
- ✅ Cannot access dashboard without signing in
- ✅ No errors in console

**Also Test These Protected Routes**:
- `/profile`
- `/study-notes`
- `/practice-exam`
- `/attempts`
- `/pbq`

---

### 5. **Test OAuth Sign-In (Google)**

**Goal**: Verify OAuth authentication works

**Steps**:
1. Go to http://localhost:3000/auth/signin
2. Click "Google" button
3. Sign in with a Google account (use test account)
4. Authorize the app

**Expected Result**:
- ✅ Opens Google sign-in popup
- ✅ Redirects to `/dashboard` after auth
- ✅ User profile info is populated (from Google account)
- ✅ Session is created

**Note**: OAuth requires proper Clerk configuration with Google credentials

---

### 6. **Test Logout**

**Goal**: Verify users can sign out

**Steps**:
1. Sign in as test user
2. On dashboard, click "Logout" button (bottom of sidebar)
3. Observe page behavior

**Expected Result**:
- ✅ User is signed out
- ✅ Redirected to `/auth/signin`
- ✅ Session cookie is cleared
- ✅ Success toast message appears

---

### 7. **Test Auto-Redirect for Signed-In Users**

**Goal**: Verify signed-in users can't access auth pages

**Steps**:
1. Sign in as test user
2. Go to http://localhost:3000/auth/signin
3. Observe behavior
4. Try http://localhost:3000/auth/signup

**Expected Result**:
- ✅ Automatically redirects to `/dashboard`
- ✅ Cannot access sign-in/sign-up pages while logged in

---

### 8. **Test CSP Configuration**

**Goal**: Verify Content Security Policy allows necessary resources

**Steps**:
1. Open browser DevTools (F12)
2. Go to Console tab
3. Sign up or sign in
4. Refresh the page

**Expected Result**:
- ✅ No CSP violations
- ✅ No "violated CSP directive" errors
- ✅ Scripts load normally
- ✅ Telemetry connections allowed

**If You See CSP Errors**:
```
Error: Loading the script '...' violates CSP directive
```

**Fix**:
1. Check `next.config.ts` has correct CSP headers
2. Verify it includes:
   - `https://cdn.protect.clerk.com`
   - `https://clerk-telemetry.com`
   - `https://*.clerk.accounts.dev`
3. Hard refresh: Ctrl+Shift+R
4. Restart dev server: `npm run dev`

---

### 9. **Test Email Validation**

**Goal**: Verify email validation works

**Steps**:
1. Go to `/auth/signin`
2. Enter invalid email: `notanemail`
3. Click "Continue with email"

**Expected Result**:
- ✅ Shows error: "Please enter a valid email"
- ✅ Form does not submit

**Test Cases**:
- `missing@domain` → Should fail
- `user@domain` → Should fail (needs TLD)
- `user@domain.com` → Should pass ✅
- ` spaces@test.com ` → Trimmed & validated

---

### 10. **Test Password Validation**

**Goal**: Verify password requirements are enforced

**Steps**:
1. Go to `/auth/signup`
2. Try passwords:
   - `short` → Should fail (too short)
   - `NoNumber!` → Should fail (no numbers)
   - `123456!` → Should fail (no uppercase/lowercase)
   - `SecurePass123!` → Should pass ✅

**Expected Result**:
- ✅ Invalid passwords show error messages
- ✅ Valid password allows form submission

---

### 11. **Test Rate Limiting (Optional)**

**Goal**: Verify rate limiting prevents brute force attempts

**Steps**:
1. Go to `/auth/signin`
2. Enter an email
3. Try signing in 6 times with wrong passwords
4. On the 6th attempt, check for rate limit message

**Expected Result**:
- ✅ After 5 failed attempts, shows: "Too many attempts. Please try again later."
- ✅ Button may be disabled or slowed down
- ✅ Resets after 15 minutes

---

## 📱 Mobile Testing

### Responsive Design

**Test on different screen sizes**:
- [ ] Mobile (375px) - Test hamburger menu
- [ ] Tablet (768px) - Test layout changes
- [ ] Desktop (1024px+) - Test full sidebar

**Steps**:
1. Open DevTools (F12)
2. Click device toolbar icon (toggle device mode)
3. Select different devices
4. Test signup/signin forms
5. Verify sidebar collapse/expand works

---

## 🐛 Debugging Tips

### Check Session Status

```javascript
// Run in browser console
// Check if user is signed in
Object.keys(localStorage).filter(k => k.includes('clerk'))

// Check Clerk session
document.cookie.split(';').find(c => c.includes('__session'))
```

### View Network Requests

1. Open DevTools → Network tab
2. Filter for XHR/Fetch requests
3. Look for requests to:
   - `https://*.clerk.accounts.dev/v1/*` (Clerk API)
   - `https://clerk-telemetry.com` (Analytics - OK if blocked, not critical)

### Check Middleware Logs

Add logging to `middleware.ts`:

```typescript
export default clerkMiddleware(async (auth, req: NextRequest) => {
  const { userId } = await auth();
  console.log(`[Middleware] Path: ${req.nextUrl.pathname}, User: ${userId}`);
  // ... rest of middleware
});
```

---

## ✅ Full Test Checklist

- [ ] Sign up creates new account
- [ ] Sign up redirects to dashboard
- [ ] Sign in works with correct credentials
- [ ] Sign in redirects to dashboard
- [ ] Session persists after page refresh
- [ ] Protected routes redirect to signin when not auth'd
- [ ] Signed-in users can't access auth pages
- [ ] Logout clears session and redirects
- [ ] Google OAuth works
- [ ] Apple OAuth works (if configured)
- [ ] Email validation works
- [ ] Password validation works
- [ ] Password match validation works
- [ ] No CSP errors in console
- [ ] Mobile responsive design works
- [ ] Sidebar shows logout button
- [ ] Rate limiting works (5 attempts)
- [ ] User data displays correctly
- [ ] Profile image loads (for OAuth)
- [ ] Dark mode works (if applicable)

---

## 🆘 Common Issues & Fixes

### Issue: "CSP violated" errors

**Symptom**: Console shows CSP violation messages

**Fix**:
```bash
# 1. Check next.config.ts has all Clerk domains
# 2. Hard refresh browser
Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

# 3. Restart dev server
npm run dev

# 4. Clear all browser data
DevTools > Application > Clear storage
```

### Issue: Session cookie not persisting

**Symptom**: Lost after refresh, always redirected to signin

**Fix**:
1. Check browser allows cookies (not in private mode)
2. Verify `__session` cookie exists in DevTools
3. Check cookie has `Secure` flag (for HTTPS)
4. Restart dev server

### Issue: Infinite redirect loop

**Symptom**: Stuck redirecting between signin and dashboard

**Fix**:
1. Clear browser cookies: `document.cookie = ""`
2. Hard refresh: Ctrl+Shift+R
3. Sign in again
4. Check middleware is not catching redirect URL

### Issue: OAuth doesn't work

**Symptom**: Google/Apple button does nothing

**Fix**:
1. Verify Clerk API keys in `.env.local`
2. Check Clerk dashboard has OAuth app configured
3. Ensure callback URL matches: `http://localhost:3000/auth/sso-callback`
4. Restart dev server after env changes

### Issue: User data shows as undefined

**Symptom**: Name/email shows null in components

**Fix**:
```tsx
// Always check isLoaded before accessing user
const { user, isLoaded } = useAuthContext();

if (!isLoaded) return <div>Loading...</div>;
if (!user) return <div>Not signed in</div>;

return <div>Hello {user.name}</div>;
```

---

## 📊 Monitoring & Analytics

### Clerk Dashboard Metrics

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Check:
   - Active sessions
   - Sign-ups per day
   - Sign-ins per day
   - OAuth provider usage
   - Error rates

### Performance Metrics

```javascript
// Log auth timing in browser console
performance.getEntriesByType('measure')
  .filter(m => m.name.includes('auth'))
```

---

## 🎓 Learning Resources

- [Clerk Docs](https://clerk.com/docs)
- [Middleware Testing](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Browser Testing Tools](https://playwright.dev/)
- [Lighthouse Audit](chrome://inspect)

---

**You're ready to test! Good luck! 🚀**
