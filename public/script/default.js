document.addEventListener('DOMContentLoaded', () => {
    // Manual Projects Configuration
    const PROJECTS = [
        {
            name: "Timeline.Forum",
            description: "Discuss events in chronological order",
            url: "https://github.com/Tristan-Phillips/timeline",
            website: "https://timeline.forum",
            languages: ["C++", "Vue", "CSS", "HTML"]
        },
        {
            name: "Nerdquiz.Fun",
            description: "A quiz site with no bullshit",
            url: "https://github.com/Tristan-Phillips/nerdquiz.fun",
            website: "https://nerdquiz.fun",
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
            name: "Paintedd Link Hub",
            description: "URL stable for the ever-proliferating online identities (help)",
            url: "https://me.paintedd.art",
            sourcecode: "https://github.com/Tristan-Phillips/Me.Paintedd.Art",
            languages: ["JavaScript", "CSS", "HTML"],
            status: "live"
        },
        {
            name: "Mr4x4 and More Quotes",
            description: "Automotive prayer wheel for when your car breaks down again",
            url: "https://quote.mr4x4andmore.com/",
            languages: ["Wordpress"],
            status: "live"
        },
        {
            name: "TRAP Dashboard",
            description: "Digital life raft for drowning in 62 open browser tabs",
            url: "https://dash.trap.lol",
            sourcecode: "https://github.com/Tristan-Phillips/dash",
            languages: ["JavaScript", "CSS", "HTML"],
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
                card.className = 'project-card';

                const languages = project.languages
                    .map(lang => `<span class="tech-pill">${lang}</span>`)
                    .join('');

                card.innerHTML = `
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