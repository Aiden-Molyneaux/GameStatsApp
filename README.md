# In-Game Stats App - Development Setup

This project contains both frontend and backend components. Follow the steps below to run the app in development mode.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.x or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [nodemon](https://nodemon.io/) (for automatically restarting the backend server)

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Aiden-Molyneaux/GameStatsApp.git
   cd GameStatsApp
   ```

2. **Install frontend dependencies**:

   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**:

   ```bash
   cd ../backend
   npm install
   ```

## Running the App

1. **Start the frontend**:

   ```bash
   cd frontend/app
   npm run start
   ```

2. **Start the backend**:

   ```bash
   cd backend
   nodemon index.ts
   ```

   This will start the backend server and automatically restart it when changes are detected.

## Additional Notes
- The frontend is built with React Native and is configured to run as a web app.
- Ensure that both the frontend and backend servers are running for the app to function correctly.
- Use nodemon for backend development to automatically restart the server upon code changes.
