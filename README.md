# Recipes Web App Setup Guide

This guide will walk you through setting up a web application with a Node.js backend, an Angular frontend, and a MySQL database.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download) (v.20.12.2)
- [npm](https://www.npmjs.com/) (v.10.5.0)
- [Angular CLI](https://github.com/angular/angular-cli) (v.17.3.4)
- [MySQL](https://www.mysql.com/)

## Backend Setup (Node.js)

1. **Navigate to Backend Directory**

    ```bash
    cd Backend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Configure Environment Variables**

    Create a `.env` file in the `backend` directory with the following content:

    ```plaintext
    DB_HOST="localhost"
    DB_USER="root"
    DB_PASSWORD=YOUR_PASSWORD_HERE
    DB_NAME="project123"
    DB_DIALECT="mysql"
    DB_POOL_MAX = 5
    DB_POOL_MIN = 0
    DB_POOL_ACQUIRE=30000
    DB_POOL_IDLE=10000
    DB_TIMEZONE="UTC+3"
    JWT_SECRET="tyus#d6D5%SAKDO4L5CV#$#d@!^*A"
    ENCRYPTION_KEY="recipes123"
    ```

4. **Initialize the Database**

    Make sure your MySQL server is running and execute the following commands to set up the database:

    ```sql
    CREATE DATABASE project123;
    ```

5. **Start the Backend Server**

    ```bash
    node server.js
    ```

    The backend server should now be running at `http://localhost:3000`.

## Frontend Setup (Angular)

1. **Navigate to Frontend Directory**

    ```bash
    cd ../Frontend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Build and Serve the Frontend**

    ```bash
    ng serve
    ```

    The frontend application should now be running at `http://localhost:4200`.

## Full Project Structure

```plaintext
your-repo/
│
├── Backend/
│ ├── .env
│ ├── package.json
│ ├── app/
│ └── ...
│
├── Frontend/
│ ├── angular.json
│ ├── package.json
│ ├── src/
│ └── ...
│
└── README.md
```


## Common Commands

### Backend

- **Start the server:** `node server.js`

### Frontend

- **Serve the application:** `ng serve`

## Troubleshooting

- **Database Connection Errors:** Ensure your MySQL server is running and the credentials in the `.env` file are correct.
- **Backend Issues:** Check the server logs for errors and ensure all dependencies are installed correctly.
- **Frontend Issues:** Make sure the Angular CLI is installed.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

---

For further information, please refer to the detailed documentation in each subdirectory (`backend` and `frontend`).
