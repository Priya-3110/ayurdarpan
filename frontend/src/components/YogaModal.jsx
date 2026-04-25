import React from "react";

export default function YogaModal({ pose, onClose }) {
  if (!pose) return null;

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("youtu.be")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    } else if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    return url;
  };

  // SAFE FALLBACKS
  const instructions = Array.isArray(pose.instructions)
    ? pose.instructions
    : pose.instructions
    ? [pose.instructions]
    : [];

  const benefits = Array.isArray(pose.benefits)
    ? pose.benefits
    : pose.benefits
    ? [pose.benefits]
    : [];

  const precautions =
    pose.precautions || pose.contraindications || "No precautions listed.";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.6)",
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
          maxHeight: "70vh",
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
          {pose.title || pose.aname}
        </h2>

        <p style={{ fontStyle: "italic" }}>{pose.sanskrit || pose.aname}</p>

        {/* Image */}
        {pose.image && (
          <img
            src={pose.image}
            alt={pose.title}
            style={{
              width: "100%",
              height: "240px",
              objectFit: "cover",
              borderRadius: "0.5rem",
              margin: "1rem 0",
            }}
          />
        )}

        {/* Tags */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <span
            style={{
              backgroundColor: "#bbf7d0",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              fontSize: "0.875rem",
            }}
          >
            {pose.level}
          </span>

          <span
            style={{
              backgroundColor: "#22c55e",
              color: "white",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              fontSize: "0.875rem",
            }}
          >
            {pose.category || pose.dosha}
          </span>

          {pose.duration && (
            <span
              style={{
                backgroundColor: "#86efac",
                padding: "0.25rem 0.75rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
              }}
            >
              {pose.duration}
            </span>
          )}
        </div>

        {/* Instructions */}
        {instructions.length > 0 && (
          <>
            <h3 style={{ fontWeight: "600", fontSize: "1.125rem" }}>
              Instructions
            </h3>
            <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
              {instructions.map((step, i) => (
                <li key={i} style={{ listStyleType: "decimal" }}>
                  {step}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Benefits */}
        {benefits.length > 0 && (
          <>
            <h3 style={{ fontWeight: "600", fontSize: "1.125rem", marginTop: "1rem" }}>
              Benefits
            </h3>
            <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
              {benefits.map((b, i) => (
                <li key={i} style={{ listStyleType: "disc" }}>
                  {b}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Precautions */}
        <h3
          style={{
            fontWeight: "600",
            fontSize: "1.125rem",
            marginTop: "1rem",
            color: "#dc2626",
          }}
        >
          Precautions
        </h3>
        <p
          style={{
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
            padding: "0.5rem",
            borderRadius: "0.375rem",
          }}
        >
          {precautions}
        </p>

        {/* Video */}
        {pose.video && (
          <div style={{ marginTop: "1.5rem" }}>
            <h3 style={{ fontWeight: "600", fontSize: "1.125rem" }}>Video</h3>
            <iframe
              width="100%"
              height="315"
              src={getEmbedUrl(pose.video)}
              title={pose.title}
              frameBorder="0"
              allowFullScreen
              style={{ borderRadius: "0.5rem" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}