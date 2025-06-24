# Email Setup Instructions

## Current Status

Right now, the app uses Ethereal Email (test service) which doesn't send real emails. You'll see preview URLs in the console instead.

## To Send Real Emails (Gmail Setup)

### 1. Create a .env file in the server folder:

```
MONGO_URI=mongodb://localhost:27017/skillswap
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

### 2. Gmail Setup Steps:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password:**
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password (not your regular Gmail password)

### 3. Restart your server after adding the .env file

## Alternative Email Services

You can also use other email services by modifying the transporter in `utils/emailService.js`:

### Outlook/Hotmail:

```javascript
service: 'outlook',
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
}
```

### Custom SMTP:

```javascript
host: 'smtp.yourprovider.com',
port: 587,
secure: false,
auth: {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
}
```

## Testing

- Without .env file: Uses test emails (preview URLs in console)
- With .env file: Sends real emails to recipients
