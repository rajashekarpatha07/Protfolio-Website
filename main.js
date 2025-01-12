// Initialize Lucide icons
import { getThemePreference, setTheme, toggleTheme } from './theme.js';

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
    // Existing initialization code...
    
    // Initialize theme
    const theme = getThemePreference();
    setTheme(theme);
    
    // Add theme toggle button click handler
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        const newTheme = toggleTheme();
        const icon = document.querySelector('#theme-toggle i');
        icon.setAttribute('name', newTheme === 'dark' ? 'sun' : 'moon');
    });
});
lucide.createIcons();


// Skills data
const skills = [
    {
        category: 'Languages',
        icon: 'code',
        color: '#3b82f6',
        items: ['HTML','CSS','JavaScript','Python']
    },
    {
        category: 'Frameworks',
        icon: 'cpu',
        color: '#8b5cf6',
        items: ['Node.js', 'Express.js', 'FastAPI']
    },
    {
        category: 'Databases',
        icon: 'database',
        color: '#10b981',
        items: ['MongoDB']
    },
    {
        category: 'Tools',
        icon: 'wrench',
        color: '#f59e0b',
        items: ['Git', 'Linux']
    }
];

// Render skills
function renderSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    
    skills.forEach(skillGroup => {
        const card = document.createElement('div');
        card.className = 'skill-card';
        
        card.innerHTML = `
            <div class="skill-header">
                <i data-lucide="${skillGroup.icon}" style="color: ${skillGroup.color}"></i>
                <h3>${skillGroup.category}</h3>
            </div>
            <ul class="skill-list">
                ${skillGroup.items.map(skill => `
                    <li class="skill-item">
                        <i data-lucide="check-circle-2" class="check-icon"></i>
                        <span>${skill}</span>
                    </li>
                `).join('')}
            </ul>
        `;
        
        skillsGrid.appendChild(card);
    });
    
    // Reinitialize icons for the newly added elements
    lucide.createIcons();
}

// Navbar scroll effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.9)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = 'none';
    }
}

// Active nav link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const targetId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${targetId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Scroll to top
function handleScrollToTop() {
    const scrollBtn = document.getElementById('scroll-top');
    
    if (window.scrollY > 500) {
        scrollBtn.style.opacity = '1';
        scrollBtn.style.pointerEvents = 'all';
    } else {
        scrollBtn.style.opacity = '0';
        scrollBtn.style.pointerEvents = 'none';
    }
}

// Form submission
document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    e.target.reset();
    alert('Thank you for your message! I will get back to you soon.');
});

// Scroll animations
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        observer.observe(section);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderSkills();
    setupScrollAnimations();
    
    // Event listeners
    window.addEventListener('scroll', () => {
        handleNavbarScroll();
        updateActiveNavLink();
        handleScrollToTop();
    });
    
    document.getElementById('scroll-top')?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});