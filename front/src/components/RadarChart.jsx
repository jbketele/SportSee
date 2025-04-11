import React, { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import "../assets/styles/RadarChart.css";

const RadarChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = 12; // ID de l'utilisateur
        const response = await fetch(`http://localhost:3000/user/${userId}/performance`);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const result = await response.json();

        // Mapping des entiers vers les descriptions textuelles
        const kindMapping = result.data.kind; // { 1: 'cardio', 2: 'energy', ... }
        const formattedData = result.data.data.map((item, index) => ({
          subject: kindMapping[item.kind], // Utilisation de la description textuelle
          A: item.value,
          key: index, // Ajout d'une clé unique
        }));

        console.log("Mapping des kinds :", kindMapping);
        console.log("Données formatées :", formattedData);

        console.log("Formatted Data:", formattedData);
        setData(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, []);

  if (!data || data.length === 0) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div className="radar-chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data} cx={"50%"} cy={"50%"} outerRadius={"60%"} width={250} height={250}>
          <PolarGrid radialLines={false} />
          <PolarAngleAxis dataKey="subject" stroke="#fff" tick={{fontSize: 12}} tickLine={false} />
          <Radar name="Performance" dataKey="A" stroke="#FF0000" fill="#FF0000" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;