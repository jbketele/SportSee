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
          calories: session.calories , // Calories brûlées
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='activity' style={{ width: 835, height: 320 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 0, left: 20, bottom: 5 }}>
          <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" tickFormatter={(tick) => `${tick}`} />
          <YAxis 
            axisLine={false}
            tickLine={false}
            orientation='right'
            tickFormatter={(tick) => `${tick}`}/>
          <Tooltip />
          <Bar dataKey="kilogram" fill="#000" name="Poids (kg)" />
          <Bar dataKey="calories" fill="#ff0101" name="Calories brûlées" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;