import { state, addLostFoundItem } from '../state.js';

let currentLFFilter = 'All Reports';

export function renderLostAndFound(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const html = `
    <div class="section-header">
      <div>
        <h1 class="section-title text-gradient">Lost & Found</h1>
        <p class="section-desc">Report lost items or help someone find what they lost.</p>
      </div>
      <button class="btn btn-primary" id="btn-report-item">
        <i class='bx bx-plus'></i> Report Item
      </button>
    </div>

    <div class="filter-bar" id="lf-filters">
      <button class="filter-btn ${currentLFFilter === 'All Reports' ? 'active' : ''}" data-filter="All Reports">All Reports</button>
      <button class="filter-btn ${currentLFFilter === 'Lost Items' ? 'active' : ''}" data-filter="Lost Items">Lost Items</button>
      <button class="filter-btn ${currentLFFilter === 'Found Items' ? 'active' : ''}" data-filter="Found Items">Found Items</button>
    </div>

    <div class="items-grid" id="lostfound-grid">
      ${renderItemsGrid(currentLFFilter === 'All Reports' ? state.lostAndFoundItems : state.lostAndFoundItems.filter(i => (currentLFFilter === 'Lost Items' ? i.type === 'lost' : i.type === 'found')))}
    </div>

    <!-- Modal for Reporting Item -->
    <div class="modal-overlay" id="report-item-modal">
      <div class="modal">
        <div class="modal-header">
          <h2>Report Lost or Found Item</h2>
          <button class="close-btn" id="clf-modal-btn"><i class='bx bx-x'></i></button>
        </div>
        <form id="report-item-form">
          <div class="form-group">
            <label class="form-label" for="report-type">Report Type</label>
            <select id="report-type" class="form-control" required>
              <option value="lost">I Lost Something</option>
              <option value="found">I Found Something</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="lf-title">Item Name</label>
            <input type="text" id="lf-title" class="form-control" placeholder="e.g. Blue Hydroflask" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="lf-location">Location</label>
            <input type="text" id="lf-location" class="form-control" placeholder="Where was it lost/found?" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="lf-contact">Contact Info</label>
            <input type="text" id="lf-contact" class="form-control" placeholder="Email or Phone Number" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="lf-desc">Extra Details</label>
            <textarea id="lf-desc" class="form-control" placeholder="Color, brand, identifying marks..." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">Submit Report</button>
        </form>
      </div>
    </div>
  `;

  container.innerHTML = html;

  bindModalEvents();
  bindFilterEvents(containerId);
}

function bindFilterEvents(containerId) {
  const filterBtns = document.getElementById(containerId).querySelectorAll('#lf-filters .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentLFFilter = e.currentTarget.getAttribute('data-filter');
      renderLostAndFound(containerId);
    });
  });
}

function renderItemsGrid(items) {
  if (items.length === 0) {
    return `<div class="empty-state">
      <i class='bx bx-search'></i>
      <h3>No reports</h3>
      <p>Nothing has been reported lost or found yet.</p>
    </div>`;
  }

  return items.map(item => {
    const isLost = item.type === 'lost';
    const badgeClass = isLost ? 'lost' : 'found';
    const badgeText = isLost ? 'LOST' : 'FOUND';
    const iconClass = isLost ? 'bx-error-circle' : 'bx-check-circle';

    return `
    <div class="card" style="border-top: 4px solid ${isLost ? 'var(--danger-color)' : 'var(--success-color)'}">
      <div class="card-badge ${badgeClass}">${badgeText}</div>
      <div class="card-content">
        <h3 class="card-title"><i class='bx ${iconClass}' style="color: ${isLost ? 'var(--danger-color)' : 'var(--success-color)'}"></i> ${item.title}</h3>
        <p class="card-desc" style="margin-top: 1rem;">${item.description}</p>
        
        <div class="card-meta">
          <i class='bx bx-map'></i> ${item.location}
        </div>
        <div class="card-meta">
          <i class='bx bx-calendar'></i> ${item.date}
        </div>

        <div class="card-footer" style="flex-direction: column; align-items: flex-start; gap: 0.5rem; border-top: 1px solid var(--border-color); padding-top: 1rem;">
          <strong style="color: var(--text-primary); font-size: 0.9rem;">Contact:</strong>
          <span style="font-size: 0.9rem; color: var(--text-secondary); background: var(--bg-color); padding: 0.5rem; border-radius: 6px; width: 100%; word-break: break-all;">${item.contact}</span>
        </div>
      </div>
    </div>
  `}).join('');
}

function bindModalEvents() {
  const modal = document.getElementById('report-item-modal');
  const btnReport = document.getElementById('btn-report-item');
  const btnClose = document.getElementById('clf-modal-btn');
  const form = document.getElementById('report-item-form');

  if(btnReport) {
    btnReport.addEventListener('click', () => {
      modal.classList.add('active');
    });
  }

  if(btnClose) {
    btnClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  if(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const type = document.getElementById('report-type').value;
      const title = document.getElementById('lf-title').value;
      const location = document.getElementById('lf-location').value;
      const contact = document.getElementById('lf-contact').value;
      const description = document.getElementById('lf-desc').value;
      const date = new Date().toISOString().split('T')[0];

      addLostFoundItem({
        type,
        title,
        location,
        contact,
        description,
        date
      });

      modal.classList.remove('active');
      form.reset();
    });
  }
}
