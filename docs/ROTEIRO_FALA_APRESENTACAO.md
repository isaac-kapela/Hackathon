# 🎙️ Roteiro e Fala Oficial do Apresentador (Pitch Master — 13 Minutos)

> **Projeto:** MicroLeiteMacroNegocios  
> **Slogan:** <span style="color: #dc2626; font-weight: 900;">Muu</span><span style="color: #000000; font-weight: 900;">ito Melhor</span>  
> **Evento:** XXVIII Semana da Computação DCC/UFJF & RERUM (Hackathon UFJF 2026 — Maratona de 56 Horas)  
> **Tema 3:** Economia, Zootecnia e Qualidade do Leite  
> **Tempo Total do Pitch:** **13 minutos** (13:00)  
> **Perfil do Apresentador:** Confiante, dinâmico, técnico e envolvente. O objetivo é demonstrar com maestria o valor para o agronegócio, o rigor científico da Engenharia do Conhecimento (Sadrey) e a excelência da esteira de Inteligência Artificial com Google Gemini 2.5 Pro.

---

## ⏱️ Grade de Minutagem Oficial (13 Minutos)

| Slide | Título / Tema | Minutagem | Tempo | Objetivo Central da Fala |
| :---: | :--- | :---: | :---: | :--- |
| **1** | Capa Oficial, Identidade & Propósito | 0:00 – 0:45 | 45s | Gancho de abertura impactante, apresentação da equipe e do slogan. |
| **2** | Onde o Produtor de Leite Mais Perde Dinheiro? | 0:45 – 2:00 | 1m15s | Gerar profunda empatia com os prejuízos invisíveis da pecuária de leite. |
| **3** | Como Evitar a Alucinação? | 2:00 – 3:00 | 1m00s | Justificar a escolha: IA Agêntica no Dev vs. Motor Determinístico no Prod. |
| **4** | Metodologia Sadrey (Especialista) + Scrum (Agilidade) | 3:00 – 4:15 | 1m15s | Explicar o rigor metodológico das 5 etapas e a gestão ágil em 5 sprints. |
| **5** | Divisão de Papéis | 4:15 – 5:30 | 1m15s | Detalhar a simbiose: Humano (Arquiteto) vs. IA (Scaffolding & Testes). |
| **6** | Decompondo o Problema em Prompts Cirúrgicos | 5:30 – 6:30 | 1m00s | Expor a decomposição de prompts e o registro no `PROMPT_LOG.md`. |
| **7** | Auditoria e Refinamento em Ação | 6:30 – 7:45 | 1m15s | Provar a auditoria ativa: Custopec, guardrails biológicos e debounce. |
| **8** | As Regras do Sistema | 7:45 – 9:00 | 1m15s | Demonstrar solidez zootécnica: Thom ITU, NRC, Custopec e MAPA IN 76/77. |
| **9** | Por Que Motor Determinístico e Não Caixa Preta? | 9:00 – 10:00 | 1m00s | Apresentar o encadeamento para frente, cálculo de CF e explicabilidade. |
| **10** | O Produto Final | 10:00 – 11:30 | 1m30s | Narrar a simulação ao vivo da Fazenda Crítica para Fazenda Eficiente. |
| **11** | Comparativo | 11:30 – 12:15 | 45s | Comparar com o caderninho e ERPs legados; viabilidade de adoção. |
| **12** | O Futuro da Pecuária de Leite Começa Aqui | 12:15 – 13:00 | 45s | Fechamento memorável, apelo ao agronegócio e transição para perguntas. |

---

## 📜 Roteiro Slide a Slide com Fala Detalhada e Gestual

---

### 🐮 Slide 1: Capa Oficial, Identidade & Propósito
- **⏱️ Minutagem:** 0:00 – 0:45 (45 segundos)
- **🎯 Postura & Tom de Voz:** Cabeça erguida, sorriso empático, voz firme e entusiasmada.

