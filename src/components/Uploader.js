import React, { useState } from "react";
import axios from "axios";

function Uploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:8000/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>AI Radiology & Lab Report Analyzer</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload & Analyze</button>
      <pre style={{ background: "#f0f0f0", padding: "10px", marginTop: "20px" }}>
        {result}
      </pre>
    </div>
  );
}

export default Uploader;
