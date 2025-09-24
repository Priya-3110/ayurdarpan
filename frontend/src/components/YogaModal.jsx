import React from "react";

export default function YogaModal({ pose, onClose }) {
  if (!pose) return null;

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
          backgroundColor: "#f0fdf4", // Tailwind green-50
          color: "#065f46", // Tailwind green-900
          borderRadius: "1rem",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          padding: "1.5rem",
          width: "100%",
          maxWidth: "768px", // Tailwind max-w-3xl
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
            color: "#4b5563", // gray-600
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

        {/* Title & Sanskrit */}
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{pose.title}</h2>
        <p style={{ fontStyle: "italic" }}>{pose.sanskrit}</p>

        {/* Image */}
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

        {/* Tags */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <span
            style={{
              backgroundColor: "#bbf7d0", // green-200
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              fontSize: "0.875rem",
            }}
          >
            {pose.level}
          </span>
          <span
            style={{
              backgroundColor: "#22c55e", // green-500
              color: "white",
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              fontSize: "0.875rem",
            }}
          >
            {pose.category}
          </span>
          <span
            style={{
              backgroundColor: "#86efac", // green-300
              padding: "0.25rem 0.75rem",
              borderRadius: "9999px",
              fontSize: "0.875rem",
            }}
          >
            {pose.duration}
          </span>
        </div>

        {/* Instructions */}
        <h3 style={{ fontWeight: "600", fontSize: "1.125rem", marginTop: "1rem" }}>
          Instructions
        </h3>
        <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
          {pose.instructions.map((step, i) => (
            <li key={i} style={{ marginBottom: "0.25rem", listStyleType: "decimal" }}>
              {step}
            </li>
          ))}
        </ul>

        {/* Benefits */}
        <h3 style={{ fontWeight: "600", fontSize: "1.125rem", marginTop: "1rem" }}>
          Benefits
        </h3>
        <ul style={{ marginLeft: "1.5rem", marginTop: "0.5rem" }}>
          {pose.benefits.map((benefit, i) => (
            <li key={i} style={{ marginBottom: "0.25rem", listStyleType: "disc" }}>
              {benefit}
            </li>
          ))}
        </ul>

        {/* Precautions */}
        <h3
          style={{
            fontWeight: "600",
            fontSize: "1.125rem",
            marginTop: "1rem",
            color: "#dc2626", // red-600
          }}
        >
          Precautions
        </h3>
        <p
          style={{
            backgroundColor: "#fee2e2", // red-100
            color: "#b91c1c", // red-700
            padding: "0.5rem",
            borderRadius: "0.375rem",
            marginTop: "0.25rem",
          }}
        >
          {pose.precautions}
        </p>
      </div>
    </div>
  );
}