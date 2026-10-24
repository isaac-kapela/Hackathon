# 🐮 MicroLeiteMacroNegocios: Sistema Especialista em Pecuária Leiteira 🥇 PRIMEIRO COLOCADO NA HACKATON RERUM 

> **Hackathon UFJF 2026 (Maratona de 56 Horas)** — XXVIII Semana da Computação DCC/UFJF & RERUM Engenharia de Sistemas  
> **Tema 3:** Análise Econômica, Zootécnica e Qualidade do Leite  
> **Metodologias:** Engenharia do Conhecimento (Sadrey) + Gestão Ágil de Software (Scrum)  
> **Modelo de IA Utilizado no Desenvolvimento:** Google Gemini 2.5 Pro (Antigravity Agentic AI) para Elicitação de Conhecimento e Pair Programming  
> **Instituições de Referência Técnica:** Embrapa Gado de Leite (Custopec), MAPA (IN 76/77), CEPEA/ESALQ-USP, NRC e Thom (1959).

---

## 🎯 Objetivo e Visão Geral

O **MicroLeiteMacroNegocios** é um **Sistema Especialista Baseado em Regras e Conhecimento Especializado** desenvolvido para auxiliar produtores rurais, consultores agronômicos e cooperativas na tomada de decisão estratégica na pecuária de leite brasileira.

O sistema integra:
1. **Indicadores Zootécnicos e Reprodutivos:** Dias em Lactação (DEL), Intervalo entre Partos (IEP), Taxa de Prenhez, % Vacas em Lactação e Eficiência Alimentar do Concentrado.
2. **Bioclimatologia e Estresse Térmico:** Cálculo do Índice de Temperatura e Umidade (ITU) com estimativa de perda volumétrica diária de leite.
3. **Qualidade do Leite e Bonificação (MAPA IN 76/77):** Contagem de Células Somáticas (CCS), Contagem Bacteriana Total (CBT), Gordura, Proteína e penalizações industriais.
4. **Custos Operacionais e Metodologia Embrapa Custopec:** Custo Operacional Efetivo (COE), Custo Operacional Total (COT), Custo Total (CT), Margem Bruta, Margem Líquida, Lucro Real Econômico e Alerta de Descapitalização Silenciosa.
5. **Cotações de Mercado & Relação de Troca:** Preço do milho, farelo de soja e relação de troca milho:leite via CEPEA/ESALQ e histórico de captação IBGE SIDRA.

---

## 📚 Documentação e Apresentação do Projeto

