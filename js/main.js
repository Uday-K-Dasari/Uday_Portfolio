// Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Skills animation
        function animateSkills() {
            const skillBars = document.querySelectorAll('.skill-progress');
            
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
        }

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.classList.contains('skills')) {
                        animateSkills();
                    }
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe sections for animations
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Contact form handling
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });

        // Add typing effect to hero title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Initialize typing effect when page loads
        window.addEventListener('load', function() {
            const heroTitle = document.querySelector('.hero-title');
            const originalText = heroTitle.innerHTML;
            
            setTimeout(() => {
                typeWriter(heroTitle, originalText, 50);
            }, 1000);
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Add counter animation for stats
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            
            function updateCounter() {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target + '+';
                }
            }
            
            updateCounter();
        }

        // Initialize counter animations when stats section is visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-item h3');
                    counters.forEach(counter => {
                        const target = parseInt(counter.textContent);
                        counter.textContent = '0+';
                        animateCounter(counter, target);
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        const aboutSection = document.querySelector('.about');
        if (aboutSection) {
            statsObserver.observe(aboutSection);
        }

        // Add floating animation to profile image
        const profileImg = document.querySelector('.profile-image');
        if (profileImg) {
            setInterval(() => {
                profileImg.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 10}px)`;
            }, 16);
        }

        // Add gradient background animation
        function animateGradient() {
            const hero = document.querySelector('.hero');
            let hue = 0;
            
            setInterval(() => {
                hue = (hue + 1) % 360;
                hero.style.background = `linear-gradient(135deg, hsl(${hue}, 70%, 60%) 0%, hsl(${hue + 60}, 70%, 60%) 100%)`;
            }, 100);
        }

        // Initialize gradient animation
        animateGradient();

        // Add scroll progress indicator
        function createScrollProgress() {
            const progressBar = document.createElement('div');
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(45deg, #00d4ff, #0099cc);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);

            window.addEventListener('scroll', () => {
                const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (window.scrollY / windowHeight) * 100;
                progressBar.style.width = scrolled + '%';
            });
        }

        createScrollProgress();

        // Add theme toggle functionality
        function createThemeToggle() {
            const toggleButton = document.createElement('button');
            toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
            toggleButton.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                border: none;
                background: linear-gradient(45deg, #00d4ff, #0099cc);
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                z-index: 1000;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0, 212, 255, 0.3);
            `;
            
            toggleButton.addEventListener('mouseenter', () => {
                toggleButton.style.transform = 'scale(1.1)';
            });
            
            toggleButton.addEventListener('mouseleave', () => {
                toggleButton.style.transform = 'scale(1)';
            });
            
            document.body.appendChild(toggleButton);

            let isDark = true;
            toggleButton.addEventListener('click', () => {
                isDark = !isDark;
                if (isDark) {
                    document.body.style.filter = 'brightness(1)';
                    toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
                } else {
                    document.body.style.filter = 'brightness(1.2) contrast(1.1)';
                    toggleButton.innerHTML = '<i class="fas fa-sun"></i>';
                }
            });
        }

        createThemeToggle();