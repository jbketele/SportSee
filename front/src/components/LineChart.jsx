import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../assets/styles/LineChart.css";

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

// Composant personnalisé pour le curseur
const CustomCursor = ({ points }) => {
  const { x } = points[0]; // Position X du curseur
  return (
    <rect
      x={x} 
      y={0}
      width={"100%"} // Largeur du rectangle (modifiable)
      height={"100%"} // Hauteur du rectangle (modifiable)
      fill="rgba(0, 0, 0, 0.1)" // Couleur semi-transparente
    />
  );
};

const LineChartComponent = ({ data }) => (
    <div className="line-chart-container">
      <h2 className="chart-title">Durée moyenne des sessions</h2>
      <ResponsiveContainer width="100%" height="100%">
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
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={<CustomCursor width={60} height="100%" />} 
          />
          <Line
            type="monotone"
            dataKey="sessionLength"
            stroke="url(#lineGradient)" // Utilisation du dégradé
            strokeOpacity={0.8}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5, fill: "white", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

export default LineChartComponent;