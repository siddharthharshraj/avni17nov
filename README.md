# Avni Website

Official website for Avni - Open-source field data collection platform for NGOs.

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Content:** Markdown with frontmatter
- **Deployment:** Netlify

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create `.env.local` file:

```bash
# Mailchimp Newsletter
MAILCHIMP_API_KEY=your_api_key
MAILCHIMP_AUDIENCE_ID=your_audience_id
MAILCHIMP_SERVER_PREFIX=us21

# Google Calendar (optional)
NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY=your_api_key

# Formspree Contact Form
FORMSPREE_FORM_ID=your_form_id
```
## License

AGPL-3.0 - See LICENSE file for details.

## Links

- Website: https://avniproject.org
- GitHub: https://github.com/avniproject
