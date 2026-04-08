// ===== RESET ALL SECTION ANIMATIONS ON PAGE LOAD =====
function resetAllAnimations() {
    // Reset Home Section
    resetHomeAnimations();
    
    // Reset About Section - Typing effect
    resetAboutTyping();
    
    // Reset Skills Section
    resetSkillsAnimation();
    
    // Reset Internships Section
    resetInternshipsAnimation();
    
    // Reset Certifications Section
    resetCertificationsAnimation();
    
    // Reset Workshops Section
    resetWorkshopsAnimation();
    
    // Reset Projects Section
    resetProjectsAnimation();
    
    // Reset Contact Section
    resetContactAnimation();
}

// ===== HOME SECTION ANIMATIONS =====
function resetHomeAnimations() {
    // Reset title typing animation
    const title = document.querySelector('.title');
    if (title) {
        title.style.animation = 'none';
        title.offsetHeight;
        title.style.animation = 'typing 2s steps(20, end) forwards';
    }
    
    // Reset description animation
    const description = document.querySelector('.description');
    if (description) {
        description.style.animation = 'none';
        description.offsetHeight;
        description.style.animation = 'fadeInUp 1s ease 0.4s forwards';
    }
    
    // Reset hero buttons animation
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        heroButtons.style.animation = 'none';
        heroButtons.offsetHeight;
        heroButtons.style.animation = 'fadeInUp 1s ease 0.5s forwards';
    }
    
    // Reset hero image animation
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.animation = 'none';
        heroImage.offsetHeight;
        heroImage.style.animation = 'fadeInRight 1s ease 0.2s both';
    }
    
    // Reset hero text animation
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        heroText.style.animation = 'none';
        heroText.offsetHeight;
        heroText.style.animation = 'fadeInLeft 1s ease';
    }
}

// ===== ABOUT SECTION - COUNTING ANIMATION FOR STATS =====
let statsAnimationFrame = null;

function animateStats() {
    // Stop any ongoing animation
    if (statsAnimationFrame) {
        cancelAnimationFrame(statsAnimationFrame);
    }
    
    const cgpaElement = document.getElementById('cgpa-number');
    const internshipsElement = document.getElementById('internships-number');
    const projectsElement = document.getElementById('projects-number');
    
    if (!cgpaElement || !internshipsElement || !projectsElement) return;
    
    // Target values
    const cgpaTarget = 8.44;
    const internshipsTarget = 2;
    const projectsTarget = 3;
    
    // Reset to 0 first
    cgpaElement.textContent = '0';
    internshipsElement.textContent = '0';
    projectsElement.textContent = '0';
    
    // Animation duration in milliseconds
    const duration = 2000;
    const startTime = performance.now();
    
    // Flags for plus signs
    const hasInternshipPlus = true;
    const hasProjectPlus = true;
    
    function updateCounters(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        // Update CGPA (float with 2 decimals)
        const currentCgpa = cgpaTarget * easeOutQuart;
        cgpaElement.textContent = currentCgpa.toFixed(2);
        
        // Update Internships (integer)
        const currentInternships = Math.floor(internshipsTarget * easeOutQuart);
        internshipsElement.textContent = currentInternships + (hasInternshipPlus ? '+' : '');
        
        // Update Projects (integer)
        const currentProjects = Math.floor(projectsTarget * easeOutQuart);
        projectsElement.textContent = currentProjects + (hasProjectPlus ? '+' : '');
        
        // Continue animation if not finished
        if (progress < 1) {
            statsAnimationFrame = requestAnimationFrame(updateCounters);
        } else {
            // Ensure final values are exact
            cgpaElement.textContent = cgpaTarget.toFixed(2);
            internshipsElement.textContent = internshipsTarget + '+';
            projectsElement.textContent = projectsTarget + '+';
            statsAnimationFrame = null;
        }
    }
    
    statsAnimationFrame = requestAnimationFrame(updateCounters);
}

// Reset stats to 0 before re-animating
function resetStats() {
    if (statsAnimationFrame) {
        cancelAnimationFrame(statsAnimationFrame);
        statsAnimationFrame = null;
    }
    
    const cgpaElement = document.getElementById('cgpa-number');
    const internshipsElement = document.getElementById('internships-number');
    const projectsElement = document.getElementById('projects-number');
    
    if (cgpaElement) cgpaElement.textContent = '0';
    if (internshipsElement) internshipsElement.textContent = '0';
    if (projectsElement) projectsElement.textContent = '0';
}

