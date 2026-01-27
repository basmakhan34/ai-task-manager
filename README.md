---
title: AI-Powered Cloud Task Manager
sdk: docker
docker_compose_file: docker-compose.yml
app_port: 3000
---

# 🚀 AI-Native Todo App - Phase 4 (Full-Stack Kubernetes)

This is a professional, cloud-native Task Management application. It leverages a modern microservices architecture, managed by Kubernetes, and features an Intelligent AI Agent for natural language task processing.

## ✨ Key Features
- **AI Agent Integration:** Powered by Groq (Llama 3) to understand and automate task creation.
- **Kubernetes Orchestration:** Fully containerized services managed via Pods, Deployments, and Services.
- **Microservices Architecture:** Decoupled Frontend (Next.js) and Backend (FastAPI) for scalability.
- **Automated Infrastructure:** Infrastructure-as-Code approach using Kubernetes manifests.

---

## 🏗️ System Architecture


---

## 🛠️ Installation & Deployment

### 1. Prerequisites
- **Minikube** (Local Kubernetes Cluster)
- **Docker** (Containerization)
- **kubectl** (Kubernetes CLI)

### 2. Environment Setup
Start your local cluster and point your terminal to Minikube's Docker daemon:
```bash
minikube start
eval $(minikube docker-env)
