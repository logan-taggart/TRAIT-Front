from flask import Blueprint, jsonify, request
from flask_cors import CORS

from utils.process import *

image_blueprint = Blueprint("image", __name__, url_prefix="/image")
CORS(image_blueprint)

@image_blueprint.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "Image processing service is running"}), 200

    
@image_blueprint.route("/detect-all", methods=["POST"])
def detect_all():
    if "main_image" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    main_image = request.files["main_image"]

    bb_color = request.form.get("bb_color")


    return identify_all_logos(main_image, bb_color)


@image_blueprint.route("/detect-specific", methods=["POST"])
def detect_specific():
    if "main_image" not in request.files or "reference_image" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    main_image = request.files["main_image"]
    reference_image = request.files["reference_image"]
    embedding_model = request.form.get("algorithm")
    similarity_threshold = int(request.form.get("confidence"))
    bb_color = request.form.get("bb_color")
    print("bounding box color: ", bb_color)

    return compare_logo_embeddings(main_image, reference_image, model, similarity_threshold, bb_color)