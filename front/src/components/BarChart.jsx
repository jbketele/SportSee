import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../assets/styles/BarChart.css'; // Import du fichier CSS

const BarChartComponent = () => {
  const [data, setData] = useState([]);

  // Fonction pour récupérer les données depuis l'API mockée
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = 12; // ID de l'utilisateur
        const response = await fetch(`http://localhost:3000/user/${userId}/activity`); // URL de l'API mockée
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const result = await response.json();

        // Transformation des données pour le graphique
        const formattedData = result.data.sessions.map(session => ({
          name: session.day.slice(-2), // Utilise le jour (ex. "01", "02")
          kilogram: session.kilogram, // Poids
          calories: session.calories, // Calories brûlées
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  // Personnalisation du tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-text">{`${payload[0].value} kg`}</p>
          <p className="tooltip-text">{`${payload[1].value} kCal`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="activity">
      {/* Conteneur pour la légende */}
      <div className="custom-legend">
        <h2 className="chart-title">Activité quotidienne</h2>
        <div className="legend-items">
          <span className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#000' }}></span> Poids (kg)
          </span>
          <span className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#e60000' }}></span> Calories brûlées
          </span>
        </div>
      </div>
      {/* Conteneur pour le graphique */}
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 0, left: 20, bottom: 5 }}>
          <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" tickFormatter={(tick) => `${tick}`} />
          <YAxis axisLine={false} tickLine={false} orientation="right" tickFormatter={(tick) => `${tick}`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="kilogram" fill="#000" name="Poids (kg)" barSize={15} radius={[10, 10, 0, 0]} />
          <Bar dataKey="calories" fill="#e60000" name="Calories brûlées" barSize={15} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;