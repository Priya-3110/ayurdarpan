import React from "react";

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
      }}
    >
      <div
        style={{
          backgroundColor: "#f0fdf4", // yellow-50
          color: "#065f46", // yellow-900
          borderRadius: "1rem",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          padding: "1.5rem",
          width: "100%",
          maxWidth: "768px",
          position: "relative",
          overflowY: "auto",
          maxHeight: "70vh",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            color: "#4b5563",
            cursor: "pointer",
            border: "none",
            background: "none",
            fontSize: "1.25rem",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "black")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#4b5563")}
        >
          ✕
        </button>

        {/* Title */}
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {recipe.title}
        </h2>
        <p style={{ fontStyle: "italic" }}>{recipe.dosha} friendly</p>

        {/* Image */}
        <img
          src={recipe.image}
          alt={recipe.title}
          style={{
            width: "100%",
            height: "240px",
            objectFit: "cover",
            borderRadius: "0.5rem",
            margin: "1rem 0",
          }}
        />

        {/* Ingredients */}
        <h3 style={{ fontWeight: "600", fontSize: "1.125rem", marginTop: "1rem" }}>
          Ingredients
        </h3>
        <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
          {recipe.ingredients.map((item, i) => (
            <li key={i} style={{ listStyleType: "disc", marginBottom: "0.25rem" }}>
              {item}
            </li>
          ))}
        </ul>

        {/* Procedure */}
        <h3 style={{ fontWeight: "600", fontSize: "1.125rem", marginTop: "1rem" }}>
          Procedure
        </h3>
        <ol style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
          {recipe.procedure.map((step, i) => (
            <li key={i} style={{ listStyleType: "decimal", marginBottom: "0.25rem" }}>
              {step}
            </li>
          ))}
        </ol>

        {/* Benefits */}
        <h3 style={{ fontWeight: "600", fontSize: "1.125rem", marginTop: "1rem" }}>
          Benefits
        </h3>
        <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
          {recipe.benefits.map((benefit, i) => (
            <li key={i} style={{ listStyleType: "disc", marginBottom: "0.25rem" }}>
              {benefit}
            </li>
          ))}
        </ul>

        {/* Nutrient Breakdown */}
        <h3 style={{ fontWeight: "600", fontSize: "1.125rem", marginTop: "1rem" }}>
          Nutrient Breakdown
        </h3>
        <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
          {Object.entries(recipe.nutrients).map(([nutrient, value], i) => (
            <li key={i} style={{ listStyleType: "circle", marginBottom: "0.25rem" }}>
              {nutrient}: {value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}