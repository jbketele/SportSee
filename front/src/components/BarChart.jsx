import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../assets/styles/BarChart.css';

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

  // Personnalisation du curseur
  const CustomCursor = ({ x, y, width, height }) => {
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="rgba(196, 196, 196, 0.5)" // Couleur grise avec transparence
      />
    );
  };
const BarChartComponent = ({ data }) => (
    <div className="activity">
      {/* Conteneur pour la légende */}
      <div className="custom-legend">
        <h2 className="chart-title">Activité quotidienne</h2>
        <div className="legend-items">
          <span className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#000' }}></span> Poids (kg)
          </span>
          <span className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#e60000' }}></span> Calories brûlées (kCal)
          </span>
        </div>
      </div>
      {/* Conteneur pour le graphique */}
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 0, left: 20, bottom: 5 }}>
          <CartesianGrid horizontal={true} vertical={false} strokeDasharray="3 3" />
          <XAxis dataKey="name" tickFormatter={(tick) => `${tick}`} />
          <YAxis axisLine={false} 
          tickLine={false} orientation="right" 
          tickFormatter={(tick) => `${tick}`}
          tickMargin={15} />
          <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
          <Bar dataKey="kilogram" fill="#000" name="Poids (kg)" barSize={15} radius={[10, 10, 0, 0]} />
          <Bar dataKey="calories" fill="#e60000" name="Calories brûlées" barSize={15} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

export default BarChartComponent;