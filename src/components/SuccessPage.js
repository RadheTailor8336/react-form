import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Form Submitted Successfully ✅</h2>
      <pre style={{ background: "#f0f0f0", padding: "1rem" }}>
        {JSON.stringify(state, null, 2)}
      </pre>
      <button onClick={() => navigate("/")}>Go Back</button>
    </div>
  );
};

export default SuccessPage;
