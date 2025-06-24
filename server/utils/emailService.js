const nodemailer = require('nodemailer');

// Create a test account for development (fallback)
const createTestAccount = async () => {
  try {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransporter({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (error) {
    console.error('Error creating test account:', error);
    return null;
  }
};

// For production, use real SMTP settings
const createProductionTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // Use App Password for Gmail
    },
  });
};

const sendConnectionRequest = async (toEmail, fromName, toName, requestId) => {
  try {
    // Try to use real email first, fallback to test email
    let transporter;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = createProductionTransporter();
      console.log('Using real email service (Gmail)');
    } else {
      transporter = await createTestAccount();
      console.log('Using test email service (Ethereal) - emails will not be delivered');
    }
    
    if (!transporter) {
      console.error('Failed to create email transporter');
      return false;
    }

    const acceptUrl = `http://localhost:3000/accept-request/${requestId}`;
    const rejectUrl = `http://localhost:3000/reject-request/${requestId}`;

    const mailOptions = {
      from: process.env.EMAIL_USER || '"Skill Swap" <noreply@skillswap.com>',
      to: toEmail,
      subject: `${fromName} wants to connect with you on Skill Swap!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">Skill Swap Connection Request</h2>
          <p>Hello ${toName},</p>
          <p><strong>${fromName}</strong> would like to connect with you for skill exchange!</p>
          <p>They think you could help each other learn and grow together.</p>
          
          <div style="margin: 30px 0;">
            <a href="${acceptUrl}" 
               style="background-color: #10B981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-right: 10px;">
              Accept Request
            </a>
            <a href="${rejectUrl}" 
               style="background-color: #EF4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              Decline Request
            </a>
          </div>
          
          <p style="color: #6B7280; font-size: 14px;">
            If the buttons don't work, you can copy and paste these URLs:<br>
            Accept: ${acceptUrl}<br>
            Decline: ${rejectUrl}
          </p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    
    // If using test email, show preview URL
    if (!process.env.EMAIL_USER) {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      console.log('⚠️  This is a test email. To send real emails, set EMAIL_USER and EMAIL_PASS environment variables.');
    }
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = { sendConnectionRequest }; 