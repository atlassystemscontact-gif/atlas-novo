(() => {
  "use strict";

  const root = document.documentElement;
  root.classList.add("js");

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointerQuery = window.matchMedia("(pointer: fine)");
  const LANGUAGE_STORAGE_KEY = "atlas-systems-language";

  const translations = {
    pt: {
      "a11y.skip": "Pular para o conteúdo",
      "meta.title": "Atlas Systems — Desenvolvimento de sistemas personalizados",
      "meta.description": "A Atlas Systems desenvolve sistemas personalizados para tornar empresas mais eficientes, organizadas e preparadas para crescer.",
      "meta.ogDescription": "Sistemas personalizados e soluções complementares para organizar processos, reduzir trabalho manual e apoiar o crescimento.",
      "loader.ariaLabel": "Carregando experiência Atlas Systems",
      "loader.label": "Construindo novas possibilidades",
      "brand.homeLabel": "Atlas Systems — início",
      "nav.ariaLabel": "Navegação principal",
      "nav.about": "Sobre",
      "nav.services": "Serviços",
      "nav.projects": "Soluções",
      "nav.insights": "Resultados",
      "nav.contact": "Contato",
      "header.portfolio": "Portfólio Atlas",
      "header.portfolioLabel": "Abrir portfólio da Atlas Systems",
      "header.cta": "Pedir proposta",
      "language.toggleLabel": "Trocar idioma para inglês",
      "menu.openLabel": "Abrir menu",
      "menu.closeLabel": "Fechar menu",
      "ribbon.ariaLabel": "Mensagem da Atlas Systems",
      "ribbon.text": "Sistemas sob medida",
      "hero.sceneLabel": "Escultura digital interativa",
      "hero.canvasLabel": "Forma tridimensional abstrata em movimento",
      "hero.canvasFallback": "Seu navegador não oferece suporte à visualização tridimensional.",
      "hero.eyebrow": "Desenvolvimento de sistemas · Soluções sob medida",
      "hero.titleLine1": "Sistemas que",
      "hero.titleLine2": "movem negócios.",
      "hero.description": "Desenvolvemos sistemas personalizados para tornar empresas mais eficientes, organizadas e preparadas para crescer. Automação, bots e experiências digitais complementam cada solução quando necessário.",
      "hero.primaryCta": "Transformar minha operação",
      "hero.secondaryCta": "Conhecer soluções",
      "hero.scrollHint": "Role para descobrir",
      "clients.title": "Mais eficiência. Mais escala. Mais resultado.",
      "clients.marqueeLabel": "Resultados que nossas soluções ajudam a gerar",
      "clients.item1": "Redução de custos",
      "clients.item2": "Mais produtividade",
      "clients.item3": "Processos automatizados",
      "clients.item4": "Operações escaláveis",
      "clients.item5": "Atendimento inteligente",
      "clients.item6": "Crescimento sustentável",
      "projects.eyebrow": "Projetos selecionados",
      "projects.title": "Experiências digitais construídas para marcar.",
      "projects.description": "Do conceito à experiência final, unimos estratégia, direção visual e tecnologia em projetos que demonstram a capacidade criativa da Atlas.",
      "projects.conceptLabel": "Projeto conceitual",
      "projects.highlightsLabel": "Destaques do projeto",
      "projects.viewProject": "Ver projeto",
      "projects.omega.category": "Saúde · Landing page premium",
      "projects.omega.title": "Clínica Lúmina",
      "projects.omega.description": "Experiência digital para uma clínica odontológica contemporânea, com apresentação de tratamentos, tecnologia, diferenciais e agendamento.",
      "projects.omega.highlight1": "Direção premium",
      "projects.omega.highlight2": "Animações",
      "projects.omega.highlight3": "Foco em conversão",
      "projects.omega.previewAlt": "Página inicial do projeto Clínica Lúmina",
      "projects.omega.linkLabel": "Abrir projeto Clínica Lúmina",
      "projects.alpine.category": "Hospitalidade · Experiência imersiva",
      "projects.alpine.title": "Alpine Sanctuaries",
      "projects.alpine.description": "Atlas editorial de hotéis suíços com narrativa visual, transições cinematográficas, seleção de destinos e exploração interativa.",
      "projects.alpine.highlight1": "Storytelling",
      "projects.alpine.highlight2": "Movimento imersivo",
      "projects.alpine.highlight3": "Experiência editorial",
      "projects.alpine.previewAlt": "Página inicial do projeto Alpine Sanctuaries",
      "projects.alpine.linkLabel": "Abrir projeto Alpine Sanctuaries",
      "projects.others.kicker": "Portfólio Atlas",
      "projects.others.title": "Outros",
      "projects.others.description": "Explore mais experiências digitais criadas pela Atlas Systems.",
      "projects.others.linkLabel": "Falar com a Atlas Systems sobre outro projeto",
      "projects.demoLabel": "Demonstração conceitual",
      "projects.viewCase": "Conhecer solução",
      "projects.examplesLabel": "Exemplos de aplicação",
      "previews.live": "Ao vivo",
      "previews.done": "Concluído",
      "previews.running": "Executando",
      "previews.sync": "Sincronizado",
      "previews.automation.title": "Central de automação",
      "previews.automation.flows": "fluxos ativos",
      "previews.automation.saved": "economizadas",
      "previews.automation.order": "Pedidos → ERP",
      "previews.automation.report": "Relatório diário",
      "previews.automation.leads": "Triagem de leads",
      "previews.landing.nav": "Resultados · Solução · Contato",
      "previews.landing.kicker": "Crescimento previsível",
      "previews.landing.title": "Mais leads. Menos atrito.",
      "previews.landing.copy": "Uma página rápida, clara e pronta para converter.",
      "previews.landing.cta": "Quero crescer ↗",
      "previews.landing.formTitle": "Receba o plano",
      "previews.landing.formCta": "Começar agora",
      "previews.landing.proof": "conversão na campanha",
      "previews.system.title": "Pipeline comercial",
      "previews.system.open": "Em aberto",
      "previews.system.rate": "Conversão",
      "previews.system.new": "Novos",
      "previews.system.proposal": "Proposta",
      "previews.system.closed": "Fechados",
      "previews.bot.online": "online agora",
      "previews.bot.today": "Hoje",
      "previews.bot.hello": "Olá! Como posso ajudar sua empresa?",
      "previews.bot.user": "Quero automatizar meu atendimento.",
      "previews.bot.reply": "Ótimo. Posso mapear seu cenário em 3 perguntas.",
      "previews.bot.sales": "Vendas",
      "previews.bot.support": "Suporte",
      "previews.bot.schedule": "Agendar",
      "previews.bot.placeholder": "Digite uma mensagem",
      "previews.integration.title": "Ecossistema conectado",
      "previews.integration.orders": "Pedidos",
      "previews.integration.payments": "Pagamentos",
      "previews.integration.now": "agora",
      "previews.integration.minute": "há 1 min",
      "previews.analytics.title": "Performance da operação",
      "previews.analytics.conversion": "Conversão",
      "previews.analytics.leads": "Leads",
      "previews.analytics.evolution": "Evolução semanal",
      "projects.orbe.category": "Inteligência artificial · Automação",
      "projects.orbe.title": "Automação com IA",
      "projects.orbe.description": "Automatizamos processos internos, fluxos de atendimento e tarefas repetitivas para sua empresa produzir mais com menos esforço.",
      "projects.orbe.example1": "Conciliação de dados",
      "projects.orbe.example2": "Relatórios automáticos",
      "projects.orbe.example3": "Triagem inteligente",
      "projects.orbe.linkLabel": "Conhecer automação com inteligência artificial",
      "projects.nexa.category": "Performance · Conversão",
      "projects.nexa.title": "Landing Pages",
      "projects.nexa.description": "Páginas rápidas e estratégicas que unem design, copywriting e experiência do usuário para gerar leads, vendas e posicionamento.",
      "projects.nexa.example1": "Campanhas de tráfego",
      "projects.nexa.example2": "Lançamentos",
      "projects.nexa.example3": "Captação B2B",
      "projects.nexa.linkLabel": "Conhecer landing pages de alta conversão",
      "projects.fluxo.category": "Software · Operação",
      "projects.fluxo.title": "Sistemas Personalizados",
      "projects.fluxo.description": "Plataformas internas, dashboards, sistemas de gestão e ferramentas operacionais construídas para a realidade da sua empresa.",
      "projects.fluxo.example1": "CRM interno",
      "projects.fluxo.example2": "Painel operacional",
      "projects.fluxo.example3": "Gestão de pedidos",
      "projects.fluxo.linkLabel": "Conhecer sistemas personalizados",
      "projects.vertice.category": "WhatsApp · Atendimento",
      "projects.vertice.title": "Bots Inteligentes",
      "projects.vertice.description": "Atendimento, vendas e suporte automatizados para responder clientes imediatamente e manter sua operação disponível 24 horas.",
      "projects.vertice.example1": "Qualificação no WhatsApp",
      "projects.vertice.example2": "Suporte e FAQ",
      "projects.vertice.example3": "Agendamentos",
      "projects.vertice.linkLabel": "Conhecer bots inteligentes para WhatsApp e atendimento",
      "projects.horizonte.category": "Integrações · Fluxos conectados",
      "projects.horizonte.title": "Integração de Sistemas",
      "projects.horizonte.description": "Conectamos ferramentas, dados e canais para eliminar retrabalho e criar fluxos de informação mais rápidos e confiáveis.",
      "projects.horizonte.example1": "CRM + ERP",
      "projects.horizonte.example2": "WhatsApp + suporte",
      "projects.horizonte.example3": "Pagamentos e webhooks",
      "projects.horizonte.linkLabel": "Conhecer integrações entre sistemas",
      "projects.raiz.category": "Performance · Evolução",
      "projects.raiz.title": "Otimização Contínua",
      "projects.raiz.description": "Acompanhamos resultados, identificamos oportunidades e evoluímos a solução para sustentar o crescimento da operação.",
      "projects.raiz.example1": "Testes A/B",
      "projects.raiz.example2": "Análise de conversão",
      "projects.raiz.example3": "Performance técnica",
      "projects.raiz.linkLabel": "Conhecer o trabalho de otimização contínua",
      "metrics.title": "Impactos que orientam nossas soluções",
      "metrics.projects.label": "Custos operacionais",
      "metrics.projects.value": "Reduzidos",
      "metrics.users.label": "Produtividade",
      "metrics.users.value": "Elevada",
      "metrics.retention.label": "Processos críticos",
      "metrics.retention.value": "Automatizados",
      "metrics.experience.label": "Operações",
      "metrics.experience.value": "Escaláveis",
      "services.eyebrow": "Nossa especialidade",
      "services.title": "Desenvolvimento de sistemas",
      "services.description": "Criamos sistemas sob medida e incorporamos automação, inteligência artificial, bots e experiências digitais sempre que essas capacidades fortalecem a solução.",
      "services.idealFor": "Ideal para",
      "services.included": "Principais entregáveis",
      "services.investment": "Próximo passo",
      "services.cta": "Conhecer solução",
      "services.strategy.title": "Automação com Inteligência Artificial",
      "services.strategy.description": "Operações com tarefas manuais, dados duplicados ou atendimento lento que precisam ganhar velocidade, precisão e escala.",
      "services.strategy.outcome1": "Menos retrabalho e erros",
      "services.strategy.outcome2": "Mais produtividade e rastreabilidade",
      "services.strategy.item1": "Mapeamento de processos",
      "services.strategy.item2": "Fluxos automatizados",
      "services.strategy.item3": "Integrações e IA",
      "services.strategy.item4": "Painel de monitoramento",
      "services.strategy.price": "Workshop de diagnóstico + mapa de automação",
      "services.ux.title": "Landing Pages de Alta Conversão",
      "services.ux.description": "Campanhas, lançamentos e empresas que recebem tráfego, mas precisam transformar mais visitantes em leads ou vendas mensuráveis.",
      "services.ux.outcome1": "Jornada de conversão objetiva",
      "services.ux.outcome2": "Resultados acompanhados por dados",
      "services.ux.item1": "Estratégia e copy",
      "services.ux.item2": "UX/UI responsivo",
      "services.ux.item3": "Analytics e pixels",
      "services.ux.item4": "CRM e WhatsApp",
      "services.ux.price": "Briefing de conversão + plano da página",
      "services.web.title": "Desenvolvimento de Sistemas Personalizados",
      "services.web.description": "Empresas limitadas por planilhas, ferramentas fragmentadas ou processos que não cabem em softwares prontos.",
      "services.web.outcome1": "Operação centralizada e visível",
      "services.web.outcome2": "Base segura para crescer",
      "services.web.item1": "Discovery e arquitetura",
      "services.web.item2": "UX/UI do produto",
      "services.web.item3": "Front-end e back-end",
      "services.web.item4": "Painel e integrações",
      "services.web.price": "Discovery técnico + arquitetura inicial",
      "services.mobile.title": "Bots Inteligentes para WhatsApp e Atendimento",
      "services.mobile.description": "Times com alto volume de perguntas repetitivas, demora na primeira resposta ou perda de oportunidades fora do horário comercial.",
      "services.mobile.outcome1": "Primeira resposta 24 horas",
      "services.mobile.outcome2": "Atendimento padronizado e escalável",
      "services.mobile.item1": "Design de conversa",
      "services.mobile.item2": "WhatsApp e canais",
      "services.mobile.item3": "CRM, APIs e dados",
      "services.mobile.item4": "Transbordo humano",
      "services.mobile.price": "Mapeamento do atendimento + desenho do fluxo",
      "services.integrations.title": "APIs e integrações",
      "services.integrations.description": "Conectamos sistemas, serviços e dados para eliminar retrabalho e criar operações mais rápidas e confiáveis.",
      "services.integrations.item1": "APIs REST e GraphQL",
      "services.integrations.item2": "ERPs e CRMs",
      "services.integrations.item3": "Pagamentos e identidade",
      "services.integrations.item4": "Webhooks e automações",
      "services.integrations.price": "a partir de R$ 10 mil",
      "services.engineering.title": "Engenharia de software",
      "services.engineering.description": "Desenvolvemos sistemas seguros, performáticos e preparados para crescer, da arquitetura à operação.",
      "services.engineering.item1": "Aplicações web e mobile",
      "services.engineering.item2": "Plataformas, APIs e integrações",
      "services.engineering.item3": "Cloud, qualidade e observabilidade",
      "services.ai.title": "Dados e inteligência artificial",
      "services.ai.description": "Transformamos dados em automação, previsão e decisões melhores, com inteligência aplicada ao que realmente importa.",
      "services.ai.item1": "Engenharia de dados",
      "services.ai.item2": "IA generativa",
      "services.ai.item3": "Agentes e automações",
      "services.ai.item4": "Dashboards inteligentes",
      "services.ai.price": "a partir de R$ 20 mil",
      "services.cloud.title": "Cloud, DevOps e observabilidade",
      "services.cloud.description": "Preparamos infraestrutura, deploy e monitoramento para produtos estáveis, seguros e disponíveis em qualquer escala.",
      "services.cloud.item1": "AWS, Azure ou GCP",
      "services.cloud.item2": "CI/CD",
      "services.cloud.item3": "Monitoramento",
      "services.cloud.item4": "Segurança e performance",
      "services.cloud.price": "a partir de R$ 8 mil",
      "services.evolution.title": "Evolução contínua de produto",
      "services.evolution.description": "Um time multidisciplinar para medir, priorizar e entregar melhorias contínuas depois do lançamento.",
      "services.evolution.item1": "Squad dedicado",
      "services.evolution.item2": "Roadmap contínuo",
      "services.evolution.item3": "Experimentos",
      "services.evolution.item4": "Suporte e manutenção",
      "services.evolution.price": "planos mensais",
      "services.audit.title": "Auditoria técnica e arquitetura",
      "services.audit.description": "Diagnosticamos riscos, gargalos e oportunidades para orientar decisões técnicas com clareza e prioridade.",
      "services.audit.item1": "Revisão de código",
      "services.audit.item2": "Arquitetura e segurança",
      "services.audit.item3": "Performance",
      "services.audit.item4": "Plano de ação",
      "services.audit.price": "a partir de R$ 7 mil",
      "process.eyebrow": "Como trabalhamos",
      "process.title": "Clareza do diagnóstico à evolução contínua.",
      "process.description": "Nosso processo garante qualidade, eficiência e alinhamento com os objetivos reais do seu negócio.",
      "process.step1.title": "Diagnóstico",
      "process.step1.description": "Entendemos os desafios, objetivos e oportunidades da sua operação.",
      "process.step2.title": "Planejamento",
      "process.step2.description": "Definimos a solução, as prioridades e o caminho mais eficiente.",
      "process.step3.title": "Desenvolvimento",
      "process.step3.description": "Construímos com foco em performance, segurança e escalabilidade.",
      "process.step4.title": "Implementação",
      "process.step4.description": "Integramos a solução ao negócio com acompanhamento próximo.",
      "process.step5.title": "Otimização",
      "process.step5.description": "Medimos resultados e evoluímos a solução continuamente.",
      "process.step6.title": "Escala",
      "process.step6.description": "Preparamos tecnologia, processos e times para crescer com desempenho, segurança e autonomia.",
      "testimonials.eyebrow": "Por que escolher a Atlas",
      "testimonials.title": "Tecnologia como meio. Crescimento como resultado.",
      "testimonials.quote1": "Cada solução começa pelo resultado que o negócio precisa alcançar — nunca pela tecnologia da moda.",
      "testimonials.person1.name": "Foco em resultados",
      "testimonials.person1.role": "Impacto mensurável na operação",
      "testimonials.quote2": "Trabalhamos lado a lado com sua empresa para entender prioridades, simplificar decisões e construir o que realmente gera valor.",
      "testimonials.person2.name": "Parceria estratégica",
      "testimonials.person2.role": "Tecnologia alinhada ao negócio",
      "testimonials.quote3": "Criamos bases sólidas, rápidas e evolutivas para sua operação crescer sem transformar tecnologia em um novo gargalo.",
      "testimonials.person3.name": "Escala com qualidade",
      "testimonials.person3.role": "Soluções preparadas para evoluir",
      "testimonials.controlsLabel": "Selecionar diferencial",
      "testimonials.show1": "Mostrar diferencial 1",
      "testimonials.show2": "Mostrar diferencial 2",
      "testimonials.show3": "Mostrar diferencial 3",
      "about.eyebrow": "Sobre a Atlas",
      "about.title": "Transformamos negócios em operações preparadas para o futuro.",
      "about.paragraph1": "A Atlas é especializada no desenvolvimento de soluções digitais avançadas, com foco em automação inteligente, sistemas personalizados e experiências orientadas a resultados.",
      "about.paragraph2": "Mais do que desenvolver ferramentas, criamos soluções que impactam diretamente o crescimento, a produtividade e a lucratividade dos nossos clientes.",
      "team.title": "O que guia cada decisão.",
      "team.ana.name": "Missão",
      "team.ana.role": "Ajudar empresas a crescer através da tecnologia, tornando processos mais inteligentes, eficientes e escaláveis.",
      "team.lucas.name": "Visão",
      "team.lucas.role": "Ser referência em automação e soluções digitais que transformam negócios e geram resultados reais.",
      "team.joana.name": "Valores",
      "team.joana.role": "Inovação constante, foco em resultados, compromisso com o cliente e qualidade em cada entrega.",
      "team.pedro.name": "Atitude",
      "team.pedro.role": "A Atlas é para empresas que não querem apenas acompanhar o futuro — querem liderar.",
      "insights.eyebrow": "Resultados em movimento",
      "insights.title": "O que muda quando a tecnologia trabalha a favor do negócio.",
      "insights.description": "Soluções bem aplicadas liberam tempo, aumentam capacidade operacional e criam experiências melhores para clientes e equipes.",
      "insights.article1.date": "01",
      "insights.article1.category": "Eficiência operacional",
      "insights.article1.title": "Menos tarefas manuais. Mais tempo para decisões importantes.",
      "insights.article1.summary": "Automação reduz retrabalho, diminui erros e libera a equipe para atividades de maior valor.",
      "insights.article2.date": "02",
      "insights.article2.category": "Crescimento e escala",
      "insights.article2.title": "Uma operação preparada para crescer sem multiplicar o caos.",
      "insights.article2.summary": "Sistemas personalizados organizam dados, padronizam processos e sustentam novas etapas de crescimento.",
      "insights.article3.date": "03",
      "insights.article3.category": "Experiência do cliente",
      "insights.article3.title": "Respostas mais rápidas e jornadas que convertem melhor.",
      "insights.article3.summary": "Bots e páginas estratégicas aproximam sua marca do cliente em todos os momentos da decisão.",
      "insights.readMore": "Falar com a Atlas",
      "contact.eyebrow": "Vamos conversar",
      "contact.title": "Qual futuro você quer colocar em movimento?",
      "contact.titleLead": "Pronto para transformar",
      "contact.titleAccent": "sua operação?",
      "contact.description": "Conte o desafio da sua empresa. A Atlas ajuda a transformar problemas operacionais em soluções digitais eficientes, escaláveis e orientadas a resultados.",
      "contact.form.nameLabel": "Nome",
      "contact.form.namePlaceholder": "Seu nome",
      "contact.form.emailLabel": "E-mail",
      "contact.form.emailPlaceholder": "voce@empresa.com",
      "contact.form.companyLabel": "De qual empresa você faz parte?",
      "contact.form.companyPlaceholder": "Nome da empresa",
      "contact.form.interestLegend": "Tenho interesse em",
      "contact.form.interestStrategy": "Estratégia de produto",
      "contact.form.interestDesign": "UX e design",
      "contact.form.interestDevelopment": "Desenvolvimento de sistemas",
      "contact.form.interestAi": "Dados e inteligência artificial",
      "contact.form.budgetLabel": "Orçamento",
      "contact.form.budget1": "Até R$ 20 mil",
      "contact.form.budget2": "R$ 20–50 mil",
      "contact.form.budget3": "R$ 50–100 mil",
      "contact.form.budget4": "R$ 100–200 mil",
      "contact.form.budget5": "Acima de R$ 200 mil",
      "contact.form.messageLabel": "Mensagem",
      "contact.form.messagePlaceholder": "Conte um pouco sobre o seu projeto...",
      "contact.form.consent": "Concordo que a Atlas Systems use estes dados para responder ao meu contato.",
      "contact.form.submit": "Iniciar conversa",
      "contact.form.success": "Mensagem recebida! Esta é uma demonstração; escreva para atlassystems.contact@gmail.com para iniciar seu projeto.",
      "contact.whatsapp.eyebrow": "Atendimento direto",
      "contact.whatsapp.title": "Converse com a Atlas no WhatsApp.",
      "contact.whatsapp.description": "Conte seu desafio diretamente para nossa equipe e descubra qual solução faz sentido para o seu negócio.",
      "contact.whatsapp.featuresLabel": "Vantagens do atendimento",
      "contact.whatsapp.response": "Resposta rápida",
      "contact.whatsapp.human": "Atendimento humano",
      "contact.whatsapp.noForm": "Sem formulário",
      "contact.whatsapp.chat1": "Olá! Quero entender como a Atlas pode ajudar minha empresa.",
      "contact.whatsapp.chat2": "Ótimo — conte um pouco sobre o seu desafio.",
      "contact.whatsapp.phoneLabel": "WhatsApp da empresa",
      "contact.whatsapp.cta": "Abrir conversa no WhatsApp",
      "contact.whatsapp.note": "O WhatsApp será aberto em uma nova aba.",
      "contact.whatsapp.message": "Olá! Vim pelo site da Atlas Systems e gostaria de conversar sobre uma solução para minha empresa.",
      "contact.whatsapp.linkLabel": "Conversar com a Atlas Systems pelo WhatsApp",
      "footer.homeLabel": "Atlas Systems — voltar ao início",
      "footer.navLabel": "Links do rodapé",
      "footer.statement": "Atlas Systems — para empresas que não querem apenas acompanhar o futuro. Querem liderar.",
      "footer.quickLinks": "Links rápidos",
      "footer.contactTitle": "Contato",
      "footer.location": "São Paulo, Brasil",
      "footer.remote": "Atendimento no Brasil e exterior",
      "footer.whatsapp": "WhatsApp: +55 11 93053-4679",
      "footer.whatsappLabel": "Conversar com a Atlas Systems pelo WhatsApp",
      "footer.follow": "Acompanhe",
      "footer.linkedin": "LinkedIn",
      "footer.instagram": "Instagram",
      "footer.behance": "Behance",
      "footer.portfolio": "Ver portfólio",
      "footer.portfolioLabel": "Abrir portfólio da Atlas Systems",
      "footer.rights": "Atlas Systems. Todos os direitos reservados.",
      "footer.privacy": "Privacidade",
      "footer.terms": "Termos de uso",
      "footer.backToTop": "Voltar ao topo"
    },
    en: {
      "a11y.skip": "Skip to content",
      "meta.title": "Atlas Systems — Custom systems development",
      "meta.description": "Atlas Systems develops custom systems to make companies more efficient, organized, and ready to grow.",
      "meta.ogDescription": "Custom systems and complementary solutions to organize processes, reduce manual work, and support growth.",
      "loader.ariaLabel": "Loading the Atlas Systems experience",
      "loader.label": "Building new possibilities",
      "brand.homeLabel": "Atlas Systems — home",
      "nav.ariaLabel": "Main navigation",
      "nav.about": "About",
      "nav.services": "Services",
      "nav.projects": "Solutions",
      "nav.insights": "Results",
      "nav.contact": "Contact",
      "header.portfolio": "Atlas Portfolio",
      "header.portfolioLabel": "Open the Atlas Systems portfolio",
      "header.cta": "Get proposal",
      "language.toggleLabel": "Switch language to Portuguese",
      "menu.openLabel": "Open menu",
      "menu.closeLabel": "Close menu",
      "ribbon.ariaLabel": "Message from Atlas Systems",
      "ribbon.text": "Systems made to fit",
      "hero.sceneLabel": "Interactive digital sculpture",
      "hero.canvasLabel": "Abstract three-dimensional form in motion",
      "hero.canvasFallback": "Your browser does not support the three-dimensional experience.",
      "hero.eyebrow": "Systems development · Tailored solutions",
      "hero.titleLine1": "Systems that",
      "hero.titleLine2": "move businesses.",
      "hero.description": "We develop custom systems to make companies more efficient, organized, and ready to grow. Automation, bots, and digital experiences complement each solution when needed.",
      "hero.primaryCta": "Transform my operation",
      "hero.secondaryCta": "Explore solutions",
      "hero.scrollHint": "Scroll to discover",
      "clients.title": "More efficiency. More scale. More results.",
      "clients.marqueeLabel": "Outcomes our solutions are designed to create",
      "clients.item1": "Lower costs",
      "clients.item2": "Higher productivity",
      "clients.item3": "Automated processes",
      "clients.item4": "Scalable operations",
      "clients.item5": "Intelligent service",
      "clients.item6": "Sustainable growth",
      "projects.eyebrow": "Selected projects",
      "projects.title": "Digital experiences designed to make an impact.",
      "projects.description": "From concept to final experience, we combine strategy, visual direction, and technology in projects that showcase Atlas' creative capabilities.",
      "projects.conceptLabel": "Concept project",
      "projects.highlightsLabel": "Project highlights",
      "projects.viewProject": "View project",
      "projects.omega.category": "Healthcare · Premium landing page",
      "projects.omega.title": "Lúmina Clinic",
      "projects.omega.description": "A digital experience for a contemporary dental clinic, presenting treatments, technology, key differentiators, and appointment booking.",
      "projects.omega.highlight1": "Premium direction",
      "projects.omega.highlight2": "Animations",
      "projects.omega.highlight3": "Conversion focus",
      "projects.omega.previewAlt": "Lúmina Clinic project homepage",
      "projects.omega.linkLabel": "Open Lúmina Clinic project",
      "projects.alpine.category": "Hospitality · Immersive experience",
      "projects.alpine.title": "Alpine Sanctuaries",
      "projects.alpine.description": "An editorial atlas of Swiss hotels featuring visual storytelling, cinematic transitions, destination selection, and interactive exploration.",
      "projects.alpine.highlight1": "Storytelling",
      "projects.alpine.highlight2": "Immersive motion",
      "projects.alpine.highlight3": "Editorial experience",
      "projects.alpine.previewAlt": "Alpine Sanctuaries project homepage",
      "projects.alpine.linkLabel": "Open Alpine Sanctuaries project",
      "projects.others.kicker": "Atlas portfolio",
      "projects.others.title": "Others",
      "projects.others.description": "Explore more digital experiences created by Atlas Systems.",
      "projects.others.linkLabel": "Talk to Atlas Systems about another project",
      "projects.demoLabel": "Concept demonstration",
      "projects.viewCase": "Explore solution",
      "projects.examplesLabel": "Application examples",
      "previews.live": "Live",
      "previews.done": "Completed",
      "previews.running": "Running",
      "previews.sync": "Synced",
      "previews.automation.title": "Automation center",
      "previews.automation.flows": "active workflows",
      "previews.automation.saved": "saved",
      "previews.automation.order": "Orders → ERP",
      "previews.automation.report": "Daily report",
      "previews.automation.leads": "Lead triage",
      "previews.landing.nav": "Results · Solution · Contact",
      "previews.landing.kicker": "Predictable growth",
      "previews.landing.title": "More leads. Less friction.",
      "previews.landing.copy": "A fast, clear page built to convert.",
      "previews.landing.cta": "I want to grow ↗",
      "previews.landing.formTitle": "Get the plan",
      "previews.landing.formCta": "Start now",
      "previews.landing.proof": "campaign conversion",
      "previews.system.title": "Sales pipeline",
      "previews.system.open": "Open pipeline",
      "previews.system.rate": "Conversion",
      "previews.system.new": "New",
      "previews.system.proposal": "Proposal",
      "previews.system.closed": "Closed",
      "previews.bot.online": "online now",
      "previews.bot.today": "Today",
      "previews.bot.hello": "Hi! How can I help your company?",
      "previews.bot.user": "I want to automate customer service.",
      "previews.bot.reply": "Great. I can map your needs in 3 questions.",
      "previews.bot.sales": "Sales",
      "previews.bot.support": "Support",
      "previews.bot.schedule": "Schedule",
      "previews.bot.placeholder": "Type a message",
      "previews.integration.title": "Connected ecosystem",
      "previews.integration.orders": "Orders",
      "previews.integration.payments": "Payments",
      "previews.integration.now": "now",
      "previews.integration.minute": "1 min ago",
      "previews.analytics.title": "Operations performance",
      "previews.analytics.conversion": "Conversion",
      "previews.analytics.leads": "Leads",
      "previews.analytics.evolution": "Weekly growth",
      "projects.orbe.category": "Artificial intelligence · Automation",
      "projects.orbe.title": "AI Automation",
      "projects.orbe.description": "We automate internal processes, customer service flows, and repetitive tasks so your company can produce more with less effort.",
      "projects.orbe.example1": "Data reconciliation",
      "projects.orbe.example2": "Automated reports",
      "projects.orbe.example3": "Intelligent triage",
      "projects.orbe.linkLabel": "Explore artificial intelligence automation",
      "projects.nexa.category": "Performance · Conversion",
      "projects.nexa.title": "Landing Pages",
      "projects.nexa.description": "Fast, strategic pages combining design, copywriting, and user experience to generate leads, sales, and positioning.",
      "projects.nexa.example1": "Paid traffic campaigns",
      "projects.nexa.example2": "Product launches",
      "projects.nexa.example3": "B2B lead generation",
      "projects.nexa.linkLabel": "Explore high-converting landing pages",
      "projects.fluxo.category": "Software · Operations",
      "projects.fluxo.title": "Custom Systems",
      "projects.fluxo.description": "Internal platforms, dashboards, management systems, and operational tools built around your company’s reality.",
      "projects.fluxo.example1": "Internal CRM",
      "projects.fluxo.example2": "Operations dashboard",
      "projects.fluxo.example3": "Order management",
      "projects.fluxo.linkLabel": "Explore custom systems",
      "projects.vertice.category": "WhatsApp · Customer service",
      "projects.vertice.title": "Intelligent Bots",
      "projects.vertice.description": "Automated service, sales, and support to respond immediately and keep your operation available around the clock.",
      "projects.vertice.example1": "WhatsApp qualification",
      "projects.vertice.example2": "Support and FAQs",
      "projects.vertice.example3": "Scheduling",
      "projects.vertice.linkLabel": "Explore intelligent WhatsApp and customer service bots",
      "projects.horizonte.category": "Integrations · Connected workflows",
      "projects.horizonte.title": "Systems Integration",
      "projects.horizonte.description": "We connect tools, data, and channels to eliminate rework and create faster, more reliable information flows.",
      "projects.horizonte.example1": "CRM + ERP",
      "projects.horizonte.example2": "WhatsApp + support",
      "projects.horizonte.example3": "Payments and webhooks",
      "projects.horizonte.linkLabel": "Explore systems integrations",
      "projects.raiz.category": "Performance · Evolution",
      "projects.raiz.title": "Continuous Optimization",
      "projects.raiz.description": "We track results, identify opportunities, and evolve the solution to support operational growth.",
      "projects.raiz.example1": "A/B testing",
      "projects.raiz.example2": "Conversion analysis",
      "projects.raiz.example3": "Technical performance",
      "projects.raiz.linkLabel": "Explore continuous optimization",
      "metrics.title": "Outcomes that guide our solutions",
      "metrics.projects.label": "Operating costs",
      "metrics.projects.value": "Lower",
      "metrics.users.label": "Productivity",
      "metrics.users.value": "Higher",
      "metrics.retention.label": "Critical processes",
      "metrics.retention.value": "Automated",
      "metrics.experience.label": "Operations",
      "metrics.experience.value": "Scalable",
      "services.eyebrow": "Our specialty",
      "services.title": "Systems development",
      "services.description": "We build tailored systems and incorporate automation, artificial intelligence, bots, and digital experiences whenever these capabilities strengthen the solution.",
      "services.idealFor": "Ideal for",
      "services.included": "Key deliverables",
      "services.investment": "Next step",
      "services.cta": "Explore solution",
      "services.strategy.title": "Artificial Intelligence Automation",
      "services.strategy.description": "Operations with manual work, duplicate data, or slow service that need more speed, accuracy, and scale.",
      "services.strategy.outcome1": "Less rework and fewer errors",
      "services.strategy.outcome2": "More productivity and traceability",
      "services.strategy.item1": "Process mapping",
      "services.strategy.item2": "Automated workflows",
      "services.strategy.item3": "Integrations and AI",
      "services.strategy.item4": "Monitoring dashboard",
      "services.strategy.price": "Assessment workshop + automation map",
      "services.ux.title": "High-Converting Landing Pages",
      "services.ux.description": "Campaigns, launches, and companies that receive traffic but need to turn more visitors into measurable leads or sales.",
      "services.ux.outcome1": "Focused conversion journey",
      "services.ux.outcome2": "Data-tracked results",
      "services.ux.item1": "Strategy and copy",
      "services.ux.item2": "Responsive UX/UI",
      "services.ux.item3": "Analytics and pixels",
      "services.ux.item4": "CRM and WhatsApp",
      "services.ux.price": "Conversion briefing + page plan",
      "services.web.title": "Custom Systems Development",
      "services.web.description": "Companies constrained by spreadsheets, fragmented tools, or processes that do not fit off-the-shelf software.",
      "services.web.outcome1": "Centralized, visible operations",
      "services.web.outcome2": "A secure foundation for growth",
      "services.web.item1": "Discovery and architecture",
      "services.web.item2": "Product UX/UI",
      "services.web.item3": "Front-end and back-end",
      "services.web.item4": "Admin and integrations",
      "services.web.price": "Technical discovery + initial architecture",
      "services.mobile.title": "Intelligent WhatsApp and Customer Service Bots",
      "services.mobile.description": "Teams facing repetitive questions, slow first responses, or lost opportunities outside business hours.",
      "services.mobile.outcome1": "24-hour first response",
      "services.mobile.outcome2": "Consistent, scalable service",
      "services.mobile.item1": "Conversation design",
      "services.mobile.item2": "WhatsApp and channels",
      "services.mobile.item3": "CRM, APIs, and data",
      "services.mobile.item4": "Human handoff",
      "services.mobile.price": "Service mapping + conversation flow",
      "services.integrations.title": "APIs and integrations",
      "services.integrations.description": "We connect systems, services, and data to eliminate rework and create faster, more reliable operations.",
      "services.integrations.item1": "REST and GraphQL APIs",
      "services.integrations.item2": "ERPs and CRMs",
      "services.integrations.item3": "Payments and identity",
      "services.integrations.item4": "Webhooks and automation",
      "services.integrations.price": "from BRL 10k",
      "services.engineering.title": "Software engineering",
      "services.engineering.description": "We develop secure, high-performance systems built to grow, from architecture to operations.",
      "services.engineering.item1": "Web and mobile applications",
      "services.engineering.item2": "Platforms, APIs, and integrations",
      "services.engineering.item3": "Cloud, quality, and observability",
      "services.ai.title": "Data and artificial intelligence",
      "services.ai.description": "We turn data into automation, forecasting, and better decisions, applying intelligence where it truly matters.",
      "services.ai.item1": "Data engineering",
      "services.ai.item2": "Generative AI",
      "services.ai.item3": "Agents and automation",
      "services.ai.item4": "Intelligent dashboards",
      "services.ai.price": "from BRL 20k",
      "services.cloud.title": "Cloud, DevOps, and observability",
      "services.cloud.description": "We prepare infrastructure, deployment, and monitoring for stable, secure products at any scale.",
      "services.cloud.item1": "AWS, Azure, or GCP",
      "services.cloud.item2": "CI/CD",
      "services.cloud.item3": "Monitoring",
      "services.cloud.item4": "Security and performance",
      "services.cloud.price": "from BRL 8k",
      "services.evolution.title": "Continuous product evolution",
      "services.evolution.description": "A multidisciplinary team to measure, prioritize, and deliver continuous improvements after launch.",
      "services.evolution.item1": "Dedicated squad",
      "services.evolution.item2": "Continuous roadmap",
      "services.evolution.item3": "Experiments",
      "services.evolution.item4": "Support and maintenance",
      "services.evolution.price": "monthly plans",
      "services.audit.title": "Technical and architecture audit",
      "services.audit.description": "We diagnose risks, bottlenecks, and opportunities to guide technical decisions with clarity and priority.",
      "services.audit.item1": "Code review",
      "services.audit.item2": "Architecture and security",
      "services.audit.item3": "Performance",
      "services.audit.item4": "Action plan",
      "services.audit.price": "from BRL 7k",
      "process.eyebrow": "How we work",
      "process.title": "Clarity from assessment to continuous improvement.",
      "process.description": "Our process ensures quality, efficiency, and alignment with your business’s real objectives.",
      "process.step1.title": "Assessment",
      "process.step1.description": "We understand your operation’s challenges, objectives, and opportunities.",
      "process.step2.title": "Planning",
      "process.step2.description": "We define the solution, priorities, and the most efficient path.",
      "process.step3.title": "Development",
      "process.step3.description": "We build with a focus on performance, security, and scalability.",
      "process.step4.title": "Implementation",
      "process.step4.description": "We integrate the solution into the business with close support.",
      "process.step5.title": "Optimization",
      "process.step5.description": "We measure results and continuously evolve the solution.",
      "process.step6.title": "Scale",
      "process.step6.description": "We prepare technology, processes, and teams to grow with performance, security, and autonomy.",
      "testimonials.eyebrow": "Why choose Atlas",
      "testimonials.title": "Technology as the means. Growth as the outcome.",
      "testimonials.quote1": "Every solution starts with the outcome the business needs to achieve — never with the technology trend of the moment.",
      "testimonials.person1.name": "Results first",
      "testimonials.person1.role": "Measurable operational impact",
      "testimonials.quote2": "We work side by side with your company to understand priorities, simplify decisions, and build what truly creates value.",
      "testimonials.person2.name": "Strategic partnership",
      "testimonials.person2.role": "Technology aligned with business",
      "testimonials.quote3": "We build solid, fast, and adaptable foundations so your operation can grow without turning technology into a new bottleneck.",
      "testimonials.person3.name": "Quality at scale",
      "testimonials.person3.role": "Solutions designed to evolve",
      "testimonials.controlsLabel": "Select differentiator",
      "testimonials.show1": "Show differentiator 1",
      "testimonials.show2": "Show differentiator 2",
      "testimonials.show3": "Show differentiator 3",
      "about.eyebrow": "About Atlas",
      "about.title": "We turn businesses into operations prepared for the future.",
      "about.paragraph1": "Atlas specializes in advanced digital solutions focused on intelligent automation, custom systems, and results-driven experiences.",
      "about.paragraph2": "More than building tools, we create solutions that directly impact our clients’ growth, productivity, and profitability.",
      "team.title": "What guides every decision.",
      "team.ana.name": "Mission",
      "team.ana.role": "Help companies grow through technology by making processes smarter, more efficient, and scalable.",
      "team.lucas.name": "Vision",
      "team.lucas.role": "Become a benchmark in automation and digital solutions that transform businesses and generate real results.",
      "team.joana.name": "Values",
      "team.joana.role": "Constant innovation, focus on results, commitment to clients, and quality in every delivery.",
      "team.pedro.name": "Attitude",
      "team.pedro.role": "Atlas is for companies that do not merely want to follow the future — they want to lead it.",
      "insights.eyebrow": "Results in motion",
      "insights.title": "What changes when technology works for the business.",
      "insights.description": "Well-applied solutions free up time, expand operational capacity, and create better experiences for clients and teams.",
      "insights.article1.date": "01",
      "insights.article1.category": "Operational efficiency",
      "insights.article1.title": "Fewer manual tasks. More time for important decisions.",
      "insights.article1.summary": "Automation reduces rework and errors while freeing the team for higher-value activities.",
      "insights.article2.date": "02",
      "insights.article2.category": "Growth and scale",
      "insights.article2.title": "An operation ready to grow without multiplying chaos.",
      "insights.article2.summary": "Custom systems organize data, standardize processes, and support new stages of growth.",
      "insights.article3.date": "03",
      "insights.article3.category": "Customer experience",
      "insights.article3.title": "Faster responses and journeys that convert better.",
      "insights.article3.summary": "Bots and strategic pages bring your brand closer to customers throughout the decision journey.",
      "insights.readMore": "Talk to Atlas",
      "contact.eyebrow": "Let's talk",
      "contact.title": "What future do you want to set in motion?",
      "contact.titleLead": "Ready to transform",
      "contact.titleAccent": "your operation?",
      "contact.description": "Tell us about your company’s challenge. Atlas turns operational problems into efficient, scalable, and results-driven digital solutions.",
      "contact.form.nameLabel": "Name",
      "contact.form.namePlaceholder": "Your name",
      "contact.form.emailLabel": "Email",
      "contact.form.emailPlaceholder": "you@company.com",
      "contact.form.companyLabel": "What company are you part of?",
      "contact.form.companyPlaceholder": "Company name",
      "contact.form.interestLegend": "Interested in",
      "contact.form.interestStrategy": "Product strategy",
      "contact.form.interestDesign": "UX and design",
      "contact.form.interestDevelopment": "Systems development",
      "contact.form.interestAi": "Data and artificial intelligence",
      "contact.form.budgetLabel": "Budget",
      "contact.form.budget1": "Up to BRL 20k",
      "contact.form.budget2": "BRL 20–50k",
      "contact.form.budget3": "BRL 50–100k",
      "contact.form.budget4": "BRL 100–200k",
      "contact.form.budget5": "Above BRL 200k",
      "contact.form.messageLabel": "Message",
      "contact.form.messagePlaceholder": "Tell us a little about your project...",
      "contact.form.consent": "I agree that Atlas Systems may use this data to respond to my inquiry.",
      "contact.form.submit": "Start a conversation",
      "contact.form.success": "Message received! This is a demonstration; email atlassystems.contact@gmail.com to start your project.",
      "contact.whatsapp.eyebrow": "Direct service",
      "contact.whatsapp.title": "Talk to Atlas on WhatsApp.",
      "contact.whatsapp.description": "Tell our team about your challenge and discover which solution makes sense for your business.",
      "contact.whatsapp.featuresLabel": "Service benefits",
      "contact.whatsapp.response": "Fast response",
      "contact.whatsapp.human": "Human support",
      "contact.whatsapp.noForm": "No forms",
      "contact.whatsapp.chat1": "Hi! I want to understand how Atlas can help my company.",
      "contact.whatsapp.chat2": "Great — tell us a little about your challenge.",
      "contact.whatsapp.phoneLabel": "Company WhatsApp",
      "contact.whatsapp.cta": "Open WhatsApp conversation",
      "contact.whatsapp.note": "WhatsApp will open in a new tab.",
      "contact.whatsapp.message": "Hello! I found Atlas Systems through the website and would like to discuss a solution for my company.",
      "contact.whatsapp.linkLabel": "Talk to Atlas Systems on WhatsApp",
      "footer.homeLabel": "Atlas Systems — back to home",
      "footer.navLabel": "Footer links",
      "footer.statement": "Atlas Systems — for companies that do not merely want to follow the future. They want to lead it.",
      "footer.quickLinks": "Quick links",
      "footer.contactTitle": "Contact",
      "footer.location": "São Paulo, Brazil",
      "footer.remote": "Working across Brazil and worldwide",
      "footer.whatsapp": "WhatsApp: +55 11 93053-4679",
      "footer.whatsappLabel": "Talk to Atlas Systems on WhatsApp",
      "footer.follow": "Follow",
      "footer.linkedin": "LinkedIn",
      "footer.instagram": "Instagram",
      "footer.behance": "Behance",
      "footer.portfolio": "View portfolio",
      "footer.portfolioLabel": "Open the Atlas Systems portfolio",
      "footer.rights": "Atlas Systems. All rights reserved.",
      "footer.privacy": "Privacy",
      "footer.terms": "Terms of use",
      "footer.backToTop": "Back to top"
    }
  };

  let currentLanguage = readStoredLanguage();
  let activeProcessStep = 1;
  let processChangeTimer = 0;
  let processAutoTimer = 0;
  let formStatusKey = "";

  function readStoredLanguage() {
    try {
      const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
      return stored === "en" || stored === "pt" ? stored : "pt";
    } catch (error) {
      return "pt";
    }
  }

  function storeLanguage(language) {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch (error) {
      // The experience remains functional when storage is unavailable.
    }
  }

  function translate(key, language = currentLanguage) {
    return translations[language]?.[key] ?? translations.pt[key] ?? key;
  }

  function updateMenuLabel() {
    const menuToggle = document.getElementById("menu-toggle");
    if (!menuToggle) return;

    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-label", translate(isOpen ? "menu.closeLabel" : "menu.openLabel"));
  }

  function formatMetricValue(value, decimals) {
    const locale = currentLanguage === "pt" ? "pt-BR" : "en-US";
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  }

  function refreshMetricFormatting() {
    document.querySelectorAll(".metric-number[data-count]").forEach((element) => {
      const targetText = element.dataset.count ?? "0";
      const target = Number.parseFloat(targetText);
      const decimals = targetText.includes(".") ? targetText.split(".")[1].length : 0;
      const displayed = Number.parseFloat(element.dataset.displayValue ?? targetText);

      if (Number.isFinite(target) && Number.isFinite(displayed)) {
        element.textContent = formatMetricValue(displayed, decimals);
      }
    });
  }

  function applyLanguage(language, persist = true) {
    if (!translations[language]) return;

    currentLanguage = language;
    root.lang = language === "pt" ? "pt-BR" : "en";
    root.dataset.language = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (key) element.textContent = translate(key);
    });

    const translatedAttributes = [
      ["data-i18n-content", "content"],
      ["data-i18n-placeholder", "placeholder"],
      ["data-i18n-aria-label", "aria-label"],
      ["data-i18n-alt", "alt"]
    ];

    translatedAttributes.forEach(([dataAttribute, targetAttribute]) => {
      document.querySelectorAll(`[${dataAttribute}]`).forEach((element) => {
        const key = element.getAttribute(dataAttribute);
        if (key) element.setAttribute(targetAttribute, translate(key));
      });
    });

    document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
      const number = link.dataset.whatsappNumber;
      if (!number) return;
      link.href = `https://wa.me/${number}?text=${encodeURIComponent(translate("contact.whatsapp.message"))}`;
    });

    document.title = translate("meta.title");
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", language === "pt" ? "pt_BR" : "en_US");

    const languageToggle = document.getElementById("lang-toggle");
    if (languageToggle) {
      const current = languageToggle.querySelector(".lang-current");
      const alternate = languageToggle.querySelector(".lang-alternate");
      if (current) current.textContent = language === "pt" ? "PT" : "EN";
      if (alternate) alternate.textContent = language === "pt" ? "EN" : "PT";
    }

    updateMenuLabel();
    updateProcess(activeProcessStep, false);
    refreshMetricFormatting();

    const formStatus = document.getElementById("form-status");
    if (formStatus && formStatusKey) formStatus.textContent = translate(formStatusKey);

    if (persist) storeLanguage(language);

    window.dispatchEvent(new CustomEvent("atlas:languagechange", {
      detail: { language, locale: root.lang }
    }));
  }

  function validateTranslationCoverage() {
    const keys = new Set();
    ["data-i18n", "data-i18n-content", "data-i18n-placeholder", "data-i18n-aria-label", "data-i18n-alt"].forEach((attribute) => {
      document.querySelectorAll(`[${attribute}]`).forEach((element) => {
        const key = element.getAttribute(attribute);
        if (key) keys.add(key);
      });
    });

    ["pt", "en"].forEach((language) => {
      keys.forEach((key) => {
        if (!(key in translations[language])) {
          console.warn(`[Atlas Systems] Missing ${language} translation: ${key}`);
        }
      });
    });
  }

  function initLoader() {
    const domReady = document.readyState === "loading"
      ? new Promise((resolve) => document.addEventListener("DOMContentLoaded", resolve, { once: true }))
      : Promise.resolve();

    const minimumDelay = new Promise((resolve) => window.setTimeout(resolve, reducedMotionQuery.matches ? 0 : 180));

    Promise.all([domReady, minimumDelay]).then(() => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          document.body?.classList.add("is-ready");
          const loader = document.getElementById("loader");
          loader?.setAttribute("aria-hidden", "true");
        });
      });
    });
  }

  function initHeroExperience() {
    const scene = document.getElementById("scene");
    const canvas = document.getElementById("hero-canvas");
    if (!scene || !canvas) return;

    scene.classList.add("webgl-fallback");

    const useLightweightVersion = reducedMotionQuery.matches || window.matchMedia("(max-width: 820px)").matches;
    if (useLightweightVersion) {
      canvas.hidden = true;
      return;
    }

    const loadWebGL = () => {
      if (document.querySelector('script[data-atlas-webgl]')) return;
      const script = document.createElement("script");
      script.src = "hero3d.js?v=7";
      script.async = true;
      script.dataset.atlasWebgl = "true";
      document.head.append(script);
    };

    window.addEventListener("pointermove", loadWebGL, { once: true, passive: true });
    window.addEventListener("pointerdown", loadWebGL, { once: true, passive: true });
    window.setTimeout(loadWebGL, 8000);
  }

  function initHeader() {
    const header = document.querySelector(".site-header");
    if (!header) return;

    let scheduled = false;
    const update = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
      scheduled = false;
    };

    const onScroll = () => {
      if (!scheduled) {
        scheduled = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const navigation = document.getElementById("primary-nav");
    if (!menuToggle || !navigation) return;

    const mobileNavigationQuery = window.matchMedia("(max-width: 820px)");
    const syncNavigationInert = (open) => {
      navigation.inert = mobileNavigationQuery.matches && !open;
    };

    const setMenuState = (open, returnFocus = false) => {
      menuToggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("menu-open", open);
      syncNavigationInert(open);
      updateMenuLabel();

      if (open) {
        window.requestAnimationFrame(() => navigation.querySelector("a")?.focus({ preventScroll: true }));
      } else if (returnFocus) {
        menuToggle.focus({ preventScroll: true });
      }
    };

    menuToggle.addEventListener("click", () => {
      setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuState(false, true));
    });

    document.addEventListener("keydown", (event) => {
      const menuIsOpen = menuToggle.getAttribute("aria-expanded") === "true";
      if (event.key === "Escape" && menuIsOpen) {
        setMenuState(false, true);
      }

      if (event.key === "Tab" && menuIsOpen) {
        const focusable = Array.from(document.querySelectorAll(".site-header a[href], .site-header button:not([disabled])"))
          .filter((element) => element.getClientRects().length > 0 && !element.closest("[inert]"));
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener("resize", () => {
      if (!mobileNavigationQuery.matches && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenuState(false);
      } else {
        syncNavigationInert(menuToggle.getAttribute("aria-expanded") === "true");
      }
    }, { passive: true });

    syncNavigationInert(false);
  }

  function initLanguageToggle() {
    const languageToggle = document.getElementById("lang-toggle");
    if (!languageToggle) return;

    languageToggle.addEventListener("click", () => {
      applyLanguage(currentLanguage === "pt" ? "en" : "pt");
    });
  }

  function initServicesAccordion() {
    const accordion = document.getElementById("services-accordion");
    if (!accordion) return;

    const items = Array.from(accordion.querySelectorAll(".service-item"));
    const triggers = items.map((item) => item.querySelector(".service-trigger")).filter(Boolean);
    if (!triggers.length) return;

    const openItem = (selectedTrigger, forceOpen = false) => {
      const isAlreadyOpen = selectedTrigger?.getAttribute("aria-expanded") === "true";
      const triggerToOpen = forceOpen || !isAlreadyOpen ? selectedTrigger : null;

      items.forEach((item) => {
        const trigger = item.querySelector(".service-trigger");
        const panelId = trigger?.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;
        const shouldOpen = trigger === triggerToOpen;

        item.classList.toggle("is-open", shouldOpen);
        trigger?.setAttribute("aria-expanded", String(shouldOpen));

        if (!panel) return;
        if (shouldOpen) {
          panel.hidden = false;
        } else if (reducedMotionQuery.matches) {
          panel.hidden = true;
        } else {
          window.setTimeout(() => {
            if (!item.classList.contains("is-open")) panel.hidden = true;
          }, 440);
        }
      });
    };

    const initiallyOpen = triggers.find((trigger) => trigger.getAttribute("aria-expanded") === "true") ?? triggers[0];
    openItem(initiallyOpen, true);

    triggers.forEach((trigger, index) => {
      trigger.addEventListener("click", () => openItem(trigger));
      trigger.addEventListener("keydown", (event) => {
        let nextIndex = index;
        if (event.key === "ArrowDown") nextIndex = (index + 1) % triggers.length;
        else if (event.key === "ArrowUp") nextIndex = (index - 1 + triggers.length) % triggers.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = triggers.length - 1;
        else return;

        event.preventDefault();
        triggers[nextIndex].focus();
      });
    });
  }

  function updateProcess(step, animate = true) {
    const process = document.getElementById("process");
    if (!process) return;

    const totalSteps = process.querySelectorAll(".process-node[data-step]").length || 1;
    const normalizedStep = Math.min(totalSteps, Math.max(1, Number.parseInt(step, 10) || 1));
    activeProcessStep = normalizedStep;

    process.querySelectorAll(".process-node[data-step]").forEach((node) => {
      const isActive = Number.parseInt(node.dataset.step, 10) === normalizedStep;
      node.classList.toggle("is-active", isActive);
      node.setAttribute("aria-pressed", String(isActive));
    });

    const detail = document.getElementById("process-detail");
    if (!detail) return;

    const number = detail.querySelector(".process-detail-number");
    const title = detail.querySelector("h3");
    const description = detail.querySelector("p:not(.process-detail-number)");

    const render = () => {
      if (number) number.textContent = `${String(normalizedStep).padStart(2, "0")} / ${String(totalSteps).padStart(2, "0")}`;
      if (title) {
        title.dataset.i18n = `process.step${normalizedStep}.title`;
        title.textContent = translate(`process.step${normalizedStep}.title`);
      }
      if (description) {
        description.dataset.i18n = `process.step${normalizedStep}.description`;
        description.textContent = translate(`process.step${normalizedStep}.description`);
      }
      detail.classList.remove("is-changing");
    };

    window.clearTimeout(processChangeTimer);
    if (animate && !reducedMotionQuery.matches) {
      detail.classList.add("is-changing");
      processChangeTimer = window.setTimeout(render, 150);
    } else {
      render();
    }
  }

  function initProcess() {
    const process = document.getElementById("process");
    if (!process) return;

    const nodes = Array.from(process.querySelectorAll(".process-node[data-step]"));
    if (!nodes.length) return;
    let processIsVisible = !("IntersectionObserver" in window);

    const stopAutoAdvance = () => {
      window.clearInterval(processAutoTimer);
      processAutoTimer = 0;
    };

    const startAutoAdvance = () => {
      stopAutoAdvance();
      if (reducedMotionQuery.matches || document.hidden || !processIsVisible) return;
      processAutoTimer = window.setInterval(() => updateProcess((activeProcessStep % nodes.length) + 1), 10000);
    };

    const handleMotionPreference = (event) => {
      if (event.matches) stopAutoAdvance();
      else startAutoAdvance();
    };

    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", handleMotionPreference);
    } else if (typeof reducedMotionQuery.addListener === "function") {
      reducedMotionQuery.addListener(handleMotionPreference);
    }

    nodes.forEach((node, index) => {
      node.addEventListener("click", () => {
        updateProcess(node.dataset.step);
        startAutoAdvance();
      });
      node.addEventListener("keydown", (event) => {
        let nextIndex = index;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % nodes.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + nodes.length) % nodes.length;
        else if (event.key === "Home") nextIndex = 0;
        else if (event.key === "End") nextIndex = nodes.length - 1;
        else return;

        event.preventDefault();
        nodes[nextIndex].focus();
        updateProcess(nodes[nextIndex].dataset.step);
        startAutoAdvance();
      });
    });

    const initial = nodes.find((node) => node.getAttribute("aria-pressed") === "true") ?? nodes[0];
    updateProcess(initial.dataset.step, false);

    process.addEventListener("pointerenter", stopAutoAdvance);
    process.addEventListener("pointerleave", startAutoAdvance);

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(([entry]) => {
        processIsVisible = entry.isIntersecting;
        if (processIsVisible) startAutoAdvance();
        else stopAutoAdvance();
      }, { threshold: .2 });
      observer.observe(process);
    } else {
      startAutoAdvance();
    }
  }

  function decorateRevealElements() {
    const standaloneSelectors = [
      ".section-heading",
      ".section-intro",
      ".clients-intro",
      ".process-layout",
      ".testimonial-track",
      ".contact-intro",
      ".contact-form",
      ".footer-main",
      ".footer-bottom"
    ];

    document.querySelectorAll(standaloneSelectors.join(",")).forEach((element) => {
      element.classList.add("reveal");
    });

    const staggerSelectors = [
      ".project-grid",
      ".metrics-grid",
      "#services-accordion",
      ".team-grid",
      ".insights-timeline"
    ];

    document.querySelectorAll(staggerSelectors.join(",")).forEach((container) => {
      container.classList.add("reveal-stagger");
      Array.from(container.children).forEach((child, index) => {
        child.classList.add("reveal");
        child.style.setProperty("--stagger-index", String(index));
      });
    });
  }

  function initRevealAnimations() {
    decorateRevealElements();
    const revealElements = Array.from(document.querySelectorAll(".reveal"));
    if (!revealElements.length) return;

    if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    });

    revealElements.forEach((element) => observer.observe(element));
  }

  function animateMetric(element) {
    if (element.dataset.counted === "true") return;

    const targetText = element.dataset.count ?? "0";
    const target = Number.parseFloat(targetText);
    if (!Number.isFinite(target)) return;

    const decimals = targetText.includes(".") ? targetText.split(".")[1].length : 0;
    element.dataset.counted = "true";

    if (reducedMotionQuery.matches) {
      element.dataset.displayValue = String(target);
      element.textContent = formatMetricValue(target, decimals);
      return;
    }

    const start = performance.now();
    const duration = 1500;

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      const value = target * eased;
      element.dataset.displayValue = String(value);
      element.textContent = formatMetricValue(value, decimals);

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      } else {
        element.dataset.displayValue = String(target);
        element.textContent = formatMetricValue(target, decimals);
      }
    };

    window.requestAnimationFrame(tick);
  }

  function initMetricCounters() {
    const metrics = Array.from(document.querySelectorAll(".metric-number[data-count]"));
    if (!metrics.length) return;

    metrics.forEach((element) => {
      element.dataset.displayValue = "0";
      element.textContent = formatMetricValue(0, (element.dataset.count ?? "").includes(".") ? 1 : 0);
    });

    if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
      metrics.forEach(animateMetric);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateMetric(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });

    metrics.forEach((element) => observer.observe(element));
  }

  function initProjectTilt() {
    if (reducedMotionQuery.matches || !finePointerQuery.matches) return;

    document.querySelectorAll(".project-card").forEach((card) => {
      let frame = 0;
      let pointerX = 0;
      let pointerY = 0;
      let bounds = null;

      const render = () => {
        if (!bounds) bounds = card.getBoundingClientRect();
        const x = (pointerX - bounds.left) / bounds.width - 0.5;
        const y = (pointerY - bounds.top) / bounds.height - 0.5;
        const rotateX = (-y * 4.5).toFixed(2);
        const rotateY = (x * 4.5).toFixed(2);
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
        frame = 0;
      };

      card.addEventListener("pointerenter", () => {
        bounds = card.getBoundingClientRect();
        card.style.willChange = "transform";
      });

      card.addEventListener("pointermove", (event) => {
        if (reducedMotionQuery.matches) return;
        pointerX = event.clientX;
        pointerY = event.clientY;
        if (!frame) frame = window.requestAnimationFrame(render);
      });

      card.addEventListener("pointerleave", () => {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        bounds = null;
        card.style.removeProperty("transform");
        card.style.removeProperty("will-change");
      });
    });
  }

  function initTestimonials() {
    const track = document.querySelector(".testimonial-track");
    const cards = Array.from(document.querySelectorAll(".testimonial-card[data-testimonial]"));
    const dots = Array.from(document.querySelectorAll(".testimonial-dot[data-slide]"));
    if (!track || !cards.length || !dots.length) return;

    const select = (slide, moveTrack = true) => {
      const selectedCard = cards.find((card) => card.dataset.testimonial === String(slide));
      if (!selectedCard) return;

      cards.forEach((card) => card.classList.toggle("is-selected", card === selectedCard));
      dots.forEach((dot) => {
        const selected = dot.dataset.slide === String(slide);
        dot.classList.toggle("is-active", selected);
        dot.setAttribute("aria-pressed", String(selected));
      });

      if (moveTrack && window.innerWidth <= 820) {
        track.scrollTo({
          left: selectedCard.offsetLeft - track.offsetLeft,
          behavior: reducedMotionQuery.matches ? "auto" : "smooth"
        });
      }
    };

    dots.forEach((dot) => {
      dot.addEventListener("click", () => select(dot.dataset.slide));
    });

    let scrollFrame = 0;
    track.addEventListener("scroll", () => {
      if (window.innerWidth > 820 || scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        const closest = cards.reduce((best, card) => {
          const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - trackCenter);
          return !best || distance < best.distance ? { card, distance } : best;
        }, null);
        if (closest) select(closest.card.dataset.testimonial, false);
        scrollFrame = 0;
      });
    }, { passive: true });

    select(dots.find((dot) => dot.getAttribute("aria-pressed") === "true")?.dataset.slide ?? "1", false);
  }

  function initCustomCursor() {
    if (reducedMotionQuery.matches || !finePointerQuery.matches) return;

    const hero = document.querySelector("#inicio");
    if (!(hero instanceof Element)) return;

    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    dot.setAttribute("aria-hidden", "true");
    ring.setAttribute("aria-hidden", "true");
    document.body.append(dot, ring);

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let visible = false;
    let animationFrame = 0;

    const render = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      animationFrame = visible ? window.requestAnimationFrame(render) : 0;
    };

    const show = () => {
      if (visible) return;
      visible = true;
      dot.classList.add("is-visible");
      ring.classList.add("is-visible");
      if (!animationFrame) animationFrame = window.requestAnimationFrame(render);
    };

    const hide = () => {
      visible = false;
      dot.classList.remove("is-visible");
      ring.classList.remove("is-visible", "is-hovering");
    };

    document.addEventListener("pointermove", (event) => {
      targetX = event.clientX;
      targetY = event.clientY;

      const isInsideHero = event.target instanceof Element && Boolean(event.target.closest("#inicio"));
      if (!isInsideHero) {
        hide();
        return;
      }

      if (ringX < -50) {
        ringX = targetX;
        ringY = targetY;
      }
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      show();
    }, { passive: true });

    document.addEventListener("pointerover", (event) => {
      if (visible && event.target instanceof Element && event.target.closest("#inicio a, #inicio button")) {
        ring.classList.add("is-hovering");
      }
    });

    document.addEventListener("pointerout", (event) => {
      if (!event.relatedTarget) {
        hide();
        return;
      }

      if (event.target instanceof Element && event.target.closest("#inicio a, #inicio button")) {
        const nextTarget = event.relatedTarget instanceof Element
          ? event.relatedTarget.closest("#inicio a, #inicio button")
          : null;
        if (!nextTarget) ring.classList.remove("is-hovering");
      }
    });

    window.addEventListener("scroll", () => {
      if (targetX < 0 || targetY < 0) return;
      const elementAtPointer = document.elementFromPoint(targetX, targetY);
      if (!(elementAtPointer instanceof Element) || !elementAtPointer.closest("#inicio")) hide();
    }, { passive: true });
  }

  function initActiveNavigation() {
    const links = Array.from(document.querySelectorAll('#primary-nav a[href^="#"]'));
    if (!links.length) return;

    const sections = links
      .map((link) => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);
    if (!sections.length) return;

    const setActive = (id) => {
      links.forEach((link) => {
        const active = link.getAttribute("href") === `#${id}`;
        link.classList.toggle("is-active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    const updateFromScroll = () => {
      const focusLine = window.scrollY + window.innerHeight * 0.42;
      let activeSection = null;
      sections.forEach((section) => {
        if (section.offsetTop <= focusLine) activeSection = section;
      });
      setActive(activeSection?.id ?? "");
    };

    if (!("IntersectionObserver" in window)) {
      updateFromScroll();
      window.addEventListener("scroll", updateFromScroll, { passive: true });
      return;
    }

    const visibleSections = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.set(entry.target.id, entry.intersectionRatio);
        else visibleSections.delete(entry.target.id);
      });

      const active = Array.from(visibleSections.entries()).sort((a, b) => b[1] - a[1])[0];
      setActive(active?.[0] ?? "");
    }, {
      threshold: [0.1, 0.25, 0.5, 0.75],
      rootMargin: "-28% 0px -52% 0px"
    });

    sections.forEach((section) => observer.observe(section));
  }

  function initContactForm() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("form-status");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      formStatusKey = "contact.form.success";
      if (status) {
        status.textContent = translate(formStatusKey);
        status.dataset.state = "success";
      }
    });
  }

  function initCurrentYear() {
    const year = document.getElementById("current-year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function initReducedMotionChanges() {
    const onChange = (event) => {
      if (!event.matches) return;
      document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
      document.querySelectorAll(".metric-number[data-count]").forEach((element) => {
        const target = Number.parseFloat(element.dataset.count ?? "0");
        const decimals = (element.dataset.count ?? "").includes(".") ? 1 : 0;
        if (Number.isFinite(target)) {
          element.dataset.counted = "true";
          element.dataset.displayValue = String(target);
          element.textContent = formatMetricValue(target, decimals);
        }
      });
    };

    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", onChange);
    } else if (typeof reducedMotionQuery.addListener === "function") {
      reducedMotionQuery.addListener(onChange);
    }
  }

  function init() {
    validateTranslationCoverage();
    applyLanguage(currentLanguage, false);
    initHeader();
    initHeroExperience();
    initMobileMenu();
    initLanguageToggle();
    initServicesAccordion();
    initProcess();
    initRevealAnimations();
    initMetricCounters();
    initProjectTilt();
    initTestimonials();
    initCustomCursor();
    initActiveNavigation();
    initContactForm();
    initCurrentYear();
    initReducedMotionChanges();
  }

  initLoader();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
