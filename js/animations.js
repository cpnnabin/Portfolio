// ==========================================
// All visual effects and animations
// ==========================================

document.addEventListener('DOMContentLoaded', function () {
    // ==========================================
    // Particle Background
    // ==========================================
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.querySelector('.hero-section').appendChild(particlesContainer);

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // ==========================================
    // Parallax Effect
    // ==========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const decorations = document.querySelectorAll('.floating-decoration');
        
        decorations.forEach((decoration, index) => {
            const speed = 0.5 + (index * 0.1);
            decoration.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ==========================================
    // 3D Tilt Effect on Cards
    // ==========================================
    document.querySelectorAll('.info-card, .interest-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ==========================================
    // Add floating shapes
    // ==========================================
    function createFloatingShapes() {
        const shapes = ['circle', 'square'];
        for (let i = 0; i < 5; i++) {
            const shape = document.createElement('div');
            shape.className = `floating-shape shape-${shapes[i % 2]}`;
            shape.style.left = Math.random() * 100 + '%';
            shape.style.top = Math.random() * 100 + '%';
            document.querySelector('.hero-section').appendChild(shape);
        }
    }
    createFloatingShapes();

    // ==========================================
    // Dynamic Text Reveal
    // ==========================================
    function revealText() {
        const heroDesc = document.querySelectorAll('.hero-description');
        heroDesc.forEach(desc => {
            const text = desc.textContent;
            desc.textContent = '';
            desc.style.opacity = '1';
            
            let i = 0;
            const interval = setInterval(() => {
                if (i < text.length) {
                    desc.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 20);
        });
    }

    // ==========================================
    // Magnetic Button Effect
    // ==========================================
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.1)`;
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });

    // ==========================================
    // Smooth Reveal on Load
    // ==========================================
    window.addEventListener('load', () => {
        setTimeout(() => {
            revealText();
        }, 800);
    });

    // ==========================================
    // Add glitch effect to title
    // ==========================================
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('glitch');
        heroTitle.setAttribute('data-text', heroTitle.textContent);
    }

    // ==========================================
    // Gallery hover effect enhancement
    // ==========================================
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // ==========================================
    // Add neon border effect to cards
    // ==========================================
    document.querySelectorAll('.info-card, .interest-card, .timeline-content').forEach(card => {
        card.classList.add('neon-border');
    });

    // ==========================================
    // Enhanced Card Hover with Dynamic Glow
    // ==========================================
    document.querySelectorAll('.info-card, .interest-card, .gallery-item, .timeline-content').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', glowX + '%');
            card.style.setProperty('--mouse-y', glowY + '%');
            card.style.background = `radial-gradient(circle 200px at ${glowX}% ${glowY}%, rgba(37, 99, 235, 0.08), transparent), white`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = '';
        });
    });

    // ==========================================
    // Color Shift on Scroll
    // ==========================================
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const scrollPercent = scrollTop / (document.documentElement.scrollHeight - window.innerHeight);
        const hueShift = scrollPercent * 40;
        
        document.querySelectorAll('.holographic').forEach(el => {
            el.style.filter = `hue-rotate(${hueShift}deg) brightness(1.1)`;
        });
        
        lastScrollTop = scrollTop;
    });

    // ==========================================
    // Dynamic Background
    // ==========================================
    window.addEventListener('scroll', () => {
        const scrollPercent = window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight);
        const lightness = 98 - (scrollPercent * 2);
        document.body.style.backgroundColor = `hsl(260, 25%, ${lightness}%)`;
    });

    // ==========================================
    // Enhanced Social Link Magnetic Effect
    // ==========================================
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function(e) {
            const siblings = Array.from(this.parentElement.children);
            siblings.forEach(sibling => {
                if (sibling !== this) {
                    sibling.style.transform = 'scale(0.9)';
                    sibling.style.opacity = '0.5';
                }
            });
        });
        
        link.addEventListener('mouseleave', function() {
            const siblings = Array.from(this.parentElement.children);
            siblings.forEach(sibling => {
                sibling.style.transform = '';
                sibling.style.opacity = '';
            });
        });
    });

    // ==========================================
    // Parallax Decorations Enhanced
    // ==========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.floating-decoration').forEach((decoration, index) => {
            const speed = (index % 3 + 1) * 0.3;
            const direction = index % 2 === 0 ? 1 : -1;
            decoration.style.transform = `translateY(${scrolled * speed * direction}px) rotate(${scrolled * 0.05}deg)`;
        });
    });

    // ==========================================
    // Text Scramble Effect
    // ==========================================
    function scrambleText(element, finalText) {
        const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
        let iteration = 0;
        const interval = setInterval(() => {
            element.textContent = finalText
                .split('')
                .map((char, index) => {
                    if (char === ' ') return ' ';
                    if (index < iteration) {
                        return finalText[index];
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');
            
            if (iteration >= finalText.length) {
                clearInterval(interval);
            }
            iteration += 1 / 2;
        }, 40);
    }

    // Apply scramble effect to section titles
    document.querySelectorAll('.section-title').forEach(title => {
        const originalText = title.textContent;
        title.addEventListener('mouseenter', () => {
            scrambleText(title, originalText);
        });
    });

    // ==========================================
    // Staggered Text Reveal for Hero Title
    // ==========================================
    const staggerTextElements = document.querySelectorAll('.stagger-text');
    staggerTextElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            const delayMs = index * 80;
            span.style.animationDelay = delayMs + 'ms';
            element.appendChild(span);
        });
    });

    // ==========================================
    // Enhanced Holographic Effect
    // ==========================================
    document.querySelectorAll('.holographic').forEach(el => {
        el.style.animation = 'holographicShift 3s ease infinite';
    });
});