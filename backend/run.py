from app import create_app
import os
import signal
import sys

app = create_app()

def handle_shutdown(signum, frame):
    print("Shutting down Flask backend gracefully...")
    sys.exit(0)

signal.signal(signal.SIGINT, handle_shutdown)
signal.signal(signal.SIGTERM, handle_shutdown)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5174))
    app.run(host="127.0.0.1", port=port, debug=True)
