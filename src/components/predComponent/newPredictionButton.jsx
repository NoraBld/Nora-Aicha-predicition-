import React, { useState } from 'react';

const NewPredictionButton = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [predictionPeriod, setPredictionPeriod] = useState('');
  const [fileFormat, setFileFormat] = useState('');
  const [file, setFile] = useState(null);
  const [showModel, setShowModel] = useState(false);

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
    setShowForm(false);
    setShowModel(true);
  };

  return (
    <div className="mb-8">
      {/* BOUTON aligné à droite */}
      <div className="flex justify-end mr-[6%]">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setShowModel(false);
          }}
          className="text-white font-bold py-3 px-6 rounded-lg transition duration-300 bg-[#FCB17A]"
        >
          Lancer une nouvelle prédiction
        </button>
      </div>

      {/* FORMULAIRE aligné à gauche */}
      <div className="flex flex-col items-start ml-[6%]">
        {showForm && (
          <div className="mt-4 w-full max-w-xl bg-white p-6 rounded-2xl shadow-lg border" style={{ borderColor: '#162556' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#162556' }}>Choisissez une méthode</h2>

            <div className="flex space-x-4 mb-6">
              {['SARIMA', 'GRU'].map((method) => (
                <button
                  key={method}
                  onClick={() => setSelectedMethod(method)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    selectedMethod === method
                      ? 'bg-[#162556] text-white'
                      : 'bg-gray-200 text-gray-800 '
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>

            {selectedMethod && (
              <div className="space-y-4">
                <p><strong >Prix :</strong> {methodInfo[selectedMethod].price}</p>
                <p><strong>Taille max du dataset :</strong> {methodInfo[selectedMethod].maxSize}</p>

                <div>
                  <label className="block mb-1 font-medium" style={{ color: '#162556' }}>Période de prédiction</label>
                  <input
                    type="text"
                    value={predictionPeriod}
                    onChange={(e) => setPredictionPeriod(e.target.value)}
                    placeholder="ex: 12 mois"
                    className="w-full p-2 border rounded-lg"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium" style={{ color: '#162556' }}>Format de données</label>
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
                  <label className="block mb-1 font-medium" style={{ color: '#162556' }}>Importer fichier (facultatif)</label>
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
                    className="px-4 py-2 rounded-lg bg-[#FCB17A] text-white"
                  >
                    Valider
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {showModel && (
          <div className="mt-6 w-full max-w-xl bg-indigo-50 p-6 rounded-xl shadow-md border border-indigo-300">
            <h3 className="text-xl font-bold text-indigo-800 mb-4">🧠 Résumé de votre prédiction</h3>
            <p><strong>Méthode :</strong> {selectedMethod}</p>
            <p><strong>Période :</strong> {predictionPeriod}</p>
            <p><strong>Format :</strong> {fileFormat}</p>
            {file && <p><strong>Fichier :</strong> {file.name}</p>}
            <p className="text-green-700 font-medium mt-2">✔ Prédiction prête à être lancée !</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPredictionButton;
