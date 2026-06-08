/**
 * Automated Outreach Pipeline - Main Entry Point
 * 
 * Orchestrates a three-stage automated cold outreach workflow:
 * 1. Company Discovery: Find lookalike companies via Ocean.io
 * 2. Prospect Research: Identify decision-makers via Prospeo
 * 3. Email Outreach: Send personalized emails via Brevo
 * 
 * Includes a safety checkpoint to prevent accidental bulk email sends.
 */

import readline from 'readline';
import { findLookalikeCompanies } from './stages/stage1-ocean.js';
import { findDecisionMakersAndEmails } from './stages/stage2-prospeo.js';
import { sendOutreachEmails } from './stages/stage3-brevo.js';

// Initialize readline interface for interactive CLI input/output
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Main pipeline orchestrator.
 * 
 * Flow:
 * 1. Accepts seed domain from user input
 * 2. Executes Stage 1 (Ocean.io) to find lookalike companies
 * 3. Executes Stage 2 (Prospeo) to extract decision-makers and verified emails
 * 4. Displays safety checkpoint for operator review and authorization
 * 5. On approval, executes Stage 3 (Brevo) to dispatch personalized emails
 * 6. Gracefully handles errors and early termination at each stage
 */
async function runPipeline() {
    // Prompt user for seed company domain to begin the discovery process
    rl.question('📥 Enter a seed company domain (e.g., stripe.com): ', async (seedDomain) => {
        if (!seedDomain.trim()) {
            console.log('Domain input cannot be blank.');
            rl.close();
            return;
        }

        // Run Stage 1
        const lookalikes = await findLookalikeCompanies(seedDomain.trim());
        if (lookalikes.length === 0) {
            console.log('No lookalike targets returned. Ending pipeline.');
            rl.close();
            return;
        }

        // Run Stage 2
        const prospects = await findDecisionMakersAndEmails(lookalikes);
        if (prospects.length === 0) {
            console.log('No verified emails found for targets. Ending pipeline.');
            rl.close();
            return;
        }

        // 2. The Evaluation Safety Checkpoint
        console.log('\n🛑 --- SAFETY CHECKPOINT ---');
        console.log(`The system is primed to mail ${prospects.length} verified contacts:`);
        prospects.forEach((p, idx) => {
            console.log(`  [${idx + 1}] ${p.firstName} (${p.title}) -> ${p.email}`);
        });

        rl.question('\n Do you authorize sending these personalized emails? (yes/no): ', async (answer) => {
            if (answer.trim().toLowerCase() === 'yes') {
                // Run Stage 3
                await sendOutreachEmails(prospects);
                console.log('\n🏁 Pipeline execution successfully finished!');
            } else {
                console.log('\n❌ Execution aborted by operator. No emails were sent.');
            }
            rl.close();
        });
    });
}

runPipeline();