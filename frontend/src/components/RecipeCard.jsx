import React from "react";

export default function RecipeCard({ recipe, onClick }) {

  // 🔥 Handle both Express + ML formats
  const title = recipe.recipe_title || recipe.title;
  const image =
    recipe.image ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";

  const cuisine = recipe.cuisine;
  const diet = recipe.diet;
  const dosha = recipe.dosha;
  const description =
    recipe.description || "Healthy Ayurvedic recipe recommendation";

  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        transform: "scale(1)",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div
        style={{
          backgroundColor: "#d1fae5",
          color: "#065f46",
          borderRadius: "1rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          padding: "1rem",
        }}
      >
        {/* Image */}
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
            borderRadius: "0.5rem",
          }}
        />

        {/* Title */}
        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginTop: "0.5rem",
          }}
        >
          {title}
        </h2>

        {/* Tags */}
        <div style={{ marginTop: "0.5rem" }}>

          {/* ML Tags */}
          {cuisine && (
            <span style={tagStyle("#22c55e")}>{cuisine}</span>
          )}

          {diet && (
            <span style={tagStyle("#16a34a")}>{diet}</span>
          )}

          {/* Express Tag */}
          {dosha && (
            <span style={tagStyle("#f59e0b")}>{dosha}</span>
          )}

        </div>

        {/* Description */}
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>
          {description}
        </p>
      </div>
    </div>
  );
}

// 🔥 Reusable tag style
const tagStyle = (color) => ({
  fontSize: "0.75rem",
  backgroundColor: color,
  color: "white",
  padding: "0.25rem 0.5rem",
  borderRadius: "9999px",
  display: "inline-block",
  marginRight: "5px",
});