import { state, logoutUser } from '../state.js';

export function renderNavigation(containerId, onViewChange) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <nav class="navbar">
      <div class="nav-brand">
        <i class='bx bx-hive'></i>
        <span class="text-gradient">Uniexchange</span>
      </div>
      <div class="nav-links">
        <button class="nav-btn ${state.currentView === 'marketplace' ? 'active' : ''}" data-view="marketplace">
          <i class='bx bx-store-alt'></i> Marketplace
        </button>
        <button class="nav-btn ${state.currentView === 'lostfound' ? 'active' : ''}" data-view="lostfound">
          <i class='bx bx-search-alt-2'></i> Lost & Found
        </button>
        <button class="nav-btn ${state.currentView === 'purchases' ? 'active' : ''}" data-view="purchases">
          <i class='bx bx-shopping-bag'></i> Purchases
        </button>
      </div>
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span style="color: var(--text-secondary); font-size: 0.9rem;">Hi, ${state.currentUser ? state.currentUser.name : 'User'}</span>
        <button id="btn-logout" class="btn" style="padding: 0.4rem 0.8rem; font-size: 0.8rem; background: rgba(239, 68, 68, 0.1); color: var(--danger-color); border: 1px solid var(--danger-color);">Logout</button>
      </div>
    </nav>
  `;

  // Attach event listeners
  const navBtns = container.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Remove active from all
      navBtns.forEach(b => b.classList.remove('active'));
      // Add active to current
      const targetBtn = e.currentTarget;
      targetBtn.classList.add('active');
      
      const newView = targetBtn.getAttribute('data-view');
      state.currentView = newView;
      onViewChange(newView);
    });
  });

  const btnLogout = container.querySelector('#btn-logout');
  if (btnLogout) {
    btnLogout.addEventListener('click', () => {
      logoutUser();
    });
  }
}
