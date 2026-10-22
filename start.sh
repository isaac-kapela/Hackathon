#!/usr/bin/env bash
# =============================================================================
#  BovInSight / PecuáriaExpert - Script de Inicialização Rápida & Unificada
#  Hackathon UFJF 2026 - Tema 3: Economia, Zootecnia e Qualidade do Leite
# =============================================================================

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_PORT=5000
FRONTEND_PORT=3000

echo ""
echo "================================================================="
echo "   🐮 BovInSight — Sistema Especialista Zootécnico & Econômico"
echo "   XXVIII Semana da Computação DCC/UFJF & RERUM • Tema 3"
echo "================================================================="
echo ""

# 1. Liberar portas caso estejam ocupadas por processos anteriores
free_port() {
  local port=$1
  local pid=$(lsof -ti tcp:$port 2>/dev/null || true)
  if [ -n "$pid" ]; then
    echo "⚠️  Porta $port em uso pelo processo $pid. Liberando..."
    kill -9 $pid 2>/dev/null || true
    sleep 0.5
  fi
}

echo "🔍 Verificando portas e ambiente..."
free_port $BACKEND_PORT
free_port $FRONTEND_PORT

# 2. Verificar e instalar dependências se necessário
if [ ! -d "$DIR/backend/node_modules" ]; then
  echo "📦 Instalando dependências do backend..."
  cd "$DIR/backend" && npm install --silent
fi

if [ ! -d "$DIR/frontend/node_modules" ]; then
  echo "📦 Instalando dependências do frontend..."
  cd "$DIR/frontend" && npm install --silent
fi

# 3. Garantir apresentações e assets copiados para a pasta pública
mkdir -p "$DIR/frontend/public"
cp "$DIR/docs/apresentacao.html" "$DIR/frontend/public/apresentacao.html" 2>/dev/null || true
cp "$DIR/docs/apresentacao_processo_ia.html" "$DIR/frontend/public/apresentacao_processo_ia.html" 2>/dev/null || true
cp "$DIR/docs/logo.jpeg" "$DIR/frontend/public/logo.jpeg" 2>/dev/null || true

# 4. Iniciar Backend (Node.js API)
echo "🚀 [1/2] Iniciando Backend API (Porta $BACKEND_PORT)..."
cd "$DIR/backend" && npm start > /dev/null 2>&1 &
BACKEND_PID=$!

# Aguarda 0.8s para subida da API
sleep 0.8

# 5. Iniciar Frontend (Vite React)
echo "💻 [2/2] Iniciando Frontend React (Porta $FRONTEND_PORT)..."
cd "$DIR/frontend" && npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!

echo ""
echo "================================================================="
echo "   ✅ SISTEMA PRONTO E RODANDO EM LOCALHOST!"
echo "================================================================="
echo "   📱 Interface Principal:        http://localhost:$FRONTEND_PORT"
echo "   🎯 Pitch do Produto (Modelo 1): http://localhost:$FRONTEND_PORT/apresentacao.html"
echo "   🤖 Processo & IA (Modelo 2):   http://localhost:$FRONTEND_PORT/apresentacao_processo_ia.html"
echo "   ⚙️  API REST Backend:           http://localhost:$BACKEND_PORT/api/health"
echo "================================================================="
echo ""
echo "💡 Dica: Pressione Ctrl+C para encerrar todos os serviços."
echo ""

# Cleanup ao sair com Ctrl+C
cleanup() {
  echo ""
  echo "🛑 Encerrando serviços BovInSight..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null || true
  free_port $BACKEND_PORT
  free_port $FRONTEND_PORT
  echo "✨ Serviços finalizados com sucesso."
  exit 0
}

trap cleanup SIGINT SIGTERM EXIT
wait
