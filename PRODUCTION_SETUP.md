# Environment Setup Guide

## 🎯 Quick Start

Your app can easily switch between **Local** and **Remote** Supabase by changing the configuration.

### 🏠 Local Development (with local Supabase)
```bash
npm run dev
# This automatically:
# 1. Switches to local Supabase config
# 2. Starts the Expo development server
```

### 🚀 Production (with remote Supabase)
```bash
npm run production:start
# This automatically:
# 1. Switches to remote Supabase config  
# 2. Starts the Expo development server
```

## 📁 Configuration Files

- **`app.json`** - Active configuration (automatically managed)
- **`app.local.json`** - Local Supabase configuration
- **`app.production.json`** - Remote Supabase configuration

## 🔄 Manual Switching

### Switch to Local Development:
```bash
npm run local:setup
npm run start
```

### Switch to Production:
```bash
npm run production:setup
npm run start
```

## ⚙️ Environment Configuration

### Local Supabase (Development)
- **URL**: `http://127.0.0.1:54321`
- **Anon Key**: Local development key
- **Database**: Local Docker container
- **Users**: Only visible locally

### Remote Supabase (Production)  
- **URL**: `https://eiadtgydyqytmjfdfrao.supabase.co`
- **Anon Key**: Your production key
- **Database**: Hosted on Supabase
- **Users**: Visible in Supabase dashboard

## 🛠️ Setup Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start local development |
| `npm run production:start` | Start with production config |
| `npm run local:setup` | Switch to local config only |
| `npm run production:setup` | Switch to production config only |
| `npm run supabase:start` | Start local Supabase |
| `npm run supabase:stop` | Stop local Supabase |

## 📊 How to Check Current Environment

When you start the app, check the console output:
- `🔗 Using LOCAL Supabase: http://127.0.0.1:54321` 
- `🔗 Using REMOTE Supabase: https://eiadtgydyqytmjfdfrao.supabase.co`

## 🔧 Updating Credentials

### For Remote Supabase:
1. Edit `app.production.json`
2. Update `supabaseUrl` and `supabaseAnonKey`
3. Run `npm run production:setup`

### For Local Supabase:
1. Edit `app.local.json` (usually no changes needed)
2. Run `npm run local:setup`

## 🚨 Important Notes

- **Users registered in LOCAL** won't appear in remote dashboard
- **Users registered in REMOTE** will appear in your Supabase dashboard
- Always check which environment you're in before testing
- Local Supabase requires Docker to be running

## 🐛 Troubleshooting

**Problem**: "Invalid URL" error
**Solution**: Check that you're using the correct configuration file

**Problem**: Users not appearing in dashboard  
**Solution**: Verify you're using remote Supabase (`npm run production:setup`)

**Problem**: Local Supabase not working
**Solution**: Make sure Docker is running and `npm run supabase:start` completed successfully
