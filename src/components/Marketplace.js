import { state, addMarketplaceItem, handlePurchaseItem } from '../state.js';

let currentFilter = 'All';

export function renderMarketplace(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const html = `
    <div class="section-header">
      <div>
        <h1 class="section-title text-gradient">Campus Marketplace</h1>
        <p class="section-desc">Buy, sell, and trade with your college community.</p>
      </div>
      <button class="btn btn-primary" id="btn-list-item">
        <i class='bx bx-plus'></i> List an Item
      </button>
    </div>

    <div class="filter-bar" id="marketplace-filters">
      <button class="filter-btn ${currentFilter === 'All' ? 'active' : ''}" data-filter="All">All</button>
      <button class="filter-btn ${currentFilter === 'Books' ? 'active' : ''}" data-filter="Books">Books</button>
      <button class="filter-btn ${currentFilter === 'Electronics' ? 'active' : ''}" data-filter="Electronics">Electronics</button>
      <button class="filter-btn ${currentFilter === 'Dorm' ? 'active' : ''}" data-filter="Dorm">Dorm</button>
    </div>

    <div class="items-grid" id="marketplace-grid">
      ${renderItemsGrid(currentFilter === 'All' ? state.marketplaceItems : state.marketplaceItems.filter(i => i.category === currentFilter))}
    </div>

    <!-- Modal for Listing Item -->
    <div class="modal-overlay" id="list-item-modal">
      <div class="modal">
        <div class="modal-header">
          <h2>List a New Item</h2>
          <button class="close-btn" id="close-modal-btn"><i class='bx bx-x'></i></button>
        </div>
        <form id="list-item-form">
          <div class="form-group">
            <label class="form-label" for="item-title">What are you selling?</label>
            <input type="text" id="item-title" class="form-control" placeholder="e.g. Psychology 101 Book" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="item-price">Price</label>
            <input type="text" id="item-price" class="form-control" placeholder="$0.00" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="item-cat">Category</label>
            <select id="item-cat" class="form-control">
              <option>Books</option>
              <option>Electronics</option>
              <option>Dorm</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="item-desc">Description</label>
            <textarea id="item-desc" class="form-control" placeholder="Describe the condition, location, etc." required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;">Post Item</button>
        </form>
      </div>
    </div>
  `;

  container.innerHTML = html;

  // Bind Events
  bindModalEvents();
  bindBuyButtons();
  bindFilterEvents(containerId);
}

function bindFilterEvents(containerId) {
  const filterBtns = document.getElementById(containerId).querySelectorAll('#marketplace-filters .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      currentFilter = e.currentTarget.getAttribute('data-filter');
      renderMarketplace(containerId);
    });
  });
}

function renderItemsGrid(items) {
  if (items.length === 0) {
    return `<div class="empty-state">
      <i class='bx bx-package'></i>
      <h3>No items found</h3>
      <p>Be the first to list something!</p>
    </div>`;
  }

  return items.map(item => `
    <div class="card">
      <div class="card-badge">${item.category}</div>
      <div class="card-img-wrapper">
        ${item.image ? `<img src="${item.image}" alt="${item.title}" class="card-img">` : `<i class='bx bx-image-alt'></i>`}
      </div>
      <div class="card-content">
        <h3 class="card-title">${item.title}</h3>
        <div class="card-price">${item.price}</div>
        <p class="card-desc">${item.description}</p>
        <div class="card-footer">
          <div class="user-info">
            <div class="user-avatar">${item.seller.charAt(0)}</div>
            <span style="font-size: 0.9rem; color: var(--text-secondary);">${item.seller}</span>
          </div>
          <button class="btn btn-buy" data-id="${item.id}" style="padding: 0.5rem 1rem; font-size: 0.9rem;"><i class='bx bx-cart-add' ></i> Buy</button>
        </div>
      </div>
    </div>
  `).join('');
}

function bindModalEvents() {
  const modal = document.getElementById('list-item-modal');
  const btnList = document.getElementById('btn-list-item');
  const btnClose = document.getElementById('close-modal-btn');
  const form = document.getElementById('list-item-form');

  if(btnList) {
    btnList.addEventListener('click', () => {
      modal.classList.add('active');
    });
  }

  if(btnClose) {
    btnClose.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Close when clicking outside of modal
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  if(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const title = document.getElementById('item-title').value;
      const price = document.getElementById('item-price').value;
      const category = document.getElementById('item-cat').value;
      const description = document.getElementById('item-desc').value;

      addMarketplaceItem({
        title,
        price,
        category,
        description,
        seller: state.currentUser ? state.currentUser.name : 'Unknown User', 
        image: '' // Leaving empty falls back to placeholder icon
      });

      modal.classList.remove('active');
      form.reset();
    });
  }
}

function bindBuyButtons() {
  const buyBtns = document.querySelectorAll('.btn-buy');
  buyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.currentTarget.getAttribute('data-id'));
      if(confirm('Are you sure you want to buy this item?')) {
         alert('Purchase successful! Item moved to Purchases.');
         handlePurchaseItem(id);
      }
    });
  });
}
