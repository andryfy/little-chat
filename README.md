# Little Chat - Real-time Chat Application (MERN stack)
Welcome to Little-Chat – a real-time chat application built with the MERN Stack (MongoDB, Express.js, React.js, Node.js). This project is organized as a monorepo for ease of management, consolidating both the frontend and backend in a single repository.


## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time messaging using Socket.IO
- User authentication with JWT
- Private and group chat functionality
- Responsive design with a user-friendly interface
- MongoDB-based persistent data storage

## Tech Stack

- **Frontend**: React.js, Material UI, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO

## Getting Started

### Prerequisites

Before starting, make sure you have the following software installed:

- [Node.js](https://nodejs.org/) >= 14.x
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB] (https://www.mongodb.com/)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/andryfy/little-chat.git
   cd little-chat
   ```

2. **Install Dependencies for both projects (client and server)**
   ```bash
   npm run install-all
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory with the required variables (see [Environment Variables](#environment-variables) below).

4. **Run MongoDB**  
   Ensure MongoDB is running on your machine or update the `.env` file with your MongoDB URI.

5. **Start the Application**
   ```bash
   yarn dev
   ```

6. Open your browser and go to `http://localhost:3000` to start using Little-Chat.

## Project Structure

Here’s an overview of the project structure:

```bash
little-chat/
├── client/              # Front-end directory (React.js)
│   ├── src/             # React.js source code
│   ├── public/          # Static files
│   └── package.json     # Front-end dependencies
├── server/              # Back-end directory (Express.js)
│   ├── src/             # Express.js source code
│   └── package.json     # Back-end dependencies
├── .gitignore           # Files to ignore by Git
├── package.json         # Global dependencies and scripts
└── README.md            # Project documentation
```

## Available Scripts

The following commands are available at the project root:

- **Install dependencies**:
  ```bash
  npm run install-all
  ```

- **Run both projects in development**:
  ```bash
  npm run dev
  ```

- **Run the client only (React)**:
  ```bash
  npm run client
  ```

- **Run the server only (Express)**:
  ```bash
  npm run server
  ```

- **Build the client for production**:
  ```bash
  npm run build
  ```

- **Lint both projects**:
  ```bash
  npm run lint
  ```

## Environment Variables

Create a `.env` file in both `client` and `server` directories with the necessary variables. Examples:

### `.env` for the server:
| Variable        | Description                  |
|-----------------|------------------------------|
| `PORT`          | Port for Express server      |
| `MONGODB_URI`   | MongoDB connection string    |
| `JWT_SECRET`    | Secret key for JWT           |

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/little-chat
JWT_SECRET=anEncryptedSecretKey
```

### `.env` for the client:
| Variable        | Description                  |
|-----------------|------------------------------|
| `API_URL`       | URL for the API              |

```
API_URL=http://localhost:5000/api
```

## Deployment

To deploy the application in production, follow these steps:

1. Build the React.js project:
   ```bash
   npm run build
   ```

2. Deploy the client’s `build/` directory on a static web server and deploy the Express.js server on a platform of your choice (like Heroku, AWS, etc.).

## Contributing

Contributions are welcome! Please submit an issue or open a pull request for any suggestions or fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
