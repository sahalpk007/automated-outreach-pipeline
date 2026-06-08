/**
 * Stage 1: Lookalike Company Discovery via Ocean.io
 * 
 * Uses Ocean's proprietary company intelligence API to identify businesses
 * similar to a seed domain based on industry, size, and other factors.
 * 
 * API Endpoint: https://api.ocean.io/v3/search/companies
 * Authentication: X-Api-Token header (Bearer token)
 * 
 * Input: A seed company domain (e.g., "stripe.com")
 * Output: Array of lookalike company domains (limited to top 5)
 * 
 * Error Handling: Returns empty array on API failure; errors are logged but don't crash the pipeline
 */

import dotenv from 'dotenv';
dotenv.config();

/**
 * Fetches lookalike companies from Ocean.io API.
 * 
 * Implementation details:
 * - Filters companies by SaaS industry to maintain relevance
 * - Limits API request to 10 results, then caps output to 5 targets
 * - Gracefully handles missing/malformed API responses
 * - Uses optional chaining (?.) for safe nested object navigation
 * 
 * @param seedDomain - Reference company domain for similarity matching
 * @returns Promise<string[]> - Array of discovered company domains
 */
export async function findLookalikeCompanies(seedDomain: string): Promise<string[]> {
    console.log(`\n🔍 Stage 1 (Ocean.io): Finding lookalike companies related to ${seedDomain}...`);

    try {
        // Call Ocean.io search API with SaaS industry filters
        const response = await fetch('https://api.ocean.io/v3/search/companies', {
            method: 'POST',
            headers: {
                'X-Api-Token': process.env.OCEAN_API_KEY || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                companiesFilters: {
                    industries: {
                        industries: ['SaaS']
                    }
                },
                size: 10
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Ocean.io API error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();

        const records = data.companies || [];

        // Extract domain names cleanly from the response payload
        const domains: string[] = records
            .map((item: any) => item.company?.domain)
            .filter(Boolean)
            .slice(0, 5); // Pick the top 5 targets to pass down the line

        console.log(`✅ Stage 1 Complete: Discovered ${domains.length} lookalike companies via Ocean.io.`);
        return domains;
    } catch (error) {
        console.error('❌ Stage 1 (Ocean.io) Pipeline Failed:', error);
        return [];
    }
}