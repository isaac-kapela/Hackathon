#!/usr/bin/env bash
# Script para iniciar backend e frontend simultaneamente em localhost

echo "================================================================="
echo "  INICIANDO SISTEMA ESPECIALISTA EM PECUÁRIA LEITEIRA"
echo "  Hackathon UFJF 2026 - RERUM Engenharia de Sistemas"
echo "================================================================="

# Inicia backend na porta 5000
echo "[1/2] Iniciando Backend (Node.js API)..."
cd "$(dirname "$0")/backend" && npm start &
BACKEND_PID=$!

# Aguarda 1 segundo
sleep 1

# Inicia frontend na porta 3000
echo "[2/2] Iniciando Frontend (Vite React)..."
cd "$(dirname "$0")/frontend" && npm run dev &
FRONTEND_PID=$!

echo ""
echo " Sistema rodando com sucesso em LOCALHOST:"
echo " - Frontend (Interface): http://localhost:3000"
echo " - Backend (API REST):   http://localhost:5000"
echo ""
echo "Pressione Ctrl+C para encerrar."

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null" EXIT
wait