> *"Boa noite, ilustres membros da banca examinadora, professores e colegas de maratona!*  
> *Nós somos a equipe responsável pelo desenvolvimento do **MicroLeiteMacroNegocios** — uma plataforma especialista concebida, validada e entregue ao longo de **56 horas ininterruptas** de maratona no Hackathon UFJF 2026, respondendo ao desafio do **Tema 3: Economia, Zootecnia e Qualidade do Leite**.*  
> *O nosso propósito nasceu de uma constatação simples, porém urgente: a maioria esmagadora dos produtores de leite do Brasil trabalha de sol a sol sem saber se está tendo lucro real ou consumindo o próprio patrimônio. Criamos um verdadeiro copiloto zootécnico e financeiro para transformar o microprodutor familiar em um macronégocio de alta eficiência.*  
> *E como o nosso lema sintetiza: fazer a pecuária leiteira **Muu**ito Melhor!"*

---

### 🚨 Slide 2: A Anatomia da Crise no Campo (As 4 Dores Reais)
- **⏱️ Minutagem:** 0:45 – 2:00 (1 minuto e 15 segundos)
- **🎯 Postura & Tom de Voz:** Expressão séria, ritmo pausado, usando as mãos para pontuar cada uma das 4 dores.

> *"Para construir uma ferramenta transformadora, não começamos pelo código; começamos pela dor do produtor rural. Analisando a pecuária nacional, identificamos quatro gargalos críticos que drenam silenciosamente o caixa da fazenda:*  
> *1. **A Descapitalização Oculta:** O produtor calcula seu custo olhando apenas o saldo da conta corrente — o Custo Operacional Efetivo. Ele esquece que o trator está desgastando, as cercas apodrecendo e a terra tem custo de oportunidade. Ele tem a ilusão de lucro enquanto sua infraestrutura se desfaz.*  
> *2. **O Estresse Térmico Bioclimático:** No calor do sudeste brasileiro, quando o Índice de Temperatura e Umidade (o ITU) supera 72, as vacas entram em hipertermia, diminuem o consumo de matéria seca e perdem entre 1,5 e 3,5 litros de leite por dia sem que o produtor entenda o porquê.*  
> *3. **O Desequilíbrio Nutricional e a Acidose (SARA):** Quando o custo de ração ultrapassa 60% do desembolso total ou a proporção concentrado/volumoso desregula o rúmen, a fazenda perde dinheiro duas vezes: pagando insumo caro e excretando nitrogênio na urina.*  
> *4. **As Penalizações de Mastite (Instruções Normativas MAPA 76 e 77):** Uma Contagem de Células Somáticas (CCS) acima de 500 mil faz o laticínio confiscar até 25 centavos por litro no pagamento mensal.*  
> *O produtor precisa de uma consultoria agronômica pericial contínua, acessível e instantânea."*

---

### 🧠 Slide 3: Como Evitar a Alucinação?
- **⏱️ Minutagem:** 2:00 – 3:00 (1 minuto)
- **🎯 Postura & Tom de Voz:** Questionador e resolutivo.

> *"Diante desse desafio em um hackathon de 56 horas, qual seria o caminho mais tentador? Chamar a API de um modelo de linguagem genérico e pedir para ele 'dar uma dica' ao produtor.*  
> *No entanto, na zootecnia de precisão, **respostas de caixa preta com probabilidade estocástica são inadmissíveis**. Se um LLM alucinar uma dosagem de concentrado ou errar a depreciação de uma ordenhadeira, o produtor quebra.*  
> *Por isso, a nossa equipe estabeleceu uma arquitetura de duas frentes:*  
> *Utilizamos **Inteligência Artificial Agêntica de última geração — o Google Gemini 2.5 Pro via Antigravity** — como aceleradora extrema da nossa esteira de desenvolvimento, mas o produto final entregue ao produtor é um **Motor Especialista Determinístico, baseado em Regras de Produção Formais e Fatores de Certeza do Modelo MYCIN de Stanford**.*  
> *Garantimos 100% de explicabilidade, zero alucinações e total conformidade com o edital do hackathon."*

---

### 📐 Slide 4: Engenharia do Conhecimento: Sadrey + Scrum em 56 Horas
- **⏱️ Minutagem:** 3:00 – 4:15 (1 minuto e 15 segundos)
- **🎯 Postura & Tom de Voz:** Metódico, demonstrando maestria de engenharia de software.

