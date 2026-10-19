# Aadhya AI Girlfriend — mobile deployment guide

This project is a Node.js website. The chat works with demo replies without a key.
To enable live AI responses, add an OpenAI API key as a private environment variable on your hosting provider. Never put the key in `public/`, `app.js`, or any file uploaded to a public website.

## Easiest deployment path from an Android phone

### Option A — Deploy on Render (includes the server for AI replies)

1. Extract `aadhya_ai_girlfriend_website.zip` using your phone's Files app.
2. In your mobile browser, sign in to GitHub and create a **new private repository** named `aadhya-ai-girlfriend`.
3. Upload the extracted project files while preserving this structure:
   - `package.json`
   - `server.js`
   - `render.yaml`
   - `.gitignore`
   - `.env.example`
   - `README-MOBILE.md`
   - `public/index.html`
   - `public/style.css`
   - `public/app.js`
4. Visit https://render.com and sign in. Choose **New + → Web Service**, connect GitHub, and select your repository.
5. Render should detect `render.yaml`. If it asks, use:
   - Runtime: Node
   - Build command: `npm install`
   - Start command: `npm start`
6. In the service's **Environment** settings, add `OPENAI_API_KEY` with your own API key. Do not commit the key to GitHub.
7. Tap **Deploy** and wait until the service is live. Open the `onrender.com` URL Render provides.

Notes:
- A free hosting service may sleep when inactive and take a little time to wake up.
- AI API usage may cost money and may require billing to be enabled with the API provider.
- If you don't add an API key, the website still opens but uses simple demo replies.
- Do not share your API key or place it in a screenshot.

## Option B — Try the interface first

Open `public/index.html` locally in your phone's browser if your file manager supports it, or deploy the project with a static host. Static hosting alone gives you the front-end/demo experience; real AI replies require the Node.js server to be hosted too.

## Run on a computer later

Install Node.js, open this folder in a terminal, and run:

```bash
npm install
npm start
```

Then visit http://localhost:3000.
