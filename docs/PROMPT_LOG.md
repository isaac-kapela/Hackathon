# 📜 Registro Formal de Prompts e Evolução do Projeto (Prompt Log)

> **Projeto:** MicroLeiteMacroNegocios — Sistema Especialista Zootécnico & Econômico para Bovinocultura Leiteira  
> **Evento:** XXVIII Semana da Computação DCC/UFJF & RERUM (Hackathon UFJF 2026 — 56h) — **Tema 3: Economia, Zootecnia e Qualidade do Leite**  
> **Metodologia:** Engenharia do Conhecimento (Metodologia Sadrey / Ciclo de Vida de Sistemas Especialistas) + Scrum Ágil  
> **Modelo de IA Utilizado:** Google Gemini 2.5 Pro (Antigravity Agentic AI / DeepMind) para Pair Programming e Engenharia de Conhecimento  
> **Período de Desenvolvimento:** 20 e 21 de Outubro de 2026  

---

## 📌 Sumário Executivo do Processo
Este documento consolida o diário de bordo e a esteira de engenharia de prompts utilizada no desenvolvimento do sistema especialista. As solicitações brutas do time foram convertidas em especificações técnicas formais, organizadas por etapas metodológicas de ciclo de vida.

---

## 🧭 Fase 1: Elicitação de Requisitos e Aquisição de Conhecimento

### Registro 1.1 — Identificação de Fontes e Elicitação Embrapa
* **Data/Hora:** 2026-10-20 10:41:38
* **Entrada Original:** *"consulte as os dados da embrapa, sobre CanvasListaPasta vamos estudar isso e as regras de negocio"*
* **Tradução Técnica / Especificação:** Realizar levantamento e auditoria bibliográfica dos parâmetros zootécnicos e econômicos recomendados pela Embrapa Gado de Leite e Embrapa Pecuária Sudeste, mapeando os requisitos de domínio e variáveis de produção leiteira.
* **Ação Executada:** Levantamento das metodologias Custopec, formulações de Custo Operacional Efetivo (COE), Custo Operacional Total (COT) e índices zootécnicos fundamentais (dias em lactação, taxa de prenhez, CCS, CBT).

### Registro 1.2 — Busca por Fontes de Dados de Mercado e APIs
* **Data/Hora:** 2026-10-20 10:52:26 a 11:05:00
* **Entradas Originais:** 
  - *"onde encontro essas infos? tem alguma api?"*
  - *"dados zootecnicos de outras empresaas qualquer api que me de isso"*
  - *"mas esssas infos porcisam swer reais do mercado onde posso encontrar uma api publica grattuita sobre dados zootecnicos?"*
* **Tradução Técnica / Especificação:** Mapear APIs públicas e repositórios abertos de dados agropecuários (CEPEA/ESALQ, Scot Consultoria, IBGE Agro, dados abertos da Embrapa) para calibração de preços de leite por estado, insumos (milho/soja) e benchmarks regionais.
* **Ação Executada:** Estruturação de módulo de benchmarks de mercado com dados abertos históricos de CEPEA e Embrapa para comparação de fazendas.

### Registro 1.3 — Definição da Stack Tecnológica e Foco no Tema 3
* **Data/Hora:** 2026-10-20 10:58:35 a 11:15:55
* **Entradas Originais:** 
  - *"Fontes Open Source e Ferramentas como Ponto de Partida [...] Em JavaScript / Node.js [...] json-rules-engine [...] Custopec Embrapa [...] CEPEA"*
  - *"foque no tema 3"*
  - *"coloque dias de lactação tbm, pertos, qualidade do leite, tamanho do rebanho produção adiaria pesquise mais variaveis vai mais afudno e vamos usar react e node.js"*
* **Tradução Técnica / Especificação:** Fixar a arquitetura técnica em Node.js (backend) e React.js + Tailwind CSS (frontend), focando exclusivamente no **Tema 3 (Economia, Zootecnia e Qualidade do Leite)**. Expandir o escopo ontológico para cobrir DEL, IEP, CCS, CBT, percentual de vacas em lactação e indicadores reprodutivos.
* **Ação Executada:** Criação do modelo inicial de variáveis e regras com o motor de inferência determinístico em Node.js.

---

## 🏗️ Fase 2: Modelagem Ontológica e Arquitetura de Software

