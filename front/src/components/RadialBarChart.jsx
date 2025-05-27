import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import "../assets/styles/RadialBarChart.css";

  const RadialBarChartComponent = ({ score }) => {
    const data = [{ name: "Score", value: score * 100 }];
    const endAngle = 90 + (360 * (score || 0));
    
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
  }
export default RadialBarChartComponent;