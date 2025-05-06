import React, { useState } from 'react';

const NewPredictionButton = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [predictionPeriod, setPredictionPeriod] = useState('');
  const [fileFormat, setFileFormat] = useState('');
  const [file, setFile] = useState(null);

  const methodInfo = {
    SARIMA: {
      price: '500 DA',
      maxSize: '2MB',
      formats: ['CSV', 'Excel'],
    },
    GRU: {
      price: '800 DA',
      maxSize: '5MB',
      formats: ['CSV', 'Excel'],
    },
  };

  const handleValidate = () => {
    console.log('Méthode:', selectedMethod);
    console.log('Période de prédiction:', predictionPeriod);
    console.log('Format:', fileFormat);
    console.log('Fichier:', file?.name);
    setShowForm(false);
  };

  return (
    <div className="flex flex-col items-end mb-8">
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-yellow-600 hover:bg-fuchsia-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
      >
        Lancer une nouvelle prédiction
      </button>

      {showForm && (
        <div className="mt-4 w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
          <h2 className="text-lg font-bold mb-4">Choisissez une méthode</h2>

          <div className="flex space-x-4 mb-6">
            {['SARIMA', 'GRU'].map((method) => (
              <button
                key={method}
                onClick={() => setSelectedMethod(method)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  selectedMethod === method
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {method}
              </button>
            ))}
          </div>

          {selectedMethod && (
            <div className="space-y-4">
              <p><strong>Prix :</strong> {methodInfo[selectedMethod].price}</p>
              <p><strong>Taille max du dataset :</strong> {methodInfo[selectedMethod].maxSize}</p>

              <div>
                <label className="block mb-1 font-medium">Période de prédiction</label>
                <input
                  type="text"
                  value={predictionPeriod}
                  onChange={(e) => setPredictionPeriod(e.target.value)}
                  placeholder="ex: 12 mois"
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Format de données</label>
                <select
                  value={fileFormat}
                  onChange={(e) => setFileFormat(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="">-- Choisir un format --</option>
                  {methodInfo[selectedMethod].formats.map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium">Importer fichier (facultatif)</label>
                <input
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                >
                  Annuler
                </button>
                <button
                  onClick={handleValidate}
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white"
                >
                  Valider
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewPredictionButton;