> *"Como conseguimos modelar todo esse ecossistema em 56 horas sem perder o rigor científico? Combinando a Engenharia do Conhecimento de **Sadrey** com a agilidade do **Scrum**.*  
> *Seguimos fielmente o ciclo de 5 fases de Sadrey para sistemas especialistas:*  
> - *Fase 1 - **Identificação:** Mapeamos os nós críticos de decisão da pecuária de leite.*  
> - *Fase 2 - **Aquisição:** Elicitamos o conhecimento empírico e científico dos manuais da Embrapa Gado de Leite, Custopec, equações do NRC e normativas do MAPA.*  
> - *Fase 3 - **Conceituação:** Estruturamos uma ontologia de 33 variáveis normalizadas com tipos, unidades e limites zootécnicos.*  
> - *Fase 4 - **Formalização:** Convertemos a literatura em 25 regras declarativas `SE-ENTÃO` puras em JSON com pesos de certeza.*  
> - *Fase 5 - **Validação:** Submetemos o motor a baterias de testes com dados de fazendas reais e casos limites.*  
> *Tudo isso orquestrado em 5 Sprints Scrum de 8 a 12 horas, gerando incrementos de código auditados a cada checkpoint."*

---

### 🤝 Slide 5: Divisão de Papéis
- **⏱️ Minutagem:** 4:15 – 5:30 (1 minuto e 15 segundos)
- **🎯 Postura & Tom de Voz:** Técnico, valorizando a parceria humano-máquina.

> *"A dinâmica com a inteligência artificial não foi de automação cega, mas de um **Pair Programming simbiótico e disciplinado**:*  
> *Nós, humanos, atuamos como **Arquitetos e Especialistas de Domínio**: definimos as fórmulas zootécnicas, estruturamos os requisitos de negócio, auditamos a lógica matemática e desenhamos a experiência de uso.*  
> *O modelo **Google Gemini 2.5 Pro** atuou como **Engenheiro de Implementação e Scaffolding**: gerando a estrutura tipada dos dados em JSON, implementando o algoritmo de Forward Chaining com MYCIN, montando a biblioteca de componentes reativos com Tailwind e Recharts, e escrevendo suítes de testes automatizados.*  
> *Essa divisão clara permitiu que a equipe focasse 80% do tempo na qualidade das regras e na usabilidade do produtor, enquanto a IA reduzia a zero o atrito de codificação repetitiva."*

---

### ⚙️ Slide 6: Decompondo o Problema em Prompts Cirúrgicos
- **⏱️ Minutagem:** 5:30 – 6:30 (1 minuto)
- **🎯 Postura & Tom de Voz:** Preciso, apontando para a documentação técnica.

> *"Para que a IA trabalhasse com precisão cirúrgica, desenvolvemos um pipeline de prompts modulares em 4 camadas:*  
> *1. **Prompts de Elicitação:** 'Consolide as tabelas de bonificação da IN 76/77 em faixas discretas de CCS e CBT.'*  
> *2. **Prompts de Estruturação Declarativa:** 'Converta a fórmula de Thom para estresse térmico em uma regra puramente declarativa em JSON com Fator de Certeza 0.85.'*  
> *3. **Prompts de Implementação Modular:** 'Crie a função de combinação MYCIN garantindo que Fatores de Certeza acumulados permaneçam estritamente no intervalo [-1, +1].'*  
> *4. **Prompts de Refinamento e Testes:** 'Gere casos de teste para verificar fazenda com CCS 600k e ITU 79.'*  
> *Toda essa esteira de prompts e respostas está documentada no arquivo `PROMPT_LOG.md` no repositório, garantindo rastreabilidade total do projeto."*

---

### 🔍 Slide 7: Auditoria e Refinamento em Ação
- **⏱️ Minutagem:** 6:30 – 7:45 (1 minuto e 15 segundos)
- **🎯 Postura & Tom de Voz:** Analítico, ressaltando o espírito crítico da equipe.

> *"A intervenção humana foi fundamental para impedir desvios conceituais. Destaquemos três intervenções decisivas:*  
> *Primeiro: Na modelagem contábil inicial, a IA agrupou o custo de oportunidade da terra dentro do Custo Operacional Total. Intervimos imediatamente e readequamos o modelo ao rigor da **Embrapa Custopec**, garantindo a tríade clássica: COE (desembolso de caixa), COT (+ depreciações e pró-labore) e CT (+ remuneração do capital).*  
> *Segundo: Nos inputs numéricos, identificamos um problema de usabilidade em que o zero inicial travava a digitação em dispositivos móveis. Refatoramos a lógica de parsing para garantir edição fluida e reativa com debounce de 150ms.*  
> *Terceiro: Criamos **Guardrails de Consistência Biológica**: o sistema rejeita aberrações lógicas, como declarar 10 vacas em lactação em um rebanho de 2 vacas totais, escores corporais fora da escala de 1 a 5 ou porcentagens fora de 0 a 100%. A inteligência do sistema protege o produtor de seus próprios erros de digitação."*

