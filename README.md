# 🚀 AI-Native Task Manager (Full-Stack & Cloud-Native)

This is a professional, cloud-native Task Management application that evolved from a local Kubernetes setup to a fully automated live production environment. It features an Intelligent AI Agent for natural language task processing and a modern microservices architecture.

---

## 🏗️ System Architecture
The application is divided into two main services:
1.  **Frontend:** Next.js (TypeScript) - A responsive UI for task management and AI chat.
2.  **Backend:** FastAPI (Python) - Handles business logic, database operations, and AI integration via Groq (Llama 3).

---

## ✨ Key Features
* **AI Agent Integration:** Powered by Groq to understand and automate task creation from natural language.
* **Microservices Architecture:** Decoupled frontend and backend for independent scaling.
* **CI/CD Automation:** Fully automated deployment using GitHub Actions.
* **Containerized Environment:** Optimized Docker images for consistent performance across environments.

---

## 🛣️ Project Phases

### 🔹 Phase 1 to 4: Local Development & Kubernetes
In the initial stages, the project was developed and orchestrated using:
* **Minikube:** Local Kubernetes cluster management.
* **kubectl:** Managing Pods, Deployments, and Services.
* **Infrastructure-as-Code:** Kubernetes manifests for automated local setup.

### 🔹 Phase 5: Cloud Deployment & CI/CD (Live)
The project is now live and accessible globally:
* **Live Backend:** Hosted on **Hugging Face Spaces** using a Docker-based deployment.
* **Live Frontend:** Deployed via **GitHub Pages** as a high-performance static export.
* **Automation:** GitHub Actions triggers a fresh build and deployment on every code push to the `main` branch.

---

