# gigshq: App Context for Claude

## What this app is

gigshq is a personal job, freelance, and contract search workspace for one person. Its purpose is to help its owner find relevant opportunities, keep a focused pipeline, prepare tailored applications, and follow up on outreach. The near-term objective is to land a gig, project, or contract within two weeks.

This is not a multi-tenant SaaS product. Do not add team, invitation, collaboration, or shared-workspace features unless explicitly requested.

## Owner profile and target work

- Core positioning: Full-Stack Engineer, UI/UX Designer, and Content Strategist.
- Skills include Next.js, Supabase, WordPress, Shopify, Figma, email design, copywriting, content strategy, AI-assisted content, UGC, and Web2/Web3 integration.
- Portfolio: https://jdev-live.vercel.app
- Target markets: African opportunities and global remote work.
- Relevant opportunity types include full-stack and frontend development, WordPress/Shopify projects, UI/UX and Figma design, email design, copywriting, content strategy, AI content, UGC, and Web3/Web2 work.

## Current product areas

The dashboard navigation contains:

1. **Opportunities & Leads**: Add, edit, search, filter, update status, and delete opportunities. Records are intended to live in the signed-in user's Supabase account. Fields include company, title, description, source, contact, compensation, and status.
2. **Campaigns & Ingestion**: Navigation exists, but campaign ingestion is not connected.
3. **AI Pitch Generator**: Implemented as a review-only draft tool using OpenRouter's `nvidia/nemotron-3.5-lightning:free` model. It accepts one saved opportunity and a selected PDF, DOCX, or TXT CV, extracts CV text on the server, and returns an editable pitch draft in the browser. It does not persist or send the draft. Runtime behavior still needs verification with a signed-in account, a configured `OPENROUTER_API_KEY`, an opportunity, and a supported CV.
4. **Email Outbound Tracker**: Navigation exists, but email sending and outreach tracking are not connected.
5. **Settings / Profile Context**: Includes account details and three private career-document categories:
   - Master CV
   - Social media & content writer CV
   - WordPress CV

The CV uploader accepts PDF, DOC, DOCX, and TXT files up to 10 MB. It uploads to the private Supabase Storage bucket named `career-documents`, organizes objects under the authenticated user's ID and CV category, lists saved files, and supports removing files.

The owner reports that the Supabase Storage SQL setup ran successfully. The setup script is in `supabase/migrations/20261016000000_create_private_career_documents_bucket.sql`. This report is not the same as an independently verified end-to-end upload test.

## What is connected and what is not

### Connected in the code

- Next.js app using the App Router and React.
- Supabase authentication gates the dashboard. Unauthenticated visitors are redirected to sign-in.
- Supabase client and server helpers are configured in `lib/supabase/`.
- Opportunity records are read and managed through the `opportunities` table.
- Career documents use Supabase Storage with owner-folder access policies in the migration above.
- Mobile navigation and responsive dashboard layouts are present.

### Not connected yet

- No live job-board API, automated scraping, scheduled ingestion, or deduplication workflow.
- The pitch generator calls OpenRouter from `app/api/ai/pitch/route.ts`. It requires `OPENROUTER_API_KEY` in local and deployed server environments. The selected CV and opportunity details are sent to OpenRouter and its model provider for generation, as disclosed in the UI.
- The current model ID has the `:free` variant. Availability and provider limits can change; check current OpenRouter model pricing/limits before relying on free service. Do not add credits or paid usage without explicit approval.
- The server can extract text from PDF, DOCX, and TXT files for a pitch. DOC files can be stored but cannot currently be parsed for generation.
- No email delivery provider or automatic sending. Do not build auto-send unless explicitly requested; generated messages should be reviewable first.
- Campaigns and outbound analytics are not implemented as live workflows.
- Do not describe mock UI, example data, or planned integrations as live functionality.

## AI API direction and privacy

The owner wants a free option. OpenRouter free model variants are a possible starting point, but model availability and free limits can change. Verify the selected model's current pricing, limits, and provider policies before implementing. Do not add paid credits, paid services, or infrastructure that can incur charges without explicit approval.

If AI generation is implemented:

- Make provider calls from a server-side route or server action. Never expose the API key in client-side code.
- Use an environment variable such as `OPENROUTER_API_KEY`; do not commit secrets.
- Start from the shortest relevant CV information and job description. Do not transmit full documents, contact data, or unrelated personal information without a clear need and user awareness.
- Validate input sizes and types, handle provider errors visibly, and clearly identify generated text as a draft that needs human review.
- Do not send emails automatically.

## Design and implementation preferences

- Keep the interface light-only, clean, and focused, with a restrained Vercel/Linear-style visual language.
- Build for one person's job search, not a B2B team workflow.
- Preserve accessible semantic controls, keyboard operation, responsive behavior, and existing shadcn/ui composition patterns.
- Treat this as a working prototype until the related backend and provider workflows have actually been configured and tested.
- Show clear feedback for success and failure. Label sample data and prototype behavior honestly.
- Keep secrets server-side. Validate and sanitize user-controlled text, URLs, files, and generated content.
- Prefer small, direct changes consistent with the existing codebase. Avoid unrelated refactors.
- Before changing dependencies, inspect the package manifest and lockfile. There may already be ongoing local changes.
- Run the narrowest relevant check first, then the production build for substantial changes. Do not claim a browser, provider, or Supabase flow was tested unless it was.

## Practical near-term priority

The two-week goal favors useful, low-friction work over building a broad automation platform. Prioritize:

1. Confirm the owner can sign in and upload each of the three CV types.
2. Make manual opportunity entry and status tracking reliable.
3. Add AI-assisted, editable application or outreach drafts once an API key is configured, keeping the provider integration free-only and server-side.
4. Keep job discovery and outreach honest and human-reviewed until live sources and email delivery are explicitly implemented.
