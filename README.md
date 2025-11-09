# Exam Genius - CADNA Frontend

A modern React-based frontend for the AI-powered assessment platform Exam Genius (CADNA). Built with React, Vite, and Tailwind CSS.

## Features

- **Complete Authentication Flow**: Registration, login, 2FA support
- **Role-based Access**: Student and Admin dashboards
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Architecture**: React hooks, context API, and service layer
- **Error Handling**: Comprehensive error boundaries and validation
- **Security**: JWT authentication with protected routes

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: React Icons
- **HTTP Client**: Fetch API with custom wrapper
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=https://cadna-backend.onrender.com
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## User Flow

1. **Landing Page** → User sees the main landing page
2. **Registration** → 3-step registration process
3. **Sign In** → Login with email/password
4. **Two-Factor Authentication** → If enabled, verify 6-digit code
5. **Dashboard** → Role-based dashboard (Student/Admin)

## API Integration

The frontend connects to the backend API at `https://cadna-backend.onrender.com`

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
