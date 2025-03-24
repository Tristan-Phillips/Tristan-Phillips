document.addEventListener('DOMContentLoaded', async () => {
    const LOADING_DELAY = 300;
    const startTime = Date.now();
  
    const loadingOverlay = document.getElementById('loading-overlay');
    const container = document.getElementById('categories-container');
  
    try {
      const response = await fetch('/quiz/public/data/quizzes.json');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
  
      const elapsed = Date.now() - startTime;
      const remainingDelay = Math.max(LOADING_DELAY - elapsed, 0);
  
      await new Promise(resolve => setTimeout(resolve, remainingDelay));
      renderCategories(data.categories);
    } catch (error) {
      console.error('Knowledge matrix initialization failed:', error);
      showErrorState(error);
    } finally {
      loadingOverlay.style.opacity = '0';
      setTimeout(() => (loadingOverlay.style.display = 'none'), 300);
    }
  
    function renderCategories(categories) {
      container.innerHTML = '';
      const fragment = document.createDocumentFragment();
  
      categories.forEach((category) => {
        const card = createCategoryCard(category);
        fragment.appendChild(card);
      });
  
      container.appendChild(fragment);
      initCategoryInteractions();
    }
  
    function createCategoryCard(category) {
      const card = document.createElement('div');
      card.className = `category-card ${category.status}`;
  
      // Add link wrapper only for active categories
      if (category.status === 'active') {
        const link = document.createElement('a');
        link.href = category.href || '#';
        link.className = 'card-link';
        link.setAttribute('aria-label', `Access ${category.title} content`);
        card.appendChild(link);
      }
  
      const status = document.createElement('div');
      status.className = 'category-status';
      status.textContent = category.status === 'active' ? 'Online' : 'Under Development';
      status.dataset.status = category.status;
  
      const icon = document.createElement('div');
      icon.className = 'category-icon';
      icon.textContent = category.icon;
      icon.setAttribute('aria-hidden', 'true');
  
      const title = document.createElement('h3');
      title.className = 'category-title';
      title.id = `category-${category.id}-title`;
      title.textContent = category.title;
  
      const description = document.createElement('p');
      description.className = 'category-desc';
      description.textContent = category.description;
  
      card.prepend(status, icon, title, description);
      return card;
    }
  
    function initCategoryInteractions() {
      // Active card interaction
      document.querySelectorAll('.category-card.active').forEach((card) => {
        card.addEventListener('click', (e) => {
          if (!e.target.closest('.card-link')) {
            e.preventDefault();
            showTemporaryMessage('🧠 Activating knowledge pathways...');
            card.querySelector('.card-link').click();
          }
        });
      });
  
      // Pending card hover effect
      document.querySelectorAll('.category-card.pending').forEach((card) => {
        card.addEventListener('mouseenter', () => handleCardHover(card, true));
        card.addEventListener('mouseleave', () => handleCardHover(card, false));
      });
  
      // Add disable hover effect for pending cards
      document.querySelectorAll('.category-card:not(.active)').forEach((card) => {
        card.addEventListener('click', (e) => {
          e.preventDefault();
          showTemporaryMessage('🧠 Neural pathway not yet calibrated');
        });
      });
    }
  
    function handleCardHover(card, isHovering) {
      const icon = card.querySelector('.category-icon');
      if (icon) {
        icon.style.transform = isHovering 
          ? 'rotate(8deg) scale(1.1)' 
          : 'rotate(0) scale(1)';
      }
    }
  
    function showTemporaryMessage(message) {
      const msg = document.createElement('div');
      msg.className = 'system-alert';
      msg.textContent = message;
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 2000);
    }
  
    function showErrorState(error) {
      container.innerHTML = `
        <div class="error-state">
          <div class="error-icon">⚠️</div>
          <h3 class="error-title">Memory Retrieval Failure</h3>
          <p class="error-details">${error.message}</p>
          <button class="retry-btn" onclick="location.reload()">
            Retry Connection
          </button>
        </div>
      `;
    }
  });