import React from "react";
import UploadPDF from "./UploadPDF"; // Make sure UploadPDF.js is in the same folder

function App() {
  return (
    <div className="App">
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Medical PDF Analyzer</h1>
      <UploadPDF />
    </div>
  );
}

export default App;
