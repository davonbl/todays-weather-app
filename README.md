# Todo Server Application

This is a project that is a nodeJS and expressJS application.

This project allows users to fetch and experiement with the endpoints, and decide if it fits there use-case for their front-end application.

## Tools needed
- Visual Studio Code (VSC) Editor (recommended)
- Git bash (recommended)
- Postgres database
- Postman (or similar tools)
- This Github repo

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/davonbl/todo-server.git
    ```

2. After entering either the client or server directory, install the dependencies in the client and server directories:

    ```bash
    npm install
    ```

3. Start the development server:
    - Client
    ```bash
    npm run dev
    ```

4. Create a `.env` file in the server root directory. This is where your keys from your remote platorm service will be saved.

    ```
    DATABASE_URL=TBD
    POSTGRES_DATABASE=TBD
     ```
4. Now you should be able to utilize this application. Cheers!
## Documentation

- NodeJS :  https://nodejs.org/docs/latest/api/
- Express : https://expressjs.com/
- Postman : https://www.postman.com/api-documentation-tool/
