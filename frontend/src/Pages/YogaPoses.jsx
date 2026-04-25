// import React, { useState, useEffect, useMemo } from "react";
// import { Search, Filter } from "lucide-react";
// import YogaCard from "../components/YogaCard";
// import YogaModal from "../components/YogaModal";
// import api from "../api"; // axios instance pointing to /api

// // small debounce hook
// function useDebounced(value, delay = 300) {
//   const [debounced, setDebounced] = useState(value);
//   useEffect(() => {
//     const t = setTimeout(() => setDebounced(value), delay);
//     return () => clearTimeout(t);
//   }, [value, delay]);
//   return debounced;
// }

// export default function YogaPoses() {
//   const [search, setSearch] = useState("");
//   const debouncedSearch = useDebounced(search, 300);

//   const [poses, setPoses] = useState([]); // data from backend
//   const [selectedPose, setSelectedPose] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // FETCH from backend whenever debouncedSearch changes
//   useEffect(() => {
//     const controller = new AbortController(); // works with axios v0.22+ via signal
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const q = debouncedSearch.trim();
//         const url = q ? `/yoga?title=${encodeURIComponent(q)}` : `/yoga`;
//         const res = await api.get(url, { signal: controller.signal });
//         setPoses(res.data || []);
//       } catch (err) {
//         // Abort or network errors handled here
//         if (err.name === "CanceledError" || err.name === "AbortError") return;
//         console.error("Error fetching yoga:", err);
//         setError("Failed to load yoga poses — check server/CORS.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//     return () => controller.abort();
//   }, [debouncedSearch]);

//   // local fallback filtering (optional; useful if backend doesn't support ?title)
//   const filteredPoses = useMemo(() => {
//     const q = debouncedSearch.trim().toLowerCase();
//     if (!q) return poses;
//     return poses.filter((p) => {
//       return (
//         (p.title || "").toLowerCase().includes(q) ||
//         (p.sanskrit || "").toLowerCase().includes(q) ||
//         (p.category || p.type || "").toLowerCase().includes(q) ||
//         (p.level || "").toLowerCase().includes(q)
//       );
//     });
//   }, [poses, debouncedSearch]);

//   return (
//     <div
//       style={{
//         // minHeight: "100vh",
//         // background: "rgba(255, 255, 255, 0.9)",
//         // color: "#222",
//         // padding: "24px",
        
//     padding: "2rem", fontFamily: "sans-serif", backgroundColor: "rgba(255, 255, 255, 0.8)", marginTop:"8px"
//       }}
//     >
//       {/* Header */}
//       <div style={{ textAlign: "center", marginBottom: "40px", marginTop: 70 }}>
//         <h1 style={{
//           fontSize: '3rem',
//           color: '#2c5c1f',
//           marginBottom: '20px',
//           fontWeight: 'bold',
//           background: 'linear-gradient(135deg, #2c5c1f 0%, #4CAF50 100%)',
//           WebkitBackgroundClip: 'text',
//           WebkitTextFillColor: 'transparent',
//           textAlign:"center"
//         }}>
//           Yoga Poses
//         </h1>
//         <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '40px', lineHeight: 1.6 }}>
//           {/* Master ancient yoga asanas with detailed instructions for mind, body, and spirit harmony */}
//           "Master ancient yoga asanas with detailed instructions that harmonize mind, body, and spirit while nurturing inner peace.”
//         </p>
//       </div>

//       {/* Search Bar */}
//       <div style={{ margin: '30px auto', maxWidth: '500px', position: 'relative', zIndex: 2 }}>
//         <div style={{
//           display: "flex",
//           alignItems: "center",
//           background: "white",
//           borderRadius: '50px',
//            padding: '5px', 
//            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)', 
//            transition: 'all 0.3s ease', 
//            border: '2px solid #e0e0e0',
        
        
//           width: "100%",
//           maxWidth: 600,
//         }}>
//           <Search  style={{  background: '#4caf50', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease', color: 'white'  }} />
//           <input
//             aria-label="Search yoga poses"
//             type="text"
//             placeholder="Search by title, sanskrit, category or level..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             // style={{
//             //   background: "transparent",
//             //   border: "none",
//             //   outline: "none",
//             //   flex: 1,
//             //   color: "white",
//             //   fontSize: 16,
//             // }}

//              onFocus={() => setIsFocused(true)} 
//                 onBlur={() => setIsFocused(false)} 
//                 style={{ flex: 1, border: 'none', padding: '15px 20px', fontSize: '1rem', borderRadius: '50px', outline: 'none', background: 'transparent' }} 
//           />
//           <Filter style={{  background: '#4caf50', border: 'none', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.3s ease', color: 'white'  }} />
//         </div>
//       </div>

//       {/* Content */}
//       {loading ? (
//         <p style={{ textAlign: "center" }}>Loading yoga poses...</p>
//       ) : error ? (
//         <p style={{ textAlign: "center", color: "red" }}>{error}</p>
//       ) : filteredPoses.length === 0 ? (
//         <p style={{ textAlign: "center" }}>No poses found.</p>
//       ) : (
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
//           gap: 24,
//         }}>
//           {filteredPoses.map((pose) => (
//             <YogaCard
//               key={pose._id || pose.id}
//               pose={pose}
//               onClick={() => setSelectedPose(pose)}
//             />
//           ))}
//         </div>
//       )}

