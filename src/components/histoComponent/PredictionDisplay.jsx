import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts';

const PredictionDisplay = ({ prediction }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showRealData, setShowRealData] = useState(false);

  const data = prediction.predicted.map((value, index) => ({
    day: `Jour ${index + 1}`,
    predicted: value,
    real: prediction.real[index]
  }));

  return (
        <div className="bg-[#dddfef] border-1 border-blue-900 p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">{prediction.title}</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" stroke="#424769" />
          <YAxis stroke="#424769" />
          <Tooltip contentStyle={{ backgroundColor: '#424769', borderColor: '#424769', color: '#fff' }} />
          <Legend />
          {/* Ligne prédiction - bleu marine */}
          <Line
            type="monotone"
            dataKey="predicted"
            stroke="#2d3250"
            name="Prédiction"
            strokeWidth={2}
          />
          {/* Ligne données réelles - orange */}
          {showRealData && (
            <Line
              type="monotone"
              dataKey="real"
              stroke="#f59e0b"
              name="Données réelles"
              strokeWidth={2}
            />
          )}
        </LineChart>
      </ResponsiveContainer>

      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="bg-[#2d3250] px-4 py-2 rounded-xl hover:bg-[#333852] text-white"
        >
          {showDetails ? 'Masquer les détails' : 'Voir les détails'}
        </button>

        <button
          onClick={() => setShowRealData(!showRealData)}
          className="bg-[#2d3250] px-4 py-2 rounded-xl hover:bg-[#333852] text-white"
        >
          {showRealData ? 'Masquer les données réelles' : 'Afficher les données réelles'}
        </button>
      </div>

      {showDetails && (
        <div className="mt-4 text-sm text-gray-700">
          <p><strong>Méthode :</strong> {prediction.method}</p>
          <p><strong>Taux d'erreur :</strong> {prediction.errorRate}</p>
          <p><strong>Paramètres :</strong> {JSON.stringify(prediction.params)}</p>
          <p><strong>Date de prédiction :</strong> {prediction.date}</p>
          <p><strong>Période :</strong> {prediction.period}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionDisplay;
