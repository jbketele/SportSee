import { useEffect, useState } from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import "../assets/styles/RadarChart.css";

const RadarChartComponent = ({ data }) => {
  const [radius, setRadius] = useState('50%');
  const [tickFontSize, setTickFontSize] = useState('10px');

  useEffect(() => {
    const updateRadius = () => {
      const container = document.querySelector('.radar-chart-container');
      if (container) {
        const styles = getComputedStyle(container);
        const cssRadius = styles.getPropertyValue('--radius').trim();
        const cssTickFont = styles.getPropertyValue('--tick-font-size').trim();
        setRadius(cssRadius);
        setTickFontSize(cssTickFont);
      }
    };

    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  if (!data || data.length === 0) {
    return <div>Chargement des données...</div>;
  }

  return (
    <div className="radar-chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx={"50%"} cy={"50%"} outerRadius={radius} >
          <PolarGrid radialLines={false} />
          <PolarAngleAxis dataKey="subject" stroke="#fff" tick={{fontSize: tickFontSize}} tickLine={false} />
          <Radar name="Performance" dataKey="value" stroke="#FF0000" fill="#FF0000" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;