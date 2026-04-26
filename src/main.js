import './style.css';
import { state, stateEmitter } from './state.js';
import { renderNavigation } from './components/Navigation.js';
import { renderMarketplace } from './components/Marketplace.js';
import { renderLostAndFound } from './components/LostAndFound.js';
import { renderPurchases } from './components/Purchases.js';
import { renderAuth } from './components/Auth.js';

function init() {
  renderApp();

  stateEmitter.addEventListener('stateChanged', () => {
    renderApp();
  });
}

function handleViewChange(newView) {
  renderApp();
}

function renderApp() {
  const containerId = 'main-content-container';
  const navContainer = document.getElementById('navbar-container');

  if (!state.currentUser || state.currentView === 'auth') {
    navContainer.innerHTML = ''; // Hide nav
    renderAuth(containerId);
  } else {
    // Show nav
    renderNavigation('navbar-container', handleViewChange);
    
    if (state.currentView === 'marketplace') {
      renderMarketplace(containerId);
    } else if (state.currentView === 'lostfound') {
      renderLostAndFound(containerId);
    } else if (state.currentView === 'purchases') {
      renderPurchases(containerId);
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
