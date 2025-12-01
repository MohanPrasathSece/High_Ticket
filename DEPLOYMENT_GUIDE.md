# Deployment Guide - High-Ticket Sales System

## 🚀 Quick Deployment

### For Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set Environment Variables in Vercel Dashboard**
   - Go to your project dashboard → Settings → Environment Variables
   - Add these variables:
     ```
     GMAIL_USER=your-gmail@gmail.com
     GMAIL_APP_PASSWORD=your-16-char-app-password
     ADMIN_EMAIL=admin@example.com
     VITE_SITE_URL=https://your-domain.vercel.app
     VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
     VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
     ```

### For Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag the `dist` folder to Netlify
   - Or use Netlify CLI: `netlify deploy --prod`

3. **Set Environment Variables in Netlify**
   - Go to Site settings → Build & deploy → Environment
   - Add the same variables as above

## 📧 Email Configuration

### Gmail Setup (Required)

1. **Enable 2-Factor Authentication** on your Gmail account

2. **Generate App Password**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and "Other (Custom name)"
   - Name it: "High-Ticket Sales"
   - Copy the 16-character password

3. **Environment Variables**
   ```
   GMAIL_USER=your-gmail@gmail.com
   GMAIL_APP_PASSWORD=the-16-char-app-password
   ADMIN_EMAIL=admin@example.com
   ```

## 🧪 Testing Email Functionality

### Local Testing
```bash
# Test email service
npm run test-email

# Test payment flow
npm run dev
# Then run: node test-payment-flow.js
```

### Production Testing
1. Make a small test purchase ($1 if possible)
2. Check both customer and admin emails
3. Verify email content and download links

## 🔧 Troubleshooting

### Email Not Sending
1. **Check Gmail credentials** - Ensure app password is correct
2. **Verify environment variables** - Check they're set in deployment platform
3. **Check logs** - Look at function logs in Vercel/Netlify dashboard

### Common Issues
- **"Less secure app access"** - Use App Password instead
- **SMTP connection failed** - Check Gmail settings and firewall
- **Environment variables not loading** - Verify variable names in deployment platform

## 📁 File Structure

```
├── src/
│   ├── api/send-email.ts          # Vercel API endpoint
│   └── lib/emailService.ts        # Email service logic
├── netlify/functions/send-email.ts # Netlify function
├── vite-plugin-api.ts             # Development API plugin
└── test-email.js                  # Email testing script
```

## 🎯 What Works Now

✅ **Email Functionality**
- Customer order confirmation emails
- Admin notification emails  
- Professional HTML email templates
- Environment-based endpoint switching

✅ **Responsive Design**
- Mobile-first responsive layout
- No overflow issues
- Proper breakpoints for all screen sizes

✅ **Content Updates**
- Complete marketing copy on bundle page
- Updated testimonials
- Professional value proposition

✅ **Payment Flow**
- Razorpay integration
- Order tracking
- Email triggers on successful payment

## 🚀 Next Steps

1. **Deploy to your preferred platform**
2. **Set up environment variables**
3. **Test email functionality**
4. **Monitor first few orders**
5. **Scale up as needed**

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Review deployment platform logs
3. Verify environment variables
4. Test with the provided test scripts

The system is now production-ready with full email functionality!
