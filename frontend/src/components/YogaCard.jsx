import React from "react";

export default function YogaCard({ pose, onClick }) {
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
          backgroundColor: "#d1fae5", // Tailwind green-100
          color: "#065f46", // Tailwind green-900
          borderRadius: "1rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          padding: "1rem",
        }}
      >
        <img
          src={pose.image}
          alt={pose.title}
          style={{
            width: "100%",
            height: "160px",
            objectFit: "cover",
            borderRadius: "0.5rem",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "0.5rem",
          }}
        >
          <span
            style={{
              fontSize: "0.75rem",
              backgroundColor: "#bbf7d0", // green-200
              padding: "0.25rem 0.5rem",
              borderRadius: "9999px",
            }}
          >
            {pose.level}
          </span>
          <span
            style={{
              fontSize: "0.75rem",
              backgroundColor: "#22c55e", // green-500
              color: "white",
              padding: "0.25rem 0.5rem",
              borderRadius: "9999px",
            }}
          >
            {pose.category}
          </span>
        </div>

        <h2
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginTop: "0.5rem",
          }}
        >
          {pose.title}
        </h2>

        <p style={{ fontStyle: "italic", fontSize: "0.875rem" }}>
          {pose.sanskrit}
        </p>

        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>
          {pose.description}
        </p>
      </div>
    </div>
  );
}