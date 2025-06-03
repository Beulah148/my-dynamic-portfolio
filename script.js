// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Skill buttons click logic
const skillButtons = document.querySelectorAll('.skill-btn');
const skillDescription = document.getElementById('skill-description');

const skillInfo = {
    "HTML": "HTML (HyperText Markup Language) defines the structure of webpages.",
    "CSS": "CSS styles the layout and appearance of content.",
    "JavaScript": "JavaScript adds interactivity and logic to webpages."
};

skillButtons.forEach(button => {
    button.addEventListener('click', () => {
        const skill = button.dataset.skill;
        skillDescription.textContent = skillInfo[skill];
    });
});

// Dark mode toggle
const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

// Load dark mode on page load
window.addEventListener('load', () => {
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
    }

    // Load projects from JSON
    const projectsContainer = document.getElementById('projects-container');
    fetch('data/portfolio_items.json')
        .then(response => {
            if (!response.ok) throw new Error("Failed to load projects.");
            return response.json();
        })
        .then(projects => {
            projects.forEach(project => {
                const card = document.createElement('div');
                card.classList.add('project-card');
                card.innerHTML = `
                    <h3>${project.name}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank">View Project</a>
                `;
                projectsContainer.appendChild(card);
            });
        })
        .catch(error => {
            console.error(error);
            projectsContainer.innerHTML = '<p>Could not load projects.</p>';
        });
});
