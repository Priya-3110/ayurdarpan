import React from "react";

export default function RemediesVideoModal({ videoUrl, onClose }) {
  if (!videoUrl) return null;

  // Convert normal YouTube link to embeddable format
  const getEmbedUrl = (url) => {
    if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    } else if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "www.youtube.com/embed/");
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          width: "90%",
          maxWidth: "700px",
          position: "relative",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "15px",
            background: "none",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "#555",
          }}
        >
          ✕
        </button>

        {/* Video Embed */}
        <div
          style={{
            position: "relative",
            paddingBottom: "56.25%", // 16:9 ratio
            height: 0,
            overflow: "hidden",
            borderRadius: "10px",
          }}
        >
          <iframe
            src={embedUrl}
            title="Remedy Video"
            frameBorder="0"
            allowFullScreen
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "10px",
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