---

### 📊 Slide 8: As Regras do Sistema
- **⏱️ Minutagem:** 7:45 – 9:00 (1 minuto e 15 segundos)
- **🎯 Postura & Tom de Voz:** Didático, transmitindo autoridade agropecuária.

> *"A nossa base de conhecimento reúne 25 regras especialistas divididas em 4 pilares científicos inegociáveis:*  
> *1. **Pilar Bioclimático:** Implementamos a equação de Thom: $ITU = 0{,}8 \cdot T + \frac{UR}{100} \cdot (T - 14{,}4) + 46{,}4$. Quando o ITU atinge a faixa de alerta (72 a 78) ou perigo (>79), o sistema calcula a perda diária estimada em litros por vaca via NRC.*  
> *2. **Pilar Nutricional:** Avaliamos a relação volumoso:concentrado (ideal 60:40) e o Nitrogênio Ureico no Leite (NUL, ideal 10 a 14 mg/dL), diagnosticando acidose ruminal subclínica ou desperdício proteico.*  
> *3. **Pilar Sanitário:** Classificação conforme MAPA IN 76/77 — bonificando CCS < 250k e CBT < 50k, e penalizando severamente CCS > 500k.*  
> *4. **Pilar Econômico:** Apuração de Margem Bruta, Margem Líquida, Lucro Econômico e Ponto de Equilíbrio em litros/dia.*  
> *Todas as regras contam com justificativa técnica e plano de ação imediato."*

---

### 🛡️ Slide 9: Por Que Motor Determinístico e Não Caixa Preta?
- **⏱️ Minutagem:** 9:00 – 10:00 (1 minuto)
- **🎯 Postura & Tom de Voz:** Técnico, demonstrando robustez computacional.

> *"O coração do MicroLeiteMacroNegocios é o nosso motor de **Encadeamento para Frente (Forward Chaining)**.*  
> *As variáveis alimentam as premissas, ativam regras e propagam Fatores de Certeza utilizando a fórmula clássica de Shortliffe:*  
> $$CF_{comb} = CF_1 + CF_2 \cdot (1 - |CF_1|)$$  
> *Além disso, construímos uma camada nativa de **IA Explicável (XAI)**:*  
> *Ao clicar em qualquer recomendação, o produtor ou técnico visualiza a cadeia lógica completa: 'A regra R03 disparou porque sua CCS foi de 550.000 (limite 500.000) e a perda de bonificação estimada é de R$ 0,15/L com Fator de Certeza de 95%'.*  
> *Essa transparência transforma o sistema em um instrumento pericial confiável para bancos, cooperativas e consultores rurais."*

---

### 💻 Slide 10: O Produto Final
- **⏱️ Minutagem:** 10:00 – 11:30 (1 minuto e 30 segundos)
- **🎯 Postura & Tom de Voz:** Prático, narrando com entusiasmo a tela do sistema.

> *"Vamos agora a uma demonstração prática do que o produtor vivencia ao usar o sistema:*  
> *Ao carregar o preset da **'Fazenda com Crise Sanitária (Mastite & CBT Alta)'**, o painel imediatamente entra em status Crítico com 4 diagnósticos:*  
> *- O termômetro de ITU em 79 acusa perda de 2,8 litros/vaca/dia por estresse calórico.*  
> *- A CCS em 620.000 acusa desconto de R$ 0,18 por litro pelo laticínio.*  
> *- A margem líquida por litro está negativa em R$ -0,12 — a fazenda está descapitalizando R$ 3.600 ao mês.*  
> *O produtor então abre o nosso **Simulador Interativo 'O que acontece se...'**:*  
> *Ele simula a instalação de ventiladores no barracão (reduzindo o ITU para 71) e melhorias na rotina de ordenha (reduzindo a CCS para 220.000).*  
> *Instantaneamente, em tempo real, os gráficos do Recharts mostram a margem líquida virando para R$ +0,38 por litro — um ganho líquido de mais de R$ 15.000 por mês!*  
> *Com um único clique no botão **'Baixar Laudo PDF'**, o sistema gera um relatório executivo formatado com assinatura técnica pronto para ser levado ao banco."*

