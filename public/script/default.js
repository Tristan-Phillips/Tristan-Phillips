function trackLoadTime() {
    const loadNotice = document.getElementById('load-sorcery');
    const loadTimeDisplay = document.getElementById('load-time');
    let hasReported = false;

    // Method 1: PerformanceObserver
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const navEntry = entries.find(e => e.entryType === 'navigation');
        processEntry(navEntry);
    });

    // Method 2: Fallback check on load
    window.addEventListener('load', () => {
        const entries = performance.getEntriesByType('navigation');
        const navEntry = entries[0];
        if (!hasReported) processEntry(navEntry);
    });

    function processEntry(navEntry) {
        if (!navEntry || hasReported) return;

        // Ensure valid load completion
        if (navEntry.loadEventEnd === 0) {
            setTimeout(() => processEntry(navEntry), 100);
            return;
        }

        const loadDuration = navEntry.duration.toFixed(1);
        if (loadDuration <= 0) return;

        loadTimeDisplay.textContent = loadDuration;
        loadTimeDisplay.dataset.suffix = 'ms';
        loadNotice.classList.add('visible');

        setTimeout(() => {
            loadNotice.classList.remove('visible');
            observer.disconnect();
            hasReported = true;
        }, 2000);
    }

    observer.observe({ type: 'navigation', buffered: true });
}

function trackLargestResource() {
    const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
            .filter(e => e.initiatorType === 'img')
            .sort((a,b) => b.size - a.size);

        if (entries.length) {
            const slowest = entries[0];
            console.log(`Largest resource: ${slowest.name} (${slowest.size/1000}KB)`);
        }
    });

    observer.observe({
        type: 'resource',
        buffered: true
    });
}

// ======== SKILLS SECTION FUNCTIONALITY ======== //
async function initializeSkills() {
    // Fetch last GitHub commit date
    const getLastCommitDate = async () => {
        try {
            const response = await fetch('https://api.github.com/users/Tristan-Phillips/events');
            if (!response.ok) throw new Error('GitHub API error');

            const events = await response.json();
            const pushEvents = events.filter(e => e.type === 'PushEvent');

            if (!pushEvents.length) return new Date('2000-01-01');

            const lastCommit = pushEvents[0].created_at;
            return new Date(lastCommit);

        } catch (error) {
            console.error('GitHub commit fetch failed:', error);
            return new Date(); // Fallback to today's date
        }
    };
    
     // Update days since and memory bar
     const updateSkillsSection = async () => {
        const lastCommitDate = await getLastCommitDate();
        const currentDate = new Date();

        // Calculate days difference
        const diffMs = currentDate - lastCommitDate;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        // Update display
        document.getElementById('days-since-refresh').textContent = diffDays;

        // Calculate memory bar width (100% - days, min 10%)
        const memoryWidth = Math.max(10, 100 - diffDays) + '%';
        const memoryBar = document.querySelector('.memory-bar');
        if (memoryBar) {
            memoryBar.style.width = memoryWidth;
            memoryBar.title = `Last commit: ${lastCommitDate.toLocaleDateString()}`;
        }
    };
    // Initial setup
    updateSkillsSection().catch(console.error);

    // Auto-update every hour
    setInterval(() => {
        updateSkillsSection().catch(console.error);
    }, 3600000); // 1 hour
}

