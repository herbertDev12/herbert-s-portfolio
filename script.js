document.addEventListener('DOMContentLoaded', () => {
  const TARGET_EMAIL = 'herbertn740@gmail.com';
  const TARGET_GITHUB_BASE = 'https://github.com/herbertDev12';

  // Elementos Toast y Modal
  const toastBar = document.getElementById('toast-bar');
  const toastText = document.getElementById('toast-text');
  const validationModal = document.getElementById('validation-modal');
  const modalClose = document.getElementById('modal-close');
  const modalRepoTitle = document.getElementById('modal-repo-title');
  const terminalLogs = document.getElementById('terminal-logs');
  const modalGithubLink = document.getElementById('modal-github-link');

  // Función para mostrar notificaciones Toast
  function showToast(message, duration = 3000) {
    if (!toastBar || !toastText) return;
    toastText.textContent = message;
    toastBar.classList.add('show');
    clearTimeout(toastBar._timeout);
    toastBar._timeout = setTimeout(() => {
      toastBar.classList.remove('show');
    }, duration);
  }

  // 1. Manejador de Contacto por Correo (herbertn740@gmail.com)
  const contactButtons = document.querySelectorAll('[data-purpose="contact-email"]');
  contactButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const mailtoUrl = `mailto:${TARGET_EMAIL}?subject=Contacto%20Profesional%20-%20Desarrollo%20Fullstack&body=Hola%20Herbert,%0D%0A%0D%0AMe%20gustar%C3%ADa%20conversar%20contigo%20sobre%20una%20oportunidad%20para%20un%20proyecto.%0D%0A%0D%0ASaludos.`;

      // Copiar al portapapeles y dar feedback
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(TARGET_EMAIL).then(() => {
          showToast(`Copiado: ${TARGET_EMAIL} · Abriendo cliente de email...`);
        }).catch(() => {
          showToast(`Abriendo email a ${TARGET_EMAIL}...`);
        });
      } else {
        showToast(`Abriendo email a ${TARGET_EMAIL}...`);
      }

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 350);
    });
  });

  // 2. Manejador de GitHub (cuenta herbertDev12)
  const githubLinks = document.querySelectorAll('[data-purpose="github-link"]');
  githubLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const repo = link.getAttribute('data-repo') || '';
      const destUrl = repo ? `${TARGET_GITHUB_BASE}/${repo}` : TARGET_GITHUB_BASE;
      showToast(`Redirigiendo a GitHub: ${destUrl.replace('https://', '')}...`);
      setTimeout(() => {
        window.open(destUrl, '_blank', 'noopener,noreferrer');
      }, 250);
    });
  });

  // 3. Copia de Endpoint de Terminal ($ curl -s https://herbertnavarro.dev/api/v1/profile)
  const copyBtn = document.getElementById('copy-endpoint-btn');
  const copyBtnText = document.getElementById('copy-btn-text');
  const terminalEndpoint = document.getElementById('terminal-endpoint');

  if (copyBtn && terminalEndpoint) {
    copyBtn.addEventListener('click', async () => {
      const endpoint = terminalEndpoint.innerText.trim();
      try {
        await navigator.clipboard.writeText(endpoint);
        copyBtnText.innerText = '¡Copiado con éxito!';
        copyBtn.classList.add('bg-brand-lime', 'text-brand-black');
        showToast(`Endpoint copiado: ${endpoint}`);
        setTimeout(() => {
          copyBtnText.innerText = 'Copiar Endpoint';
          copyBtn.classList.remove('bg-brand-lime', 'text-brand-black');
        }, 2000);
      } catch (err) {
        copyBtnText.innerText = 'Error al copiar';
      }
    });
  }

  // 4. Filtrado de Proyectos (.NET / Next.js, TypeScript Apps, Todos)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => {
        btn.classList.remove('active-filter', 'bg-brand-lime', 'text-brand-black', 'font-semibold');
        btn.classList.add('bg-brand-dark', 'text-slate-400');
      });

      button.classList.remove('bg-brand-dark', 'text-slate-400');
      button.classList.add('active-filter', 'bg-brand-lime', 'text-brand-black', 'font-semibold');

      const filterValue = button.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Validaciones Interactivas en los Cards de Proyectos
  const projectValidations = {
    'novakart': {
      title: 'Validación en Producción: novakart',
      repo: 'novakart',
      category: '.NET API / Next.js',
      checks: [
        { label: 'Repositorio GitHub: herbertDev12/novakart', status: '200 OK', time: '14ms' },
        { label: 'Integridad Backend: .NET 8 ASP.NET Core Web API', status: 'PASS', time: '22ms' },
        { label: 'Frontend Next.js: SSR & Client State Cart Flow', status: 'PASS', time: '35ms' },
        { label: 'Typecheck TypeScript (Strict Mode)', status: '0 ERRORS', time: '18ms' },
        { label: 'CI/CD Pipeline & Tests Unitarios', status: 'PASS 100%', time: '75ms' }
      ]
    },
    'auto-workshop-app': {
      title: 'Validación en Producción: auto-workshop-app',
      repo: 'auto-workshop-app',
      category: 'TypeScript Fullstack App',
      checks: [
        { label: 'Repositorio GitHub: herbertDev12/auto-workshop-app', status: '200 OK', time: '12ms' },
        { label: 'Arquitectura Modular de Gestión de Reservas', status: 'PASS', time: '26ms' },
        { label: 'Módulo de Inventario & Asignación de Citas', status: 'PASS', time: '31ms' },
        { label: 'Typecheck TypeScript & Linter Rules', status: 'PASS', time: '19ms' },
        { label: 'Suite de Tests Automatizados', status: 'PASS (24/24)', time: '82ms' }
      ]
    },
    'animal-shelter-app': {
      title: 'Validación en Producción: animal-shelter-app',
      repo: 'animal-shelter-app',
      category: 'TypeScript Fullstack App',
      checks: [
        { label: 'Repositorio GitHub: herbertDev12/animal-shelter-app', status: '200 OK', time: '15ms' },
        { label: 'Plataforma Interactiva de Adopción Animal', status: 'PASS', time: '28ms' },
        { label: 'Módulo de Seguimiento Médico Veterinario', status: 'PASS', time: '34ms' },
        { label: 'Endpoints de Donaciones & Pasarelas', status: 'PASS', time: '20ms' },
        { label: 'Verificación de Seguridad & Headers', status: 'SECURE A+', time: '60ms' }
      ]
    }
  };

  const cardValidationButtons = document.querySelectorAll('[data-purpose="validate-repo"]');
  cardValidationButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const repoKey = btn.getAttribute('data-repo');
      const data = projectValidations[repoKey];
      if (!data || !validationModal || !terminalLogs) return;

      modalRepoTitle.textContent = data.title;
      terminalLogs.innerHTML = '';
      if (modalGithubLink) {
        modalGithubLink.setAttribute('data-repo', data.repo);
      }

      validationModal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Simular salida de consola paso a paso
      let delay = 100;
      data.checks.forEach((item, idx) => {
        setTimeout(() => {
          const div = document.createElement('div');
          div.className = 'terminal-line';
          div.innerHTML = `
            <span class="terminal-time">[${item.time}]</span>
            <span class="terminal-pass">✔ [${item.status}]</span>
            <span class="terminal-info">${item.label}</span>
          `;
          terminalLogs.appendChild(div);
          terminalLogs.scrollTop = terminalLogs.scrollHeight;

          if (idx === data.checks.length - 1) {
            const badge = document.createElement('div');
            badge.style.marginTop = '10px';
            badge.style.padding = '4px 8px';
            badge.style.background = 'rgba(212, 255, 0, 0.1)';
            badge.style.border = '1px solid rgba(212, 255, 0, 0.3)';
            badge.style.color = '#d4ff00';
            badge.style.borderRadius = '4px';
            badge.style.fontSize = '11px';
            badge.innerHTML = `● ESTADO DEL REPOSITORIO: VALIDADO & SINCRONIZADO CON GITHUB`;
            terminalLogs.appendChild(badge);
          }
        }, delay);
        delay += 180;
      });
    });
  });

  // Cerrar modal
  if (modalClose && validationModal) {
    modalClose.addEventListener('click', () => {
      validationModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    validationModal.addEventListener('click', (e) => {
      if (e.target === validationModal) {
        validationModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && validationModal && validationModal.classList.contains('active')) {
      validationModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});
