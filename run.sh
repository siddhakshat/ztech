#!/bin/bash
# Script to run the LeadOps application

echo "Installing dependencies..."
npm install

echo ""
echo "Starting development server..."
npm run dev

echo ""
echo "Application is running!"
echo "Open http://localhost:5173/ in your browser"