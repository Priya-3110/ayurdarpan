import axios from "axios";

/* Express Backend */
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

/* Flask ML Server */
const mlApi = axios.create({
  baseURL: "http://localhost:5001",
});

export default api;

/* =========================
   YOGA PREDICTION
========================= */
export const getYogaPrediction = async (data) => {
  const res = await mlApi.post("/predict-yoga", data);
  return res.data;
};

/* =========================
   DOSHA PREDICTION
========================= */
export const getDoshaPrediction = async (data) => {
  const res = await mlApi.post("/predict-dosha", data);
  return res.data;
};

/* =========================
   🍲 RECIPE RECOMMENDATION  ✅ ADD THIS
========================= */
export const getRecipeRecommendation = async (ingredients) => {
  const res = await mlApi.post("/recommend-recipe", {
    ingredients: ingredients,
  });
  return res.data;
};

/* =========================
   💊 REMEDY PREDICTION
========================= */
export const getRemedyPrediction = async (symptoms) => {
  const res = await mlApi.post("/predict-remedy", {
    symptoms: symptoms, // must be array
  });
  return res.data;
};