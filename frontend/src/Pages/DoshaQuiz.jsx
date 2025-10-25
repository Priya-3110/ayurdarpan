import React, { useState } from "react";

// ---------------------------
// General Dosha Questions
// ---------------------------
const generalQuestions = [
  {
    text: "You prefer climate that is:",
    options: { a: "Cold & dry", b: "Hot & humid", c: "Warm & damp" },
    score: { a: "Vata", b: "Pitta", c: "Kapha" },
  },
  {
    text: "Your body frame is:",
    options: { a: "Thin", b: "Medium", c: "Heavy" },
    score: { a: "Vata", b: "Pitta", c: "Kapha" },
  },
  {
    text: "Your digestion is usually:",
    options: { a: "Variable", b: "Strong", c: "Slow" },
    score: { a: "Vata", b: "Pitta", c: "Kapha" },
  },
  {
    text: "How regular is your appetite?",
    options: { a: "Irregular", b: "Strong", c: "Moderate" },
    score: { a: "Vata", b: "Pitta", c: "Kapha" },
  },
  {
    text: "Do you feel bloated or heavy after meals?",
    options: { a: "Often", b: "Sometimes", c: "Rarely" },
    score: { a: "Kapha", b: "Pitta", c: "Vata" },
  },
  {
    text: "How regular are your bowel movements?",
    options: { a: "Irregular", b: "Regular", c: "Sluggish" },
    score: { a: "Vata", b: "Pitta", c: "Kapha" },
  },
  {
    text: "Do you sweat easily or profusely?",
    options: { a: "Yes", b: "Moderate", c: "Rarely" },
    score: { a: "Pitta", b: "Pitta", c: "Kapha" },
  },
  {
    text: "Preferred type of food?",
    options: { a: "Spicy & hot", b: "Neutral", c: "Cooling & oily" },
    score: { a: "Pitta", b: "Vata", c: "Kapha" },
  },
  {
    text: "Sleep pattern?",
    options: { a: "Light, easily awakened", b: "Moderate", c: "Deep & long" },
    score: { a: "Vata", b: "Pitta", c: "Kapha" },
  },
  {
    text: "Energy levels?",
    options: { a: "High bursts, tire quickly", b: "Stable", c: "Low, sluggish" },
    score: { a: "Vata", b: "Pitta", c: "Kapha" },
  },
  {
    text: "How easily do you get stressed?",
    options: { a: "Anxious, restless", b: "Irritable, hot-tempered", c: "Calm, slow to react" },
    score: { a: "Vata", b: "Pitta", c: "Kapha" },
  },
];

// ---------------------------
// Female-Specific Questions
// ---------------------------
const femaleQuestions = [
  {
    text: "Typical menstrual flow quantity & pattern?",
    options: { a: "Scanty/irregular flow.", b: "Heavy/early bleeding with burning.", c: "Pale/mucous discharge with clots." },
    score: { a: "Vata", b: "Pitta", c: "Kapha" },
  },
  {
    text: "Usual menstrual pain?",
    options: { a: "Severe cramping/variable.", b: "Burning pain with nausea/heat.", c: "Dull, heavy pelvic pain." },
    score: { a: "Vata", b: "Pitta", c: "Kapha" },
  },
  {
    text: "Common premenstrual symptoms?",
    options: { a: "Anxiety, insomnia, dryness.", b: "Irritability, breast tenderness, acne.", c: "Bloating, lethargy, water retention." },
    score: { a: "Vata", b: "Pitta", c: "Kapha" },
  },
  {
    text: "Skin and hair changes during cycle?",
    options: { a: "Dryness/brittleness worsens.", b: "Breakouts, oily skin.", c: "Thick hair, oiliness, swelling." },
    score: { a: "Vata", b: "Pitta", c: "Kapha" },
  },
];

