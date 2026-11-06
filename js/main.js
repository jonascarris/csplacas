(() => {
  'use strict';

  // Categorias do Cliente com Norma Técnica e Aplicação
  const cats = [
    { prefix: "Placas para", name: "Condomínios", norm: "Portarias, Blocos e Garagem", query: "Placas para Condomínios" },
    { prefix: "Placas de", name: "Identificação", norm: "Salas, Andares e Setores", query: "Placas de Identificação" },
    { prefix: "Placas de", name: "Estacionamento", norm: "Vagas, Sentido e Vagas PCD", query: "Placas de Estacionamento" },
    { prefix: "Placas de", name: "Rota de Fuga", norm: "CBMERJ / ABNT NBR 16820", query: "Placas de Rota de Fuga" },
    { prefix: "Placas de", name: "Extintores e Hidrantes", norm: "Norma Bombeiros CBMERJ", query: "Placas de Extintores e Hidrantes" },
    { prefix: "Placas de", name: "Acessibilidade", norm: "NBR 9050 / Braille", query: "Placas de Acessibilidade" },
    { prefix: "Placas de", name: "Segurança", norm: "ABNT NBR 16820", query: "Placas de Segurança" },
    { prefix: "Placas de", name: "Perigo e Advertência", norm: "NR-26 / Segurança do Trabalho", query: "Placas de Perigo e Advertência" },
    { prefix: "Placas de", name: "Atenção", norm: "Sinalização Preventiva", query: "Placas de Atenção" },
    { prefix: "Placas de", name: "Cuidado", norm: "Manutenção e Obras", query: "Placas de Cuidado" },
    { prefix: "Placas de", name: "Aviso", norm: "Regulamentos e Normas Internas", query: "Placas de Aviso" }
  ];

  const arrowSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  const idxList = document.getElementById('idx');

  if (idxList) {
    idxList.innerHTML = cats.map((item, i) => {
      const msg = encodeURIComponent(`Olá, gostaria de um orçamento de ${item.prefix} ${item.name}.`);
      return `<li class="rv">
        <a href="https://wa.me/5521970327373?text=${msg}" target="_blank" rel="noopener">
          <span class="num">${String(i + 1).padStart(2, '0')}</span>
          <span class="nm">${item.prefix} <b>${item.name}</b> <small class="norm">${item.norm}</small></span>
          <span class="go"><span>Orçar</span><i>${arrowSvg}</i></span>
        </a>
      </li>`;
    }).join('');
  }

  // Intersection Observer para reveal suave
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.rv').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
  }

  // Menu mobile com a11y & suporte a ESC
  const body = document.body;
  const burger = document.querySelector('.burger');
  const overlay = document.querySelector('.overlay');

  const toggleMenu = (open) => {
    const isOpen = typeof open === 'boolean' ? open : !body.classList.contains('menu-open');
    body.classList.toggle('menu-open', isOpen);
    if (burger) {
      burger.setAttribute('aria-expanded', String(isOpen));
    }
    if (overlay) {
      overlay.setAttribute('aria-hidden', String(!isOpen));
    }
  };

  if (burger) {
    burger.addEventListener('click', () => toggleMenu());
  }

  if (overlay) {
    overlay.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => toggleMenu(false));
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) {
      toggleMenu(false);
    }
  });

  // Atualização dinâmica do ano do footer
  const yrEl = document.getElementById('yr');
  if (yrEl) {
    yrEl.textContent = new Date().getFullYear();
  }
})();

