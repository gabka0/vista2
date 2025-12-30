# TiDB Cloud Migration Guide

## ✅ Completed Steps

1. ✅ Updated `prisma/schema.prisma` to use MySQL provider (TiDB compatible)
2. ✅ Fixed all hardcoded JWT_SECRET references to use environment variables
3. ✅ Fixed hardcoded email credentials in `alerts/sendemail.js`
4. ✅ Regenerated Prisma client for MySQL

## 📋 Next Steps to Complete Migration

### Step 1: Get TiDB Cloud Connection String

1. Go to [TiDB Cloud Dashboard](https://tidbcloud.com)
2. Navigate to your cluster
3. Click **"Connect"** button
4. Copy the **Connection String** (it will look like):
   ```
   mysql://<username>:<password>@<host>:<port>/<database>?ssl-mode=REQUIRED
   ```

### Step 2: Create `.env` File

Create a `.env` file in the root directory with the following content:

```env
# TiDB Cloud MySQL Database Connection
# Paste your connection string from TiDB Cloud here
DATABASE_URL="mysql://YOUR_USERNAME:YOUR_PASSWORD@YOUR_HOST:YOUR_PORT/YOUR_DATABASE?ssl-mode=REQUIRED"

# JWT Secret for token signing
# Generate a secure random string (e.g., run: openssl rand -base64 32)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Email Configuration for Alerts
# For Gmail, use an App Password (not your regular password)
# Generate at: https://myaccount.google.com/apppasswords
EMAIL="your-email@gmail.com"
EMAIL_PASSWORD="your-gmail-app-password"
```

**Important:** Replace all placeholder values with your actual credentials!

### Step 3: Push Schema to TiDB Cloud

Once your `.env` file is configured, run:

```bash
npx prisma db push
```

This will create all tables in your TiDB Cloud database.

### Step 4: Verify Connection

Test the connection by running:

```bash
npm run dev
```

If everything is configured correctly, the app should start without database errors.

### Step 5: Seed Initial Data (Optional)

If you have seed scripts, you can run them to populate initial data:

```bash
# Example: Fetch coins data
node fetchcoins/fetchcoins.js
```

## 🔍 Troubleshooting

### Connection Issues

- **SSL Required**: Make sure your `DATABASE_URL` includes `?ssl-mode=REQUIRED`
- **Firewall**: Check TiDB Cloud firewall settings to allow your IP address
- **Credentials**: Verify username, password, host, and database name are correct

### Prisma Errors

- If you see "Unknown database" error, make sure the database name in the connection string matches an existing database in TiDB Cloud
- Run `npx prisma generate` again if you see client errors

### Environment Variables Not Loading

- Make sure `.env` file is in the root directory (same level as `package.json`)
- Restart your development server after creating/updating `.env`
- Check that `.env` is not committed to git (it's already in `.gitignore`)

## 📝 Notes

- TiDB Cloud is MySQL-compatible, so all your existing MySQL queries will work
- The `?` placeholder syntax in your raw SQL queries is compatible with TiDB
- Make sure to use SSL connection as required by TiDB Cloud

## 🚀 Deployment

When deploying to production:

1. Set environment variables in your hosting platform (Vercel, Railway, etc.)
2. Make sure `DATABASE_URL` points to your TiDB Cloud instance
3. Set a strong `JWT_SECRET` (never use the default!)
4. Configure email credentials for alerts

---

**Migration Status**: Code changes complete ✅ | Database setup pending ⏳

