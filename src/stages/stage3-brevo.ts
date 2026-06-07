import dotenv from 'dotenv';
import type { Prospect } from '../types.js';
dotenv.config();

export async function sendOutreachEmails(prospects: Prospect[]): Promise<void> {
    console.log(`\n🚀 Stage 3: Dispatching personalized emails...`);

    for (const person of prospects) {
        try {
            // Personalized outreach template
            const emailHtml = `<html><head></head><body><p>Hi ${person.firstName},</p><p>I noticed your work as ${person.title} at ${person.companyDomain}.</p><p>We are building automated outbound infrastructure that scales pipelines with zero humans in the loop. Would love to sync up!</p><p>Best,<br/>Sahal</p></body></html>`;

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
                    subject: `Quick question regarding operations at ${person.companyDomain}`,
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