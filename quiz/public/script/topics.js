class KnowledgePortal {
  constructor() {
    this.domain = this.getDomainFromPath();
    this.modulesContainer = document.getElementById('modules-container');
    this.loadingOverlay = document.getElementById('loading-overlay');
    this.domainTitle = document.getElementById('domain-title');
    this.domainDescription = document.getElementById('domain-description');
    this.init();
  }

  async init() {
    try {
      this.setTheme();
      this.showLoading();
      const data = await this.fetchDomainData();
      this.renderPortal(data);
      this.initInteractions();
    } catch (error) {
      this.showError(error);
    } finally {
      this.hideLoading();
    }
  }

  getDomainFromPath() {
    const path = window.location.pathname.split('/');
    return path[3]; 
  }

  setTheme() {
    document.body.setAttribute('data-category', this.domain);
  }

  async fetchDomainData() {
    const response = await fetch('/quiz/public/data/quizzes.json');
    if (!response.ok) throw new Error('Knowledge repository unavailable');
    const data = await response.json();

    return {
      meta: data.categories.find(c => c.id === this.domain),
      qualifications: data[this.domain]?.topics || []
    };
  }

  renderPortal(data) {
    if (!data.qualifications.length) throw new Error('No topics available');

    this.domainTitle.textContent = data.meta.title;
    this.domainDescription.textContent = data.meta.description;

    this.modulesContainer.innerHTML = data.qualifications
      .map(qualification => this.createQualificationSection(qualification))
      .join('');
  }

  createQualificationSection(qualification) {
    const sortedCourses = qualification.courses.slice().sort((a, b) => {
      // Prioritize active status
      if (a.status === 'active' && b.status !== 'active') return -1;
      if (b.status === 'active' && a.status !== 'active') return 1;

      // Then sort alphabetically by course code
      return a.code.localeCompare(b.code);
    });

    return `
      <section class="qualification-section">
        <header class="qualification-header">
          <h2 class="qualification-code">${qualification.code}</h2>
          <div class="qualification-meta">
            <h3 class="qualification-title">${qualification.title}</h3>
            ${this.createStatusBadge(qualification.status)}
          </div>
        </header>

        <div class="course-grid">
          ${sortedCourses.map(course => this.createCourseCard(course)).join('')}
        </div>
      </section>
    `;
  }

  createCourseCard(course) {
    const audioLabels = {
      full: 'Audio Lessons',
      partial: 'Partial Audio',
      none: 'No Audio Support'
    };

    return `
      <article class="course-card ${course.status}" data-course="${course.id}">
        <div class="course-meta">
          <span class="course-code">${course.code}</span>
          ${this.createStatusBadge(course.status)}
        </div>
        <h4 class="course-title">${course.title}</h4>
        ${course.description ? `<p class="course-desc">${course.description}</p>` : ''}
        <div class="audio-support">
          <span class="audio-badge ${course.audioSupport}">
            <i class="${course.audioSupport === 'none' ? 'fas fa-ban' : 'fas fa-headphones'}"></i>
            ${audioLabels[course.audioSupport]}
          </span>
          ${course.lastUpdated ? `<span class="audio-badge">
            <i class="fas fa-calendar-alt"></i>
            Updated: ${course.lastUpdated}
          </span>` : ''}
        </div>
        <a href="${course.href}" class="course-link" 
          ${course.status !== 'active' ? 'aria-disabled="true"' : ''}>
          Start Quiz
        </a>
      </article>
    `;
  }

  createStatusBadge(status) {
    const statusText = {
      active: 'Available',
      coming_soon: 'Pending',
      deprecated: 'Archived'
    }[status] || 'Unknown Status';

    return `<span class="status-badge ${status}">${statusText}</span>`;
  }

  initInteractions() {
    document.querySelectorAll('.course-card').forEach(card => {
      if (!card.classList.contains('active')) {
        card.addEventListener('click', () => {
          this.showToast('This Quiz is not currently available');
        });
      }
    });
  }

  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  showLoading() {
    this.loadingOverlay.style.display = 'flex';
  }

  hideLoading() {
    this.loadingOverlay.style.display = 'none';
  }

  showError(error) {
    this.modulesContainer.innerHTML = `
      <div class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>Data Load Error</h3>
        <p>${error.message}</p>
        <button onclick="location.reload()">Retry Connection</button>
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new KnowledgePortal();
});