# My Bitget Wallet Front

> **Application web moderne pour la gestion de portefeuille crypto sur Bitget**

Une interface utilisateur intuitive et responsive permettant de visualiser et gérer vos actifs cryptographiques sur l'exchange Bitget en temps réel.

## 🚀 Fonctionnalités principales

### 📊 Dashboard en temps réel
- **Vue d'ensemble du portefeuille** : Affichage de la valeur totale des actifs en USDT
- **Répartition des actifs** : Distinction entre actifs disponibles, bloqués et épargnés
- **Mise à jour en temps réel** : Synchronisation automatique via Server-Sent Events (SSE)
- **Prix en direct** : Suivi des variations de prix 24h avec indicateurs visuels

### 🔐 Authentification sécurisée
- **Connexion/Inscription** : Système d'authentification complet
- **Gestion des sessions** : Persistance des tokens d'accès
- **Protection des routes** : Accès sécurisé aux fonctionnalités privées

### 💰 Gestion des tokens
- **Liste détaillée** : Affichage de tous les tokens avec leurs quantités
- **Informations complètes** : Prix, variations, disponibilité, blocages
- **Interface responsive** : Optimisée pour mobile et desktop

### 📱 Progressive Web App (PWA)
- **Installation native** : Possibilité d'installer l'app sur mobile/desktop
- **Mode hors-ligne** : Fonctionnalités de base disponibles sans connexion
- **Notifications push** : Alertes personnalisables (en développement)

## 🛠️ Technologies utilisées

### Frontend
- **React 19** - Framework UI moderne avec les dernières fonctionnalités
- **TypeScript** - Typage statique pour une meilleure robustesse
- **Vite** - Build tool ultra-rapide et moderne
- **Tailwind CSS 4** - Framework CSS utilitaire pour un design cohérent

### État et données
- **TanStack Query** - Gestion d'état serveur et cache intelligent
- **React Router DOM 7** - Navigation et routage côté client
- **Zod** - Validation de schémas TypeScript

### Développement et qualité
- **Storybook** - Développement et documentation de composants
- **Vitest** - Framework de tests unitaires et d'intégration
- **Playwright** - Tests end-to-end automatisés
- **ESLint + Prettier** - Linting et formatage de code

### Outils et intégrations
- **PWA Vite Plugin** - Configuration Progressive Web App
- **React Icons** - Bibliothèque d'icônes complète
- **Server-Sent Events** - Communication temps réel avec le backend

## 📁 Architecture du projet

```
src/
├── api/                 # Services API et authentification
├── components/          # Composants réutilisables
│   ├── *.stories.tsx   # Documentation Storybook
│   └── *.tsx           # Composants React
├── hooks/              # Hooks personnalisés
├── layouts/            # Layouts d'application
├── pages/              # Pages principales
├── routes/             # Configuration du routage
├── utils/              # Utilitaires et helpers
└── stories/            # Stories Storybook globales
```

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+ 
- pnpm (recommandé) ou npm

### Installation
```bash
# Cloner le repository
git clone <repository-url>
cd my-bitget-wallet-front

# Installer les dépendances
pnpm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos configurations
```

### Développement
```bash
# Démarrer le serveur de développement
pnpm dev

# Lancer Storybook
pnpm storybook

# Exécuter les tests
pnpm test

# Build de production
pnpm build
```

## 🔧 Configuration

### Variables d'environnement
```env
VITE_API_URL=http://localhost:3000  # URL du backend
NODE_ENV=development                # Environnement
```

### Proxy de développement
Le serveur de développement est configuré pour proxifier les requêtes `/api` vers votre backend, permettant un développement local sans problèmes de CORS.

## 📱 Fonctionnalités PWA

L'application est configurée comme une Progressive Web App avec :
- **Manifest** : Métadonnées pour l'installation
- **Service Worker** : Cache et fonctionnalités hors-ligne
- **Icônes** : Support multi-tailles pour tous les appareils
- **Thème** : Interface sombre optimisée

## 🧪 Tests et qualité

### Tests automatisés
- **Tests unitaires** : Vitest pour les composants et hooks
- **Tests d'intégration** : Storybook avec addon Vitest
- **Tests E2E** : Playwright pour les parcours utilisateur
- **Tests d'accessibilité** : Storybook addon a11y

### Qualité du code
- **ESLint** : Règles strictes pour React et TypeScript
- **Prettier** : Formatage automatique du code
- **TypeScript** : Typage strict activé
- **Storybook** : Documentation interactive des composants

## 🚀 Déploiement

### Build de production
```bash
pnpm build
```

### Prévisualisation
```bash
pnpm preview
```

Le build génère une application optimisée dans le dossier `dist/` prête pour le déploiement sur n'importe quel serveur web statique.

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit vos changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🔗 Liens utiles

- [Documentation React](https://react.dev/)
- [Documentation Vite](https://vitejs.dev/)
- [Documentation Tailwind CSS](https://tailwindcss.com/)
- [Documentation Storybook](https://storybook.js.org/)
- [API Bitget](https://bitgetlimited.github.io/apidoc/en/spot/)

---

**Développé avec ❤️ pour une expérience crypto moderne et intuitive**