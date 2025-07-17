#!/bin/bash

# Exit on any error
set -e

echo "Installing dependencies..."
npm install

echo "Running type check..."
npm run type-check

echo "Building the project..."
npm run build:netlify

echo "Build completed successfully!" 