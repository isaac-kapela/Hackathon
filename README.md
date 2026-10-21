# RERUM AgroExpert — Sistema Especialista para Pecuária Leiteira
### Hackathon UFJF 2026 • XXVIII Semana da Computação DCC/UFJF & RERUM Engenharia de Sistemas

> **Tema 3:** Análise Econômica e Financeira com Dados Zootécnicos, Qualidade do Leite e Custos de Insumos.

---

## 🎯 Visão Geral do Projeto

O **RERUM AgroExpert** é um sistema especialista determinístico desenvolvido para apoiar produtores de leite, agrônomos e veterinários na tomada de decisão técnico-econômica. 

O sistema integra:
1. **Zootecnia & Reprodução:** Dias em Lactação (DEL), Intervalo entre Partos (IEP), Taxa de Prenhez, % de Vacas em Lactação e Eficiência Alimentar (L de leite/kg de ração).
2. **Qualidade do Leite (MAPA IN 76/77):** Contagem de Células Somáticas (CCS), Contagem Bacteriana Total (CBT), Gordura e Proteína com cálculo dinâmico de bonificação/penalização no preço por litro.
3. **Custos Operacionais Embrapa:** Metodologia oficial de Custo Operacional Efetivo (COE), Custo Operacional Total (COT), Custo Total (CT) e Ponto de Equilíbrio.
4. **Cotações de Mercado Reais:** Ingestão de séries da API oficial do **IBGE (Pesquisa Trimestral do Leite - Tabela 1086)** e indicadores de commodities **CEPEA/ESALQ-USP** (Milho, Farelo de Soja e Leite).
5. **Módulo de Explicação Auditável:** Responde com total transparência **"Por que?"** e **"Como o sistema chegou a isso?"**, apresentando o traço de inferência das regras disparadas, condições satisfeitas e referências bibliográficas.

---

## 🏗️ Arquitetura da Solução

Conforme as diretrizes obrigatórias da RERUM, **a IA/LLM não atua como motor de inferência**. A decisão sai de uma base de conhecimento explícita e regras auditáveis.

```
┌────────────────────────────────────────────────────────┐
│             Interface Web (React + Tailwind)           │
│    • Painel de Simulação & Presets de Demonstração     │
│    • Régua de Fator de Certeza (CF: -1.0 a +1.0)       │
│    • Módulo de Explicação Interativo ("Como chegou?")  │
└───────────────────────────┬────────────────────────────┘
                            │ Requisição REST
                            ▼
┌────────────────────────────────────────────────────────┐
│               Backend REST API (Node.js)               │
│                                                        │
│  ┌────────────────────────┐    ┌────────────────────┐  │
│  │ Base de Conhecimento   │    │ Metodologia Custo  │  │
│  │ • rules.json (R01..R12)│    │ Embrapa (COE/COT)  │  │
│  │ • variables.json       │    │ • costCalculator.js│  │
│  └───────────┬────────────┘    └─────────┬──────────┘  │
│              │                           │             │
│              ▼                           ▼             │
│  ┌──────────────────────────────────────────────────┐  │
│  │         Motor de Inferência Determinístico       │  │
│  │  • Pattern Matching (Avaliação de Premissas)     │  │
│  │  • Resolução de Conflitos por Prioridade         │  │
│  │  • Combinação de Fatores de Certeza (MYCIN CF)   │  │
│  │  • Geração de Traço Auditável de Explicação      │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

---

## 🚀 Como Executar em LOCALHOST

### Requisitos:
* **Node.js** v18+ instalado.

### Inicialização com 1 Comando:
Na pasta raiz do projeto, execute:

```bash
./start.sh
```

Ou inicie manualmente:
```bash
# 1. Backend (Terminal 1)
cd backend
npm install
npm start
# -> Rodando em http://localhost:5000

# 2. Frontend (Terminal 2)
cd frontend
npm install
npm run dev
# -> Rodando em http://localhost:3000
```

Abra seu navegador em: **`http://localhost:3000`**

---

## 🧪 Casos de Demonstração para a Banca

O sistema possui botões de **Cenários Pré-configurados (Presets)** para demonstrar em segundos o comportamento do motor:

1. **Fazenda Modelo (Alta Eficiência & Bonificação):**
   * CCS baixa (180k), CBT baixa (35k), DEL 160 dias, Margem Líquida alta (> R$ 0,35/L).
   * **Resultado do Motor:** Dispara `R11` (Bonificação Plena) e `R12` (Alta Eficiência Zootécnica). Status: **SAUDÁVEL**.

2. **Fazenda com Crise Sanitária (Mastite & CBT Alta):**
   * CCS crítica (650k céls/mL), CBT crítica (220k UFC/mL).
   * **Resultado do Motor:** Dispara `R03` (Mastite Subclínica) e `R04` (Falha de Resfriamento) com penalização financeira e alerta de perda oculta de síntese de leite. Status: **CRÍTICO**.

3. **Fazenda em Risco de Descapitalização (Milho Caro & DEL Atrasado):**
   * DEL elevado (220 dias), IEP longo (15,2 meses), poucas vacas produzindo (64%) e saca de milho a R$ 82,00.
   * **Resultado do Motor:** Dispara `R02` (Descapitalização COT), `R05` (DEL Atrasado), `R06` (Excesso de Vacas Secas) e `R08` (Relação de Troca Milho Desfavorável). Status: **ALERTA**.

---

## 📚 Referências Metodológicas

* **Embrapa Gado de Leite:** Metodologia de Custo de Produção do Leite (COE/COT/CT) e Sistema Custopec.
* **Ministério da Agricultura e Pecuária (MAPA):** Instruções Normativas IN 76/77 (Padrões de Identidade e Qualidade do Leite Cru).
* **CEPEA / ESALQ-USP:** Indicadores de Mercado Agropecuário de Milho, Soja e Leite ao Produtor.
* **IBGE:** Pesquisa Trimestral do Leite (SIDRA - Tabela 1086).
