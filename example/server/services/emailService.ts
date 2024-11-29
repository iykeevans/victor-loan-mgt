import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import sgMail from '@sendgrid/mail';

// Load environment variables
const emailServiceProvider = process.env.EMAIL_SERVICE_PROVIDER || 'gmail'; // 'gmail' or 'sendgrid'

// Configure SendGrid (API Key)
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// Nodemailer transport setup for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

// Utility function to load and compile the email template
const compileTemplate = (templateName: string, data: any): string => {
  const templatePath = path.join(__dirname, '../templates/email/', templateName);
  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  const template = handlebars.compile(templateSource);
  return template(data);
};

// Function to send email via Gmail
const sendEmailViaGmail = async (email: string, subject: string, html: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: html, 
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email via Gmail:', error);
  }
};

// Function to send email via SendGrid
const sendEmailViaSendGrid = async (email: string, subject: string, html: string) => {
  const msg = {
    to: email,
    from: "" + process.env.SENDGRID_FROM_EMAIL,  // This should be your verified SendGrid sender email
    subject: subject,
    html: html,
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${email} via SendGrid`);
  } catch (error) {
    console.error('Error sending email via SendGrid:', error);
  }
};

// Send OTP email with a custom template (switching between Gmail and SendGrid)
export const sendOTPEmail = async (email: string, otp: string) => {
  // Prepare the template data
  const data = {
    otp: otp,
  };

  // Compile the template
  const htmlContent = compileTemplate('otp-email-template.html', data);

  // Determine which email service to use
  if (emailServiceProvider === 'sendgrid') {
    await sendEmailViaSendGrid(email, 'Email Verification OTP', htmlContent);
  } else {
    await sendEmailViaGmail(email, 'Email Verification OTP', htmlContent);
  }
};



export const sendInviteEmail  = async (email: string, inviteUrl: string, name: string) => {
  // Prepare the template data
  const data = {
    inviteUrl: inviteUrl,
    company: name,
    linkText: "Complete your onboarding process."
  };

  // Compile the template
  const htmlContent = compileTemplate('workspace-onboarding-invite.html.html', data);

  // Determine which email service to use
  if (emailServiceProvider === 'sendgrid') {
    await sendEmailViaSendGrid(email, 'WorkSpace Invite', htmlContent);
  } else {
    await sendEmailViaGmail(email, 'WorkSpace Invite', htmlContent);
  }
};
