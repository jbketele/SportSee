import React, { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import {
    RadialBarChart,
    RadialBar,
    ResponsiveContainer,
} from "recharts";
import "../assets/styles/RadialBarChart.css";

const RadialBarChartComponent = () => {
    const { id: userId } = useParams(); // Récupération de l'ID de l'utilisateur depuis les paramètres de l'URL
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/user/${userId}`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                const result = await response.json();

                // Utilisation de todayScore ou score
                const score = result.data.todayScore || result.data.score;

                // Transformation des données pour le graphique
                const formattedData = [
                    { name: "Score", value: score * 100 }, // Conversion en pourcentage
                ];

                setData(formattedData);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
    });

    // Calcul dynamique de l'angle de fin
    const endAngle = data.length > 0 ? 90 + (360 * data[0].value) / 100 : 90;

    return (
        <div className="radial-bar-chart-container">
            <h2 className="chart-title">Score</h2>
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="80%" // Ajusté pour laisser de la place au cercle blanc
                    outerRadius="95%" // Ajusté pour laisser de la place au cercle blanc
                    data={data}
                    startAngle={90}
                    endAngle={endAngle} // Angle dynamique basé sur la valeur
                >
                    <RadialBar
                        minAngle={15}
                        background
                        clockWise={true}
                        dataKey="value"
                        fill="#ff0000" // Couleur de la barre
                        cornerRadius={50}
                    />
                </RadialBarChart>
            </ResponsiveContainer>
            {/* Cercle blanc au centre */}
            <div className="radial-bar-chart-center">
                <p className="radial-bar-chart-score">
                    {data.length > 0 ? `${data[0].value}%` : "0%"}
                </p>
                <p className="radial-bar-chart-text">
                    de votre<br />objectif
                </p>
            </div>
        </div>
    );
};

export default RadialBarChartComponent;