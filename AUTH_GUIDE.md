# 🔐 Basic Authentication System

## 📁 Folder Structure

```
app/
├── auth/
│   ├── signin/
│   │   └── page.tsx          ← Sign In Page
│   └── signup/
│       └── page.tsx          ← Sign Up Page
└── ...

lib/
└── authStorage.ts            ← Handle save/load user data
```

---

## 🚀 How to Test

### 1. Start the App
```bash
cd frontend
npm run dev
```

### 2. Go to Sign Up
```
http://localhost:3000/auth/signup
```

### 3. Create Account
```
Name: John Doe
Email: john@example.com
Password: 123456
Confirm: 123456
Click: "Create Account"
```

### 4. Should See Dashboard
- If signup works → redirects to `/dashboard`

### 5. Test Sign In
- Go to: `http://localhost:3000/auth/signin`
- Email: john@example.com
- Password: 123456
- Click: "Sign In"
- Should redirect to dashboard

---

## 📝 Files Explained

### `/app/auth/signup/page.tsx`
- **Name field**: User enters full name
- **Email field**: User enters email
- **Password**: Must be at least 6 characters
- **Confirm Password**: Must match password
- Creates user account in browser storage
- Redirects to `/dashboard`

### `/app/auth/signin/page.tsx`
- **Email field**: User enters email
- **Password field**: Any password works (demo mode)
- Saves user to browser storage
- Redirects to `/dashboard`

### `/lib/authStorage.ts`
- `saveUser()`: Save user to browser storage
- `getUser()`: Get current logged-in user
- `isLoggedIn()`: Check if user is logged in
- `logout()`: Remove user (for later)
- `validateEmail()`: Check email format
- `validatePassword()`: Check password length

---

## 🔄 User Flow

```
Home Page
    ↓
User clicks "Sign Up" or "Sign In"
    ↓
Enters email/password
    ↓
User data saved to browser storage
    ↓
Redirect to Dashboard
    ↓
User is logged in!
```

---

## ✅ What Works

- ✅ Sign Up with name, email, password
- ✅ Sign In with email and password
- ✅ User data saved in browser
- ✅ Refresh page → Still logged in
- ✅ Link between sign up and sign in pages

---

## ⏳ What's Next (Optional)

- Add logout button to Sidebar
- Check if user is logged in before accessing dashboard
- Redirect to sign in if not authenticated
- Add "Forgot Password" page
- Connect to real backend API

---

## 🧪 Testing Checklist

- [ ] Go to `/auth/signup`
- [ ] Sign up with email/password
- [ ] Redirected to dashboard
- [ ] Refresh page - still logged in
- [ ] Go to `/auth/signin`
- [ ] Sign in with same email
- [ ] Redirected to dashboard
- [ ] Everything works!

---

**That's it! Basic auth system ready! 🎉**
