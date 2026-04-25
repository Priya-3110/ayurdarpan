# ============================================
# 🍲 Flask API (Dosha + Yoga + Recipe + Remedy)
# ============================================

from flask import Flask, request, jsonify
from flask_cors import CORS

from yoga_predict import recommend_yoga
from dosha_predict import predict_dosha

# Fix for model loading
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.preprocessing import LabelEncoder

import joblib
import os
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# ============================================
# 🍲 LOAD RECIPE MODEL (SAFE LOADING)
# ============================================
recipe_model = None

try:
    recipe_model = joblib.load("models/recipe_model.pkl")

    tfidf = recipe_model["tfidf"]
    tfidf_matrix = recipe_model["tfidf_matrix"]
    df = recipe_model["data"]

    print("✅ Recipe model loaded")

except Exception as e:
    print("⚠️ Recipe model not loaded:", e)

# ============================================
# 💊 LOAD REMEDY MODEL
# ============================================
remedy_path = os.path.join("models", "remedy_model.pkl")
remedy_data = joblib.load(remedy_path)

remedy_model = remedy_data["model"]
remedy_mlb = remedy_data["mlb"]
remedy_classes = remedy_data["classes"]
remedy_info = remedy_data["remedy_info"]

print("✅ Remedy model loaded")

# ============================================
# 🍲 RECIPE FUNCTION
# ============================================
def recommend_recipes(input_ingredients, top_n=5):

    if recipe_model is None:
        return []

    input_vec = tfidf.transform([input_ingredients])
    similarity_scores = cosine_similarity(input_vec, tfidf_matrix)

    similar_indices = similarity_scores.argsort()[0][-top_n:][::-1]

    results = df.iloc[similar_indices][[
        'recipe_title',
        'cuisine',
        'diet',
        'ingredients',
        'instructions',
        'description',
        'prep_time',
        'cook_time',
        'url'
    ]]

    return results.to_dict(orient="records")

# =========================
# 🧘 YOGA API
# =========================
@app.route("/predict-yoga", methods=["POST"])
def predict_yoga():

    data = request.json
    result = recommend_yoga(data["dosha"], data["level"], data["goal"])

    return jsonify(result)

# =========================
# 🌿 DOSHA API
# =========================
@app.route("/predict-dosha", methods=["POST"])
def dosha():

    try:
        data = request.json
        dosha, confidence = predict_dosha(data)

        return jsonify({
            "predicted_dosha": dosha,
            "confidence": confidence
        })

    except Exception as e:
        return jsonify({"error": str(e)})

# =========================
# 🍲 RECIPE API
# =========================
@app.route("/recommend-recipe", methods=["POST"])
def recipe():

    try:
        if recipe_model is None:
            return jsonify({"error": "Recipe model not available"}), 500

        data = request.json
        ingredients = data.get("ingredients", "")

        if not ingredients:
            return jsonify({"error": "No ingredients provided"}), 400

        results = recommend_recipes(ingredients)

        return jsonify({"recipes": results})

    except Exception as e:
        return jsonify({"error": str(e)})

# =========================
# 💊 REMEDY API
# =========================
@app.route("/predict-remedy", methods=["POST"])
def remedy():

    try:
        data = request.json
        symptoms = data.get("symptoms", [])

        if not symptoms:
            return jsonify({"error": "No symptoms provided"}), 400

        # Encode
        X = remedy_mlb.transform([symptoms])

        # Predict
        probs = remedy_model.predict_proba(X)[0]
        idx = np.argmax(probs)

        remedy_name = remedy_classes[idx]
        confidence = round(probs[idx] * 100, 2)

        details = remedy_info.get(remedy_name, {})

        return jsonify({
            "remedy": remedy_name,
            "confidence": confidence,
            "details": details
        })

    except Exception as e:
        return jsonify({"error": str(e)})

# ============================================
# ▶️ RUN SERVER
# ============================================
if __name__ == "__main__":
    app.run(port=5001, debug=True)