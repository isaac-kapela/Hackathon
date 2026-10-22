# 🎙️ Roteiro e Fala Oficial do Apresentador (Pitch Master — 56 Horas)

> **Projeto:** MicroLeiteMacroNegocios  
> **Slogan:** <span style="color: #dc2626; font-weight: 900;">Muu</span><span style="color: #000000; font-weight: 900;">ito Melhor</span>  
> **Evento:** XXVIII Semana da Computação DCC/UFJF & RERUM (Hackathon UFJF 2026 — 56 Horas)  
> **Tema 3:** Economia, Zootecnia e Qualidade do Leite  
> **Tempo Recomendado de Pitch:** 6 a 8 minutos  
> **Perfil do Apresentador:** Confiante, dinâmico, embasado e articulado, equilibrando o valor para o agronegócio e a excelência em Engenharia de Software / IA.

---

## ⏱️ Minutagem e Visão Geral da Apresentação

| Slide | Título / Tema | Tempo Sugerido | Objetivo do Slide |
| :---: | :--- | :---: | :--- |
| **1** | Capa Oficial & Identidade | 0:30 | Gancho de abertura, apresentação do time e do tema. |
| **2** | As 4 Dores Reais da Pecuária Leiteira | 1:00 | Criar empatia com a dor do produtor (descapitalização e perdas). |
| **3** | O Desafio do Hackathon & Filosofia com IA | 0:45 | Quebrar o mito da caixa preta vs. IA auditável. |
| **4** | Organização: Sadrey + Scrum em 56h | 0:45 | Explicar o método de engenharia de conhecimento e sprints. |
| **5** | Pair Programming com Google Gemini 2.5 Pro | 0:45 | Demonstrar a divisão de papéis Humano (Arquiteto) vs. IA (Scaffolding). |
| **6** | Esteira de Engenharia de Prompts | 0:45 | Mostrar o rigor técnico de prompts e rastreabilidade (`PROMPT_LOG.md`). |
| **7** | Casos Reais de Auditoria Humano-IA | 0:45 | Provar que a equipe auditou a IA (Embrapa Custopec, debounce, inputs). |
| **8** | Síntese das Regras: 4 Pilares do Agro | 0:45 | Explicar os pilares econômico, bioclimático, nutricional e sanitário. |
| **9** | Motor Determinístico XAI & MYCIN | 0:45 | Destacar a conformidade com as regras do hackathon e transparência. |
| **10** | Demonstração do Produto Entregue | 1:00 | Mostrar presets, simulações ao vivo, gráficos e laudo em PDF. |
| **11** | Comparativo de Mercado | 0:30 | Posicionar o produto contra o caderninho e ERPs legados. |
| **12** | Conclusão, Impacto & Call to Action | 0:30 | Fechamento memorável com o slogan *Muuito Melhor*. |

---

## 📜 Roteiro Slide a Slide com Fala Exata

---

### 🐮 Slide 1: Capa Oficial & Abertura
**⏱️ Tempo:** 0:00 – 0:30  
**🎯 Tom de Voz:** Entusiasmado, seguro e profissional.

> *"Boa noite, membros da banca examinadora, professores e colegas!*  
> *Somos a equipe do **MicroLeiteMacroNegocios** — uma solução concebida durante esta maratona de **56 horas** no Hackathon UFJF 2026 para revolucionar a tomada de decisão no **Tema 3: Economia, Zootecnia e Qualidade do Leite**.*  
> *O nosso propósito é claro: transformar o microprodutor de leite em um macronégocio sustentável, lucrativo e cientificamente gerido. Como gostamos de dizer: fazer a pecuária brasileira **Muu**ito Melhor!"*

---

### 🚨 Slide 2: O Problema Real da Fazenda (4 Gargalos Críticos)
**⏱️ Tempo:** 0:30 – 1:30  
**🎯 Tom de Voz:** Reflexivo e enfático.

> *"Para criar um sistema de alto impacto, começamos olhando para a realidade do campo. O produtor de leite no Brasil sangra dinheiro em quatro frentes silenciosas:*  
> 1. *Primeiro, a **Descapitalização Oculta**: ele olha apenas para o dinheiro que sobra no fim do mês (o COE), mas esquece da depreciação de máquinas e da remuneração da terra. Parece que dá lucro, mas a fazenda está consumindo o próprio patrimônio.*  
> 2. *Segundo, o **Estresse Térmico por Calor**: em dias quentes com ITU acima de 72, as vacas param de ruminar e perdem até 3,5 litros de leite por dia sem que o produtor perceba a causa.*  
> 3. *Terceiro, a **Acidose Ruminal (SARA)**: o excesso de ração concentrada sem volumoso suficiente gera acidose e desperdício de nitrogênio na urina.*  
> 4. *E quarto, as **Penalizações de Mastite (MAPA IN 76/77)**: CCS alta corta até 25 centavos por litro na indústria.*  
> *O produtor precisa de uma consultoria zootécnica de elite, 24 horas por dia, 100% auditável."*

