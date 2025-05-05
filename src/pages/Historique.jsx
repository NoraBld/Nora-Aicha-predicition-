// src/pages/Historique.jsx

import React, { useState } from 'react';
import SearchBar from '../components/histoComponent/SearchBar';
import PredictionDisplay from '../components/histoComponent/PredictionDisplay';
import { predictions } from '../data/predictionData';
import CustomSidebar from '../components/CustomSidebar';
import { ProSidebarProvider } from 'react-pro-sidebar'; // Assure-toi d'avoir installé react-pro-sidebar

const Historique = () => {
  const [selectedPrediction, setSelectedPrediction] = useState(null);

  return (
    <div className="flex h-screen bg-gray-100">
      <ProSidebarProvider>
        <CustomSidebar />
      </ProSidebarProvider>

      <div className="flex-1 p-8 overflow-auto bg-neutral-200">
        <div className="flex justify-between items-center mb-14 rounded p-3 bg-white shadow">
          <h5 className="text-lg font-bold text-gray-600">Historique des prédictions</h5>
          <h5 className="text-lg font-bold text-gray-600">Nom de l'entreprise</h5>
        </div>

        {/* <h1 className="text-3xl font-bold mb-4">Historique des Prédictions</h1> */}

        <SearchBar
          predictions={predictions}
          onSelect={setSelectedPrediction}
        />

        {selectedPrediction && (
          <PredictionDisplay prediction={selectedPrediction} />
        )}
      </div>
    </div>
  );
};

export default Historique;
