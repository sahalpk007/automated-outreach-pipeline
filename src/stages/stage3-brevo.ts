/**
 * Stage 3: Personalized Email Outreach via Brevo
 * 
 * Sends professionally templated, personalized cold emails to verified prospects
 * via Brevo's transactional SMTP API.
 * 
 * API Endpoint: https://api.brevo.com/v3/smtp/email
 * Authentication: api-key header (API Key)
 * 
 * Email Strategy:
 * - Frames outreach as a testing initiative (transparency and compliance)
 * - Includes explicit opt-out instruction (respect and GDPR compliance)
 * - Personalizes with prospect name, title, and company
 * - Professional HTML template with inline CSS for client compatibility
 * - Clearly marks as test message in subject line and footer
 * 
 * Input: Array of Prospect objects with verified emails
 * Output: Console logs of delivery status via Brevo message IDs
 */

import dotenv from 'dotenv';
import type { Prospect } from '../types.js';
dotenv.config();

/**
 * Sends personalized test outreach emails to prospects.
 * 
 * Implementation details:
 * - Sends individual emails (not batch) for granular error handling
 * - Includes full HTML template with inline CSS for cross-client compatibility
 * - Personalizes subject, greeting, and company references
 * - Handles per-email failures without stopping the loop
 * - Logs delivery status and Brevo message ID for tracking
 * - Uses environment variables for sender email/name (verified in Brevo)
 * 
 * @param prospects - Array of verified prospects to email
 * @returns Promise<void> - No return value; side effects are email sends and console logs
 */
export async function sendOutreachEmails(prospects: Prospect[]): Promise<void> {
    console.log(`\n🚀 Stage 3: Dispatching personalized emails...`);

    // Process each prospect with error isolation (one failure doesn't break the loop)
    for (const person of prospects) {
        try {
            // Build personalized HTML email template with inline CSS for compatibility across email clients
            const emailHtml = `
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { margin-bottom: 24px; }
        .content { margin-bottom: 24px; }
        .footer { color: #666; font-size: 14px; margin-top: 32px; border-top: 1px solid #e0e0e0; padding-top: 16px; }
        .signature { margin-top: 24px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <p>Dear ${person.firstName},</p>
        </div>
        <div class="content">
            <p>I hope this message finds you well. I came across your profile and was impressed by your role as ${person.title} at ${person.companyDomain}.</p>
            
            <p>I am currently testing a fully automated outreach workflow and wanted to share a short, relevant note. The goal is to see how well personalized outbound can support outreach and growth operations. Many organizations in your space are facing challenges with:</p>
            
            <ul>
                <li>Manual prospecting and lead discovery processes</li>
                <li>Inconsistent follow-up and engagement workflows</li>
                <li>Limited scalability without proportional team growth</li>
            </ul>
            
            <p>We've been building and testing automation around the outbound pipeline, from company discovery through personalized outreach, while keeping the communication straightforward and respectful.</p>
            
            <p>If this is relevant, I would be glad to connect briefly. If not, please feel free to ignore this email entirely.</p>
        </div>
        <div class="signature">
            <p>Best regards,</p>
            <p><strong>Sahal</strong><br/>
            Software Engineer<br/>
            <a href="https://sahalpk.me">sahalpk.me</a></p>
        </div>
        <div class="footer">
            <p>This is a test message from an automated outreach workflow. If you are not interested, please ignore this email.</p>
        </div>
    </div>
</body>
</html>
`;

            // Native fetch built around Brevo v3 Transactional SMTP guidelines
            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json',
                    'api-key': process.env.BREVO_API_KEY || ''
                },
                body: JSON.stringify({
                    sender: {
                        name: process.env.SENDER_NAME || 'Sahal',
                        email: process.env.SENDER_EMAIL || ''
                    },
                    to: [
                        {
                            email: person.email,
                            name: `${person.firstName} ${person.lastName}`
                        }
                    ],
                    subject: `Test: Automated Outreach Workflow for ${person.companyDomain}`,
                    htmlContent: emailHtml
                })
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(`❌ Brevo delivery failed for ${person.email}:`, data);
                continue;
            }

            console.log(`✉️ Email successfully fired to ${person.email} (ID: ${data.messageId})`);
        } catch (error) {
            console.error(`❌ Failed delivering email to ${person.email}:`, error);
        }
    }
}