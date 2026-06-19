# Al Noor Attar - Deployment Guide

This project is a high-performance, responsive multi-page static experience, engineered with standard HTML5, CSS3, and Vanilla JavaScript. It is optimized to achieve perfect scores on Google Lighthouse.

## 1. Local Testing
To spin up a local development web server, invoke the default NPM scripts inside your terminal workspace:

```bash
# Install dependencies (Vite handles the multi-page server bundler)
npm install

# Boot development server
npm run dev
```
Navigate your browser to `http://localhost:3000` to review real-time styling updates and interaction toggles.

## 2. Deploying to Netlify
Since the repository contains a pre-configured `netlify.toml` file at the root, deployment on Netlify is automatic.

### Step-by-Step Dashboard Setup:
1. Connect your GitHub/GitLab account to **Netlify**.
2. Select the `Al Noor Attar` repository.
3. Apply the following compilation parameters:
    *   **Build Command**: `npm run build`
    *   **Publish Directory**: `dist`
4. Click **Deploy Site**. Netlify will bundle and host your multi-page app with high-performance global CDN edge locations.

## 3. Custom Server Deployments (Express)
In full-stack cloud containers, build the static output then start the server:

```bash
# Compile HTML / CSS / JS artifacts
npm run build

# Start production server
npm run start
```
By bundling resources into single cacheable assets inside `dist/`, the startup and load times remain well within sub-second metrics.
