const savedAuth = JSON.parse(localStorage.getItem('uniexchange_auth') || '{"users": [], "currentUser": null}');

export const state = {
  currentView: savedAuth.currentUser ? 'marketplace' : 'auth', 
  users: savedAuth.users,
  currentUser: savedAuth.currentUser,
  
  marketplaceItems: [
    {
      id: 1,
      title: 'Calculus Early Transcendentals 9th Ed',
      price: '$45.00',
      description: 'Used for one semester. Great condition, no highlights.',
      seller: 'Alex J.',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
      category: 'Books'
    },
    {
      id: 2,
      title: 'Sony WH-1000XM4 Headphones',
      price: '$180.00',
      description: 'Noise cancelling headphones. Comes with case. Perfect for studying.',
      seller: 'Sam T.',
      image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=600',
      category: 'Electronics'
    },
    {
      id: 3,
      title: 'Mini Fridge - Refrigerator',
      price: '$60.00',
      description: 'Works perfectly. Gotta sell it before I move out of the dorm.',
      seller: 'Jamie L.',
      image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=600',
      category: 'Dorm'
    }
  ],

  lostAndFoundItems: [
    {
      id: 1,
      type: 'lost', // 'lost' or 'found'
      title: 'Lost Keys with Lanyard',
      description: 'Lost my keys near the engineering building. Has a blue Yale lanyard.',
      location: 'Engineering Building',
      contact: 'sarah.k@college.edu',
      date: '2026-04-25'
    },
    {
      id: 2,
      type: 'found',
      title: 'Found Apple Pencil (2nd Gen)',
      description: 'Found on a desk in Library Room 3A.',
      location: 'Library',
      contact: 'library-lost-and-found@college.edu',
    }
  ],

  purchasedItems: []
};

// Simple event target to trigger UI updates when state changes
export const stateEmitter = new EventTarget();

export function addMarketplaceItem(item) {
  state.marketplaceItems.unshift({
    id: Date.now(),
    ...item
  });
  stateEmitter.dispatchEvent(new Event('stateChanged'));
}

export function addLostFoundItem(item) {
  state.lostAndFoundItems.unshift({
    id: Date.now(),
    ...item
  });
  stateEmitter.dispatchEvent(new Event('stateChanged'));
}

export function removeMarketplaceItem(id) {
  state.marketplaceItems = state.marketplaceItems.filter(item => item.id !== id);
  stateEmitter.dispatchEvent(new Event('stateChanged'));
}

export function handlePurchaseItem(id) {
  const item = state.marketplaceItems.find(item => item.id === id);
  if (item) {
    state.purchasedItems.unshift({ ...item, purchaseDate: new Date().toLocaleDateString() });
    state.marketplaceItems = state.marketplaceItems.filter(item => item.id !== id);
    stateEmitter.dispatchEvent(new Event('stateChanged'));
  }
}

export function saveAuth() {
  localStorage.setItem('uniexchange_auth', JSON.stringify({
    users: state.users,
    currentUser: state.currentUser
  }));
}

export function signupUser(name, email, password) {
  if (state.users.find(u => u.email === email)) {
    throw new Error('Email already registered');
  }
  const newUser = { id: Date.now(), name, email, password };
  state.users.push(newUser);
  state.currentUser = newUser;
  state.currentView = 'marketplace';
  saveAuth();
  stateEmitter.dispatchEvent(new Event('stateChanged'));
}

export function loginUser(email, password) {
  const user = state.users.find(u => u.email === email && u.password === password);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  state.currentUser = user;
  state.currentView = 'marketplace';
  saveAuth();
  stateEmitter.dispatchEvent(new Event('stateChanged'));
}

export function logoutUser() {
  state.currentUser = null;
  state.currentView = 'auth';
  saveAuth();
  stateEmitter.dispatchEvent(new Event('stateChanged'));
}
