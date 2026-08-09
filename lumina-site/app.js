(() => {
  const body = document.body;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  const loader = $('.loader');
  const dismissLoader = () => loader?.classList.add('is-done');
  window.addEventListener('load', () => window.setTimeout(dismissLoader, prefersReducedMotion ? 0 : 1150), { once: true });
  window.setTimeout(dismissLoader, 1450);

  const header = $('[data-header]');
  const handleHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  handleHeader();
  window.addEventListener('scroll', handleHeader, { passive: true });

  const menu = $('#mobile-menu');
  const menuToggle = $('.menu-toggle');
  const menuClose = $('.menu-close');
  const setMenu = (open) => {
    menu.classList.toggle('is-open', open);
    menu.setAttribute('aria-hidden', String(!open));
    menuToggle.setAttribute('aria-expanded', String(open));
    body.classList.toggle('is-locked', open);
    if (open) menuClose.focus();
  };
  menuToggle?.addEventListener('click', () => setMenu(true));
  menuClose?.addEventListener('click', () => setMenu(false));
  $$('a', menu).forEach(link => link.addEventListener('click', () => setMenu(false)));

  const modal = $('#concept-modal');
  let modalTrigger = null;
  const setModal = (open, trigger = null) => {
    if (open) modalTrigger = trigger || document.activeElement;
    modal.classList.toggle('is-open', open);
    modal.setAttribute('aria-hidden', String(!open));
    body.classList.toggle('is-locked', open);
    if (open) $('.modal__close', modal).focus();
    else modalTrigger?.focus();
  };
  $$('.js-open-modal').forEach(button => button.addEventListener('click', () => {
    $('#modal-title').textContent = button.dataset.modalTitle || 'Este é um projeto conceitual.';
    $('#modal-body').textContent = button.dataset.modalText || 'Em uma aplicação real, este botão abriria o WhatsApp da clínica.';
    setModal(true, button);
  }));
  $$('[data-close-modal]').forEach(button => button.addEventListener('click', () => setModal(false)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (modal.classList.contains('is-open')) setModal(false);
      if (menu.classList.contains('is-open')) setMenu(false);
    }
    if (event.key === 'Tab' && modal.classList.contains('is-open')) {
      const focusable = $$('button, a[href]', modal).filter(element => !element.disabled);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  $$('.reveal').forEach(element => revealObserver.observe(element));

  const navLinks = $$('.desktop-nav a');
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -65% 0px' });
  $$('[data-section]').forEach(section => navObserver.observe(section));

  const careOptions = {
    textura: {
      count: '01', kicker: 'Prevenção',
      title: 'Cuidar antes é a forma mais atenta de acompanhar o sorriso.',
      description: 'Uma avaliação poderia observar hábitos, higiene, gengivas e dentes para orientar uma rotina individual de cuidado.',
      tech: 'Exame clínico · Imagens digitais · Orientação preventiva',
      image: 'assets/images/cuidado-pele.webp', alt: 'Itens conceituais de prevenção odontológica'
    },
    linhas: {
      count: '02', kicker: 'Alinhamento',
      title: 'Alinhar também é planejar função, conforto e harmonia.',
      description: 'O estudo do caso poderia considerar mordida, posição dos dentes e expectativas para avaliar possibilidades ortodônticas.',
      tech: 'Escaneamento intraoral · Simulação digital · Acompanhamento ortodôntico',
      image: 'assets/images/manifesto-pele.webp', alt: 'Paciente sorrindo durante uma consulta odontológica'
    },
    manchas: {
      count: '03', kicker: 'Cor do sorriso',
      title: 'Naturalidade começa por compreender cor, forma e proporção.',
      description: 'Uma avaliação poderia investigar causas de alteração de cor e apresentar alternativas compatíveis com a saúde e a identidade do sorriso.',
      tech: 'Registro fotográfico · Planejamento estético · Cuidados supervisionados',
      image: 'assets/images/hero-lumina.webp', alt: 'Mulher com sorriso natural em clínica odontológica'
    },
    firmeza: {
      count: '04', kicker: 'Mastigação',
      title: 'Função e conforto pedem uma visão integrada do sorriso.',
      description: 'O plano poderia considerar dentes, gengivas, mordida e estruturas de suporte para organizar as etapas adequadas ao caso.',
      tech: 'Exames digitais · Análise funcional · Planejamento integrado',
      image: 'assets/images/tecnologia-luz.webp', alt: 'Consultório odontológico conceitual com tecnologia digital'
    },
    contorno: {
      count: '05', kicker: 'Conforto',
      title: 'Uma experiência mais tranquila começa por escuta e previsibilidade.',
      description: 'A conversa poderia identificar receios, sensibilidades e preferências para tornar cada etapa mais clara e acolhedora.',
      tech: 'Consulta atenta · Etapas explicadas · Acompanhamento próximo',
      image: 'assets/images/ambiente-descanso.webp', alt: 'Ambiente acolhedor de uma clínica odontológica conceitual'
    }
  };
  const carePanel = $('.care-panel');
  const careTabs = $$('.care-finder__tabs [role="tab"]');
  const updateCare = (key) => {
    const data = careOptions[key];
    carePanel.classList.add('is-changing');
    window.setTimeout(() => {
      $('#care-count').textContent = data.count;
      $('#care-kicker').textContent = data.kicker;
      $('#care-title').textContent = data.title;
      $('#care-description').textContent = data.description;
      $('#care-tech').textContent = data.tech;
      const image = $('#care-image');
      image.src = data.image;
      image.alt = data.alt;
      carePanel.classList.remove('is-changing');
    }, prefersReducedMotion ? 0 : 220);
  };
  careTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      careTabs.forEach(item => item.setAttribute('aria-selected', 'false'));
      tab.setAttribute('aria-selected', 'true');
      updateCare(tab.dataset.care);
    });
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      careTabs[(index + direction + careTabs.length) % careTabs.length].focus();
    });
  });

  const techContent = [
    ['Escaneamento digital', 'Anatomia individual'],
    ['Construção do plano', 'Etapas coordenadas'],
    ['Registro da jornada', 'Reavaliação contínua']
  ];
  $$('.tech-item').forEach((item, index) => item.addEventListener('click', () => {
    $$('.tech-item').forEach(button => button.classList.remove('is-active'));
    item.classList.add('is-active');
    $('#tech-stage').textContent = techContent[index][0];
    $('#tech-focus').textContent = techContent[index][1];
  }));

  const processContent = [
    ['01', 'O primeiro contato', 'Tudo começa com uma conversa.', 'Um momento para entender saúde bucal, expectativas, rotina e o que faz sentido para você — sem pressa e sem soluções prontas.'],
    ['02', 'Olhar odontológico', 'Entender antes de indicar.', 'A avaliação consideraria dentes, gengivas, mordida, exames e prioridades para construir uma visão completa do cuidado.'],
    ['03', 'Escolhas com clareza', 'Um plano que faça sentido na sua rotina.', 'Possibilidades, etapas e cuidados seriam apresentados com transparência para que cada decisão pudesse ser tomada com segurança.'],
    ['04', 'Presença ao longo do caminho', 'Cuidado também é acompanhar.', 'O plano poderia ser revisto conforme a jornada odontológica evoluísse, respeitando respostas individuais e novas necessidades.']
  ];
  const processSteps = $$('.process-step');
  const updateProcess = (index) => {
    processSteps.forEach((step, stepIndex) => {
      step.classList.toggle('is-active', stepIndex === index);
      step.setAttribute('aria-selected', String(stepIndex === index));
    });
    const [number, kicker, title, text] = processContent[index];
    $('#process-number').textContent = number;
    $('#process-kicker').textContent = kicker;
    $('#process-title').textContent = title;
    $('#process-text').textContent = text;
    const progress = $('.process__progress span');
    const value = `${(index / 3) * 100}%`;
    if (window.matchMedia('(max-width: 780px)').matches) progress.style.height = value;
    else progress.style.width = value;
  };
  processSteps.forEach((step, index) => {
    step.addEventListener('click', () => updateProcess(index));
    step.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
      event.preventDefault();
      const forward = ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : -1;
      const next = (index + forward + processSteps.length) % processSteps.length;
      processSteps[next].focus();
      updateProcess(next);
    });
  });

  $$('.accordion__item button').forEach(button => button.addEventListener('click', () => {
    const item = button.closest('.accordion__item');
    const open = !item.classList.contains('is-open');
    $$('.accordion__item').forEach(current => {
      current.classList.remove('is-open');
      $('button', current).setAttribute('aria-expanded', 'false');
    });
    if (open) {
      item.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
    }
  }));

  if (!prefersReducedMotion && window.matchMedia('(min-width: 781px)').matches) {
    const hero = $('.hero');
    const heroVisual = $('[data-hero-visual]');
    const heroImage = $('.hero__image-wrap img');
    const floatingItems = $$('[data-float]');
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    hero.addEventListener('pointermove', event => {
      const rect = hero.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width - .5;
      targetY = (event.clientY - rect.top) / rect.height - .5;
    }, { passive: true });
    hero.addEventListener('pointerleave', () => { targetX = 0; targetY = 0; });
    const animateHero = () => {
      currentX += (targetX - currentX) * .055;
      currentY += (targetY - currentY) * .055;
      heroVisual.style.transform = `translate3d(${currentX * 7}px, ${currentY * 7}px, 0)`;
      heroImage.style.transform = `scale(1.025) translate3d(${currentX * -8}px, ${currentY * -8}px, 0)`;
      floatingItems.forEach(item => {
        const strength = Number(item.dataset.float);
        item.style.transform = `translate3d(${currentX * 35 * strength}px, ${currentY * 35 * strength}px, 0)`;
      });
      requestAnimationFrame(animateHero);
    };
    requestAnimationFrame(animateHero);
  }

  $('#year').textContent = new Date().getFullYear();
})();
