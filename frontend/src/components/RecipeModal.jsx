import React from "react";

export default function RecipeModal({ recipe, onClose }) {
  if (!recipe) return null;

  // 🔥 Handle BOTH formats
  const title = recipe.recipe_title || recipe.title;
  const cuisine = recipe.cuisine;
  const diet = recipe.diet;
  const dosha = recipe.dosha;

  const description =
    recipe.description || "Healthy Ayurvedic recipe recommendation";

  const image =
    recipe.image ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";

  // 🔥 Ingredients (array OR string)
  const ingredients = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : recipe.ingredients
    ? recipe.ingredients.split(",")
    : [];

  // 🔥 Instructions (array OR string)
  const instructions = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : recipe.instructions
    ? recipe.instructions.split(".")
    : [];

  // 🔥 Video (ML uses url, Express may use video)
  const videoUrl = recipe.url || recipe.video;

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
          backgroundColor: "#f0fdf4",
          color: "#065f46",
          borderRadius: "1rem",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          padding: "1.5rem",
          width: "100%",
          maxWidth: "768px",
          position: "relative",
          overflowY: "auto",
          maxHeight: "80vh",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            border: "none",
            background: "none",
            fontSize: "1.25rem",
            cursor: "pointer",
          }}
        >
          ✕
        </button>

        {/* Title */}
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {title}
        </h2>

        {/* Tags */}
        <p style={{ fontStyle: "italic" }}>
          {cuisine && `${cuisine} • `}
          {diet && `${diet} `}
          {dosha && `• ${dosha}`}
        </p>

        {/* Time (ML only) */}
        {(recipe.prep_time || recipe.cook_time) && (
          <p style={{ fontSize: "0.9rem", marginTop: "5px" }}>
            ⏱ Prep: {recipe.prep_time || "N/A"} | Cook: {recipe.cook_time || "N/A"}
          </p>
        )}

        {/* Image */}
        <img
          src={image}
          alt={title}
          style={{
            width: "100%",
            height: "240px",
            objectFit: "cover",
            borderRadius: "0.5rem",
            margin: "1rem 0",
          }}
        />

        {/* Description */}
        <p style={{ marginBottom: "1rem" }}>
          {description}
        </p>

        {/* Ingredients */}
        {ingredients.length > 0 && (
          <>
            <h3 style={{ fontWeight: "600", marginTop: "1rem" }}>
              🥗 Ingredients
            </h3>
            <ul style={{ marginLeft: "1.5rem" }}>
              {ingredients.map((item, i) => (
                <li key={i}>{item.trim()}</li>
              ))}
            </ul>
          </>
        )}

        {/* Instructions */}
        {instructions.length > 0 && (
          <>
            <h3 style={{ fontWeight: "600", marginTop: "1rem" }}>
              👩‍🍳 Instructions
            </h3>
            <ol style={{ marginLeft: "1.5rem" }}>
              {instructions.map((step, i) => (
                <li key={i}>{step.trim()}</li>
              ))}
            </ol>
          </>
        )}

        {/* Video */}
        {videoUrl && (
          <div style={{ marginTop: "1.5rem" }}>
            <h3 style={{ fontWeight: "600" }}>🎥 Recipe Video</h3>
            <iframe
              width="100%"
              height="300"
              src={videoUrl.replace("youtu.be/", "www.youtube.com/embed/")}
              title="Recipe Video"
              frameBorder="0"
              allowFullScreen
              style={{ borderRadius: "0.5rem" }}
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}