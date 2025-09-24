import React, { useState, useEffect, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import YogaCard from "../components/YogaCard";
import YogaModal from "../components/YogaModal";
import api from "../api"; // axios instance pointing to /api

// small debounce hook
function useDebounced(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function YogaPoses() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounced(search, 300);

  const [poses, setPoses] = useState([]); // data from backend
  const [selectedPose, setSelectedPose] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // FETCH from backend whenever debouncedSearch changes
  useEffect(() => {
    const controller = new AbortController(); // works with axios v0.22+ via signal
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const q = debouncedSearch.trim();
        const url = q ? `/yoga?title=${encodeURIComponent(q)}` : `/yoga`;
        const res = await api.get(url, { signal: controller.signal });
        setPoses(res.data || []);
      } catch (err) {
        // Abort or network errors handled here
        if (err.name === "CanceledError" || err.name === "AbortError") return;
        console.error("Error fetching yoga:", err);
        setError("Failed to load yoga poses — check server/CORS.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [debouncedSearch]);

  // local fallback filtering (optional; useful if backend doesn't support ?title)
  const filteredPoses = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return poses;
    return poses.filter((p) => {
      return (
        (p.title || "").toLowerCase().includes(q) ||
        (p.sanskrit || "").toLowerCase().includes(q) ||
        (p.category || p.type || "").toLowerCase().includes(q) ||
        (p.level || "").toLowerCase().includes(q)
      );
    });
  }, [poses, debouncedSearch]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "rgba(255, 255, 255, 0.9)",
        color: "#222",
        padding: "24px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "40px", marginTop: 70 }}>
        <h1 style={{
          fontSize: '3rem',
          color: '#2c5c1f',
          marginBottom: '20px',
          fontWeight: 'bold',
          background: 'linear-gradient(135deg, #2c5c1f 0%, #4CAF50 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textAlign:"center"
        }}>
          Yoga Poses
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '40px', lineHeight: 1.6 }}>
          Master ancient yoga asanas with detailed instructions for mind, body, and spirit harmony
        </p>
      </div>

      {/* Search Bar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          background: "#2E7D32",
          borderRadius: 16,
          padding: "8px 16px",
          width: "100%",
          maxWidth: 600,
        }}>
          <Search color="#6ee7b7" style={{ marginRight: 8 }} />
          <input
            aria-label="Search yoga poses"
            type="text"
            placeholder="Search by title, sanskrit, category or level..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              flex: 1,
              color: "white",
              fontSize: 16,
            }}
          />
          <Filter color="#6ee7b7" style={{ marginLeft: 8 }} />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading yoga poses...</p>
      ) : error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : filteredPoses.length === 0 ? (
        <p style={{ textAlign: "center" }}>No poses found.</p>
      ) : (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 24,
        }}>
          {filteredPoses.map((pose) => (
            <YogaCard
              key={pose._id || pose.id}
              pose={pose}
              onClick={() => setSelectedPose(pose)}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedPose && (
        <YogaModal pose={selectedPose} onClose={() => setSelectedPose(null)} />
      )}
    </div>
  );
}
