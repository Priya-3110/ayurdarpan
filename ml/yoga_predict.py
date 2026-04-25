import pickle
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

model_data = pickle.load(open("models/yoga_knn_model.pkl", "rb"))

features = model_data["features"]
tfidf = model_data["tfidf"]
le_dosha = model_data["dosha_encoder"]
le_level = model_data["level_encoder"]
df = model_data["dataset"]


def recommend_yoga(user_dosha, user_level, user_goal):

    # normalize input
    user_dosha = user_dosha.capitalize()
    user_level = user_level.capitalize()
    user_goal = user_goal.lower()

    # -----------------------------
    # Filter by Dosha and Level
    # -----------------------------
    filtered_df = df[
        (df["dosha"].str.lower() == user_dosha.lower()) &
        (df["level"].str.lower() == user_level.lower())
    ]

    if filtered_df.empty:
        return []

    filtered_indices = filtered_df.index
    filtered_features = features[filtered_indices]

    # -----------------------------
    # Encode input
    # -----------------------------
    dosha_code = le_dosha.transform([user_dosha])[0]
    level_code = le_level.transform([user_level])[0]

    goal_vector = tfidf.transform([user_goal]).toarray()[0]

    input_vector = np.hstack(([dosha_code, level_code], goal_vector))
    input_vector = input_vector.reshape(1, -1)

    # -----------------------------
    # Cosine Similarity
    # -----------------------------
    similarity = cosine_similarity(input_vector, filtered_features)

    top_indices = similarity[0].argsort()[-5:][::-1]

    results = []

    for i in top_indices:
        pose = filtered_df.iloc[i]

        results.append({
            "aname": pose["aname"],
            "dosha": pose["dosha"],
            "level": pose["level"],
            "benefits": pose["benefits"],
            "contraindications": pose["contraindications"],
            "confidence": round(float(similarity[0][i]) * 100, 2)
        })

    return results