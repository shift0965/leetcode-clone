#!/bin/bash

# Docker services management script

case "$1" in
  "services")
    echo "🚀 Starting production services (mysql, redis, socket, worker, express)..."
    docker compose up -d mysql redis socket worker express
    echo "✅ Services started:"
    echo "   📦 MySQL Database (port 3306)"
    echo "   🔴 Redis Cache (port 6379)"
    echo "   🔌 Socket Server (port 3001)"
    echo "   ⚙️  Worker Server (port 3002)"
    echo "   🌐 Express Production Server (ports 80, 443, 3000)"
    ;;

  "dev")
    echo "🔧 Starting development mode..."
    echo "🚀 Starting backend services first..."
    docker compose up -d mysql redis socket worker
    echo "🚀 Starting frontend and backend development servers..."
    docker compose up frontend-dev backend-dev
    ;;

  *)
    echo "🐳 Docker Services Manager"
    echo ""
    echo "Usage: ./docker-scripts.sh [command]"
    echo ""
    echo "Commands:"
    echo "  services  - Start production services (mysql, redis, socket, worker, express)"
    echo "  dev       - Start development mode (services + frontend-dev + backend-dev)"
    echo "  stop      - Stop all services"
    echo "  logs      - Show logs for all services"
    echo "  logs [service] - Show logs for specific service"
    echo ""
    echo "Examples:"
    echo "  ./docker-scripts.sh services"
    echo "  ./docker-scripts.sh dev"
    echo "  ./docker-scripts.sh logs backend-dev"
    echo "  ./docker-scripts.sh stop"
    ;;
esac