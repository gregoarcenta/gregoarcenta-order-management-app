# Order Management App

## Running in Development

1. Clone the project.
2. Switch to the `develop` branch.
3. Install dependencies:
    ```bash
    $ pnpm install
    ```
4. Copy the `.env.example` file and rename it to `.env`.
5. Update environment variables in the `.env` file.
6. Start the database with Docker:
   ```bash
   $ docker compose up -d
   ```
7. Run the app in development mode:
   ```bash
   $ pnpm start:dev
   ```
   
## API Documentation (Swagger)

Access the API documentation at:

```
http://localhost:3000/api
```

## Running Tests

```bash
# Run unit tests
pnpm test

# Run test coverage report
pnpm test:cov
```

## Technologies Used

- NestJS
- PostgreSQL
- Docker