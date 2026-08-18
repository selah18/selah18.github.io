import os
import json
import logging
import threading
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path

from telegram import Update
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    ContextTypes,
    filters,
)
from groq import Groq

from persona import PERSONA_PROMPT, DISCLOSURE_MESSAGE

logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(__name__)

# ---- config from environment ----
BOT_TOKEN = os.environ["TELEGRAM_BOT_TOKEN"]
GROQ_API_KEY = os.environ["GROQ_API_KEY"]
OWNER_CHAT_ID = int(os.environ["OWNER_CHAT_ID"])  # your Telegram user ID
GROQ_MODEL = os.environ.get("GROQ_MODEL", "llama-3.3-70b-versatile")

STATE_FILE = Path(__file__).parent / "state.json"
groq_client = Groq(api_key=GROQ_API_KEY)


def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {"away_mode": False, "greeted_chats": [], "history": {}}


def save_state(state: dict) -> None:
    STATE_FILE.write_text(json.dumps(state, indent=2))


state = load_state()


def is_owner(user_id: int) -> bool:
    return user_id == OWNER_CHAT_ID


async def awaymode_on(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_owner(update.effective_user.id):
        return
    state["away_mode"] = True
    state["greeted_chats"] = []  # reset so disclosure fires again next flight
    save_state(state)
    await update.message.reply_text("Away mode ON. I've got it from here — safe flight ✈️")


async def awaymode_off(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_owner(update.effective_user.id):
        return
    state["away_mode"] = False
    save_state(state)
    await update.message.reply_text("Away mode OFF. Welcome back — you're in the driver's seat again.")


async def status(update: Update, context: ContextTypes.DEFAULT_TYPE):
    if not is_owner(update.effective_user.id):
        return
    await update.message.reply_text(f"Away mode is {'ON' if state['away_mode'] else 'OFF'}.")


def get_ai_reply(chat_id: str, incoming_text: str) -> str:
    history = state["history"].setdefault(chat_id, [])
    history.append({"role": "user", "content": incoming_text})
    # keep last 20 turns so the prompt doesn't grow forever
    trimmed = history[-20:]

    messages = [{"role": "system", "content": PERSONA_PROMPT}] + trimmed

    completion = groq_client.chat.completions.create(
        model=GROQ_MODEL,
        messages=messages,
        temperature=0.8,
        max_tokens=200,
    )
    reply = completion.choices[0].message.content.strip()
    history.append({"role": "assistant", "content": reply})
    state["history"][chat_id] = history
    save_state(state)
    return reply


async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user = update.effective_user
    chat_id = str(update.effective_chat.id)
    text = update.message.text or ""

    # Owner texting the bot directly (outside the away-mode commands) is ignored
    if is_owner(user.id):
        return

    if not state["away_mode"]:
        # Bot stays silent when not in away mode
        return

    # Disclosure on first message of this away-mode session
    if chat_id not in state["greeted_chats"]:
        state["greeted_chats"].append(chat_id)
        save_state(state)
        await update.message.reply_text(DISCLOSURE_MESSAGE)

    reply = get_ai_reply(chat_id, text)
    await update.message.reply_text(reply)

    # forward transcript to owner
    who = user.first_name or "Someone"
    await context.bot.send_message(
        chat_id=OWNER_CHAT_ID,
        text=f"📩 {who}: {text}\n🤖 Sent: {reply}",
    )


class _HealthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"away-bot is running")

    def log_message(self, format, *args):
        pass  # keep logs quiet


def start_health_server():
    """Some free hosts (e.g. Koyeb) require the app to listen on a port
    even if it's not a real web service. This satisfies that check."""
    port = int(os.environ.get("PORT", 8000))
    server = HTTPServer(("0.0.0.0", port), _HealthHandler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    logger.info(f"Health check server listening on port {port}")


def main():
    start_health_server()
    app = Application.builder().token(BOT_TOKEN).build()

    app.add_handler(CommandHandler("awaymode_on", awaymode_on))
    app.add_handler(CommandHandler("awaymode_off", awaymode_off))
    app.add_handler(CommandHandler("status", status))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))

    logger.info("Bot starting...")
    app.run_polling()


if __name__ == "__main__":
    main()
