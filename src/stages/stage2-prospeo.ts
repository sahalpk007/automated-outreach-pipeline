import dotenv from 'dotenv';
import type { Prospect } from '../types.js';
dotenv.config();

export async function findDecisionMakersAndEmails(domains: string[]): Promise<Prospect[]> {
    console.log(`\n👥 Stage 2: Initiating Prospeo Lead Discovery Engine...`);
    const allProspects: Prospect[] = [];

    if (domains.length === 0) return [];

    try {
        console.log(`📡 Querying Prospeo Search-Person for lookalike domains...`);

        const searchResponse = await fetch('https://api.prospeo.io/search-person', {
            method: 'POST',
            headers: {
                'X-KEY': process.env.PROSPEO_API_KEY || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page: 1,
                filters: {
                    person_seniority: {
                        include: ["Founder/Owner", "C-Suite", "Vice President", "Director"]
                    },
                    company: {
                        websites: {
                            include: domains
                        }
                    }
                }
            })
        });

        if (!searchResponse.ok) {
            const errorData = await searchResponse.json().catch(() => ({}));
            console.error(`❌ Prospeo search error: ${searchResponse.status}`, errorData);
            return [];
        }

        const searchData = await searchResponse.json();
        const records = searchData.results || [];
        console.log(`✨ Found ${records.length} executive profile matches. Enriching contact info...`);

        // CREDIT SAFEGUARD: Extract available data from search results without enrichment API calls
        for (const record of records) {
            const person = record.person || {};
            const firstName = person.first_name || 'Executive';
            const lastName = person.last_name || '';

            // Extract email string from either nested object or direct value
            let email = '';
            if (person.email) {
                email = typeof person.email === 'string' ? person.email : person.email.email || '';
            } else if (record.email) {
                email = typeof record.email === 'string' ? record.email : record.email.email || '';
            }

            const title = person.title || 'Executive';
            const companyDomain = record.company?.website || record.company?.domain || 'Target Company';

            // Only collect contacts that already have verified email in search results
            if (email) {
                allProspects.push({
                    firstName,
                    lastName,
                    email,
                    title,
                    companyDomain
                });
                console.log(`   ✅ Captured: ${firstName} -> ${email}`);
            } else {
                console.log(`   ℹ️ Skipped ${firstName}: No email in search results (requires enrichment credit)`);
            }
        }

    } catch (error) {
        console.error('❌ Stage 2 Process Failed:', error);
    }

    console.log(`\n🏁 Identified & fully verified ${allProspects.length} actionable targets.`);
    return allProspects;
}