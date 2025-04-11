import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/KeyData.css'; // Assurez-vous de styliser les cartes dans ce fichier CSS
import CalIcon from '../assets/icons/calories-icon.png';
import ProtIcon from '../assets/icons/protein-icon.png';
import AppleIcon from '../assets/icons/carbs-icon.png';
import FatIcon from '../assets/icons/fat-icon.png';

const KeyData = ({ keyData }) => {
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = keyData;

  const data = [
    { label: 'Calories', value: calorieCount, unit: 'kCal', icon: CalIcon},
    { label: 'Protéines', value: proteinCount, unit: 'g', icon: ProtIcon },
    { label: 'Glucides', value: carbohydrateCount, unit: 'g', icon: AppleIcon },
    { label: 'Lipides', value: lipidCount, unit: 'g', icon: FatIcon },
  ];

  return (
    <div className="key-data">
      {data.map((item, index) => (
        <div key={index} className="key-data-card">
          <div className="key-data-icon"><img src={item.icon} alt={item.label} /></div>
          <div className="key-data-info">
            <p className="key-data-value">
              {item.value} {item.unit}
            </p>
            <p className="key-data-label">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

KeyData.propTypes = {
  keyData: PropTypes.shape({
    calorieCount: PropTypes.number.isRequired,
    proteinCount: PropTypes.number.isRequired,
    carbohydrateCount: PropTypes.number.isRequired,
    lipidCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default KeyData;