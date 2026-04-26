import { state } from '../state.js';

export function renderPurchases(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const html = `
    <div class="section-header">
      <div>
        <h1 class="section-title text-gradient">My Purchases</h1>
        <p class="section-desc">View the items you've bought.</p>
      </div>
    </div>

    <div class="items-grid" id="purchases-grid">
      ${renderItemsGrid(state.purchasedItems)}
    </div>
  `;

  container.innerHTML = html;
}

function renderItemsGrid(items) {
  if (!items || items.length === 0) {
    return `<div class="empty-state">
      <i class='bx bx-shopping-bag'></i>
      <h3>No purchases yet</h3>
      <p>Items you buy from the Marketplace will show up here.</p>
    </div>`;
  }

  return items.map(item => `
    <div class="card" style="border: 1px solid var(--success-color);">
      <div class="card-badge found" style="background: var(--success-color); color: #fff;">Purchased</div>
      <div class="card-img-wrapper" style="height: 150px;">
        ${item.image ? `<img src="${item.image}" alt="${item.title}" class="card-img" style="filter: grayscale(30%);">` : `<i class='bx bx-image-alt'></i>`}
      </div>
      <div class="card-content">
        <h3 class="card-title">${item.title}</h3>
        <div class="card-price" style="color: var(--text-secondary);"><del>${item.price}</del></div>
        <p class="card-desc">${item.description}</p>
        <div class="card-footer" style="flex-direction: column; align-items: flex-start; gap: 0.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
          <div style="font-size: 0.85rem; color: var(--text-secondary);"><i class='bx bx-calendar'></i> Bought on: ${item.purchaseDate || 'Recently'}</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);"><i class='bx bx-user'></i> Seller: ${item.seller}</div>
        </div>
      </div>
    </div>
  `).join('');
}