// ---------------------------
// Component
// ---------------------------
export default function DoshaQuiz() {
  const [step, setStep] = useState("start");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const startQuiz = () => {
    if (!gender || !age) {
      alert("Please select gender and enter age to start.");
      return;
    }

    const quizQuestions = [...generalQuestions];
    if (gender === "Female") quizQuestions.push(...femaleQuestions);
    setQuestions(quizQuestions);
    setStep("quiz");
  };

  const handleOption = (option) => {
    setAnswers({ ...answers, [current]: option });
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      calculateResult({ ...answers, [current]: option });
    }
  };

  const calculateResult = (finalAnswers) => {
    let scores = { Vata: 0, Pitta: 0, Kapha: 0 };
    Object.keys(finalAnswers).forEach((key) => {
      const q = questions[key];
      const dosha = q.score[finalAnswers[key]];
      if (dosha) scores[dosha]++;
    });

    const dominantDosha = Object.keys(scores).reduce((a, b) => (scores[a] >= scores[b] ? a : b));
    const descriptions = {
      Vata: "Vata Dosha: Light, dry, cold. Benefits from warm, nourishing foods.",
      Pitta: "Pitta Dosha: Hot, sharp, intense. Benefits from cooling foods.",
      Kapha: "Kapha Dosha: Heavy, slow, steady. Benefits from light, warm foods.",
    };

    setResult({
      dosha: dominantDosha,
      description: descriptions[dominantDosha],
      gender,
      age,
    });
  };

  // ---------------------------
  // Result Page
  // ---------------------------
  if (result) {
    return (
      <div style={styles.resultContainer}>
        <div style={styles.resultCard}>
          <h2 style={styles.resultTitle}>🌿 Your Dominant Dosha</h2>
          <h1 style={styles.doshaName}>{result.dosha}</h1>
          <p style={styles.doshaDesc}>{result.description}</p>

          <div style={styles.resultDetails}>
            <p><strong>Gender:</strong> {result.gender}</p>
            <p><strong>Age:</strong> {result.age}</p>
          </div>

          <div style={styles.doshaTips}>
            {result.dosha === "Vata" && (
              <ul>
                <li>Eat warm, moist, and grounding foods.</li>
                <li>Follow a consistent routine.</li>
                <li>Keep yourself warm and relaxed.</li>
              </ul>
            )}
            {result.dosha === "Pitta" && (
              <ul>
                <li>Prefer cooling foods and avoid spicy meals.</li>
                <li>Practice calm breathing and meditation.</li>
                <li>Stay away from excessive heat or stress.</li>
              </ul>
            )}
            {result.dosha === "Kapha" && (
              <ul>
                <li>Stay active and eat light, warm foods.</li>
                <li>Avoid overeating or oversleeping.</li>
                <li>Engage in creative or stimulating activities.</li>
              </ul>
            )}
          </div>

          <button style={styles.restartBtn} onClick={() => window.location.reload()}>
            🔁 Retake Quiz
          </button>
        </div>

        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </div>
    );
  }

  // ---------------------------
  // Start Page
  // ---------------------------
  if (step === "start") {
    return (
      <div style={styles.container}>
        <h2>Dosha Quiz</h2>
        <div style={styles.card}>
          <p>Select Gender:</p>
          <select value={gender} onChange={(e) => setGender(e.target.value)} style={styles.select}>
            <option value="">--Select--</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <p>Enter Age:</p>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={styles.input}
            placeholder="Age in years"
          />

          <button onClick={startQuiz} style={styles.optionBtn}>Start Quiz</button>
        </div>
      </div>
    );
  }

  // ---------------------------
  // Quiz Page
  // ---------------------------
  const progress = ((current + 1) / questions.length) * 100;
  return (
    <div style={styles.container}>
      <h2>Dosha Quiz</h2>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progress, width: `${progress}%` }} />
      </div>

      <div style={styles.card}>
        <p>{questions[current].text}</p>
        {Object.entries(questions[current].options).map(([key, val]) => (
          <button
            key={key}
            style={styles.optionBtn}
            onClick={() => handleOption(key)}
          >
            {val}
          </button>
        ))}
      </div>

      <p>Question {current + 1} of {questions.length}</p>
    </div>
  );
}

// ---------------------------
// Styles
// ---------------------------
const styles = {
  container: { maxWidth: 600, margin: "auto", padding: 20, textAlign: "center" },
  card: {
    border: "1px solid #ddd",
    borderRadius: 10,
    padding: 20,
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: "#fff9f0",
  },
  optionBtn: {
    display: "block",
    margin: "10px auto",
    padding: "10px 20px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
    width: "80%",
    fontSize: "16px",
  },
  progressBar: {
    height: 10,
    backgroundColor: "#eee",
    borderRadius: 5,
    marginBottom: 20,
  },
  progress: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    transition: "width 0.3s",
  },

  // --- Result Page Styles ---
  resultContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #a8edea, #fed6e3)",
    padding: 20,
    marginTop: 50,
  },
  resultCard: {
    background: "#ffffff",
    borderRadius: 20,
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    maxWidth: 600,
    width: "100%",
    padding: "40px 30px",
    textAlign: "center",
    animation: "fadeIn 0.8s ease",
  },
  resultTitle: {
    fontSize: "28px",
    color: "#2e7d32",
    fontWeight: "600",
    marginBottom: "10px",
  },
  doshaName: {
    fontSize: "40px",
    fontWeight: "700",
    color: "#4CAF50",
    margin: "10px 0",
  },
  doshaDesc: {
    fontSize: "18px",
    color: "#555",
    marginBottom: "20px",
    lineHeight: "1.5",
  },
  resultDetails: {
    background: "#f7fff8",
    border: "1px solid #c8e6c9",
    borderRadius: 10,
    padding: "10px 20px",
    display: "inline-block",
    marginBottom: 20,
  },
  doshaTips: {
    textAlign: "left",
    background: "#f9fbe7",
    borderRadius: 10,
    padding: "15px 25px",
    color: "#4e342e",
    fontSize: "15px",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  restartBtn: {
    padding: "12px 25px",
    fontSize: "16px",
    background: "linear-gradient(90deg, #43a047, #66bb6a)",
    color: "#fff",
    border: "none",
    borderRadius: 25,
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(67,160,71,0.3)",
    transition: "all 0.3s ease",
  },
  select: { padding: 10, fontSize: 16, margin: "10px 0", width: "50%" },
  input: { padding: 10, fontSize: 16, margin: "10px 0", width: "50%" },
};
