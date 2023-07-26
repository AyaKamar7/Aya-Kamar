import React, { useState } from 'react';
import './App.css';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unitSystem, setUnitSystem] = useState('metric'); 
  const [bmi, setBMI] = useState(null);
  const [bmiCategory, setBMICategory] = useState('');

  const calculateBMI = () => {
    if (weight && height) {
      let bmiValue;

      if (unitSystem === 'metric') {
        bmiValue = (weight / ((height / 100) * (height / 100))).toFixed(2);
      } else {
        bmiValue = ((weight / (height * height)) * 703).toFixed(2);
      }

      setBMI(bmiValue);
      setBMICategory(getBMICategory(bmiValue));
    }
  };

  const getBMICategory = (bmiValue) => {
    if (bmiValue < 18.5) return 'Underweight';
    if (bmiValue >= 18.5 && bmiValue < 24.9) return 'Normal Weight';
    if (bmiValue >= 25 && bmiValue < 29.9) return 'Overweight';
    return 'Obese';
  };

  const handleUnitChange = (e) => {
    setUnitSystem(e.target.value);
    setWeight('');
    setHeight('');
    setBMI(null);
    setBMICategory('');
  };

  return (
    <div className="bmi-calculator">
      <h2>BMI Calculator</h2>
      <div className="unit-selector">
        <label>
          <input
            type="radio"
            value="metric"
            checked={unitSystem === 'metric'}
            onChange={handleUnitChange}
          />
          Metric (kg/cm)
        </label>
        <label>
          <input
            type="radio"
            value="imperial"
            checked={unitSystem === 'imperial'}
            onChange={handleUnitChange}
          />
          Imperial (lb/inch)
        </label>
      </div>
      <div>
        <label>Weight:</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder={unitSystem === 'metric' ? 'Weight in kg' : 'Weight in lb'}
          min="0"
        />
      </div>
      <div>
        <label>Height:</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder={unitSystem === 'metric' ? 'Height in cm' : 'Height in inch'}
          min="0"
        />
      </div>
      <button onClick={calculateBMI}>Calculate BMI</button>
      {bmi && (
        <div>
          <p>Your BMI is: {bmi}</p>
          <p className={`bmi-category ${bmiCategory.toLowerCase().replace(/\s/g, '-')}`}>
            {bmiCategory}
          </p>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
