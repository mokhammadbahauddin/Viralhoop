# ViralLoop - Deployment & Setup Guide

This guide covers how to set up ViralLoop for local development and prepare it for production deployment.

## 1. Prerequisites

Before you begin, ensure you have the following installed on your machine:

*   **Node.js** (v18 or higher)
*   **Wasp CLI** (v0.14.0 or higher) - [Installation Guide](https://wasp-lang.dev/docs/installation)
    ```bash
    curl -sSL https://get.wasp-lang.dev/installer.sh | sh
    ```
*   **Docker** (Optional for local dev with SQLite, Required for local Postgres or deployment)

## 2. Local Development Setup

### A. Clone and Install
1.  Navigate to the project directory:
    ```bash
    cd template/app
    ```
    *(Note: In your local environment, this might be just `cd viralloop`)*

### B. Environment Variables
1.  Copy the example environment file:
    ```bash
    cp .env.server.example .env.server
    ```
2.  Open `.env.server` and fill in the required keys (See **Section 3: Manual Configuration** below).

### C. Database Setup
1.  The project defaults to **SQLite** for local development (`file:./dev.db`).
2.  Run the migration to set up the schema:
    ```bash
    wasp db migrate-dev
    ```

### D. Run the App
1.  Start the development server:
    ```bash
    wasp start
    ```
2.  The app will be available at `http://localhost:3000`.

## 3. Manual Configuration (Required Keys)

You need to obtain API keys from external services to make the features work.

### **Google Gemini (AI Engine)**
*   **Required for:** Generating viral content.
*   **Get Key:** [Google AI Studio](https://aistudio.google.com/app/apikey)
*   **Set in `.env.server`:**
    ```env
    GEMINI_API_KEY=your_key_here
    ```

### **Stripe (Payments)**
*   **Required for:** Subscriptions and Credits.
*   **Get Keys:** [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
*   **Set in `.env.server`:**
    ```env
    STRIPE_KEY=sk_test_...
    STRIPE_WEBHOOK_SECRET=whsec_...
    # Product IDs from your Stripe Product Catalog
    PAYMENT_PLAN_HOBBY_PRICE_ID=price_...
    PAYMENT_PLAN_PRO_PRICE_ID=price_...
    PAYMENT_PLAN_CREDITS_10_PRICE_ID=price_...
    ```
*   **Webhook Setup:** To test payments locally, use the Stripe CLI to forward webhooks to `http://localhost:3001/payments-webhook`.

### **AWS S3 (File Assets) - Optional**
*   **Required for:** Uploading brand assets in the Workspace.
*   **Set in `.env.server`:**
    ```env
    AWS_S3_IAM_ACCESS_KEY=...
    AWS_S3_IAM_SECRET_KEY=...
    AWS_S3_BUCKET_NAME=...
    AWS_S3_REGION=...
    ```
*   *Note: If these are missing, file uploads may fail or rely on local mocks depending on the Open SaaS template configuration.*

## 4. Production Deployment

### A. Switch Database to PostgreSQL
SQLite is not supported for production builds.
1.  Open `schema.prisma`.
2.  Change the datasource provider:
    ```prisma
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }
    ```
3.  Update `.env.server` with your production Postgres connection string (e.g., from Supabase, Neon, or Railway).

### B. Build the App
Run the build command to generate the Dockerfile and production assets:
```bash
wasp build
```
This creates a `.wasp/out` directory containing the standalone application.

### C. Deploy
You can deploy the contents of `.wasp/out` to any hosting provider that supports Docker (Railway, Fly.io, AWS, DigitalOcean).

**Example (Railway/Fly.io):**
Use the generated `Dockerfile` in the root of `.wasp/out`.

```bash
cd .wasp/out
fly launch # or railway up
```

## 5. Deployment Checklist
- [ ] **Database**: Migrated to PostgreSQL.
- [ ] **Env Vars**: All secrets (Gemini, Stripe, Database URL) added to your hosting provider's environment variables.
- [ ] **Webhooks**: Stripe Webhook URL updated to your production domain (e.g., `https://viralloop.com/payments-webhook`).
- [ ] **Auth**: Google/GitHub OAuth callback URLs updated to your production domain.
