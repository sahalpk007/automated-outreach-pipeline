# Automated Outreach Pipeline

An intelligent, automated B2B outreach system that discovers lookalike companies, identifies decision makers, and sends personalized cold emails at scale.

## Problem Statement

Sales and business development teams spend countless hours manually:

- Researching competitor companies and finding similar prospects
- Hunting for decision makers and their contact information
- Manually composing personalized cold emails
- Tracking campaign progress and response rates

This manual process is time-consuming, error-prone, and doesn't scale. **Automated Outreach Pipeline** solves this by fully automating the discovery-to-outreach workflow.

## Features

✨ **Three-Stage Automated Pipeline:**

- **Stage 1 - Lookalike Discovery**: Find similar companies based on a seed domain using Ocean API
- **Stage 2 - Prospect Research**: Identify decision makers and extract verified email addresses using Prospeo API
- **Stage 3 - Outreach Execution**: Send personalized emails at scale using Brevo API

🛡️ **Safety Checkpoint**: Review and approve all prospects before sending emails

📊 **Structured Data**: Type-safe prospect and company information management

⚡ **Fast & Efficient**: Built with TypeScript for type safety and Node.js for performance

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Language** | TypeScript |
| **Runtime** | Node.js |
| **Build Tool** | TSC (TypeScript Compiler) |
| **Execution** | tsx (TypeScript executor) |
| **Package Manager** | npm |
| **API Integrations** | Ocean, Prospeo, Brevo |
| **Email Service** | Brevo (formerly Sendinblue) |

**Key Dependencies:**

