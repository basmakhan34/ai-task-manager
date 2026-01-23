#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# --- Configuration ---
# Set the URL of your Hugging Face Space Git repository here.
# Example: "https://huggingface.co/spaces/your-username/your-space-name"
HF_SPACE_REPO_URL="YOUR_HUGGING_FACE_SPACE_GIT_URL_HERE"

# --- Script ---

# Check if the Hugging Face repo URL has been set.
if [ "$HF_SPACE_REPO_URL" == "YOUR_HUGGING_FACE_SPACE_GIT_URL_HERE" ]; then
  echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  echo "!!! ERROR: Please edit this script and set your HF_SPACE_REPO_URL. !!!"
  echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  exit 1
fi

echo "Step 1: Staging all changes..."
git add .

# Commit the changes with a standard message.
# Use --amend if you want to add to the previous commit.
echo "Step 2: Committing changes..."
# Use a default commit message or allow passing one as an argument.
COMMIT_MESSAGE="${1:-Deploying to Hugging Face Spaces}"
git commit -m "$COMMIT_MESSAGE" || { echo "No changes to commit or commit failed. Continuing..."; }

# Check if the 'huggingface' remote already exists.
if git remote | grep -q '^huggingface$'; then
  echo "Step 3: 'huggingface' remote already exists. Setting URL..."
  git remote set-url huggingface "$HF_SPACE_REPO_URL"
else
  echo "Step 3: Adding 'huggingface' as a new remote..."
  git remote add huggingface "$HF_SPACE_REPO_URL"
fi

echo "Step 4: Pushing to Hugging Face..."
# Push the main branch to the Hugging Face remote.
# Use --force if you need to overwrite the history on the remote.
git push huggingface main

echo "----------------------------------------------------"
echo "✅ Deployment script finished!"
echo "Your app is being built on Hugging Face Spaces."
echo "You can check the build logs here: $HF_SPACE_REPO_URL/logs"
echo "----------------------------------------------------"

