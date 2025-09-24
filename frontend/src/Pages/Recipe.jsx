import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";
import api from "../api"; // axios instance

export default function RecipesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recipes from backend
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await api.get("/recipes");
        setRecipes(response.data); // API must return an array of recipe objects
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  // Filtering logic
  const filteredRecipes = recipes.filter(
    (r) =>
      (filter === "All" || r.dosha === filter) &&
      r.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", backgroundColor: "rgba(255, 255, 255, 0.8)", marginTop:"70px" }}>
      <h1 style={{
        fontSize: '3rem',
        color: '#2c5c1f',
        marginBottom: '20px',
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
        background: 'linear-gradient(135deg, #2c5c1f 0%, #4CAF50 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textAlign:"center"
      }}>
        Ayurvedic Healthy Recipes
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '40px', lineHeight: 1.6, textAlign:"center" }}>
        "Discover wholesome Ayurvedic recipes tailored to balance your doshas and nourish your body, mind, and soul."
      </p>

      {/* Search & Filter */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginBottom: "1.5rem" }}>
        <input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #4caf50", width: "250px" }}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #4caf50" }}
        >
          <option value="All">All Doshas</option>
          <option value="Vata">Vata</option>
          <option value="Pitta">Pitta</option>
          <option value="Kapha">Kapha</option>
        </select>
      </div>

      {/* Recipe Grid */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading recipes...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
          {filteredRecipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />
          ))}
        </div>
      )}

      {/* Modal */}
      <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
    </div>
  );
}
