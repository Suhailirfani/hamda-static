/* ==========================================================================
   INTERACTIVITY AND ANIMATIONS
   Hamda International Campus Static Website Core JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Preloader Handler (Instant & Smooth)
    const preloader = document.getElementById('preloader');
    
    function fadeOutPreloader() {
        if (preloader && !preloader.classList.contains('fade-out')) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            preloader.classList.add('fade-out');
        }
    }

    if (preloader) {
        // Fast dismissal on DOM ready
        setTimeout(fadeOutPreloader, 350);
        window.addEventListener('load', fadeOutPreloader);
    } else {
        fadeOutPreloader();
    }

    // 1. Sticky Navbar Dynamic Color Shift
    const navbar = document.querySelector('.brand-navbar');
    
    function checkScroll() {
        if (!navbar) return;
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
    
    const navLinks = document.querySelectorAll('.nav-link-custom, .mobile-nav-link, .mobile-bottom-nav-item');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === pageName || (pageName === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 2b. Mobile Drawer Navigation Menu Controls
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBackdrop = document.getElementById('menuBackdrop');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const bottomNavMenu = document.getElementById('bottomNavMenu');

    function openMenu() {
        if (mobileMenu) mobileMenu.classList.add('open');
        if (menuBackdrop) menuBackdrop.classList.add('open');
        if (menuToggle) menuToggle.classList.add('open');
        if (bottomNavMenu) bottomNavMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        if (mobileMenu) mobileMenu.classList.remove('open');
        if (menuBackdrop) menuBackdrop.classList.remove('open');
        if (menuToggle) menuToggle.classList.remove('open');
        if (bottomNavMenu) bottomNavMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }
    if (bottomNavMenu) {
        bottomNavMenu.addEventListener('click', (e) => {
            e.preventDefault();
            if (mobileMenu && mobileMenu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }
    if (menuClose) menuClose.addEventListener('click', closeMenu);
    if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
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

    // 5. 3D Card Perspective Tilt Effect
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xc = rect.width / 2;
            const yc = rect.height / 2;
            const dx = x - xc;
            const dy = y - yc;
            
            // Limit the tilt angle to max 8 degrees
            const angleX = -(dy / yc) * 8;
            const angleY = (dx / xc) * 8;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.025)`;
            card.style.boxShadow = `0 20px 40px rgba(141, 27, 61, 0.22)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.boxShadow = '';
        });
    });

    // 6. Magnetic Button Pull Micro-Interaction
    const magneticElements = document.querySelectorAll('.btn-purple, .btn-maroon, .social-btn');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Pull factor (moves 30% of offset distance)
            const pullX = x * 0.3;
            const pullY = y * 0.3;
            
            el.style.transform = `translate(${pullX}px, ${pullY}px) scale(1.04)`;
            el.style.boxShadow = `0 10px 24px rgba(141, 27, 61, 0.4)`;
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0px, 0px) scale(1)';
            el.style.boxShadow = '';
        });
    });

    // 7. Hero Slider Active Parallax Mouse Movement
    const heroSlider = document.getElementById('heroSlider');
    if (heroSlider) {
        // Setup initial slight scale on images for seamless parallax transition
        const carouselImages = heroSlider.querySelectorAll('.carousel-custom-item img');
        carouselImages.forEach(img => {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        });

        heroSlider.addEventListener('mousemove', (e) => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            
            const activeImg = heroSlider.querySelector('.carousel-item.active img');
            if (activeImg) {
                // Calculate percentage offsets relative to screen center
                const xVal = (e.clientX - window.innerWidth / 2) * 0.015;
                const yVal = (e.clientY - window.innerHeight / 2) * 0.015;
                
                activeImg.style.transition = 'transform 0.15s ease-out'; // faster responsiveness when tracking
                activeImg.style.transform = `scale(1.08) translate(${xVal}px, ${yVal}px)`;
            }
        });
        
        heroSlider.addEventListener('mouseleave', () => {
            const activeImg = heroSlider.querySelector('.carousel-item.active img');
            if (activeImg) {
                activeImg.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                activeImg.style.transform = 'scale(1.05) translate(0px, 0px)';
            }
        });

        // Reset transition styles during slide changes
        heroSlider.addEventListener('slide.bs.carousel', () => {
            carouselImages.forEach(img => {
                img.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                img.style.transform = 'scale(1.05) translate(0px, 0px)';
            });
        });
    }

    // 8. Initialize AOS (Animate On Scroll) Engine
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
            delay: 50,
            disable: 'mobile' // fallback purely to CSS reveals on small viewports for battery conservation
        });
    }

    // 9. Contact / Enquiry Form: Google Sheet Recording + Instant WhatsApp Redirection
    // Paste your deployed Google Apps Script Web App URL below:
    const GOOGLE_SHEET_WEBAPP_URL = ''; 

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
            const submitBtn = document.getElementById('enquirySubmitBtn');
            
            let isValid = true;
            
            // Reset custom error borders
            [nameInput, phoneInput, emailInput, courseSelect, messageInput].forEach(input => {
                if (input) input.style.borderColor = 'rgba(141, 27, 61, 0.15)';
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
                // Show submitting loading state on button
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = `<i class="fab fa-whatsapp me-2"></i> Recording & Opening WhatsApp...`;
                }

                // Format student data
                const studentName = nameInput.value.trim();
                const studentPhone = phoneInput.value.trim();
                const studentEmail = emailInput && emailInput.value.trim() ? emailInput.value.trim() : 'Not Provided';
                const selectedStream = courseSelect.value;
                const studentMsg = messageInput && messageInput.value.trim() ? messageInput.value.trim() : 'None';
                const nowTimestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

                // 1. Send data to Google Sheet in the background (non-blocking)
                if (GOOGLE_SHEET_WEBAPP_URL && GOOGLE_SHEET_WEBAPP_URL.trim() !== '') {
                    const formData = new FormData();
                    formData.append('Timestamp', nowTimestamp);
                    formData.append('Student_Name', studentName);
                    formData.append('Phone_Number', studentPhone);
                    formData.append('Stream', selectedStream);
                    formData.append('Email', studentEmail);
                    formData.append('Message', studentMsg);

                    fetch(GOOGLE_SHEET_WEBAPP_URL, {
                        method: 'POST',
                        body: formData,
                        mode: 'no-cors'
                    }).catch(err => console.warn('Google Sheet logging error:', err));
                }

                // 2. Format WhatsApp message
                const waMessage = `*Hamda International Campus - Admission Enquiry (2026–27)*\n\n` +
                    `👤 *Student Name:* ${studentName}\n` +
                    `📱 *Phone Number:* ${studentPhone}\n` +
                    `📚 *Preferred Stream:* ${selectedStream}\n` +
                    `📧 *Email:* ${studentEmail}\n` +
                    `💬 *Questions/Remarks:* ${studentMsg}`;

                const waUrl = `https://wa.me/919562844006?text=${encodeURIComponent(waMessage)}`;

                // 3. Auto-open WhatsApp in new tab / app
                window.open(waUrl, '_blank');

                // 4. Show a confirmation success card
                const formCard = enquiryForm.closest('.card-premium');
                const originalContent = formCard.innerHTML;
                
                formCard.style.opacity = '0';
                setTimeout(() => {
                    formCard.innerHTML = `
                        <div class="text-center py-5 reveal-element active">
                            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style="background: linear-gradient(135deg, #25D366 0%, #128C7E 100%); box-shadow: 0 8px 24px rgba(37, 211, 102, 0.35);">
                                <i class="fab fa-whatsapp text-white text-4xl"></i>
                            </div>
                            <h3 class="font-serif fw-bold text-dark fs-2 mb-3">Enquiry Recorded & Sent!</h3>
                            <p class="text-slate-700 mb-2 px-3">Thank you, <b>${studentName}</b>. Your admission enquiry details for <b>${selectedStream}</b> have been recorded and sent to our WhatsApp desk.</p>
                            <p class="text-slate-500 text-xs mb-6">If WhatsApp did not open automatically, click the button below to continue chatting.</p>
                            
                            <div class="flex flex-col sm:flex-row gap-3 justify-center">
                                <a href="${waUrl}" target="_blank" class="btn btn-maroon px-5 py-2.5 rounded-full text-xs font-bold" style="background: #25D366 !important; border-color: #25D366 !important; color: #FFFFFF !important;"><i class="fab fa-whatsapp me-2"></i> Open WhatsApp Chat</a>
                                <button id="resetFormBtn" class="btn btn-outline-purple px-5 py-2.5 rounded-full text-xs font-bold">Submit Another Enquiry</button>
                            </div>
                        </div>
                    `;
                    formCard.style.opacity = '1';
                    
                    const resetBtn = document.getElementById('resetFormBtn');
                    if (resetBtn) {
                        resetBtn.addEventListener('click', () => {
                            formCard.style.opacity = '0';
                            setTimeout(() => {
                                formCard.innerHTML = originalContent;
                                formCard.style.opacity = '1';
                                document.location.reload();
                            }, 300);
                        });
                    }
                }, 350);
            }
        });
    }
});