### Registro 2.1 — Mapeamento de Parâmetros e Variáveis de Domínio
* **Data/Hora:** 2026-10-20 12:48:12 a 12:49:42
* **Entradas Originais:** 
  - *"quais parametros vc achou?"*
  - *"liste todos"*
* **Tradução Técnica / Especificação:** Catalogar todas as variáveis numéricas, categóricas e booleanas do domínio pecuário, agrupadas por eixos: Zootécnico, Bioclimático/Ambiência, Sanitário, Nutricional, Operacional e Financeiro.
* **Ação Executada:** Estruturação formal do catálogo `variables.json` com identificadores únicos, tipos, unidades, faixas de normalidade e descrições técnicas.

### Registro 2.2 — Definição Arquitetural e Separação de Responsabilidades
* **Data/Hora:** 2026-10-20 14:30:49 a 2026-10-21 00:07:12
* **Entradas Originais:** 
  - *"ja definou arquitetura do projeto?"*
  - *"faça o projeto front e bacxk end separe bem os escopos"*
* **Tradução Técnica / Especificação:** Estabelecer a arquitetura em camadas desacopladas:
  - **Backend:** Express API, Motor de Inferência Determinístico (*Forward Chaining*), Módulo de Fatores de Certeza (*Certainty Factors* de Shortliffe/Buchanan), Módulo de Justificação/Explicação (*SE → ENTÃO*) e Calculadora de Custos Embrapa (COE, COT, CT, Margens, Lucro Real).
  - **Frontend:** SPA React (Vite, Tailwind CSS, Lucide Icons, Recharts), Dashboard de Métricas, Simulador Interativo, Gráficos de Sensibilidade e Gerador de Laudos Técnicos.
* **Ação Executada:** Scaffolding completo do monorepo (`backend/` e `frontend/`) com rotas REST e componentes modulares.

---

## 🧪 Fase 3: Implementação do Motor Especialista e Validação Inicial

### Registro 3.1 — Documentação de Execução e Primeiro Deploy Local
* **Data/Hora:** 2026-10-21 09:24:14 a 10:27:24
* **Entradas Originais:** 
  - *"faça a documentação de como rodasr e faça o commit"*
  - *"rode a aplicação"*
  - *Logs de resolução de porta EADDRINUSE e instalação de dependências npm*
* **Tradução Técnica / Especificação:** Criar script unificado de inicialização (`start.sh`), documentação de setup (`README.md`), tratar conflitos de porta de desenvolvimento e validar o pipeline de build.
* **Ação Executada:** Resolução de dependências, script de inicialização concomitante e atualização de documentação.

### Registro 3.2 — Correção de Renderização e Estilização Inicial
* **Data/Hora:** 2026-10-21 10:29:15 a 10:44:13
* **Entradas Originais:** 
  - *"a tela esta em branco n aparece os elemtos"*
  - *"deixe a interface mais amigavele bonita"*
  - *"coloque tbm graficos de evoulão de lucro, etc graficos"*
* **Tradução Técnica / Especificação:** Corrigir erros de importação/renderização React, aplicar design system profissional baseado em Tailwind CSS, e integrar componentes de gráficos analíticos (Recharts) com projeções de lucro, sensibilidade a preço e decomposição de custos.
* **Ação Executada:** Correção do ciclo de vida dos componentes, estilização de cards com sombras suaves e inclusão de gráficos interativos.

---

## 🔬 Fase 4: Auditoria de Regras, Correção Financeira e UX

### Registro 4.1 — Auditoria de Cálculos de Lucro e Usabilidade de Formulário
* **Data/Hora:** 2026-10-21 21:37:52
* **Entrada Original:** *"Os gráficos estão sendo afetados pelo código, não mostrando um lucro real, apenas a margem liquida mensal, provavelmente porque o COT nao esta chegando na funçao, ( o código tem um || 1 ) em que nao chega na alternativa anterior ao 1. Uma coisa que incomodou tambem é que quando voce apaga um numero a ser inserido, ele é trocado para zero, porem quando voce substitui ele nao apaga o zero automaticamente, talvez ele pudesse ficar apenas vazio, e o sistema considerar um insert vazio como 0. no parametros da fazenda tem dois botoes avaliar e reavaliar rebanho e custos que aparentemente fazem a mesma coisa, talvez fosse legal manter apenas um. Mercado e benchmarks esta uma sessao vazia, ou nao intuitiva, o que ela faz?"*
* **Tradução Técnica / Especificação:**
  1. Corrigir cálculo de Lucro Real Econômico no `costCalculator.js` e nas projeções do dashboard para considerar adequadamente o Custo Operacional Total (COT) e Remuneração de Capital (CT).
  2. Implementar controle de inputs com suporte a valor vazio (`""`) para digitação natural sem zeros à esquerda indesejados, convertendo dinamicamente para zero na inferência.
  3. Unificar os botões redundantes de execução.
  4. Redesenhar a seção de Mercado e Benchmarks com visualização clara de comparação da fazenda com as médias nacionais CEPEA/Embrapa e impacto de bonificação por qualidade.
