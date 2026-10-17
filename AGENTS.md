<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Secrets and environment handling

- Never commit real API keys, tokens, or credentials.
- Keep secrets only in local environment files such as `.env.local` and never paste them into chats, PRs, or code comments.
- This project ignores `.env`, `.env.*`, and `.env.local` in Git so the real OpenRouter key stays out of source control.
- Use `.env.example` as the safe template and replace the placeholder value locally only.
- If a key is entered into the shell, terminal history, logs, or tool output, rotate it immediately.