async function updateLabCounter() {
    try {
        const portalItem = document.querySelector('#experiment-counter .tooltip');
        if (!portalItem) return;

        // Fetch experiments data
        const response = await fetch('/lab/public/data/experiments.json');
        if (!response.ok) throw new Error('Failed to load experiments');

        const data = await response.json();
        const experiments = data.experiments || [];

        // Count live+beta+alpha experiments
        const experimentalProjects = experiments.length;
        const liveCount = experiments.filter(p => p.status?.toLowerCase() === 'live').length;

        // Fun status messages
        let statusMessage;
        if (experimentalProjects === 0) {
            statusMessage = 'Lab Currently Haunted';
        } else {
            statusMessage = `${experimentalProjects} Active`;
            statusMessage += ` (${liveCount} Live)`;
        }

        portalItem.textContent = statusMessage;
    } catch (error) {
        console.error('Lab counter error:', error);
        document.querySelector('#experiment-counter .tooltip').textContent =
            'Experiment Data Corrupted';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    // Manual Projects Configuration
    const PROJECTS = [
        {
            name: "Timeline.Forum",
            status: "concept",
            description: "Discuss events in chronological order",
            url: "https://github.com/Tristan-Phillips/timeline",
            website: "https://timeline.forum",
            languages: ["C++", "Vue", "CSS", "HTML"]
        },
        {
            name: "Nerdquiz.Fun",
            status: "beta",
            description: "A quiz site with no bullshit",
            url: "https://github.com/Tristan-Phillips/nerdquiz.fun",
            website: "https://nerdquiz.fun",
            languages: ["JavaScript", "CSS", "HTML"]
        },
        {
            name: "Paintedd.art",
            status: "concept",
            description: "A full site for art",
            url: "https://github.com/Tristan-Phillips/Paintedd.art",
            website: "https://paintedd.art",
            languages: ["JavaScript", "CSS", "HTML"]
        },
        {
            name: "MutualCombat.xyz",
            status: "concept",
            description: "Where consent to throw hands is just a swipe away",
            url: "https://github.com/Tristan-Phillips/mutualcombat.xyz",
            website: "https://mutualcombat.xyz",
            languages: ["Basic Web Stack", "PostgreSQL"]
        },
        {
            name: "PersonalFootprint.Online",
            status: "concept",
            description: "Document your online footprint",
            url: "https://github.com/Tristan-Phillips/personalfootprint.online",
            website: "https://personalfootprint.online/",
            languages: ["JavaScript", "CSS", "HTML"]
        }
    ];

    // Live Projects Configuration
    const LIVE_PROJECTS = [
        {
            name: "Paintedd.Store",
            description: "Digital capitalism simulator powered by Shopify and artistic desperation",
            url: "https://paintedd.store",
            languages: ["Shopify"],
            status: "Live"
        },
        {
            name: "Mr4x4 and More Quotes",
            description: "Automotive prayer wheel for when your car breaks down again",
            url: "https://quote.mr4x4andmore.com/",
            languages: ["Wordpress"],
            status: "live"
        }
    ];

    // Render GitHub Projects
    function renderGitHubProjects() {
        try {
            const projectGrid = document.getElementById('github-projects');
            projectGrid.innerHTML = '';
    
            PROJECTS.forEach(project => {
                const card = document.createElement('div');
                card.className = `project-card ${project.status}`; // Add status class
    
                const statusLabel = {
                    concept: '🚧 Concept',
                    beta: '🔧 Beta',
                    alpha: '⚠️ Alpha',
                    live: '🚀 Live'
                }[project.status] || '🗺️ Planning';
    
                const languages = project.languages
                    .map(lang => `<span class="tech-pill">${lang}</span>`)
                    .join('');
    
                card.innerHTML = `
                    <div class="project-status ${project.status}">
                        ${statusLabel}
                    </div>
                    <h3>${project.name}</h3>
                    ${project.description ? `<p>${project.description}</p>` : ''}
                    <div class="tech-list">${languages}</div>
                    <div class="project-links">
                        ${project.website ? `
                            <a href="${project.website}" target="_blank" class="web-link">
                                <i class="fas fa-external-link-alt"></i> Visit Site
                            </a>
                        ` : ''}
                        <a href="${project.url}" target="_blank" class="github-link">
                            <i class="fas fa-code-branch"></i> View Source
                        </a>
                    </div>
                `;
    
                card.style.animation = 'fadeIn 0.5s ease';
                projectGrid.appendChild(card);
            });
        } catch (error) {
            console.error('Project load failed:', error);
            document.getElementById('github-projects').innerHTML = `
                <div class="project-card">
                    <h3>Dimension Error</h3>
                    <p>Projects currently in another reality.</p>
                </div>
            `;
        }
    }

    // Render Live Projects
    function renderLiveProjects() {
        try {
            const liveGrid = document.getElementById('live-projects');
            liveGrid.innerHTML = '';

            LIVE_PROJECTS.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card live-project-card';

                const languages = project.languages
                .map(lang => `<span class="tech-pill">${lang}</span>`)
                .join('');

                card.innerHTML = `
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <div class="tech-list">${languages}</div>
                    <a href="${project.url}" target="_blank" class="project-button">
                        <i class="fas fa-external-link-alt"></i>
                        Visit ${project.status === 'beta' ? 'Beta' : 'Live Site'}
                    </a>
                `;

                card.style.animation = 'fadeIn 0.5s ease';
                liveGrid.appendChild(card);
            });
        } catch (error) {
            console.error('Live projects load failed:', error);
        }
    }

    // Initial Rendering
    renderGitHubProjects();
    renderLiveProjects();
    await updateLabCounter();
    await initializeSkills();
    trackLoadTime();
    trackLargestResource();

    // Education Cards Animation
    document.querySelectorAll('.edu-card').forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = 1;
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Avatar Hover Effect
    const avatar = document.querySelector('.avatar');
    if (avatar) {
        document.addEventListener('mousemove', (e) => {
            const { clientX: x, clientY: y } = e;
            const rect = avatar.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const rotateX = Math.min(Math.max((-(y - centerY)) / 10, -15), 15).toFixed(2);
            const rotateY = Math.min(Math.max((x - centerX) / 10, -15), 15).toFixed(2);

            avatar.style.transform = `perspective(100px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Reset rotation when mouse leaves
        document.addEventListener('mouseleave', () => {
            avatar.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }

    // Random micro-interactions
    document.querySelectorAll('.interest-cloud span').forEach(span => {
        span.style.transform = `rotate(${(Math.random() * 4 - 2)}deg)`;
        span.addEventListener('mouseover', () => {
            span.style.transform = 'rotate(0deg) scale(1.1)';
        });
        span.addEventListener('mouseout', () => {
            span.style.transform = `rotate(${(Math.random() * 4 - 2)}deg)`;
        });
    });
});