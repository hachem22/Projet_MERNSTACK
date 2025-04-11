# Projet TunisAir

Application web de gestion des réservations pour TunisAir

## Fonctionnalités principales

- Système d'authentification (connexion/inscription)
- Gestion des utilisateurs
- Réservation de billets
- Interface administrateur
- Tableau de bord client

## Technologies utilisées

### Frontend
- React.js
- Material-UI (MUI)
- React Router
- Context API

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)

## Structure du projet

```
projet_jihen/
├── client/                  # Application frontend
│   ├── public/
│   ├── src/
│   │   ├── components/      # Composants React
│   │   ├── context/         # Contextes d'application
│   │   └── ...
├── server/                  # Application backend
│   ├── config/              # Configuration
│   ├── controllers/         # Contrôleurs
│   ├── models/              # Modèles MongoDB
│   ├── routes/              # Routes API
│   └── ...
└── README.md                # Ce fichier
```

## Installation

1. Cloner le dépôt :
```bash
git clone [URL_DU_DEPOT]
```

2. Installer les dépendances :
```bash
cd projet_jihen
npm install
cd client
npm install
```

3. Configuration :
- Créer un fichier `.env` dans le dossier server basé sur `.env.example`
- Configurer les variables d'environnement nécessaires

## Exécution

### Développement
Lancer le serveur :
```bash
cd server
npm run dev
```

Lancer le frontend :
```bash
cd client
npm start
```

### Production
Build du frontend :
```bash
cd client
npm run build
```

Démarrage du serveur en production :
```bash
cd server
npm start
```

## Variables d'environnement

Exemple de configuration (.env) :
```
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
PORT=5000
```

## les interfaces
1-landing page 
![Capture d'écran 2025-04-09 154541](https://github.com/user-attachments/assets/a52e6762-dd6e-4f7e-b2c2-a3fe5d67309d)
2-register page
![Capture d'écran 2025-04-09 155205](https://github.com/user-attachments/assets/895464b0-ab8b-49d9-830d-2aad122f3bdf)
3-login page 
![Capture d'écran 2025-04-09 155146](https://github.com/user-attachments/assets/ba265978-9e92-44d2-a4e0-3bccd16451e4)
4-home admin
![Capture d'écran 2025-04-09 160856](https://github.com/user-attachments/assets/cc2ffa6a-3139-4a20-a20c-b334d7d3652a)
5-home client
![Capture d'écran 2025-04-09 160951](https://github.com/user-attachments/assets/49a05d60-4b44-4b01-ba6a-9d62e4aa51db)
6-admin /user managment 
![Capture d'écran 2025-04-11 224726](https://github.com/user-attachments/assets/4189d2d4-689c-4a10-938a-78cb17485d37)

