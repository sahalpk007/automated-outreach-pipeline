# Automated Outreach Pipeline

## Problem

Building a fully automated cold-outreach engine that companies pay for. This system solves the challenge of scaling personalized B2B outreach by automating the entire pipeline from company discovery to email delivery—without any manual handoffs or copy-paste operations.

**Key Pain Points Addressed:**

- Manual identification of target companies is time-consuming and error-prone
- Finding decision-makers requires extensive LinkedIn research
- Verifying work emails is tedious and unreliable
- Personalizing outreach at scale is nearly impossible manually
- Zero automation in the traditional outreach workflow

## Features

### One Input. Four Stages. A Full Outreach Engine

The system takes a **single company domain** as input and automatically executes through multiple stages:

#### Stage 1: Find Lookalike Companies (Prospeo)

- Discovers companies similar to your seed domain
- Uses industry filters and company data
- Returns clean list of target company domains
- Output: Domain names for next stage

#### Stage 2: Find Decision-Makers (Prospeo)

- Surfaces C-suite and VP-level decision makers
- Extracts LinkedIn profiles and company roles
- Builds comprehensive contact profiles
- Output: Professional titles and contact information

#### ~~Stage 3: Resolve Work Email IDs (Eazyreach)~~ **SKIPPED**

- *Note: Eazyreach had API issues and was skipped during implementation*
- Alternative approach: Email verification integrated with Stage 2 data

#### Stage 3: Send Personalized Outreach (Brevo)

- Sends fully personalized cold emails
- Uses decision-maker data for personalization
- Includes safety checkpoint before sending
- Output: Delivery confirmations with tracking

### Key Capabilities

✅ **Runs End-to-End** - One domain input triggers all four stages automatically  
✅ **No Manual Handoffs** - Each stage feeds directly into the next  
✅ **Error Resilience** - Handles rate limits, missing data, and partial failures  
✅ **Safety Checkpoint** - Shows a summary before emails actually fire  
✅ **Clean, Modular Code** - Each stage is independent and testable  
✅ **Sharp Email Copy** - Personalized outreach (copy is yours to refine)

## Tech Stack

- **Runtime:** Node.js with TypeScript
- **Language:** TypeScript 6.0.3
- **API Integrations:**
  - **Prospeo** - Company discovery and people search
  - **Brevo** - Email delivery platform
- **Build Tool:** TSX (TypeScript executor)
- **Dependencies:**
  - `@getbrevo/brevo` - Brevo SDK for email operations
  - `dotenv` - Environment variable management
  - `typescript` - Type safety

## Project Structure

```
automated-outreach-pipeline/
├── src/
│   ├── index.ts                 # Main CLI entry point
│   ├── types.ts                 # TypeScript interfaces
│   └── stages/
│       ├── stage1-ocean.ts      # Company discovery
│       ├── stage2-prospeo.ts    # Decision-maker research
│       └── stage3-brevo.ts      # Email sending
├── package.json
├── tsconfig.json
└── README.md
```

## How It Works

### Step-by-Step Flow

1. **User Input** → A human provides one seed domain (e.g., `stripe.com`)
2. **Stage 1** → System discovers 5 lookalike companies with similar characteristics
3. **Stage 2** → Researches decision-makers at each company, extracts emails and profiles
4. **Safety Checkpoint** → Shows prospected contacts before sending; requires human approval
5. **Stage 3** → Sends personalized emails through Brevo
6. **Completion** → Pipeline finishes, all data is processed end-to-end

### Data Flow

```
Domain Input
    ↓
Stage 1: Discover Companies (Prospeo API)
    ↓ (Returns: domain list)
Stage 2: Find Decision-Makers (Prospeo API)
    ↓ (Returns: prospect profiles with emails)
[SAFETY CHECKPOINT - User Approval]
    ↓
Stage 3: Send Emails (Brevo API)
    ↓
Pipeline Complete
```

## Setup & Installation

### Prerequisites

- Node.js (v16+)
- npm or yarn
- API credentials for:
  - **Prospeo** - Get API key from [app.prospeo.io](https://app.prospeo.io/api)
  - **Brevo** - Sign up at [app.brevo.com](https://app.brevo.com)

### Installation Steps

```bash
# Clone the repository
git clone <repository-url>
cd automated-outreach-pipeline

# Install dependencies
npm install

# Create .env file with API credentials
touch .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PROSPEO_API_KEY=your_prospeo_api_key_here
BREVO_API_KEY=your_brevo_api_key_here
BREVO_SENDER_EMAIL=your_company_email@domain.com
```

## Usage

### Run the Pipeline

```bash
npm run dev
```

**Interactive Prompt:**

```
📥 Enter a seed company domain (e.g., stripe.com): 
```

Enter a domain and the system will:

1. Discover similar companies
2. Research decision-makers
3. Show safety checkpoint
4. Ask for approval
5. Send emails if approved

### Example Execution

```bash
$ npm run dev

📥 Enter a seed company domain (e.g., stripe.com): slack.com

🔍 Stage 1 (Alternative): Finding accounts related to slack.com via Prospeo...
✅ Stage 1 Complete: Discovered 5 live target companies.

🔍 Stage 2: Researching decision-makers and verified work emails...
✅ Stage 2 Complete: Found 12 verified prospects.

🛑 --- SAFETY CHECKPOINT ---
The system is primed to mail 12 verified contacts:
  [1] John Smith (VP Sales) -> john@company1.com
  [2] Jane Doe (CEO) -> jane@company2.com
  ...

Do you authorize sending these personalized emails? (yes/no): yes

📧 Stage 3: Sending personalized outreach emails...
✅ Pipeline execution successfully finished!
```

## Screenshots

*[Add pipeline execution screenshots here]*

- Screenshot 1: CLI input prompt - `screenshots/01-cli-input.png`
- Screenshot 2: Stage 1 execution output - `screenshots/02-stage1-output.png`
- Screenshot 3: Stage 2 decision-maker discovery - `screenshots/03-stage2-prospects.png`
- Screenshot 4: Safety checkpoint before sending - `screenshots/04-safety-checkpoint.png`
- Screenshot 5: Stage 3 email delivery - `screenshots/05-stage3-delivery.png`
- Screenshot 6: Final completion message - `screenshots/06-completion.png`

## Notes & Implementation Details

### Stage 1 (Ocean → Prospeo Alternative)

- Original plan used Ocean.io but switched to Prospeo for reliability
- Filters companies by software development industry
- Returns top 5 targets to avoid overwhelming the pipeline

### Stage 2 (Prospeo)

- Searches for C-suite and VP-level contacts
- Extracts LinkedIn profiles for verification
- Handles missing data gracefully

### Stage 3 (Brevo - Email Sending)

- ~~Eazyreach was originally planned but had API issues, so it was skipped~~
- Uses Brevo's SMTP and transactional email APIs
- Implements personal touch through Brevo template system

### Safety Checkpoint

- Critical feature to prevent accidental mass emails
- Shows all prospected contacts before sending
- Requires explicit user confirmation

## Troubleshooting

**Issue:** "Prospeo API error"

- Check your API key in `.env`
- Verify your Prospeo account has available credits

**Issue:** "No lookalike targets returned"

- Try a different seed domain
- Check if the domain exists and is valid

**Issue:** "No verified emails found"

- The discovery stage may have insufficient data
- Try a larger seed company in a common industry

## Future Enhancements

- [ ] Integration with Email warmup tools
- [ ] A/B testing for email subject lines
- [ ] Real-time delivery tracking dashboard
- [ ] Integration with CRM systems
- [ ] Batch processing for multiple seed domains
- [ ] Custom email template builder

## License

ISC
