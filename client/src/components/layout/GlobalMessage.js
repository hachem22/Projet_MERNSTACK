import React, { useState } from 'react';

const GlobalMessage = () => {
  const [message, setMessage] = useState(''); // Message à afficher

  // Exemple : définir un message (peut être remplacé par un contexte ou une prop)
  React.useEffect(() => {
    setMessage('Bienvenue sur le tableau de bord !'); // Exemple de message
  }, []);

  if (!message) return null; // Ne rien afficher si aucun message

  return (
    <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', marginBottom: '10px' }}>
      {message}
    </div>
  );
};

export default GlobalMessage;
