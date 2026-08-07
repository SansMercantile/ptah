# PTAH Frontend - Infrastructure Planning & Construction System

## Overview

PTAH is the Infrastructure Planning & Construction system. This frontend provides a unified interface for managing building projects, resource allocation, safety compliance, and construction timelines.

## Features

- **Project Management**: Track active construction projects and initiatives
- **Resource Allocation**: Optimize labor, equipment, and material resources
- **Safety Compliance**: Monitor workplace safety and compliance metrics
- **Schedule Management**: Plan and track project timelines and milestones
- **Performance Analytics**: View detailed metrics and performance insights
- **Real-time Health Checks**: Monitor backend API availability

## Local Development

### Prerequisites

- Node.js 20+ with npm
- PTAH backend running on `http://localhost:8006` (or set `REACT_APP_API_BASE_URL`)

### Setup

```bash
cd ptah/frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000`

### Environment Variables

Create a `.env.local` file:

```
REACT_APP_API_BASE_URL=http://localhost:8006
```

## API Integration

The frontend connects to PTAH backend endpoints:

- `/api/health` - Health check endpoint
- `/api/v1/ptah/wisdom/retrieve` - Retrieve infrastructure wisdom
- `/api/v1/ptah/knowledge/integrate` - Integrate new knowledge
- `/api/v1/ptah/status` - Get system status

## Docker Deployment

### Build

```bash
docker build -t ptah-frontend:latest .
```

### Run

```bash
docker run -p 3006:3000 \
  -e REACT_APP_API_BASE_URL=http://ptah-backend:8006 \
  ptah-frontend:latest
```

### Docker Compose

From repository root:

```bash
docker compose -f docker-compose.frontends.yml up ptah
```

PTAH frontend will be available at `http://localhost:3006`

## Technology Stack

- **React** 18.3 - UI framework
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon library
- **Axios** - HTTP client
- **React Router** - Navigation
- **Recharts** - Data visualization

## Project Structure

```
ptah/frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── infrastructure/
│   │       └── index.js
│   ├── config/
│   │   └── apiConfig.js
│   ├── pages/
│   │   └── Dashboard.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── reportWebVitals.js
│   └── integration.test.js
├── Dockerfile
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── .gitignore
```

## Testing

```bash
npm test
```

## Build for Production

```bash
npm run build
```

## Troubleshooting

### API Connection Issues

- Ensure PTAH backend is running on the correct port
- Check `REACT_APP_API_BASE_URL` environment variable
- Use browser DevTools to inspect network requests

### Port Conflicts

If port 3000 is already in use:

```bash
npm start -- --port 3001
```

## Support

For issues or questions about the PTAH system, refer to the main constellation documentation.