// ===== TYPING EFFECT FOR ABOUT SECTION =====
let typingTimeout = null;
let typingInterval = null;

function startTypingEffect() {
    const typingRoleElement = document.getElementById('typing-role');
    if (!typingRoleElement) return;
    
    // Clear any existing timeouts
    if (typingTimeout) clearTimeout(typingTimeout);
    if (typingInterval) clearTimeout(typingInterval);
    
    // Reset text
    typingRoleElement.textContent = '';
    
    const roles = [
        "Frontend Developer",
        "React Developer", 
        "Full Stack Learner",
        "UI Enthusiast"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;

    function typeEffect() {
        if (isWaiting) return;
        
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingRoleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingRoleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isWaiting = true;
            typingTimeout = setTimeout(() => {
                isWaiting = false;
                isDeleting = true;
                typeEffect();
            }, 2000);
            return;
        }

        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingTimeout = setTimeout(typeEffect, 300);
            return;
        }

        const speed = isDeleting ? 50 : 100;
        typingInterval = setTimeout(typeEffect, speed);
    }

    typingInterval = setTimeout(typeEffect, 100);
}

function stopTypingEffect() {
    if (typingTimeout) clearTimeout(typingTimeout);
    if (typingInterval) clearTimeout(typingInterval);
}

function resetAboutTyping() {
    stopTypingEffect();
    startTypingEffect();
}

// Start typing effect on page load
window.addEventListener('DOMContentLoaded', () => {
    startTypingEffect();
});

// ===== SKILLS SECTION ANIMATION =====
function resetSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.classList.remove('visible');
    });
}

// ===== INTERNSHIPS SECTION ANIMATION =====
function resetInternshipsAnimation() {
    const internCards = document.querySelectorAll('.intern-card');
    internCards.forEach(card => {
        card.classList.remove('visible');
    });
}

// ===== CERTIFICATIONS SECTION ANIMATION =====
function resetCertificationsAnimation() {
    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach(card => {
        card.classList.remove('visible');
    });
}

// ===== WORKSHOPS SECTION ANIMATION =====
function resetWorkshopsAnimation() {
    const workshopCards = document.querySelectorAll('.workshop-card');
    workshopCards.forEach(card => {
        card.classList.remove('visible');
    });
}

// ===== PROJECTS SECTION - LEFT TO RIGHT ANIMATION =====
function resetProjectsAnimation() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.remove('visible');
    });
}

// ===== CONTACT SECTION ANIMATION =====
function resetContactAnimation() {
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
    });
}

// ===== OBSERVE ABOUT SECTION FOR STATS AND TYPING =====
const aboutSection = document.getElementById('about');

if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset and start typing effect
                resetAboutTyping();
                // Reset and start counting animation
                resetStats();
                animateStats();
            }
        });
    }, { threshold: 0.3 });
    
    aboutObserver.observe(aboutSection);
}

// ===== SKILLS SECTION OBSERVER =====
const skillsSection = document.getElementById('skills');
let skillsObserver = null;

if (skillsSection) {
    skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.skill-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 80);
                });
            } else {
                const items = entry.target.querySelectorAll('.skill-item');
                items.forEach(item => {
                    item.classList.remove('visible');
                });
            }
        });
    }, { threshold: 0.2 });
    
    skillsObserver.observe(skillsSection);
}

// ===== PROJECTS SECTION - LEFT TO RIGHT OBSERVER (TRIGGERS EVERY TIME) =====
const projectsGrid = document.querySelector('.projects-grid');

if (projectsGrid) {
    const projectsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const projectCards = entry.target.querySelectorAll('.project-card');
                
                // Reset all cards first
                projectCards.forEach(card => {
                    card.classList.remove('visible');
                    void card.offsetWidth; // Force reflow
                });
                
                // Add visible class with staggered delays (left to right)
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 150);
                });
            } else {
                const projectCards = entry.target.querySelectorAll('.project-card');
                projectCards.forEach(card => {
                    card.classList.remove('visible');
                });
            }
        });
    }, { threshold: 0.2 });
    
    projectsObserver.observe(projectsGrid);
}

// Also trigger when clicking on Projects nav link
const projectsNavLink = document.querySelector('a[href="#projects"]');
if (projectsNavLink) {
    projectsNavLink.addEventListener('click', () => {
        setTimeout(() => {
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach(card => {
                card.classList.remove('visible');
                void card.offsetWidth;
            });
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 150);
            });
        }, 100);
    });
}

