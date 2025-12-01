#!/usr/bin/env node

/**
 * Quick test script for Razorpay and Gmail SMTP configuration
 */

console.log('\n🔍 Checking Configuration...\n');

const requiredVars = [
    'VITE_RAZORPAY_KEY_ID',
    'GMAIL_USER',
    'GMAIL_APP_PASSWORD',
    'ADMIN_EMAIL',
];

const optionalVars = [
    'VITE_RAZORPAY_KEY_SECRET',
    'VITE_SITE_URL',
];

let allGood = true;

console.log('📋 Required Variables:');
console.log('━'.repeat(50));

requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value && value !== '' && !value.includes('your')) {
        console.log(`✅ ${varName}: Set`);
    } else {
        console.log(`❌ ${varName}: Missing or not configured`);
        allGood = false;
    }
});

console.log('\n📋 Optional Variables:');
console.log('━'.repeat(50));

optionalVars.forEach(varName => {
    const value = process.env[varName];
    if (value && value !== '' && !value.includes('your')) {
        console.log(`✅ ${varName}: Set`);
    } else {
        console.log(`⚠️  ${varName}: Not set`);
    }
});

console.log('\n' + '━'.repeat(50));

if (allGood) {
    console.log('✅ All required configuration looks good!');
    console.log('\n💡 Next steps:');
    console.log('   1. Push to GitHub');
    console.log('   2. Deploy to Netlify');
    console.log('   3. Add environment variables in Netlify dashboard');
    console.log('   4. Test payment with card: 4111 1111 1111 1111');
    console.log('   5. Check emails (buyer + nysa7133@gmail.com)\n');
} else {
    console.log('❌ Some configuration is missing!');
    console.log('\n💡 Next steps:');
    console.log('   1. Create .env file in project root');
    console.log('   2. Follow SETUP.md for detailed instructions');
    console.log('   3. Get Razorpay keys + Gmail app password');
    console.log('   4. Run this check again\n');
}

console.log('📖 For detailed setup: See SETUP.md\n');
