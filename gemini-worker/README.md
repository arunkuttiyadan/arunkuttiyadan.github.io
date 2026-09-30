# AURA backend

This Cloudflare Worker keeps the Gemini credential on the server and accepts chat requests only from the portfolio domain.

## Deploy

1. Install dependencies with `npm install` in this directory.
2. Sign in with `npx wrangler login`.
3. Store the credential with `npx wrangler secret put GEMINI_API_KEY`.
4. Deploy with `npm run deploy`.
5. Add the resulting Worker URL to the GitHub repository variable `AURA_ENDPOINT` and rerun the Pages workflow.

Never commit a Gemini API key to this repository.