| Documento | Localização / Link | Descrição |
| :--- | :--- | :--- |
| **Deck Master de Apresentação (12 Slides)** | [`docs/apresentacao.html`](file:///home/oia100739/Documentos/Hackathon/docs/apresentacao.html) | Apresentação visual interativa unificada com exportação para PDF em 1 clique |
| **Documento Técnico de Especificação** | [`docs/DOCUMENTO_TECNICO.md`](file:///home/oia100739/Documentos/Hackathon/docs/DOCUMENTO_TECNICO.md) | Formulação formal do problema, equações Embrapa/Thom, arquitetura e engenharia com IA |
| **Apresentação Técnica e Executiva** | [`docs/APRESENTACAO_PROJETO.md`](file:///home/oia100739/Documentos/Hackathon/docs/APRESENTACAO_PROJETO.md) | Roteiro executivo completo, comparativo de mercado e roadmap |
| **Log de Engenharia de Prompts** | [`docs/PROMPT_LOG.md`](file:///home/oia100739/Documentos/Hackathon/docs/PROMPT_LOG.md) | Registro de prompts e esteira de pair programming humano-IA com Gemini 2.5 Pro |

---

## ⚖️ Conformidade com as Regras Oficiais do Hackathon

| Critério Obrigatório | Atendimento no Projeto |
| :--- | :--- |
| **Não usar LLM no sistema especialista** | Motor determinístico de inferência (*Forward Chaining*) baseado em 25 regras formais ($R01 \dots R25$) e Fatores de Certeza ($CF$) do MYCIN. Nenhuma decisão ou cálculo em tempo de execução depende de IA generativa. |
| **Execução 100% Localhost** | Todo o sistema roda localmente em Node.js (porta `5000`) e React/Vite (porta `3000`), sem dependências externas obrigatórias. |
| **Módulo de Explicação Interativo ("Por quê?")** | Trilha de auditoria detalhada (*Audit Trail*) mostrando as premissas avaliadas, os valores da memória de trabalho e a recomendação técnica fundamentada da Embrapa/MAPA. |
| **Fatores de Certeza ($CF \in [-1.0, +1.0]$)** | Cálculo formal de combinação de evidências do modelo MYCIN e prioridades de regras (50 a 100). |

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
* **Node.js** (versão 18.x ou superior)
* **npm** (versão 9.x ou superior)
* Navegador Web moderno (Chrome, Firefox, Edge)

---

### Opção 1: Inicialização Rápida (Script Único)

Na raiz do projeto, execute o script de inicialização automatizada:

```bash
chmod +x start.sh
./start.sh
```

O script irá:
1. Instalar as dependências do backend e do frontend (caso necessário).
2. Iniciar o servidor de API Node.js em `http://localhost:5000`.
3. Iniciar a aplicação React (Vite) em `http://localhost:3000`.

Abra o seu navegador em: **[http://localhost:3000](http://localhost:3000)**

---

### Opção 2: Inicialização Manual (Passo a Passo)

Caso prefira rodar os serviços em terminais separados:

#### 1. Iniciar o Backend
```bash
cd backend
npm install
node src/server.js
```
> O backend iniciará na porta **`http://localhost:5000`**.

#### 2. Iniciar o Frontend
Em outro terminal:
```bash
cd frontend
npm install
npm run dev
```
> O frontend iniciará na porta **`http://localhost:3000`**.

---

## 🧪 Como Executar a Bateria de Testes

O projeto inclui uma suíte de testes automatizados para validar a inferência determinística, a combinação dos fatores de certeza ($CF$) e a ativação das regras Embrapa/MAPA:

```bash
cd backend
node test/engine.test.js
```

**Resultado esperado:**
```text
--- INICIANDO TESTES DO MOTOR DE INFERÊNCIA ---
[TESTE 1] Fazenda com Mastite (CCS > 500k) e CBT Alta (> 100k): PASSOU
[TESTE 2] Fazenda Modelo de Alta Eficiência: PASSOU
--- TODOS OS TESTES EXECUTADOS COM SUCESSO ---
```

---

## 🏛️ Arquitetura do Sistema

```
hackaton/
├── backend/                             # API REST & Motor de Inferência (Node.js)
│   ├── src/
│   │   ├── engine/                      # Motor Especialista (Forward-Chaining + MYCIN CF)
│   │   │   └── InferenceEngine.js
│   │   ├── knowledge/                   # Base de Conhecimento Declarativa (JSON)
│   │   │   ├── rules.json               # 25 Regras de Produção (Embrapa / MAPA / Thom)
│   │   │   └── variables.json           # Dicionário de 33 variáveis zootécnicas, climáticas e financeiras
│   │   ├── services/                    # Lógica de Negócio & Custos
│   │   │   ├── costCalculator.js        # Fórmulas de COE, COT, CT, DEL, Conversão
│   │   │   └── marketService.js         # API IBGE SIDRA e CEPEA
│   │   ├── controllers/                 # Controladores MVC
│   │   ├── routes/                      # Rotas da API
│   │   ├── validators/                  # Validação de integridade de dados
│   │   └── server.js                    # Ponto de entrada do backend
│   └── test/
│       └── engine.test.js               # Testes unitários do motor
│
├── frontend/                            # Interface do Usuário (React + Tailwind + Vite)
│   ├── src/
│   │   ├── services/                    # Cliente HTTP (api.js)
│   │   ├── components/
│   │   │   ├── CertaintyFactorGauge.jsx # Medidor visual tri-color do CF
│   │   │   ├── ExplanationModule.jsx    # Módulo de Explicação ("Por quê?")
│   │   │   ├── KpiCard.jsx              # Cards reutilizáveis de métricas
│   │   │   ├── WorkingMemoryInspector.jsx # Inspecionador de fatos gerados
│   │   │   ├── ReportExportModal.jsx    # Emissão e impressão de Laudo Técnico
│   │   │   └── Header.jsx               # Navegação
│   │   └── pages/
│   │       ├── DiagnosticoPage.jsx      # Tela principal de simulação e diagnóstico
│   │       ├── BaseConhecimentoPage.jsx # Visualizador transparente de regras e variáveis
│   │       └── MercadoPage.jsx          # Cotações CEPEA e dados IBGE SIDRA
│   └── vite.config.js
│
├── start.sh                             # Script de inicialização automática
└── README.md                            # Documentação técnica do projeto
```

---

## 📡 Endpoints da API REST

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/api/diagnostico` | Processa os dados da fazenda, calcula indicadores Embrapa e executa o motor de inferência. |
| `GET` | `/api/conhecimento/regras` | Retorna as 25 regras formais da base de conhecimento. |
| `GET` | `/api/conhecimento/variaveis` | Retorna o dicionário de 33 variáveis com tipos, faixas e descrições. |
| `GET` | `/api/mercado/benchmarks` | Retorna as cotações CEPEA e série histórica IBGE SIDRA (Tabela 1086). |
| `GET` | `/api/presets` | Retorna cenários de demonstração pré-configurados. |

---

## 📊 Cenários Pré-configurados para Demonstração

No topo da página de **Diagnóstico**, você pode alternar rapidamente entre 3 cenários reais:
1. **Fazenda Modelo (Alta Eficiência e Bonificação):** Rebanho com DEL ideal (160d), CCS baixa (180k), CBT baixa (35k), alta eficiência de ração e margem líquida positiva.
2. **Fazenda com Crise Sanitária (Mastite & CBT Alta):** CCS de 650k e CBT de 220k disparando alertas sanitários, penalização de preço e cálculo de perda de síntese no úbere.
3. **Fazenda em Risco de Descapitalização (Ração Cara):** Milho em alta ($>32\text{ L/saca}$), DEL avançado (220d), IEP longo (15,2 meses) e corrosão patrimonial ($\text{COT} > \text{Receita}$).

---

## 📄 Emissão de Laudo Técnico
Ao concluir o diagnóstico, clique no botão **"Gerar Laudo"** para:
* Visualizar o laudo técnico formatado.
* **Imprimir / Salvar em PDF** formatado para o produtor rural.
* **Exportar em JSON** com a memória de trabalho e todas as regras disparadas.
