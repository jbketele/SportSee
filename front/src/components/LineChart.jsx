import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../assets/styles/LineChart.css"; // Assurez-vous d'avoir un fichier CSS si nécessaire

// Composant personnalisé pour le Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: "#fff", padding: "10px", borderRadius: 0, boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
        <p style={{ margin: 0, color: "#000", fontSize: 8, fontWeight: 500 }}>{`${payload[0].value} min`}</p>
      </div>
    );
  }

  return null;
};

const LineChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = 12; // ID de l'utilisateur
        const response = await fetch(
          `http://localhost:3000/user/${userId}/average-sessions`
        );
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const result = await response.json();

        // Transformation des données pour le graphique
        const formattedData = result.data.sessions.map((session) => ({
          day: ["L", "M", "M", "J", "V", "S", "D"][session.day - 1], // Conversion des jours en lettres
          sessionLength: session.sessionLength,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="line-chart-container">
      <h2 className="chart-title">Durée moyenne des sessions</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          {/* Définition du dégradé linéaire */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="white" stopOpacity="0.5" />
              <stop offset="100%" stopColor="white"  />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="day" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: "white", opacity: 0.8 }} 
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="url(#lineGradient)" // Utilisation du dégradé
            strokeOpacity={0.8}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;