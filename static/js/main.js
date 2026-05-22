/* ==========================================================================
   INTERACTIVITY AND ANIMATIONS
   Hamda Science Academy Static Website Core JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar Dynamic Color Shift
    const navbar = document.querySelector('.brand-navbar');
    
    function checkScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Check initially and on scroll
    checkScroll();
    window.addEventListener('scroll', checkScroll);

    // 2. Active Page Nav Link Highlighter
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    const navLinks = document.querySelectorAll('.nav-link-custom');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === pageName || (pageName === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3. Scroll Reveal Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-element');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it contains stats counters, trigger the count animation
                const counterElements = entry.target.querySelectorAll('.stats-counter');
                if (counterElements.length > 0) {
                    counterElements.forEach(counter => {
                        if (!counter.classList.contains('counted')) {
                            animateCounter(counter);
                        }
                    });
                }
                
                // Once revealed, we don't need to observe it again
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 4. Statistics Count-Up Animation
    function animateCounter(counterElement) {
        counterElement.classList.add('counted');
        const target = parseInt(counterElement.getAttribute('data-target'), 10);
        const prefix = counterElement.getAttribute('data-prefix') || '';
        const suffix = counterElement.getAttribute('data-suffix') || '';
        
        let current = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        
        const timer = setInterval(() => {
            current += Math.ceil(target / (duration / stepTime));
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counterElement.textContent = prefix + current + suffix;
        }, stepTime);
    }

    // 5. Contact / Enquiry Form Interactive Response
    const enquiryForm = document.getElementById('enquiryForm');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Client-side validation
            const nameInput = document.getElementById('enquiryName');
            const phoneInput = document.getElementById('enquiryPhone');
            const emailInput = document.getElementById('enquiryEmail');
            const courseSelect = document.getElementById('enquiryCourse');
            const messageInput = document.getElementById('enquiryMessage');
            
            let isValid = true;
            
            // Reset custom error borders
            [nameInput, phoneInput, emailInput, courseSelect, messageInput].forEach(input => {
                if (input) input.style.borderColor = 'rgba(212, 175, 55, 0.15)';
            });

            if (!nameInput.value.trim()) {
                nameInput.style.borderColor = '#8D1B3D';
                isValid = false;
            }
            
            if (!phoneInput.value.trim() || phoneInput.value.length < 10) {
                phoneInput.style.borderColor = '#8D1B3D';
                isValid = false;
            }

            if (!courseSelect.value) {
                courseSelect.style.borderColor = '#8D1B3D';
                isValid = false;
            }

            if (isValid) {
                // Show a stunning glassmorphic success modal overlay
                const formCard = enquiryForm.closest('.card-premium');
                const originalContent = formCard.innerHTML;
                
                formCard.style.opacity = '0';
                setTimeout(() => {
                    formCard.innerHTML = `
                        <div class="text-center py-5 reveal-element active">
                            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold mb-6" style="background: linear-gradient(135deg, var(--gold-glow) 0%, var(--premium-gold) 100%);">
                                <i class="fas fa-check text-bg-midnight text-4xl"></i>
                            </div>
                            <h3 class="font-serif fw-bold text-gold fs-2 mb-3">Enquiry Submitted!</h3>
                            <p class="text-slate-300 mb-6">Thank you, <b>${nameInput.value}</b>. Your interest in Hamda Science Academy is received. Our academic coordinator will contact you shortly on <b>${phoneInput.value}</b>.</p>
                            <div class="inline-flex gap-3 justify-center">
                                <a href="https://wa.me/919562844006?text=Hi,%20I%20have%20submitted%20my%20enquiry.%20Name:%20${encodeURIComponent(nameInput.value)}" target="_blank" class="btn btn-maroon px-4 py-2 rounded-pill"><i class="fab fa-whatsapp me-2"></i> WhatsApp Connect</a>
                                <button id="resetFormBtn" class="btn btn-outline-gold px-4 py-2 rounded-pill">Submit Another</button>
                            </div>
                        </div>
                    `;
                    formCard.style.opacity = '1';
                    
                    document.getElementById('resetFormBtn').addEventListener('click', () => {
                        formCard.style.opacity = '0';
                        setTimeout(() => {
                            formCard.innerHTML = originalContent;
                            formCard.style.opacity = '1';
                            // rebind the form submission logic recursively
                            document.location.reload();
                        }, 400);
                    });
                }, 400);
            }
        });
    }
});
