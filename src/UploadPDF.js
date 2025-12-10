import React, { useState } from "react";

const BACKEND_URL = "https://airadioligy-lab-correlation-backend.onrender.com";

function UploadPDF() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a PDF file first!");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${BACKEND_URL}/analyze_pdf`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorText}`);
      }

      const data = await response.json();
      setResult(data.analysis_result); // This is an object
    } catch (error) {
      console.error("Error uploading PDF:", error);
      alert("Error uploading PDF. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h2>Upload Medical PDF for Analysis</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
        <button
          type="submit"
          disabled={loading}
          style={{
            marginLeft: "10px",
            padding: "8px 15px",
            backgroundColor: loading ? "#ccc" : "teal",
            color: "white",
            border: "none",
            cursor: loading ? "default" : "pointer",
          }}
        >
          {loading ? "Analyzing..." : "Analyze PDF"}
        </button>
      </form>

      {loading && <p style={{ marginTop: "15px", color: "blue" }}>Analysis in progress...</p>}

      {result && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ddd", backgroundColor: "#f9f9f9" }}>
          <h3>Analysis Result (Gemini LLM):</h3>
          <ul>
            {Object.entries(result).map(([key, value]) => (
              <li key={key}>
                <strong>{key.replace(/_/g, " ")}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UploadPDF;
