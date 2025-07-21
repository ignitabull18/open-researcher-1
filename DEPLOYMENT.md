# Coolify Deployment Guide

This guide will help you deploy the Open Researcher application on your Coolify instance using a private GitHub repository.

## Prerequisites

Before deploying, make sure you have:

1. **Coolify instance** properly set up and running
2. **Private GitHub repository** access configured in Coolify
3. **API Keys** for the required services:
   - [Anthropic API Key](https://console.anthropic.com/) - for AI research capabilities
   - [Firecrawl API Key](https://firecrawl.dev/) - for web scraping functionality

## Deployment Steps

### 1. Prepare Your Repository

Ensure your repository contains all the necessary files:
- ✅ `Dockerfile` (multi-stage build for production)
- ✅ `.dockerignore` (optimized for Next.js)
- ✅ `next.config.ts` (configured with standalone output)
- ✅ `.env.example` (template for environment variables)

### 2. Create Application in Coolify

1. **Navigate to your Coolify dashboard**
2. **Create a new Application**
3. **Select "Git Repository" as the source**
4. **Configure the application:**
   - **Repository**: Select your private GitHub repository
   - **Branch**: `main` (or your preferred branch)
   - **Build Pack**: `Docker`
   - **Dockerfile Location**: `./Dockerfile` (root directory)

### 3. Configure Environment Variables

In your Coolify application settings, add the following environment variables:

```bash
# Required API Keys
ANTHROPIC_API_KEY=your_anthropic_api_key_here
FIRECRAWL_API_KEY=your_firecrawl_api_key_here

# Production Configuration
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1

# Server Configuration
PORT=3000
HOSTNAME=0.0.0.0
```

### 4. Configure Networking

1. **Port Configuration**:
   - **Application Port**: `3000`
   - **Public Port**: Configure as needed (e.g., 80/443 for web access)

2. **Domain Configuration** (optional):
   - Set up your custom domain if desired
   - Configure SSL certificates (Coolify handles this automatically)

### 5. Deploy

1. **Click "Deploy"** in your Coolify application
2. **Monitor the build process** in the deployment logs
3. **Verify deployment** once the build completes successfully

## Build Process

The Dockerfile uses a multi-stage build process:

1. **Dependencies Stage**: Installs only production dependencies
2. **Builder Stage**: Builds the Next.js application with standalone output
3. **Runner Stage**: Creates the final production image with minimal footprint

## Expected Build Time

- **Initial build**: 3-5 minutes (depending on server specs)
- **Subsequent builds**: 1-3 minutes (with Docker layer caching)

## Health Checks

The application will be available on the configured port (default: 3000). You can verify deployment by:

1. Checking the application responds at `http://your-domain:port/`
2. Testing the API endpoints at `http://your-domain:port/api/check-env`
3. Monitoring application logs for any errors

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check that all required files are present in the repository
   - Verify Dockerfile syntax
   - Ensure package.json has all required dependencies

2. **Runtime Errors**:
   - Verify environment variables are set correctly
   - Check API keys are valid and have necessary permissions
   - Review application logs in Coolify dashboard

3. **API Key Issues**:
   - Ensure ANTHROPIC_API_KEY has access to Claude models
   - Verify FIRECRAWL_API_KEY has sufficient quota/credits
   - Check API keys don't have leading/trailing spaces

### Environment Variable Validation

The application includes built-in validation for required environment variables. If keys are missing, you'll see helpful error messages in the API responses.

### Logs and Monitoring

Monitor your application through:
- Coolify dashboard logs
- Application-level error reporting
- API endpoint health checks

## Production Optimizations

The deployment includes several production optimizations:

1. **Multi-stage Docker build** for smaller final image
2. **Standalone Next.js output** for optimal performance
3. **Non-root user** for security
4. **Proper file permissions** and ownership
5. **Telemetry disabled** for privacy and performance

## Security Notes

- Environment variables containing API keys are handled securely
- The application runs as a non-root user in the container
- All sensitive data should be stored in environment variables, not in the code

## Updates and Maintenance

To update your application:

1. Push changes to your GitHub repository
2. Coolify can be configured for automatic deployments on git push
3. Or manually trigger deployment from the Coolify dashboard

## Support

If you encounter issues:
1. Check the Coolify application logs
2. Verify all environment variables are correctly set
3. Ensure your API keys are valid and have necessary permissions
4. Review the application's built-in error messages for guidance 