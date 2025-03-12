import os
from ultralytics import YOLO

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Gets the `backend/models/` directory
MODEL_PATH = os.path.join(BASE_DIR, "logo_detection.pt")  # Ensure no extra "models/" is added

# Check if the file exists
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")

# Load the YOLO model
model = YOLO(MODEL_PATH)
