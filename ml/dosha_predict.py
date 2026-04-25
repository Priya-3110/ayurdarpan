import pickle
import numpy as np
import os

BASE_DIR = os.path.dirname(__file__)

model = pickle.load(open(os.path.join(BASE_DIR, "models/dosha_model.pkl"), "rb"))
encoders = pickle.load(open(os.path.join(BASE_DIR, "models/encoder.pkl"), "rb"))

columns = [
    "body_size","body_weight","height","bone_structure","complexion",
    "general_feel_of_skin","texture_of_skin","hair_color","appearance_of_hair",
    "shape_of_face","eyes","eyelashes","blinking_of_eyes","cheeks","nose",
    "teeth_and_gums","lips","nails","appetite","liking_tastes",
    "metabolism_type","climate_preference","stress_levels","sleep_patterns",
    "dietary_habits","physical_activity_level","water_intake",
    "digestion_quality","skin_sensitivity"
]

def predict_dosha(user_input):
    input_data = []

    for col in columns:
        value = user_input.get(col, "unknown")

        if col in encoders:
            le = encoders[col]
            try:
                value = le.transform([value])[0]
            except:
                value = 0

        input_data.append(value)

    input_data = np.array(input_data).reshape(1, -1)

    prediction = model.predict(input_data)[0]
    probs = model.predict_proba(input_data)[0]

    confidence = round(max(probs) * 100, 2)

    dosha = encoders["dosha"].inverse_transform([prediction])[0]

    return dosha, confidence