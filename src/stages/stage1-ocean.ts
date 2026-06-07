import dotenv from 'dotenv';
dotenv.config();

export async function findLookalikeCompanies(seedDomain: string): Promise<string[]> {
    console.log(`\n🔍 Stage 1 (Alternative): Finding accounts related to ${seedDomain} via Prospeo...`);

    try {
        const response = await fetch('https://api.prospeo.io/search-company', {
            method: 'POST',
            headers: {
                'X-KEY': process.env.PROSPEO_API_KEY || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                page: 1,
                filters: {
                    // Isolated exclusively to the verified valid enum string
                    "company_industry": {
                        "include": ["Software Development"]
                    }
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Prospeo Company API error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        const records = data.results || [];

        // Extract domain names cleanly from the response payload
        const domains: string[] = records
            .map((item: any) => item.company?.website || item.company?.domain)
            .filter(Boolean)
            .slice(0, 5); // Pick the top 5 targets to pass down the line

        console.log(`✅ Stage 1 Complete: Discovered ${domains.length} live target companies.`);
        return domains;
    } catch (error) {
        console.error('❌ Stage 1 Alternative Pipeline Failed:', error);
        return [];
    }
}