---

### 🧠 Slide 3: O Desafio do Hackathon & Filosofia com IA
**⏱️ Tempo:** 1:30 – 2:15  
**🎯 Tom de Voz:** Técnico e propositivo.

> *"Em uma maratona de 56 horas, o caminho fácil seria jogar esses dados em um chatbot generativo. Mas no agronegócio e na medicina, **caixa preta é risco de falência**.*  
> *LLMs podem alucinar doses de ração ou confundir fórmulas de custos. Por isso, a nossa filosofia de IA foi clara: **usar Inteligência Artificial Agêntica de ponta (Google Gemini 2.5 Pro) no processo de desenvolvimento**, mas construir para o produtor um **Motor de Inferência Determinístico, Baseado em Regras Formais e Fatores de Certeza do modelo MYCIN**.*  
> *O resultado é zero alucinação em tempo de execução e 100% de explicabilidade."*

---

### 📐 Slide 4: Organização: Metodologia Sadrey + Scrum em 56 Horas
**⏱️ Tempo:** 2:15 – 3:00  
**🎯 Tom de Voz:** Estruturado e metodológico.

> *"Como nos organizamos para entregar um produto desse porte em 56 horas?*  
> *Unimos duas metodologias consagradas:*  
> *Na Engenharia do Conhecimento, seguimos rigorosamente as **5 etapas de Sadrey**: Identificação do problema, Aquisição do conhecimento científico junto à Embrapa e ao NRC, Conceituação em um catálogo ontológico de 33 variáveis, Formalização em 25 regras declarativas em JSON, e Validação prática com dados de fazendas reais.*  
> *Na Gestão de Software, aplicamos o **Scrum** em micro-sprints ágeis de 2 a 4 horas com checkpoints de integração contínua, garantindo que a cada ciclo tínhamos um incremento executável e testado."*

---

### 🤝 Slide 5: Pair Programming com Google Gemini 2.5 Pro
**⏱️ Tempo:** 3:00 – 3:45  
**🎯 Tom de Voz:** Inovador e colaborativo.

> *"A interação humano-IA foi um verdadeiro Pair Programming de alta performance:*  
> *Nós, humanos, assumimos o papel de **Arquitetos e Especialistas de Domínio**: definimos as premissas zootécnicas, auditamos os modelos matemáticos e exigimos usabilidade sem atritos.*  
> *O modelo **Google Gemini 2.5 Pro (via Antigravity Agentic AI)** assumiu o papel de **Acelerador de Engenharia**: estruturação de esquemas declarativos JSON, scaffolding do motor Forward Chaining, componentes reativos com Recharts e refatoração contínua de código.*  
> *Isso nos deu velocidade de maratona com o rigor de uma consultoria sênior."*

---

### ⚙️ Slide 6: Esteira de Engenharia de Prompts e Rastreabilidade
**⏱️ Tempo:** 3:45 – 4:30  
**🎯 Tom de Voz:** Preciso e documentado.

> *"Não fizemos prompts genéricos. Dividimos a esteira de prompts em microetapas encadeadas:*  
> *Prompts de elicitação conceitual, seguidos por prompts de formalização declarativa pura em JSON, prompts de implementação modular e prompts de auditoria cruzada.*  
> *Todo esse processo está 100% registrado e rastreável no arquivo `PROMPT_LOG.md` do repositório, garantindo total reprodutibilidade do projeto."*

---

### 🔍 Slide 7: Casos Reais de Auditoria e Refinamento
**⏱️ Tempo:** 4:30 – 5:15  
**🎯 Tom de Voz:** Crítico e seguro.

> *"E por que a auditoria humana foi indispensável? Vou citar três exemplos reais:*  
> 1. *Na primeira versão, a IA misturou o custo de oportunidade da terra dentro do Custo Operacional Total. A nossa auditoria corrigiu na hora para seguir fielmente o padrão **Embrapa Custopec**, separando COE (desembolso), COT (+ depreciação) e CT (+ remuneração do capital).*  
> 2. *Na usabilidade, o input travava com zeros à esquerda quando o usuário apagava o número. Implementamos um normalizador reativo para digitação limpa.*  
> 3. *Criamos um algoritmo com debounce de 150ms para auto-inferência em tempo real e regras de consistência biológica: se você tiver 2 vacas adultas, o sistema impede logicamente de colocar 10 em lactação."*

---

