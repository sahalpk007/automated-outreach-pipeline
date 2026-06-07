import readline from 'readline';
import { findLookalikeCompanies } from './stages/stage1-ocean.js';
import { findDecisionMakersAndEmails } from './stages/stage2-prospeo.js';
import { sendOutreachEmails } from './stages/stage3-brevo.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function runPipeline() {
    // 1. Parse CLI input domain
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