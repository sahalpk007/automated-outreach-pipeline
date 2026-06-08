import dotenv from 'dotenv';
dotenv.config();

export async function findLookalikeCompanies(seedDomain: string): Promise<string[]> {
    console.log(`\n🔍 Stage 1 (Ocean.io): Finding lookalike companies related to ${seedDomain}...`);

    try {
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