- `@getbrevo/brevo` - Official Brevo API client
- `dotenv` - Environment variable management
- `typescript` - Type safety and compilation
- `tsx` - Run TypeScript directly without pre-compilation
- `@types/node` - Node.js type definitions

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm
- API credentials for:
  - [Ocean API](https://ocean.ai/) - For lookalike company discovery
  - [Prospeo API](https://prospeo.io/) - For prospect research and email verification
  - [Brevo API](https://www.brevo.com/) - For email delivery

### Setup Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sahalpk007/automated-outreach-pipeline.git
   cd automated-outreach-pipeline
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in the project root with your API credentials:

   ```env
   OCEAN_API_KEY=your_ocean_api_key
   PROSPEO_API_KEY=your_prospeo_api_key
   BREVO_API_KEY=your_brevo_api_key
   BREVO_SENDER_EMAIL=your_verified_sender_email@company.com
   ```

4. **Build the project (optional):**

   ```bash
   npm run build
   ```

## Usage

### Running the Pipeline

Start the interactive pipeline:

```bash
npm run dev
```

### Pipeline Flow

1. **Enter a seed domain** (e.g., `stripe.com`)
   - The system will find similar companies based on this reference

2. **Stage 1 - Lookalike Discovery**
      OCEAN_API_KEY=your_ocean_api_key
      PROSPEO_API_KEY=your_prospeo_api_key
      BREVO_API_KEY=your_brevo_api_key
      SENDER_EMAIL=<your_verified_sender_email@company.com>
      SENDER_NAME="Your Name"
   - Identifies decision makers at each target company
   - Extracts and verifies email addresses using Prospeo
   - Returns enriched prospect profiles with contact details
   Sends personalized cold emails via Brevo.

   Note: The current default email copy is sent as a test message (subject prefixed with "Test:") and includes a clear opt-out/instruction to ignore if not interested. The pipeline still requires your explicit confirmation at the Safety Checkpoint before any emails are dispatched.
   - Confirm that verified emails will be used
   - Authorize or abort before any emails are sent

3. **Stage 3 - Outreach Execution**
   - Sends personalized cold emails via Brevo
   | `OCEAN_API_KEY` | API key for Ocean lookalike discovery service (used by Stage 1) | Yes |
   | `PROSPEO_API_KEY` | API key for Prospeo prospect research service (used by Stage 2) | Yes |
   | `BREVO_API_KEY` | API key for Brevo email service (used by Stage 3) | Yes |
   | `SENDER_EMAIL` | Verified sender email address (used as the `from` address) | Yes |
   | `SENDER_NAME` | Human-readable sender name shown in emails | Recommended |

```
📥 Enter a seed company domain (e.g., stripe.com): stripe.com

[Stage 1] Searching for lookalike companies...
✅ Found 15 similar companies

[Stage 2] Extracting decision makers and emails...
✅ Found 23 verified prospects

🛑 --- SAFETY CHECKPOINT ---
The system is primed to mail 23 verified contacts:
  [1] John Smith (VP Sales) -> john@example.com
  [2] Sarah Johnson (CEO) -> sarah@example2.com
  ...

Do you authorize sending these personalized emails? (yes/no): yes

[Stage 3] Sending outreach emails...
✅ Pipeline execution successfully finished!
```

## Project Structure

```
automated-outreach-pipeline/
├── src/
│   ├── index.ts                    # Main entry point and pipeline orchestrator
│   ├── types.ts                    # TypeScript type definitions
│   └── stages/
│       ├── stage1-ocean.ts         # Lookalike company discovery
│       ├── stage2-prospeo.ts       # Prospect research & email verification
│       └── stage3-brevo.ts         # Personalized email delivery
├── package.json                    # Project dependencies
├── tsconfig.json                   # TypeScript configuration
├── .env.example                    # Example environment variables
└── README.md                       # This file
```

## Stage Details

### Stage 1: Lookalike Company Discovery

- **Input**: Seed company domain
- **Process**: Uses Ocean API to find similar companies based on industry, size, and characteristics
- **Output**: List of target company domains

### Stage 2: Prospect Research & Email Verification

- **Input**: List of company domains
- **Process**: Identifies key decision makers and verifies their email addresses using Prospeo
- **Output**: Enriched prospect profiles with name, title, email, and company info

### Stage 3: Personalized Email Outreach

- **Input**: List of verified prospects
- **Process**: Sends personalized cold emails via Brevo with customized content
- **Output**: Email delivery confirmation and campaign metrics

## Screenshots

> Add screenshots here (to be added later):

- ![Pipeline Main Menu](./screenshots/01-main-menu.png)
- ![Lookalike Discovery Results](./screenshots/02-lookalike-results.png)
- ![Prospect Research Results](./screenshots/03-prospect-results.png)
- ![Safety Checkpoint Review](./screenshots/04-safety-checkpoint.png)
- ![Email Delivery Status](./screenshots/05-delivery-status.png)

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OCEAN_API_KEY` | API key for Ocean lookalike discovery service | Yes |
| `PROSPEO_API_KEY` | API key for Prospeo prospect research service | Yes |
| `BREVO_API_KEY` | API key for Brevo email service | Yes |
| `BREVO_SENDER_EMAIL` | Verified sender email address in Brevo | Yes |

## Scripts

```bash
# Run the pipeline in development mode
npm run dev

# Build the TypeScript project
npm run build

# Run the compiled JavaScript (after building)
npm start
```

## How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                  Automated Outreach Pipeline                │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    (Enter Seed Domain)
                              ↓
                    ┌─────────────────┐
                    │  Stage 1: Ocean │
                    │ Find Lookalikes │
                    └────────┬────────┘
                             ↓
                    ┌─────────────────────┐
                    │ Stage 2: Prospeo    │
                    │ Find Decision Makers│
                    │ & Verify Emails     │
                    └────────┬────────────┘
                             ↓
                    ┌─────────────────────┐
                    │ Safety Checkpoint   │
                    │ Review & Authorize  │
                    └────────┬────────────┘
                             ↓
                    ┌─────────────────────┐
                    │ Stage 3: Brevo      │
                    │ Send Emails at Scale│
                    └────────┬────────────┘
                             ↓
                    (Campaign Complete)
```

## Error Handling

The pipeline includes robust error handling:

- Validates user input and API responses
- Gracefully handles API rate limits and timeouts
- Provides clear error messages for troubleshooting
- Checkpoints prevent accidental email sends

## Best Practices

1. **Test with small batches** - Start with 5-10 prospects before scaling
2. **Personalize email content** - Customize messages for better response rates
3. **Monitor deliverability** - Check Brevo dashboard for bounce rates and complaints
4. **Respect email regulations** - Ensure compliance with CAN-SPAM and GDPR
5. **Set appropriate delays** - Space out emails to avoid spam folder placement

## Limitations & Notes

- Requires valid API credentials for all three services
- Email delivery depends on Brevo's sender reputation
- Prospect data quality depends on Ocean and Prospeo accuracy
- Rate limits apply to each API service
- Should be used responsibly with proper email authentication

## Future Enhancements

- [ ] Support for multiple seed domains
- [ ] Custom email templates
- [ ] A/B testing for subject lines and content
- [ ] Response tracking and engagement metrics
- [ ] Scheduled campaigns
- [ ] Database integration for prospect history
- [ ] Web dashboard for campaign monitoring

## Contributing

Contributions are welcome! Please feel free to submit issues and enhancement requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions:

- Open an issue on [GitHub](https://github.com/sahalpk007/automated-outreach-pipeline/issues)
- Check existing documentation and examples

## Disclaimer

This tool is designed for legitimate B2B sales and marketing purposes. Users are responsible for:

- Obtaining proper API credentials
- Following email marketing best practices
- Complying with anti-spam laws (CAN-SPAM, GDPR, etc.)
- Respecting recipient preferences and privacy
- Monitoring email deliverability and bounce rates

Misuse of this tool for spamming or unauthorized contact is strictly prohibited.

---

**Made with ❤️ by the Automated Outreach Team**