---

### 🏆 Slide 11: Comparativo
- **⏱️ Minutagem:** 11:30 – 12:15 (45 segundos)
- **🎯 Postura & Tom de Voz:** Estratégico e comercial.

> *"Onde o MicroLeiteMacroNegocios se posiciona no mercado?*  
> *De um lado, 70% dos pequenos produtores usam o **caderninho de papel** — uma gestão puramente reativa, sem projeção de cenários e sem diagnóstico preventivo.*  
> *Do outro lado, os **ERPs rurais corporativos** cobram milhares de reais em mensalidades, exigem conexão constante com a internet e entregam relatórios contábeis frios que o produtor não compreende.*  
> *O **MicroLeiteMacroNegocios** preenche exatamente o espaço vazio: uma solução ágil, determinística, 100% gratuita, capaz de rodar localmente na fazenda e com foco direto na tomada de decisão prescritiva."*

---

### 🌟 Slide 12: O Futuro da Pecuária de Leite Começa Aqui
- **⏱️ Minutagem:** 12:15 – 13:00 (45 segundos)
- **🎯 Postura & Tom de Voz:** Inspirador, confiante e conclusivo.

> *"Concluímos esta maratona de 56 horas com a convicção de que entregamos não apenas um software, mas uma ferramenta de transformação socioeconômica para a cadeia do leite.*  
> *Provamos que a união entre Engenharia do Conhecimento rigorosa, Sistemas Especialistas Determinísticos e Pair Programming de alta performance com IA é o caminho para criar tecnologia de missão crítica de classe mundial.*  
> *Convidamos agora todos os membros da banca examinadora a explorarem a plataforma, testarem os presets e as simulações ao vivo.*  
> *Muito obrigado pela atenção de todos, e lembrem-se: com o MicroLeiteMacroNegocios, a gestão da sua fazenda fica **Muu**ito Melhor! Estamos abertos às suas perguntas."*

---

## 🛡️ Guia de Quebra de Objeções & Respostas para a Banca (Q&A)

### 1. "Onde a inteligência artificial generativa atuou de fato no projeto?"
> **Resposta:** "A IA generativa (Google Gemini 2.5 Pro) atuou na esteira de desenvolvimento de software e engenharia do conhecimento: na aceleração da estruturação ontológica em JSON, no scaffolding do motor de Forward Chaining e combinação MYCIN, nos componentes reativos de interface e na geração das suítes de testes automatizados. O sistema em tempo de execução opera sob regras determinísticas estritas, garantindo que nenhum diagnóstico agronômico sofra de alucinação probabilística, em total conformidade com o edital do hackathon."

### 2. "Como vocês garantem a acurácia dos custos da fazenda sem distorções?"
> **Resposta:** "Implementamos a metodologia oficial **Custopec da Embrapa Gado de Leite**. Separamos rigidamente o Custo Operacional Efetivo (COE, que são as despesas diretas de caixa), o Custo Operacional Total (COT, que soma a depreciação de benfeitorias/máquinas e o pró-labore do produtor) e o Custo Total (CT, que remunera o capital empatado e o custo de oportunidade da terra). Isso impede a descapitalização silenciosa."

### 3. "Como o sistema trata dados inconsistentes ou absurdos inseridos pelo usuário?"
> **Resposta:** "Possuímos uma camada dupla de guardrails zootécnicos no frontend e no backend. Se o usuário tentar inserir mais vacas em lactação do que o total de vacas adultas, o sistema ajusta e impede a condição logicamente impossível. Além disso, escores corporais são restritos ao intervalo 1.0 a 5.0, porcentagens a 0-100% e campos numéricos contam com normalização reativa de string com debounce de 150ms."

### 4. "O que diferencia o modelo MYCIN de uma simples árvore de IF/ELSE?"
> **Resposta:** "Um conjunto estático de IF/ELSE atribui certeza binária (0 ou 1) e não sabe lidar com evidências concorrentes. O modelo MYCIN permite que múltiplos sintomas (ex: CCS alta + temperatura corporal alta + queda de sólidos) combinem seus Fatores de Certeza de forma não linear, resultando em um grau de convicção graduado (ex: CF 0.95) com rastreamento pericial de quais premissas contribuíram para a inferência."