### 📊 Slide 8: Síntese das Regras: 4 Pilares do Agronegócio
**⏱️ Tempo:** 5:15 – 6:00  
**🎯 Tom de Voz:** Didático e abrangente.

> *"A nossa base especialista consolida 25 regras declarativas em 4 grandes pilares:*  
> *1. **Pilar Financeiro:** Alerta de descapitalização silenciosa e cálculo de ponto de equilíbrio.*  
> *2. **Pilar Bioclimático:** Fórmula de Thom para Índice de Temperatura e Umidade (ITU) e perdas calóricas.*  
> *3. **Pilar Nutricional:** Relação volumoso:concentrado para prevenção de acidose e dosagem de Nitrogênio Ureico no Leite (NUL).*  
> *4. **Pilar Sanitário:** Conformidade com Instruções Normativas MAPA 76 e 77 para bonificação por CCS, CBT e sólidos.*  
> *Tudo parametrizado com fontes da Embrapa, CEPEA/USP e NRC."*

---

### 🛡️ Slide 9: Motor Determinístico vs. Caixa Preta (XAI & MYCIN)
**⏱️ Tempo:** 6:00 – 6:45  
**🎯 Tom de Voz:** Técnico e convincente.

> *"Para cada diagnóstico gerado, o nosso Módulo de Explicabilidade (XAI) decompõe a inferência em linguagem natural:*  
> *O usuário clica e vê exatamente a premissa `SE ... ENTÃO ...`, quais variáveis bateram e qual o Fator de Certeza do modelo MYCIN, variando de -1.0 a +1.0.*  
> *O produtor não recebe uma ordem mágica; ele recebe uma trilha de auditoria pericial que pode levar ao seu banco ou ao seu cooperado."*

---

### 💻 Slide 10: O Produto Final Entregue
**⏱️ Tempo:** 6:45 – 7:30  
**🎯 Tom de Voz:** Prático e vendedor.

> *"O resultado de 56 horas de trabalho é uma plataforma web completa rodando 100% local:*  
> - *5 presets de fazendas reais para demonstração em 1 clique.*  
> - *Simulador interativo 'O que acontece se...'.*  
> - *Painel gráfico com decomposição Embrapa, curva de lactação e sensibilidade de preço.*  
> - *Cotações de mercado CEPEA e dados IBGE SIDRA.*  
> - *E emissão instantânea de Laudo Pericial em PDF formatado para o produtor."*

---

### 🏆 Slide 11: Comparativo de Mercado
**⏱️ Tempo:** 7:30 – 8:00  
**🎯 Tom de Voz:** Estratégico.

> *"Enquanto o caderninho é reativo e os ERPs rurais tradicionais cobram mensalidades caras apenas para emitir relatórios estáticos, o **MicroLeiteMacroNegocios** entrega diagnóstico prescritivo, motor especialista auditável e simulação econômica sem custo e sem dependência de nuvem."*

---

### 🌟 Slide 12: Conclusão & Demonstração ao Vivo
**⏱️ Tempo:** 8:00 – 8:30  
**🎯 Tom de Voz:** Inspirador e de fechamento.

> *"O MicroLeiteMacroNegocios prova que o casamento entre Sistemas Especialistas Determinísticos e a Engenharia Agêntica com IA é o futuro do software de missão crítica.*  
> *Convidamos a banca a testar os presets e simulações ao vivo agora mesmo.*  
> *Muito obrigado, e tenham certeza: com o MicroLeiteMacroNegocios, a gestão do leite fica **Muu**ito Melhor!"*

---

## 💡 Dicas de Postura e Respostas para Perguntas da Banca

1. **Se a banca perguntar: "Onde a IA foi usada no projeto?"**
   - *Resposta:* "A IA generativa (Google Gemini 2.5 Pro) foi usada no processo de engenharia de software e elicitação de conhecimento em pair programming. O sistema especialista em execução é 100% determinístico baseado em regras de produção e modelo MYCIN, atendendo estritamente ao regulamento do hackathon e garantindo explicabilidade total."
2. **Se a banca perguntar: "Como garantiram que os cálculos econômicos estão certos?"**
   - *Resposta:* "Adotamos a metodologia oficial Embrapa Custopec, dividindo os custos em COE (desembolso direto), COT (incluindo depreciações de máquinas e pró-labore familiar) e CT (adicionando a remuneração de oportunidade do capital e da terra)."
3. **Se a banca perguntar: "Como o sistema impede dados absurdos?"**
   - *Resposta:* "Implementamos guardrails de consistência zootécnica bidirecionais no formulário e no backend: o número de vacas em lactação nunca pode exceder o total de vacas adultas, porcentagens são limitadas a 0-100%, e escores corporais seguem a escala oficial de 1 a 5."