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

## Auteurs

- [Votre nom/équipe]