* **Ação Executada:** Refatoração completa da calculadora de custos, do manipulador de inputs e do painel comparativo de benchmarks.

### Registro 4.2 — Expansão do Conhecimento Especialista (Bioclimatologia e Zootecnia)
* **Data/Hora:** 2026-10-21 21:45:18
* **Entrada Original:** *"melhore ainterface não erre, fça uma interface mais amigavel e moderna e mais intutiva pense em mais paramentros e mais regras no maximo de coisa que afetam as vacas"*
* **Tradução Técnica / Especificação:**
  - Expandir a base de conhecimento para 33 variáveis e 25 regras especializadas cobrindo todos os fatores críticos:
    - **Índice de Temperatura e Umidade (ITU - Fórmula de Thom/NRC)** e Estresse Térmico Bovino;
    - **Acidose Ruminal Subaguda (SARA)** e relação volumoso:concentrado;
    - **Eficiência de Nitrogênio Ruminal (NUL - Nitrogênio Ureico no Leite)**;
    - **Escore de Condição Corporal (ECC)** e balanço energético negativo pós-parto;
    - **Problemas Podais / Claudicação / Laminite** e descarte involuntário;
    - **Atraso na Idade ao Primeiro Parto (IPP)** e custo de recria de novilhas;
    - **Mortalidade de Bezerros** e biosseguridade;
    - **Produtividade da Mão de Obra (L/homem/dia)** e eficiência operacional.
* **Ação Executada:** Atualização das bases `variables.json` e `rules.json`, inclusão dos novos cálculos no backend e criação de 5 cenários realistas de teste (*Fazenda Modelo*, *Estresse Térmico & Acidose*, *Crise Sanitária*, *Descapitalização*, *Familiar a Pasto*).

### Registro 4.3 — Interatividade em Tempo Real e Simulações "O Que Acontece Se..."
* **Data/Hora:** 2026-10-21 21:59:34
* **Entrada Original:** *"deixe mais intuitivo"*
* **Tradução Técnica / Especificação:**
  - Implementar inferência automática e reativa com debounce de 150ms (o diagnóstico atualiza sem cliques manuais).
  - Adicionar botões de simulação rápida de impacto (*Resfriamento com ITU < 72*, *Bonificação CCS < 200k*, *Dieta Balanceada*, *83% Vacas em Lactação*).
  - Incluir crachás com faixas ideais da Embrapa em cada campo do formulário.
  - Implementar card de "Plano de Ação Imediato Priorizado" com as ações corretivas mais urgentes no topo dos resultados.
* **Ação Executada:** Refatoração de `DiagnosticoPage.jsx`, validação da compilação e deploy das atualizações.

---

## 📊 Matriz de Rastreabilidade

| Fase | Demanda do Usuário | Componente Afetado | Resultado de Engenharia |
| :--- | :--- | :--- | :--- |
| **Elicitação** | Elicitação Embrapa & CEPEA | `backend/src/knowledge/` | Base ontológica de 33 variáveis e 25 regras de produção. |
| **Modelagem** | Motor determinístico & Fatores de Certeza | `backend/src/engine/` | Algoritmo *Forward Chaining* com propagação MYCIN e trilha de auditoria. |
| **Cálculo** | Fórmulas Embrapa & Thom/NRC | `backend/src/services/` | Cálculo formal de ITU, COE, COT, CT, Margem Líquida e Lucro Real. |
| **Apresentação** | Interface intuitiva e responsiva | `frontend/src/pages/` | Dashboard analítico, módulo de explicação visual e laudos exportáveis. |
| **Interatividade** | UX em tempo real & Simulações | `frontend/src/components/` | Auto-inferência debounced, botões de cenário "E se..." e Plano de Ação Imediato. |
