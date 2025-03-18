import cv2
from flask import send_file
import io
from models.model_load import model
import numpy as np
from PIL import Image
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances
from utils.embed import *


def compare_logo_embeddings(input_path, reference_path, model, score_threshold):
    embedding_models = [BEiTEmbedding(), CLIPEmbedding(), ResNetEmbedding()]
    thresholds = {
        'BEiTEmbedding': {'cosine': .3, 'euclidean': 110},
        'CLIPEmbedding': {'cosine': .65, 'euclidean': 7.5},
        'ResNetEmbedding': {'cosine': .75, 'euclidean': 50}
    }

    input_logos, input_bboxes, input_img = extract_logo_regions(input_path, model)
    reference_logos, _, _ = extract_logo_regions(reference_path, model)

    if not input_logos or not reference_logos:
        print("No logos detected in one or both images.")
        return

    # Initialize score tracker
    # Matrix of len(reference_logos) x len(input_logos). 
    # This keeps the scores separate for each reference logo found
    scores = [[0] * len(input_logos) for _ in range(len(reference_logos))]

    # For each embedding model
    for feature_extractor in embedding_models:
         # Get the name of the embedding model so we can index the thresholds dict
        model_name = type(feature_extractor).__name__

        # Get model-specific thresholds
        # This is from the dict defined at the function above
        cosine_threshold = thresholds[model_name]["cosine"]
        euclidean_threshold = thresholds[model_name]["euclidean"]

        # Compute embeddings and put them into an array
        input_embeddings = [feature_extractor.extract_embedding(Image.fromarray(logo)) for logo in input_logos]
        reference_embeddings = [feature_extractor.extract_embedding(Image.fromarray(logo)) for logo in reference_logos]


        # Iterate through each embeddings (basically each logo)
        for i, ref_embedding in enumerate(reference_embeddings):
            ref_embedding = ref_embedding.reshape(1, -1)  # Ensure 2D
            for j, input_embedding in enumerate(input_embeddings):

                input_embedding = input_embedding.reshape(1, -1)  # Ensure 2D
                # Compute similarity scores
                cosine_sim = compute_cosine_similarity(input_embedding, ref_embedding)
                euclidean_dist = compute_euclidean_distances(input_embedding, ref_embedding)

                # Check if similarities meet the model specific thresholds
                # Again, scores is a 2d array. Rows = num of reference images, cols = num of main image
                if cosine_sim >= cosine_threshold:
                    scores[i][j] += 1 # Plus 1 if cosine sim is met
                if euclidean_dist <= euclidean_threshold:
                    scores[i][j] += 1 # Plus 1 if euclidean distance is met

                # Print what the scores are
                print(f'{model_name} score: {scores[i][j]}')

    # Final decision: Classify as match if score is at least score_threshold/6
    for i in range(len(reference_logos)): # Iterate over reference logos (rows)
        for j in range(len(input_logos)): # Iterate over input logos (columns)
            
            if scores[i][j] >= score_threshold: # Check per reference logo
                x1, y1, x2, y2 = input_bboxes[j]

                # White bounding box. We can change this later if needed
                color = (255, 255, 255)
                cv2.rectangle(input_img, (x1, y1), (x2, y2), color, 2)

        _, img_encoded = cv2.imencode(".jpg", input_img)

    return send_file(io.BytesIO(img_encoded.tobytes()), mimetype="image/jpeg")


def compute_cosine_similarity(embedding1, embedding2):
    
    return cosine_similarity(embedding1, embedding2)[0][0]


def compute_euclidean_distances(embedding1, embedding2):
    
    return euclidean_distances(embedding1, embedding2)[0][0]


def extract_logo_regions(image, model):
    '''Returns all of the logos found within an image'''

    # Read image
    file_bytes = np.frombuffer(image.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    results = model(img)

    logo_regions = []
    bounding_boxes = []

    for box in results[0].boxes:
        xyxy = box.xyxy[0].tolist()
        x1, y1, x2, y2 = map(int, xyxy)
        cropped_logo = img[y1:y2, x1:x2]

        if cropped_logo.size > 0:
            height, width = cropped_logo.shape[:2]

            # Calculate new width while maintaining aspect ratio
            new_height = 128
            new_width = int((new_height / height) * width)
            
            # Resize while keeping aspect ratio
            resized_logo = cv2.resize(cropped_logo, (new_width, new_height))

            # Append the logo and its bounding box to the list
            logo_regions.append(resized_logo)
            bounding_boxes.append((x1, y1, x2, y2))

    return logo_regions, bounding_boxes, img


def identify_all_logos(file):
    '''Returns the image with bounding boxes around all logos found'''
    file_bytes = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    results = model(img)

    confidence_threshold = 0.25
    color = (255, 255, 255)
    thickness = 2

    for box in results[0].boxes:
        if box.conf[0].item() > confidence_threshold:
            xyxy = box.xyxy[0].tolist()
            x1, y1, x2, y2 = map(int, xyxy)
            cv2.rectangle(img, (x1, y1), (x2, y2), color, thickness)

    _, img_encoded = cv2.imencode(".jpg", img)

    return send_file(io.BytesIO(img_encoded.tobytes()), mimetype="image/jpeg")