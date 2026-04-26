import { signupUser, loginUser } from '../state.js';

export function renderAuth(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // By default, showing login form
  const html = `
    <div class="auth-wrapper" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2000') center/cover; position: fixed; top: 0; left: 0; width: 100vw; z-index: 1000;">
      <!-- Dark overlay -->
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(11, 12, 16, 0.85); backdrop-filter: blur(8px);"></div>
      
      <div class="auth-card" style="position: relative; z-index: 10; width: 90%; max-width: 450px; background: var(--glass-bg); border: 1px solid var(--glass-border); border-radius: 20px; padding: 2.5rem; box-shadow: var(--glass-shadow); backdrop-filter: blur(16px);">
        <div style="text-align: center; margin-bottom: 2rem;">
          <i class='bx bx-hive' style="font-size: 3rem; color: var(--accent-primary);"></i>
          <h1 class="text-gradient" style="font-size: 2rem; margin-top: 0.5rem;">Uniexchange</h1>
          <p style="color: var(--text-secondary); margin-top: 0.5rem;">Exclusive campus marketplace</p>
        </div>

        <div class="auth-tabs" style="display: flex; gap: 1rem; margin-bottom: 2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
          <button id="tab-login" style="flex: 1; background: transparent; border: none; color: var(--text-primary); font-size: 1.1rem; font-family: var(--font-heading); font-weight: 600; cursor: pointer; padding-bottom: 0.5rem; border-bottom: 2px solid var(--accent-primary);">Login</button>
          <button id="tab-signup" style="flex: 1; background: transparent; border: none; color: var(--text-secondary); font-size: 1.1rem; font-family: var(--font-heading); font-weight: 600; cursor: pointer; padding-bottom: 0.5rem; border-bottom: 2px solid transparent; transition: all 0.3s;">Sign Up</button>
        </div>

        <!-- Login Form -->
        <form id="login-form">
          <div class="form-group">
            <label class="form-label" for="login-email">College Email</label>
            <input type="email" id="login-email" class="form-control" placeholder="you@college.edu" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="login-password">Password</label>
            <input type="password" id="login-password" class="form-control" placeholder="••••••••" required>
          </div>
          <div id="login-error" style="color: var(--danger-color); font-size: 0.9rem; margin-bottom: 1rem; display: none;"></div>
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: 1rem;">Log In</button>
        </form>

        <!-- Signup Form -->
        <form id="signup-form" style="display: none;">
          <div class="form-group">
            <label class="form-label" for="signup-name">Full Name</label>
            <input type="text" id="signup-name" class="form-control" placeholder="Alex Johnson" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="signup-email">College Email</label>
            <input type="email" id="signup-email" class="form-control" placeholder="you@college.edu" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="signup-password">Password</label>
            <input type="password" id="signup-password" class="form-control" placeholder="Create a password" required>
          </div>
          <div id="signup-error" style="color: var(--danger-color); font-size: 0.9rem; margin-bottom: 1rem; display: none;"></div>
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: 1rem;">Create Account</button>
        </form>

      </div>
    </div>
  `;

  container.innerHTML = html;
  bindAuthEvents();
}

function bindAuthEvents() {
  const tabLogin = document.getElementById('tab-login');
  const tabSignup = document.getElementById('tab-signup');
  const formLogin = document.getElementById('login-form');
  const formSignup = document.getElementById('signup-form');
  const errLogin = document.getElementById('login-error');
  const errSignup = document.getElementById('signup-error');

  tabLogin.addEventListener('click', () => {
    tabLogin.style.color = 'var(--text-primary)';
    tabLogin.style.borderBottomColor = 'var(--accent-primary)';
    tabSignup.style.color = 'var(--text-secondary)';
    tabSignup.style.borderBottomColor = 'transparent';
    formLogin.style.display = 'block';
    formSignup.style.display = 'none';
    errLogin.style.display = 'none';
    errSignup.style.display = 'none';
  });

  tabSignup.addEventListener('click', () => {
    tabSignup.style.color = 'var(--text-primary)';
    tabSignup.style.borderBottomColor = 'var(--accent-primary)';
    tabLogin.style.color = 'var(--text-secondary)';
    tabLogin.style.borderBottomColor = 'transparent';
    formSignup.style.display = 'block';
    formLogin.style.display = 'none';
    errLogin.style.display = 'none';
    errSignup.style.display = 'none';
  });

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    errLogin.style.display = 'none';
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    
    try {
      loginUser(email, pass);
    } catch (err) {
      errLogin.textContent = err.message;
      errLogin.style.display = 'block';
    }
  });

  formSignup.addEventListener('submit', (e) => {
    e.preventDefault();
    errSignup.style.display = 'none';
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const pass = document.getElementById('signup-password').value;

    try {
      signupUser(name, email, pass);
    } catch (err) {
      errSignup.textContent = err.message;
      errSignup.style.display = 'block';
    }
  });
}
