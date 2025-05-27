import React from "react";
import MockSwitchButton from "../components/MockSwitchButton";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Import de l'image

function MockSwitchPage({ useMock, setUseMock }) {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px" }}>
      <img src={logo} alt="SportSee logo" />
      <h2>Choix de la source de données</h2>
      <MockSwitchButton useMock={useMock} setUseMock={setUseMock} />
      <p>Source actuelle : <b>{useMock ? "Mock" : "API"}</b></p>
      <div style={{ marginTop: "20px" }}>
        <button
          style={{ marginRight: "10px", padding: "10px" }}
          onClick={() => navigate("/user/12")}
        >
          Aller à l'utilisateur 12
        </button>
        <button
          style={{ padding: "10px" }}
          onClick={() => navigate("/user/18")}
        >
          Aller à l'utilisateur 18
        </button>
      </div>
    </div>
  );
}

export default MockSwitchPage;