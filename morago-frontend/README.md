# Morago Frontend

Morago is a translation service application connecting clients with translators.

## Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Update the environment variables in `.env.local` as needed:
   - `VITE_API_URL`: The base URL for the backend API.
   - `VITE_SOCKET_URL`: The WebSocket URL for real-time features.

### Development

Start the development server:
```bash
npm run dev
```

### Build

Build the application for production:
```bash
npm run build
```

## Features

- Role-based access control (Clients & Translators)
- Real-time call requests
- Profile management
- Wallet and top-up functionality
