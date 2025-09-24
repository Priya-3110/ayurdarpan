import React from "react";

export default function RecipeCard({ recipe, onClick }) {
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
          backgroundColor: "#d1fae5", // yellow-100
          color: "#065f46", // yellow-900
          borderRadius: "1rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          padding: "1rem",

        }}
      >
        {/* Image */}
        <img
          src={recipe.image}
          alt={recipe.title}
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
          {recipe.title}
        </h2>

        {/* Dosha Tag */}
        <span
          style={{
            fontSize: "0.75rem",
            backgroundColor: "#22c55e", // yellow-400
            color: "white",
            padding: "0.25rem 0.5rem",
            borderRadius: "9999px",
            display: "inline-block",
            marginTop: "0.5rem",
          }}
        >
          {recipe.dosha}
        </span>

        {/* Short Description */}
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>
          {recipe.description}
        </p>
      </div>
    </div>
  );
}