// ===== INTERNSHIPS SECTION OBSERVER =====
const internshipSection = document.getElementById('internships');
let internshipObserver = null;

if (internshipSection) {
    internshipObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.intern-card');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 200);
                });
            } else {
                const cards = entry.target.querySelectorAll('.intern-card');
                cards.forEach(card => {
                    card.classList.remove('visible');
                });
            }
        });
    }, { threshold: 0.2 });
    
    internshipObserver.observe(internshipSection);
}

// ===== CERTIFICATIONS SECTION - LEFT TO RIGHT ANIMATION (TRIGGERS EVERY TIME) =====
const certGrid = document.querySelector('.cert-grid');

if (certGrid) {
    const certObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const certCards = entry.target.querySelectorAll('.cert-card');
                
                // Reset all cards first (remove visible class)
                certCards.forEach(card => {
                    card.classList.remove('visible');
                    void card.offsetWidth; // Force reflow to reset animation
                });
                
                // Add visible class with staggered delays (left to right)
                certCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100); // 100ms delay between each card
                });
            } else {
                // Remove visible class when scrolling away
                const certCards = entry.target.querySelectorAll('.cert-card');
                certCards.forEach(card => {
                    card.classList.remove('visible');
                });
            }
        });
    }, { threshold: 0.2 });
    
    certObserver.observe(certGrid);
}

// Also trigger when clicking on Certifications nav link
const certNavLink = document.querySelector('a[href="#certifications"]');
if (certNavLink) {
    certNavLink.addEventListener('click', () => {
        setTimeout(() => {
            const certCards = document.querySelectorAll('.cert-card');
            certCards.forEach(card => {
                card.classList.remove('visible');
                void card.offsetWidth;
            });
            certCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 100);
            });
        }, 100);
    });
}

// ===== WORKSHOPS SECTION OBSERVER =====
const workshopGrid = document.querySelector('.workshop-grid');
let workshopObserver = null;

if (workshopGrid) {
    workshopObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const workshopCards = entry.target.querySelectorAll('.workshop-card');
                workshopCards.forEach(card => {
                    card.classList.remove('visible');
                    void card.offsetWidth;
                });
                workshopCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 150);
                });
                entry.target.classList.add('animate');
            } else {
                const workshopCards = entry.target.querySelectorAll('.workshop-card');
                workshopCards.forEach(card => {
                    card.classList.remove('visible');
                });
                entry.target.classList.remove('animate');
            }
        });
    }, { threshold: 0.2 });
    
    workshopObserver.observe(workshopGrid);
}

// ===== CONTACT SECTION OBSERVER =====
const contactSection = document.getElementById('contact');

if (contactSection) {
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll('.contact-item');
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 150);
                });
            } else {
                const items = entry.target.querySelectorAll('.contact-item');
                items.forEach(item => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                });
            }
        });
    }, { threshold: 0.2 });
    
    contactObserver.observe(contactSection);
}

// ===== HOME SECTION OBSERVER =====
const homeSection = document.getElementById('home');

if (homeSection) {
    const homeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                resetHomeAnimations();
            }
        });
    }, { threshold: 0.3 });
    
    homeObserver.observe(homeSection);
}

// ===== MOBILE MENU =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 10px 30px -5px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = '0 4px 20px -5px rgba(0, 0, 0, 0.05)';
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== SCROLL TO SECTION FUNCTION =====
function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        window.scrollTo({
            top: section.offsetTop - 100,
            behavior: 'smooth'
        });
    }
}

// ===== RUN INITIAL ANIMATIONS =====
window.addEventListener('load', () => {
    resetAllAnimations();
    
    // Check if about section is visible on load
    const aboutSectionCheck = document.getElementById('about');
    if (aboutSectionCheck) {
        const rect = aboutSectionCheck.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight) {
            resetStats();
            animateStats();
            resetAboutTyping();
        }
    }
    
    // Check if projects section is visible on load
    if (projectsGrid) {
        const rect = projectsGrid.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= window.innerHeight) {
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 150);
            });
        }
    }
});

// ===== CONSOLE GREETING =====
console.log('%c✨ Welcome to Keerthana\'s Portfolio ✨', 'color: #5D5FEF; font-size: 16px; font-weight: bold;');
console.log('%cFrontend Developer | Computer Science Student', 'color: #10B981; font-size: 14px;');
