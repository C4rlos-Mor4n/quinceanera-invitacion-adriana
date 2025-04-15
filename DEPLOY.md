# Deployment Instructions

## Building and Running with Docker

1. Build the Docker image:
```bash
docker build -t quinceanera-invitacion .
```

2. Run the container:
```bash
docker run -d -p 3012:3012 --env-file .env quinceanera-invitacion
```

3. Access the application:
Once running, the application will be available at `http://localhost:3012`

## Environment Variables
The following environment variables are configured:
- `NODE_ENV`: Set to production
- `PORT`: Application port (3012)
- `HOSTNAME`: Set to 0.0.0.0 for Docker compatibility
- `NEXT_TELEMETRY_DISABLED`: Disables Next.js telemetry

## Deployment Notes
- The application is configured to run in standalone mode
- Static assets are automatically handled by Next.js
- The Docker container runs with a non-root user for security