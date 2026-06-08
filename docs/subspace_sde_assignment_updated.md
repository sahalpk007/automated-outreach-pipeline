# Subspace/Vocallabs SDE Assignment - Updated Brief

This document summarizes the original assignment PDF and the latest official updates shared by the Subspace/Vocallabs team.

## Assignment goal

Build a fully automated cold outreach pipeline where a human provides a single seed company domain and the system handles the rest of the flow automatically.[cite:17]

The intended original pipeline was:

1. Ocean.io: find lookalike companies from one seed domain.[cite:17]
2. Prospeo: find decision-makers and their LinkedIn profile URLs for those company domains.[cite:17]
3. Eazyreach: resolve LinkedIn profiles into verified work email addresses.[cite:17]
4. Brevo: send personalized outreach emails automatically.[cite:17]

## Updated instructions

The latest recruiter updates change two important parts of the original flow:[cite:17]

- Ocean.io login issues: it is acceptable to use a student email on Ocean.io, or use an alternative to Ocean.io if it provides free API credits.[cite:17]
- Eazyreach is no longer required: applicants can use Prospeo itself as the replacement for Eazyreach to find people and their email addresses, then continue the automation.[cite:17]

## Current practical pipeline

Based on the official updates, the practical assignment flow can now be treated as:

1. Input one seed company domain.[cite:17]
2. Use Ocean.io with a student email account, or use a suitable alternative if needed.[cite:17]
3. Use Prospeo to find relevant decision-makers, LinkedIn profiles, and email addresses.[cite:17]
4. Use Brevo to send personalized outreach emails automatically.[cite:17]
5. Keep a safety confirmation step before emails are actually sent.[cite:17]

## What the system should do

The assignment still expects a single command-line program that runs the stages end to end, with no manual copy-paste between stages.[cite:17]

A human should provide one seed domain, and the pipeline should automatically:

- fetch similar companies,[cite:17]
- fetch decision-makers for those companies,[cite:17]
- gather contact details needed for outreach,[cite:17]
- prepare personalized emails,[cite:17]
- and send them after a safety confirmation.[cite:17]

## Implementation expectations

The assignment asks for a clean build where each stage is a clear unit and the output of one stage becomes the input of the next.[cite:17]

Important expectations from the original brief still apply:

- Build it as a single command-line program.[cite:17]
- Wire authentication, pagination, and error handling correctly against real APIs.[cite:17]
- Keep the code modular and easy to extend.[cite:17]
- Handle missing contacts, rate limits, and partial failures without crashing the whole run.[cite:17]
- Add a safety checkpoint before email sending.[cite:17]
- Be ready to demo it live and explain technical decisions.[cite:17]

## Suggested account usage

A practical setup based on the official update is:

| Tool | Recommended email/account | Reason |
|---|---|---|
| Ocean.io | College email | Officially allowed as fallback when domain email signup fails.[cite:17] |
| Prospeo | Professional domain email such as `sahal@sahalpk.me` | Keeps prospecting and outreach tooling aligned to a professional sender identity. |
| Brevo | Professional domain email such as `sahal@sahalpk.me` | Best for sender verification, domain authentication, and outreach credibility. |

## Submission requirements

The submission format still requires the following:[cite:17]

1. Video demo using Explaino.[cite:17]
2. GitHub repository link.[cite:17]
3. Submission through the mandatory portal/form.[cite:17]

The original communication also stated that a live interview may happen immediately after the assignment round and that the live round may include code walkthrough, edge-case questions, and on-the-spot modifications.[cite:17]

## Recommended project structure

A simple implementation structure could look like this:

```text
project/
  main.py
  src/
    ocean.py
    prospeo.py
    brevo.py
    models.py
    utils.py
  .env
  README.md
```

If Ocean.io access becomes unstable, the Ocean stage should still be isolated in its own module so it can be swapped with an approved alternative without changing the rest of the pipeline logic.

## Final interpretation

The updated assignment is effectively a three-stage outreach pipeline in practice:

- company discovery through Ocean.io or an alternative,[cite:17]
- contact discovery through Prospeo,[cite:17]
- and outreach sending through Brevo.[cite:17]

The most important thing is still to show a working, explainable, end-to-end automation with clean handoffs, sensible error handling, and a clear demo.
