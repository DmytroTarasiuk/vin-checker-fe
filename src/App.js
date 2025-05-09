import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [vin, setVin] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  const fetchVehicleData = async () => {
    setLoading(true); // ✅ Start loading
    try {
      const response = await axios.get(
        `http://localhost:5000/api/vehicle?vin=${vin}`
      );
      setData(response.data.result);
      setError("");
    } catch (err) {
      setError("Failed to fetch vehicle data.");
      setData(null);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="App">
      <h1>VIN Decoder</h1>
      <input
        type="text"
        placeholder="Enter VIN number"
        value={vin}
        onChange={(e) => setVin(e.target.value)}
      />
      <button onClick={fetchVehicleData} disabled={loading}>
        {loading ? "Decoding..." : "Decode"}
      </button>

      {loading && <p>Loading vehicle data...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div className="vehicle-info">
          <img
            src={data.previewImageURL}
            alt="Vehicle Preview"
            style={{ width: "300px" }}
          />
          <p>
            <strong>Images Available:</strong> {data.imagesAmount}
          </p>

          <h2>Recalls:</h2>
          <ul>
            {data.recalls.map((recall, index) => (
              <li key={index}>
                <strong>
                  {recall.ModelYear} {recall.Make} {recall.Model}
                </strong>
                <p>
                  <strong>Component:</strong> {recall.Component}
                </p>
                <p>
                  <strong>Summary:</strong> {recall.Summary}
                </p>
                <p>
                  <strong>Consequence:</strong> {recall.Consequence}
                </p>
                <p>
                  <strong>Remedy:</strong> {recall.Remedy}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
