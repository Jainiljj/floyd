/* 
   FLOYD - Premium Orthopedic Supports
   Client-Side Interactive Logic
   Author: Antigravity Code Assistant
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Burger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Animate hamburger spans
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
            
            // Simple visual hamburger transforms
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside or on a link
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // 3. Highlight Active Nav Link based on URL
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === pageName || (pageName === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 3b. Tap & Double Click Interaction on Homepage Category Cards
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        const link = card.querySelector('.category-link');
        if (!link) return;
        const targetUrl = link.getAttribute('href');

        // Check if device is mobile based on screen width or touch capability
        const isMobile = window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window);

        if (isMobile) {
            // One tap (single click) on mobile
            card.addEventListener('click', (e) => {
                // If the user clicked the actual link, let default navigation run.
                // Otherwise, navigate manually.
                if (e.target !== link) {
                    e.preventDefault();
                    window.location.href = targetUrl;
                }
            });
            card.style.cursor = 'pointer';
        } else {
            // Double click on laptop/desktop
            card.addEventListener('dblclick', () => {
                window.location.href = targetUrl;
            });
            card.setAttribute('title', 'Double-click anywhere on the card to shop');
        }
    });

    // 4. Products Search & Category Filter Logic
    const searchInput = document.getElementById('search-products');
    const filterChips = document.querySelectorAll('.filter-chip');
    const productCards = document.querySelectorAll('.product-card');
    const noProductsMsg = document.getElementById('no-products-msg');
    
    let activeCategory = 'All';
    let searchQuery = '';

    function filterProducts() {
        let visibleCount = 0;
        
        productCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const name = card.querySelector('.product-name').textContent.toLowerCase();
            const desc = card.querySelector('.product-meta').textContent.toLowerCase();
            
            const matchesCategory = (activeCategory === 'All' || category === activeCategory);
            const matchesSearch = (name.includes(searchQuery) || desc.includes(searchQuery));
            
            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        if (noProductsMsg) {
            if (visibleCount === 0) {
                noProductsMsg.style.display = 'block';
            } else {
                noProductsMsg.style.display = 'none';
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterProducts();
        });
    }

    if (filterChips.length > 0) {
        filterChips.forEach(chip => {
            chip.addEventListener('click', () => {
                filterChips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                activeCategory = chip.getAttribute('data-filter');
                filterProducts();
            });
        });
    }

    // 5. Inquiry Modal Controller
    const modal = document.getElementById('inquiry-modal');
    const modalClose = document.getElementById('modal-close');
    const productSelect = document.getElementById('inquiry-product');
    
    // Open modal on "Inquire Now" button clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-inquire')) {
            const productName = e.target.getAttribute('data-product-name');
            
            if (productSelect && productName) {
                // Set the dropdown to select the product
                productSelect.value = productName;
            }
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Lock background scroll
            }
        }
    });

    if (modalClose && modal) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Click outside content to close
        const backdrop = modal.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        }
    }

    // 6. Form validation and WhatsApp redirection logic
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('inquiry-name').value.trim();
            const phone = document.getElementById('inquiry-phone').value.trim();
            const email = document.getElementById('inquiry-email').value.trim();
            const message = document.getElementById('inquiry-message').value.trim();
            const selectedProduct = productSelect ? productSelect.value : '';
            
            let isValid = true;
            
            // Basic validation checks
            if (name === '') {
                showError('inquiry-name', 'Name is required');
                isValid = false;
            } else {
                hideError('inquiry-name');
            }
            
            if (phone === '' || !/^\+?[0-9\s-]{10,15}$/.test(phone)) {
                showError('inquiry-phone', 'Please enter a valid phone number');
                isValid = false;
            } else {
                hideError('inquiry-phone');
            }
            
            if (email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError('inquiry-email', 'Please enter a valid email address');
                isValid = false;
            } else {
                hideError('inquiry-email');
            }
            
            if (isValid) {
                // Construct pre-filled WhatsApp message
                const waNumber = '919772942774';
                const greeting = 'Hello Vihana Enterprises, I would like to inquire about FLOYD supports.';
                const details = `*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email || 'N/A'}\n*Product:* ${selectedProduct}\n*Message:* ${message}`;
                const text = `${greeting}\n\n${details}`;
                
                const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
                
                // Open WhatsApp in new tab
                window.open(waUrl, '_blank');
                
                // Show local form success animation/state
                inquiryForm.innerHTML = `
                    <div style="text-align: center; padding: 40px 0;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 20px;">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <h3 style="font-size: 20px; margin-bottom: 12px; color: var(--primary-color);">Inquiry Submitted!</h3>
                        <p style="color: var(--text-muted); font-size: 15px; margin-bottom: 24px;">
                            We have generated your inquiry. If the WhatsApp window did not open automatically, click the button below to send it directly.
                        </p>
                        <a href="${waUrl}" target="_blank" class="btn btn-primary" style="background-color: #25D366; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);">
                            Send via WhatsApp
                        </a>
                    </div>
                `;
                
                // Reset scroll lock if in modal
                setTimeout(() => {
                    if (modal && modal.classList.contains('active')) {
                        // Keep open for a bit then allow scroll on exit
                    }
                }, 2000);
            }
        });
    }

    // 7. General Contact Form Logic (on contact.html)
    const contactForm = document.getElementById('general-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contact-name').value.trim();
            const phone = document.getElementById('contact-phone').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            
            let isValid = true;
            
            if (name === '') {
                showError('contact-name', 'Name is required');
                isValid = false;
            } else {
                hideError('contact-name');
            }
            
            if (phone === '' || !/^\+?[0-9\s-]{10,15}$/.test(phone)) {
                showError('contact-phone', 'Please enter a valid phone number');
                isValid = false;
            } else {
                hideError('contact-phone');
            }
            
            if (email !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                showError('contact-email', 'Please enter a valid email address');
                isValid = false;
            } else {
                hideError('contact-email');
            }
            
            if (isValid) {
                const waNumber = '919772942774';
                const text = `Hello Vihana Enterprises, I am contacting you from the FLOYD website.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Email:* ${email || 'N/A'}\n*Message:* ${message}`;
                const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
                
                window.open(waUrl, '_blank');
                
                contactForm.innerHTML = `
                    <div style="text-align: center; padding: 40px 0;">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 20px;">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                        <h3 style="font-size: 20px; margin-bottom: 12px; color: var(--primary-color);">Message Formatted!</h3>
                        <p style="color: var(--text-muted); font-size: 15px; margin-bottom: 24px;">
                            Your message details have been compiled. Click below to initiate WhatsApp chat with Vihana Enterprises.
                        </p>
                        <a href="${waUrl}" target="_blank" class="btn btn-primary" style="background-color: #25D366; box-shadow: 0 4px 14px rgba(37, 211, 102, 0.3);">
                            Start WhatsApp Chat
                        </a>
                    </div>
                `;
            }
        });
    }

    // Helper functions for displaying inline validation errors
    function showError(fieldId, errorMsg) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = 'var(--danger-color)';
            // Find sibling error message div
            const errorDiv = field.parentElement.querySelector('.form-error');
            if (errorDiv) {
                errorDiv.textContent = errorMsg;
                errorDiv.style.display = 'block';
            }
        }
    }

    function hideError(fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = 'var(--border-color)';
            const errorDiv = field.parentElement.querySelector('.form-error');
            if (errorDiv) {
                errorDiv.style.display = 'none';
            }
        }
    }
});
