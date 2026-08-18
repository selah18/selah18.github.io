# Away-Bot

A Telegram bot that chats with Ferihi in your voice while you're flying and
off the grid. You control it with commands from your own Telegram account;
it stays silent otherwise.

## How it works

1. Before your flight, you message the bot (from your own Telegram) with
   `/awaymode_on`.
2. When Ferihi messages the bot, her *first* message gets an upfront
   heads-up that it's your away-bot — then the AI replies in your voice
   for the rest of the conversation.
3. Every exchange gets forwarded to your own chat with the bot, so you have
   a full transcript to read when you land.
4. After landing, message `/awaymode_off` and it goes quiet — you take
   over normally.

She needs to message **the bot**, not your personal Telegram — so tell her
in advance to use this contact while you're flying.

## 1. Create the bot

1. Open Telegram, message **@BotFather**, send `/newbot`, follow the prompts.
2. Save the token it gives you (`TELEGRAM_BOT_TOKEN`).
3. Message **@userinfobot** to get your own numeric Telegram user ID
   (`OWNER_CHAT_ID`).

## 2. Get a free Groq API key

Sign up at https://console.groq.com, create an API key (`GROQ_API_KEY`).
Free tier is generous and plenty for this.

## 3. Edit your voice

Open `persona.py` — that's the only file you should need to touch to
change how it sounds. Adjust `PERSONA_PROMPT` and `DISCLOSURE_MESSAGE`
freely.

## 4. Run locally (to test before deploying)

```bash
pip install -r requirements.txt
cp .env.example .env   # then fill in your real values
export $(cat .env | xargs)   # loads env vars into your shell (mac/linux)
python bot.py
```

Message your bot from a second Telegram account (or ask a friend) to test
it while `/awaymode_on` is active.

## 5. Deploy so it runs while you're actually flying

Since this needs to run continuously (polling Telegram for messages), use
a **background worker**, not a web service — free web-service tiers
(Render, etc.) spin down when idle and would miss messages.

### Railway (recommended — you've used this before)

1. Push this folder to a GitHub repo.
2. In Railway: New Project → Deploy from GitHub repo.
3. Railway auto-detects Python. Set the **Start Command** to `python bot.py`.
4. Add environment variables (`TELEGRAM_BOT_TOKEN`, `GROQ_API_KEY`,
   `OWNER_CHAT_ID`, `GROQ_MODEL`) in the Variables tab.
5. Deploy. Check logs for "Bot starting..." — it should now be listening
   even with your laptop off.

### Render (alternative)

Use a **Background Worker** service (not Web Service) so it isn't killed
for having no open port:
1. New → Background Worker → connect repo.
2. Build command: `pip install -r requirements.txt`
3. Start command: `python bot.py`
4. Add the same environment variables.

### Koyeb (no credit card, free instance stays always-on)

Koyeb's free instance doesn't require a card and doesn't sleep, but it
expects your app to listen on a port — the bot now includes a tiny
built-in health-check server for exactly this (no extra setup needed on
your end).

1. Push this folder to GitHub (same as above).
2. koyeb.com → sign up (email only, no card) → **Create Web Service** →
   connect your GitHub repo.
3. Runtime: Python. Build command: `pip install -r requirements.txt`.
   Run command: `python bot.py`.
4. Under **Environment variables**, add `TELEGRAM_BOT_TOKEN`,
   `GROQ_API_KEY`, `OWNER_CHAT_ID`, `GROQ_MODEL`. Koyeb sets `PORT`
   automatically — you don't need to add it.
5. Deploy. Once it shows "Healthy", the bot is live and listening.

### Hugging Face Spaces

Less natural fit since Spaces expects a web app (Gradio/Streamlit), but
you can wrap `bot.py` to run in a background thread inside a minimal
Gradio app if you want to reuse a Space you already have. Railway or
Render's worker type is simpler for this.

## Notes on state (`state.json`)

Away-mode status, who's been greeted, and short conversation history are
stored in `state.json` next to the bot. On Railway/Render free tiers the
filesystem is usually persistent between deploys but can reset on a full
redeploy — for a single-flight use case that's fine; state resets are
harmless (worst case, disclosure fires again).

## Safety valve

The persona is instructed to punt — not improvise — on anything that
sounds urgent, distressed, or like it needs *you* specifically. Those
messages still get forwarded to you immediately, so you'll see them the
moment you land.
