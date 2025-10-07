# 🌟 AMSA Website  

![Project Banner](https://www.amsa.org/wp-content/uploads/2020/10/amsa-logo-main-trimmed.png)  
  
<p align="center">
  <img src="https://img.shields.io/badge/Project-AMSA%20Website-blue?style=for-the-badge&logo=github" />
  <img src="https://img.shields.io/badge/Frontend-Next.js-black?style=for-the-badge&logo=nextdotjs" />
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge&logo=node.js" />
  <img src="https://img.shields.io/badge/Deployed%20On-AWS%20EC2-orange?style=for-the-badge&logo=amazonaws" />
  <img src="https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-blue?style=for-the-badge&logo=githubactions" />
  <img src="https://img.shields.io/badge/Process%20Manager-PM2-yellow?style=for-the-badge&logo=pm2" />
  <img src="https://img.shields.io/badge/Reverse%20Proxy-Nginx-green?style=for-the-badge&logo=nginx" />
  <img src="https://img.shields.io/badge/Infrastructure-AWS%20CloudFormation-red?style=for-the-badge&logo=amazonaws" />
  <img src="https://img.shields.io/badge/Monitoring-AWS%20CloudWatch-purple?style=for-the-badge&logo=amazoncloudwatch" />
  <img src="https://img.shields.io/badge/Notifications-AWS%20SNS-orange?style=for-the-badge&logo=amazonaws" />
</p>


**AMSA** is a full-stack web application designed to manage and showcase AMSA activities, events, and member engagement.  
It uses a modern React frontend, a Node.js backend, automated CI/CD pipeline, and secure AWS-based deployment.  

---

## 🚀 Features  

- ⚡ **Fast Frontend**: React & Typescript for optimized builds and performance  
- 🔧 **Backend API**: Node.js + Express for business logic and APIs  
- 🛠️ **CI/CD Pipeline**: Automated builds and deployments via GitHub Actions   
- 📊 **Monitoring & Alerts**: Server health and error tracking via AWS CloudWatch and Sns
- ☁️ **AWS Hosting**: Frontend + Backend deployed on AWS EC2  
- 🔐 **Secure by Default**: HTTPS + SSL certificates  

---

## 🗂 Project Structure  

```
amsa-website/
├── CloudFormation/        # AWS infrastructure templates
├── frontend/               # React + Typescript frontend
├── backend/                # Node.js + Express backend
├── .github/workflows/      # CI/CD pipeline
└── README.md               # Documentation
```

---

## 🛠️ Tech Stack  

| Component   | Technology                     |
|-------------|--------------------------------|
| Frontend    | React,Typescript               |
| Backend     | Node.js, Express               |
| Hosting     | AWS EC2                        |
| CDN         | AWS CloudFront                 |
| CI/CD       | GitHub Actions                 |
| Monitoring  | AWS CloudWatch / Dashboards    |
| Security    | HTTPS / SSL Certificates       |

---

## 🏗️ Architecture Overview  

- **GitHub Actions** → Builds, tests, and deploys frontend + backend  
- **EC2 Instances** → Hosts frontend and backend servers   
- **Monitoring** → Tracks uptime, CPU, memory, network, and errors  

---

## 📦 Deployment Process  

### 1️⃣ CloudFormation (IaC)  
- Spins up EC2 instances for frontend & backend  
- Configures networking, ports, and security groups  
- Sets up Monitoring through Cloudwatch & SNS.  

### 2️⃣ CI/CD (GitHub Actions)  
- Triggered on `push` to `main`  
- **Frontend:** Install → Test → Build → Deploy to EC2  
- **Backend:** Install → Test → Deploy with `pm2`  

### 3️⃣ Monitoring & Alerts  
- CloudWatch dashboards for performance  
- Alerts via Email / Slack  

### 4️⃣ Manual Deployment (first time setup)  

**Frontend**
```bash
cd frontend
npm install
npm run build
npm run export(for out folder)

# Copy build to EC2
# Prepare frontend directory
mkdir -p /var/www/amsa-fe
```

**Backend**
```bash
name: Build Backend
      working-directory: backend
      run: npm install
# Copy backend to EC2
scp -r ./ ubuntu@<BACKEND_EC2_IP>:/home/ubuntu/backend

# SSH into EC2 and start
cd /home/ubuntu/BE-Amsa
          git pull origin main
          npm install
          pm2 restart amsa-backend || pm2 start server.js --name amsa-backend --watch
          pm2 save
```
---

## 🌐 Demo URLs  

- Frontend (HTTPS): `https://<FRONTEND_EC2_IP>`  
- Backend API (HTTPS): `https://<FRONTEND_EC2_IP>/api/contact`  
 

---

## 💻 Quick Setup Guide  

```bash
# Clone repo
git clone https://github.com/<your-username>/amsa-website.git
cd amsa-website

# Frontend
cd frontend
npm install
npm run dev      # Development
npm run build    # Production
npm run export   #For out folder

# Backend
cd ../backend
npm install
npm start        # Development
pm2 start server.js --name backend  # Production
```

---
| Repository                         | Description                                                                                                                                                           | Link                                                                    |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| 🖥️ **Frontend (FE-Amsa)** | React + TypeScript-based single-page application with modern UI for AMSA’s website. It handles user interaction, event display, and API integration with the backend. | [🔗 View Repository](https://github.com/prathamesh0413/FE-Amsa) |
| ⚙️ **Backend (BE-Amsa)**   | Node.js + Express REST API providing backend logic, email services (contact form), and database integration. Deployed with PM2 on AWS EC2.                            | [🔗 View Repository](https://github.com/prathamesh0413/BE-Amsa) |


## 🏷️ Badges  

![React](https://img.shields.io/badge/Frontend-React-blue)  
![Vite](https://img.shields.io/badge/Build-Vite-yellow)  
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)  
![AWS](https://img.shields.io/badge/Cloud-AWS-orange)  
![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-black)  

---

## 📄 License  

This project is licensed under the **MIT License**  
