import React, { useState } from "react";

// 🚀 Define the live backend URL here
const BACKEND_URL = "https://airadioligy-lab-correlation-backend.onrender.com";



function UploadPDF() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loading indicator

  // Handle file selection
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a PDF file first!");
      return;
    }
    
    setLoading(true);
    setResult(null); // Clear previous results

    const formData = new FormData();
    // Ensure the key 'file' matches the FastAPI endpoint definition (UploadFile = File(...))
    formData.append("file", file);

    try {
      // 🔗 Updated the endpoint URL to the live Render backend
      const response = await fetch(`${BACKEND_URL}/analyze_pdf`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Details: ${errorText}`);
      }
      
      const data = await response.json();
      setResult(data.analysis_result);
      
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
          disabled={loading} // Disable button while loading
          style={{ marginLeft: "10px", padding: "8px 15px", backgroundColor: loading ? "#ccc" : "teal", color: "white", border: "none", cursor: loading ? "default" : "pointer" }}
        >
          {loading ? "Analyzing..." : "Analyze PDF"}
        </button>
      </form>

      {/* Display Loading Indicator */}
      {loading && <p style={{ marginTop: "15px", color: "blue" }}>Analysis in progress...</p>}

      {/* Display Analysis Result (using pre-wrap for LLM output formatting) */}
      {result && (
        <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #ddd", backgroundColor: "#f9f9f9" }}>
          <h3>Analysis Result (Gemini LLM):</h3>
          {/* We assume result is a simple string containing the structured LLM output */}
          <pre style={{ whiteSpace: "pre-wrap", overflowX: "auto" }}>
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}

export default UploadPDF;