/**
 * Core TypeScript interfaces for type-safe data flow across pipeline stages.
 * These represent the contract between stages and ensure data consistency.
 */

/**
 * Represents a company discovered by the lookalike discovery engine.
 * @property domain - Root domain of the company (e.g., "stripe.com")
 */
export interface CompanyInfo {
    domain: string;
}

/**
 * Represents a verified prospect ready for outreach.
 * Enriched with contact and company information from discovery and research stages.
 * 
 * @property firstName - First name of the prospect
 * @property lastName - Last name of the prospect
 * @property email - Verified business email address (from Prospeo)
 * @property title - Job title or role at the company
 * @property companyDomain - Domain of the prospect's company
 */
export interface Prospect {
    firstName: string;
    lastName: string;
    email: string;
    title: string;
    companyDomain: string;
}