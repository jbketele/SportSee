import React from "react";

function MockSwitchButton({ useMock, setUseMock }) {
  return (
    <button
      onClick={() => setUseMock((prev) => !prev)}
      style={{ margin: "20px", padding: "10px" }}
    >
      {useMock ? "Utiliser l'API" : "Utiliser les données mockées"}
    </button>
  );
}

export default MockSwitchButton;