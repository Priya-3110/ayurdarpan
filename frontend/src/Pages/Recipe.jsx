import React, { useState, useEffect } from "react";
import api from "../api"; // Express API
import { getRecipeRecommendation } from "../api"; // ML API

import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";

export default function RecipesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("express"); // 🔥 NEW

  // ============================================
  // 🔹 LOAD DEFAULT (EXPRESS)
  // ============================================
  useEffect(() => {
    fetchAllRecipes();
  }, []);

  const fetchAllRecipes = async () => {
    try {
      setLoading(true);
      setMode("express");

      const res = await api.get("/recipes"); // Express backend
      setRecipes(res.data);

    } catch (error) {
      console.error("Express fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // 🔹 ML RECOMMENDATION
  // ============================================
  const fetchMLRecipes = async () => {
    try {
      setLoading(true);
      setMode("ml");

      const res = await getRecipeRecommendation(search);
      setRecipes(res.recipes);

    } catch (error) {
      console.error("ML fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // 🔹 FILTER (ONLY FOR EXPRESS)
  // ============================================
  const filteredRecipes =
    mode === "express"
      ? recipes.filter(
          (r) =>
            (filter === "All" || r.dosha === filter) &&
            r.title?.toLowerCase().includes(search.toLowerCase())
        )
      : recipes; // ML already filtered

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", marginTop: "72px" }}>

      <h1 style={{
        fontSize: "3rem",
        color: "#2c5c1f",
        marginBottom: "20px",
        textAlign: "center",
      }}>
        Ayurvedic Healthy Recipes
      </h1>

      {/* ================= SEARCH ================= */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        
        <input
          type="text"
          placeholder="Search recipes or enter ingredients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "20px",
            border: "1px solid green",
            width: "250px"
          }}
        />

        {/* 🔥 ML BUTTON */}
        <button onClick={fetchMLRecipes} style={{
          padding: "10px 20px",
          borderRadius: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none"
        }}>
          ML Search
        </button>

        {/* 🔥 RESET BUTTON (EXPRESS) */}
        <button onClick={fetchAllRecipes} style={{
          padding: "10px 20px",
          borderRadius: "20px",
          backgroundColor: "#065f46",
          color: "white",
          border: "none"
        }}>
          Show All
        </button>
      </div>

      {/* ================= FILTER ================= */}
      {mode === "express" && (
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ padding: "10px", borderRadius: "20px" }}
          >
            <option value="All">All Doshas</option>
            <option value="Vata">Vata</option>
            <option value="Pitta">Pitta</option>
            <option value="Kapha">Kapha</option>
          </select>
        </div>
      )}

      {/* ================= RECIPES ================= */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "24px"
        }}>
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}