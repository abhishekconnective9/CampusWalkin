# ✅ CampusWalkin - Complete Deployment Checklist

## Pre-Deployment Verification

### ✅ Local Setup Complete
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] MongoDB connected locally
- [ ] All features tested locally
- [ ] No console errors

### ✅ Code Ready
- [ ] All files committed
- [ ] No uncommitted changes
- [ ] All branches merged
- [ ] README updated
- [ ] Documentation complete

---

## Accounts & Services

### ✅ GitHub
- [ ] Repository created: abhishekconnective9/CampusWalkin
- [ ] Git initialized
- [ ] Remote URL set correctly
- [ ] Can push/pull successfully

### ✅ Vercel (Frontend)
- [ ] Account created
- [ ] Project created
- [ ] Repository connected
- [ ] Environment variables set:
  - [ ] NEXT_PUBLIC_API_URL
- [ ] Build settings correct:
  - [ ] Framework: Next.js
  - [ ] Build Command: npm run build
  - [ ] Output Directory: .next
- [ ] Domain assigned

### ✅ Render (Backend)
- [ ] Account created
- [ ] Web Service created
- [ ] Repository connected
- [ ] Environment variables set:
  - [ ] MONGODB_URI
  - [ ] JWT_SECRET
  - [ ] EMAIL_USER
  - [ ] EMAIL_PASSWORD
  - [ ] ADMIN_EMAIL
  - [ ] NODE_ENV: production
  - [ ] FRONTEND_URL
  - [ ] API_BASE_URL
- [ ] Build settings correct:
  - [ ] Runtime: Node
  - [ ] Build Command: npm install
  - [ ] Start Command: npm start
  - [ ] Root Directory: backend
- [ ] Domain assigned

### ✅ MongoDB Atlas (Database)
- [ ] Account created
- [ ] Cluster created
- [ ] Database user created
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string obtained
- [ ] TLS/SSL enabled

### ✅ Gmail (Email Service)
- [ ] Gmail account active
- [ ] App password generated
- [ ] Less secure apps enabled (if needed)
- [ ] Email addresses configured

---

## GitHub Secrets Configuration

### ✅ Add to GitHub
Repository → Settings → Secrets and variables → Actions

- [ ] VERCEL_TOKEN
  - Value: [From Vercel account settings]
  - [ ] Verified working

- [ ] VERCEL_ORG_ID
  - Value: [From Vercel project settings]
  - [ ] Verified correct

- [ ] VERCEL_PROJECT_ID
  - Value: [From Vercel project settings]
  - [ ] Verified correct

- [ ] RENDER_API_KEY
  - Value: [From Render account settings]
  - [ ] Verified working

- [ ] RENDER_SERVICE_ID
  - Value: [From Render web service settings]
  - [ ] Verified correct

- [ ] SLACK_WEBHOOK (Optional)
  - Value: [From Slack incoming webhooks]
  - [ ] Tested (optional)

---

## Files & Configuration

### ✅ GitHub Actions
- [ ] .github/workflows/deploy.yml created
- [ ] Workflow syntax valid
- [ ] All triggers configured
- [ ] All jobs defined
- [ ] Environment variables set in workflow

### ✅ Deployment Files
- [ ] vercel.json created
- [ ] render.json created
- [ ] .gitignore configured
- [ ] backend/.env.example created
- [ ] frontend/.env.local.example created

### ✅ Documentation
- [ ] DEPLOYMENT_SETUP.md complete
- [ ] CI_CD_GUIDE.md complete
- [ ] TROUBLESHOOTING.md complete
- [ ] README.md updated
- [ ] API documentation ready

---

## First Deployment

### ✅ Pre-Push
- [ ] All tests passing locally
- [ ] Build succeeds locally
- [ ] No console errors
- [ ] Database migrations done
- [ ] Seed data loaded (if needed)

### ✅ Push Code
```bash
git add .
git commit -m "Initial deployment setup"
git push origin main