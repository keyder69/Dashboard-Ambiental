// Vivero Umbral — interacciones de la sala de control
// 1) Contraer/expandir la barra lateral en escritorio (recordado en la sesión)
// 2) Abrir/cerrar la barra lateral como cajón en movil

(function () {
  const layout = document.getElementById('layout');
  const sidebar = document.getElementById('sidebar');
  const collapseBtn = document.getElementById('collapseBtn');
  const menuToggle = document.getElementById('menuToggle');
  const overlay = document.getElementById('sidebarOverlay');

  const COLLAPSE_KEY = 'vivero-umbral-sidebar-collapsed';

  function applyCollapsed(collapsed) {
    layout.classList.toggle('is-collapsed', collapsed);
    collapseBtn.setAttribute('aria-expanded', String(!collapsed));
    collapseBtn.setAttribute('aria-label', collapsed ? 'Expandir barra lateral' : 'Contraer barra lateral');
  }

  if (sessionStorage.getItem(COLLAPSE_KEY) === 'true') applyCollapsed(true);

  collapseBtn.addEventListener('click', () => {
    const collapsed = !layout.classList.contains('is-collapsed');
    applyCollapsed(collapsed);
    sessionStorage.setItem(COLLAPSE_KEY, String(collapsed));
  });

  function openDrawer() {
    sidebar.classList.add('is-open');
    overlay.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Cerrar navegación');
    document.addEventListener('keydown', onEscape);
  }

  function closeDrawer() {
    sidebar.classList.remove('is-open');
    overlay.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir navegación');
    document.removeEventListener('keydown', onEscape);
  }

  function onEscape(event) {
    if (event.key === 'Escape') closeDrawer();
  }

  menuToggle.addEventListener('click', () => {
    sidebar.classList.contains('is-open') ? closeDrawer() : openDrawer();
  });

  overlay.addEventListener('click', closeDrawer);

  sidebar.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (window.matchMedia('(max-width: 720px)').matches) closeDrawer();
    });
  });

  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 720px)').matches) {
      sidebar.classList.remove('is-open');
      overlay.hidden = true;
    }
  });
})();
