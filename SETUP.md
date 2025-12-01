# 🚀 QUICK SETUP GUIDE - Razorpay + Gmail SMTP

## ✅ STEP 1: Get Razorpay Keys

1. Go to https://dashboard.razorpay.com/
2. Sign up/Login
3. Go to **Settings** → **API Keys**
4. Click **Generate Test Key**
5. Copy **Key ID** (starts with `rzp_test_`)
6. Copy **Key Secret**

## ✅ STEP 2: Setup Gmail App Password

1. Go to Google Account: https://myaccount.google.com/
2. Enable **2-Step Verification** (Security → 2-Step Verification)
3. Go to **App Passwords**: https://myaccount.google.com/apppasswords
4. Select app: **Mail**
5. Select device: **Other** (type "High Ticket Sales")
6. Click **Generate**
7. Copy the **16-character password** (remove spaces)

## ✅ STEP 3: Create .env File

Create a file named `.env` in project root:

```bash
# Razorpay
VITE_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY_HERE
VITE_RAZORPAY_KEY_SECRET=YOUR_SECRET_HERE

# Gmail SMTP
GMAIL_USER=your-gmail@gmail.com
GMAIL_APP_PASSWORD=abcdabcdabcdabcd

# Admin Email
ADMIN_EMAIL=nysa7133@gmail.com

# Site URL
VITE_SITE_URL=http://localhost:5173
```

**Replace:**
- `rzp_test_YOUR_KEY_HERE` with your actual Razorpay Key ID
- `YOUR_SECRET_HERE` with your Razorpay Secret
- `your-gmail@gmail.com` with the Gmail you created app password for
- `abcdabcdabcdabcd` with your 16-character app password (no spaces)

## ✅ STEP 4: Deploy to Netlify

### Option A: From Git (Recommended)

1. Push code to GitHub
2. Go to https://app.netlify.com/
3. Click **"New site from Git"**
4. Connect your repository
5. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click **"Show advanced"** → **"New variable"**
7. Add ALL environment variables from your `.env` file:

   ```
   VITE_RAZORPAY_KEY_ID = rzp_test_...
   VITE_RAZORPAY_KEY_SECRET = ...
   GMAIL_USER = your-gmail@gmail.com
   GMAIL_APP_PASSWORD = abcdabcdabcdabcd
   ADMIN_EMAIL = nysa7133@gmail.com
   VITE_SITE_URL = https://your-site.netlify.app
   ```

8. Click **"Deploy site"**
9. Wait for deployment to complete
10. Your site is live! 🎉

### Option B: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## ✅ STEP 5: Test Everything

### Test Payment:
1. Go to your deployed site
2. Navigate to `/checkout`
3. Fill in details
4. Click "Pay with Razorpay"
5. Use test card: `4111 1111 1111 1111`
6. CVV: `123`, Expiry: Any future date

### Check Emails:
1. Buyer should receive confirmation at their email
2. Admin (nysa7133@gmail.com) should receive notification

### Check Razorpay:
1. Login to Razorpay Dashboard
2. Go to **Transactions** → **Payments**
3. Verify test payment appears

## 🔥 PRODUCTION CHECKLIST

When ready to go live:

- [ ] Complete Razorpay KYC verification
- [ ] Generate **Live API Keys** (Settings → API Keys)
- [ ] Update `.env` with live keys (`rzp_live_...`)
- [ ] Update Netlify environment variables
- [ ] Update `VITE_SITE_URL` to production URL
- [ ] Test with small real payment
- [ ] Monitor first few transactions

## 🎯 IMPORTANT NOTES

### Gmail Limits:
- Free Gmail: 500 emails/day
- Google Workspace: 2000 emails/day
- Monitor your usage

### Security:
- ✅ `.env` is in `.gitignore` (already done)
- ✅ Never commit sensitive keys
- ✅ Use environment variables in Netlify

### Email Delivery:
- Emails may take 1-2 minutes to arrive
- Check spam folder if not received
- Gmail app password is separate from your regular password

## 📞 Quick Troubleshooting

**❌ Payment modal not opening:**
- Check `VITE_RAZORPAY_KEY_ID` in Netlify environment variables
- Clear browser cache

**❌ Emails not sending:**
- Verify Gmail app password is correct (16 chars, no spaces)
- Check `GMAIL_USER` and `GMAIL_APP_PASSWORD` in Netlify
- Check Netlify function logs

**❌ "SMTP authentication failed":**
- Regenerate Gmail app password
- Make sure 2-Step Verification is enabled
- Update environment variables

## 🆘 Support

- Razorpay Docs: https://razorpay.com/docs/
- Netlify Docs: https://docs.netlify.com/
- Gmail App Passwords: https://support.google.com/accounts/answer/185833

---

**That's it! Your payment system is ready! 🚀**

Admin email: **nysa7133@gmail.com** will receive all order notifications.