//       {/* Modal */}
//       {selectedPose && (
//         <YogaModal pose={selectedPose} onClose={() => setSelectedPose(null)} />
//       )}
//     </div>
//   );
// }
import React, { useState, useEffect, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import YogaCard from "../components/YogaCard";
import YogaModal from "../components/YogaModal";
import api from "../api";
import { getYogaPrediction } from "../api"; // ML API

// debounce hook
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

  const [poses, setPoses] = useState([]);
  const [selectedPose, setSelectedPose] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ML states
  const [goal, setGoal] = useState("");
  const [dosha, setDosha] = useState("Vata");
  const [level, setLevel] = useState("Beginner");
  const [recommended, setRecommended] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  // FETCH yoga poses from backend
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const q = debouncedSearch.trim();
        const url = q ? `/yoga?title=${encodeURIComponent(q)}` : `/yoga`;

        const res = await api.get(url, { signal: controller.signal });

        setPoses(res.data || []);
      } catch (err) {
        if (err.name === "CanceledError" || err.name === "AbortError") return;

        console.error("Error fetching yoga:", err);
        setError("Failed to load yoga poses.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort();
  }, [debouncedSearch]);

  // Local filtering
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

  // AI Prediction
  const handlePrediction = async () => {
    try {
      setRecommended([]);

      const data = {
        dosha,
        level,
        goal
      };

      const result = await getYogaPrediction(data);

// Normalize response
let yogaArray = [];

if (Array.isArray(result)) {
  yogaArray = result;
} else if (result?.recommendations) {
  yogaArray = result.recommendations;
} else if (result) {
  yogaArray = [result];
}

setRecommended(yogaArray);

    } catch (err) {
      console.error("Prediction error", err);
    } 
  };

  return (
    <div style={{
      padding: "2rem",
      fontFamily: "sans-serif",
      backgroundColor: "rgba(255,255,255,0.8)"
    }}>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: 40, marginTop: 70 }}>
        <h1 style={{
          fontSize: "3rem",
          color: "#2c5c1f",
          fontWeight: "bold"
        }}>
          Yoga Poses
        </h1>

        <p style={{ fontSize: "1.2rem", color: "#555" }}>
          Master ancient yoga asanas with detailed instructions
        </p>
      </div>

      {/* AI RECOMMENDATION */}
      <div style={{
        background: "#f8fff8",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "40px",
        border: "1px solid #d8f3d8"
      }}>

        <h2 style={{ marginBottom: 15 }}>
          AI Yoga Recommendation
        </h2>

        <div style={{
          display: "flex",
          gap: 10,
          flexWrap: "wrap"
        }}>

          <select onChange={(e)=>setDosha(e.target.value)}>
            <option>Vata</option>
            <option>Pitta</option>
            <option>Kapha</option>
          </select>

          <select onChange={(e)=>setLevel(e.target.value)}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <input
            placeholder="Enter health goal (stress, digestion...)"
            onChange={(e)=>setGoal(e.target.value)}
            style={{ padding: 8 }}
          />

          <button
            onClick={handlePrediction}
            style={{
              background:"#4CAF50",
              color:"white",
              border:"none",
              padding:"10px 15px",
              borderRadius:6,
              cursor:"pointer"
            }}
          >
            Recommend Yoga
          </button>

        </div>

        {aiLoading && <p>Generating recommendations...</p>}

        {/* AI RESULT */}
        {recommended.length > 0 && (
          <div style={{
            marginTop: 20,
            display:"grid",
            gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",
            gap:20
          }}>
            {recommended?.map((pose, index) => (
  <YogaCard
    key={index}
    pose={{
      title: pose.aname,
      level: pose.level,
      category: pose.dosha,
      description: pose.benefits,
      image: pose.image
    }}
    onClick={() => setSelectedPose(pose)}
  />
))}
          </div>
        )}

      </div>

      {/* SEARCH BAR */}
      <div style={{ margin:"30px auto", maxWidth:"500px" }}>

        <div style={{
          display:"flex",
          alignItems:"center",
          background:"white",
          borderRadius:"50px",
          padding:"10px",
          border:"2px solid #e0e0e0"
        }}>

          <Search/>

          <input
            placeholder="Search yoga poses..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            style={{
              flex:1,
              border:"none",
              outline:"none",
              padding:"10px"
            }}
          />

          <Filter/>

        </div>

      </div>

      {/* EXISTING YOGA LIST */}
      {loading ? (
        <p style={{textAlign:"center"}}>Loading yoga poses...</p>
      ) : error ? (
        <p style={{textAlign:"center",color:"red"}}>{error}</p>
      ) : filteredPoses.length===0 ? (
        <p style={{textAlign:"center"}}>No poses found.</p>
      ) : (

        <div style={{
          display:"grid",
          gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",
          gap:24
        }}>
          {filteredPoses.map((pose)=>(
            <YogaCard
              key={pose._id || pose.id}
              pose={pose}
              onClick={()=>setSelectedPose(pose)}
            />
          ))}
        </div>

      )}

      {selectedPose && (
        <YogaModal
          pose={selectedPose}
          onClose={()=>setSelectedPose(null)}
        />
      )}

    </div>
  );
}