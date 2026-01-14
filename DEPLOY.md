# Deploying to Cloudflare Pages with D1 Database

## Prerequisites
- GitHub account with this repo pushed
- Cloudflare account (free tier works)
- Wrangler CLI installed: `npm install -g wrangler`

## Step 1: Create D1 Database

```bash
# Login to Cloudflare
wrangler login

# Create the database
wrangler d1 create bourbon-collection
```

This will output a database ID. Copy it and update `wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "bourbon-collection"
database_id = "YOUR-DATABASE-ID-HERE"  # Replace this!
```

## Step 2: Initialize the Database

```bash
# Run the schema to create tables and insert default data
wrangler d1 execute bourbon-collection --remote --file=./schema.sql
```

## Step 3: Connect GitHub to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages
2. Click "Create a project" → "Connect to Git"
3. Select your GitHub repo
4. Configure build settings:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

## Step 4: Add D1 Binding

1. In Cloudflare Pages dashboard, go to your project
2. Settings → Functions → D1 database bindings
3. Add binding:
   - **Variable name**: `DB`
   - **D1 database**: Select `bourbon-collection`

## Step 5: Deploy

Push to GitHub and Cloudflare will auto-deploy!

```bash
git add .
git commit -m "Initial deploy"
git push origin main
```

## Local Development with D1

For local dev with the database:

```bash
# Create local D1 database
wrangler d1 execute bourbon-collection --local --file=./schema.sql

# Run with Wrangler (includes Functions)
npm run build && wrangler pages dev dist
```

Or just run `npm run dev` - it will fallback to localStorage when the API isn't available.

## Useful Commands

```bash
# View database contents
wrangler d1 execute bourbon-collection --remote --command="SELECT * FROM bourbons"

# Reset to defaults (via API)
curl -X POST https://your-site.pages.dev/api/reset

# Backup database
wrangler d1 export bourbon-collection --remote --output=backup.sql
```
