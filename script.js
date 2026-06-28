/* --------------------------------------------------
 * RISHI SRIVASTAVA PORTFOLIO JAVASCRIPT
 * Interactive Animations & Navigation Logic
 * -------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });


    // --- Scroll Progress Bar & Sticky Header ---
    const header = document.querySelector('.header');
    const scrollProgress = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Scroll Progress Bar
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScroll > 0) {
            const scrollPercentage = (window.scrollY / totalScroll) * 100;
            scrollProgress.style.width = scrollPercentage + '%';
        }
    });


    // --- Typing Effect (Hero Section) ---
    const words = [
        "Full Stack Developer",
        "MERN Stack Builder",
        "Cybersecurity Enthusiast",
        "AI/ML Developer"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingElement = document.getElementById('typing-text');
    const typingDelay = 150;
    const erasingDelay = 75;
    const newWordDelay = 2000; // Delay between words

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Remove character
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add character
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? erasingDelay : typingDelay;

        if (!isDeleting && charIndex === currentWord.length) {
            // Word fully typed, pause before deleting
            typeSpeed = newWordDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word deleted, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before typing next word
        }

        setTimeout(type, typeSpeed);
    }

    // Start the typing animation
    if (typingElement) {
        setTimeout(type, 1000);
    }


    // --- Scroll Section Active Link Tracker ---
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 200; // Offset for header height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.add('active');
            } else {
                document.querySelector('.nav-link[href*=' + sectionId + ']')?.classList.remove('active');
            }
        });
    });


    // --- Viewport Entrance Fade-in Animation (Observer) ---
    const fadeElements = document.querySelectorAll('.skills-card, .project-card, .timeline-item, .soft-skill-card, .edu-item, .contact-info-panel, .contact-form-panel');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const entranceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        // Initial setup for CSS transitions
        el.classList.add('fade-in-element');
        entranceObserver.observe(el);
    });
});
