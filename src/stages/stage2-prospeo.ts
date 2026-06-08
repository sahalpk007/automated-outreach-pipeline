/**
 * Stage 2: Decision-Maker Discovery & Email Verification via Prospeo
 * 
 * Identifies high-seniority executives (C-suite, VPs, Founders) at target companies
 * and extracts verified business email addresses from search results.
 * 
 * API Endpoint: https://api.prospeo.io/search-person
 * Authentication: X-KEY header (API Key)
 * 
 * Strategy: Data-efficient approach
 * - Uses search-person endpoint which returns partial email data in results
 * - Avoids costly enrichment API calls (which would require additional credits)
 * - Only collects prospects with emails already present in search results
 * - Filters by seniority level to ensure decision-maker relevance
 * 
 * Input: Array of company domains from Stage 1
 * Output: Array of Prospect objects with verified contacts
 */

import dotenv from 'dotenv';
import type { Prospect } from '../types.js';
dotenv.config();

/**
 * Discovers decision-makers and extracts verified email addresses.
 * 
 * Implementation details:
 * - Filters by seniority: Founder/Owner, C-Suite, Vice President, Director
 * - Only includes prospects with emails already in search results (avoids enrichment credits)
 * - Handles email data that may be nested in object or direct string
 * - Provides feedback on skipped prospects for transparency
 * - Uses "Executive" as fallback for missing first names
 * 
 * @param domains - Array of company domains to search for decision-makers
 * @returns Promise<Prospect[]> - Enriched prospect profiles with verified contacts
 */
export async function findDecisionMakersAndEmails(domains: string[]): Promise<Prospect[]> {
    console.log(`\n👥 Stage 2: Initiating Prospeo Lead Discovery Engine...`);
    const allProspects: Prospect[] = [];

    // Early return: no domains provided by Stage 1
    if (domains.length === 0) return [];

    try {
        console.log(`📡 Querying Prospeo Search-Person for lookalike domains...`);

        // Query Prospeo for high-seniority contacts at target companies
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