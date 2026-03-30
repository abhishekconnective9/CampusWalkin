# 🚀 CampusWalkin - Automated Deployment Setup

## Overview

This guide will help you set up automatic deployment of CampusWalkin to:
- **Frontend:** Vercel (React Next.js)
- **Backend:** Render (Node.js Express)
- **Database:** MongoDB Atlas (Cloud)

Everything will deploy automatically when you push to GitHub! ✨

---

## 📋 Prerequisites

Before starting, ensure you have:

### Accounts Created (Free Tier):
1. ✅ **GitHub Account** - https://github.com
2. ✅ **Vercel Account** - https://vercel.com (sign up with GitHub)
3. ✅ **Render Account** - https://render.com (sign up with GitHub)
4. ✅ **MongoDB Atlas Account** - https://mongodb.com/cloud/atlas
5. ✅ **Gmail Account** - For email notifications

---

## 🔧 STEP 1: Setup MongoDB Atlas

### 1.1 Create MongoDB Cluster

1. Go to: https://www.mongodb.com/cloud/atlas
2. Login/Signup with email
3. Click "Create" → Select "M0 Free"
4. Cloud Provider: AWS
5. Region: ap-south-1 (India) or your preference
6. Click "Create Deployment"
7. Wait 2-3 minutes for cluster creation

### 1.2 Create Database User

1. Go to "Database Access"
2. Click "Add New Database User"
3. Enter username: `campuswalkin_admin`
4. Generate strong password (save this!)
5. Select "Built-in Role" → "Atlas Admin"
6. Click "Add User"

### 1.3 Add Network Access

1. Go to "Network Access"
2. Click "Add IP Address"
3. Select "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.4 Get Connection String

1. Go to "Clusters" → Click "Connect"
2. Select "Drivers"
3. Copy connection string
4. Replace `<password>` with your password
5. Replace `<cluster>` with your cluster name

**Example:**