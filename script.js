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

    // ==========================================================================
    // 6. Dynamic Product Detail Overlay Page (Apple + Amazon Style)
    // ==========================================================================
    
    const PRODUCTS_DATA = {
        "knee-cap": {
            id: "knee-cap",
            name: "FLOYD 2D Knitted Knee Cap",
            category: "Knee Support",
            rating: 4.8,
            reviewsCount: 230,
            mainImage: "assets/data/FLOYD 2D Knitted Knee Cap/1.png",
            galleryImages: [
                "assets/data/FLOYD 2D Knitted Knee Cap/1.png",
                "assets/data/FLOYD 2D Knitted Knee Cap/2.png",
                "assets/data/FLOYD 2D Knitted Knee Cap/3.png",
                "assets/data/FLOYD 2D Knitted Knee Cap/4.png",
                "assets/data/FLOYD 2D Knitted Knee Cap/5.png"
            ],
            description: "FLOYD 2D Knitted Knee Cap is designed to provide superior knee compression, support, and comfort during daily activities, sports, and post-injury recovery. Its breathable knitted structure ensures long-lasting comfort.",
            features: [
                "Breathable knitted fabric for all-day comfort",
                "4-way compression support to stabilize joints",
                "Anti-slip silicone grip to prevent sliding",
                "Patella cushioning support for kneecap pressure relief",
                "Suitable for sports, heavy workouts & recovery"
            ],
            sizes: ["S", "M", "L", "XL"],
            specs: {
                "Material": "Nylon + Spandex + Silicone",
                "Compression Level": "Medium to High",
                "Color": "Grey / Clinical Blue",
                "Usage": "Knee Joint Support & Stabilization",
                "Washable": "Yes (Hand wash recommended)"
            },
            faqs: [
                { q: "How do I choose the correct size?", a: "Measure the circumference of your thigh 5 inches above your kneecap and refer to our size selector guide." },
                { q: "Can I wear this knee cap while sleeping?", a: "It is generally not recommended to wear high-compression supports while sleeping unless advised by a clinician." },
                { q: "Is the material breathable for hot weather?", a: "Yes, the 2D knitting uses highly breathable nylon spandex fibers that vent sweat instantly." }
            ]
        },
        "ls-belt": {
            id: "ls-belt",
            name: "FLOYD Lumbar Sacral (LS) Belt",
            category: "Back Support",
            rating: 4.9,
            reviewsCount: 312,
            mainImage: "assets/back_support_ls.png",
            galleryImages: [
                "assets/back_support_ls.png"
            ],
            description: "FLOYD Lumbar Sacral (LS) Belt is clinically engineered to support the lower spine, relieve acute back pain, and correct posture. Equipped with semi-rigid metal splints for optimal reinforcement.",
            features: [
                "Semi-rigid back splints for sturdy spine support",
                "Double-pull elastic mechanism for customizable compression",
                "Highly ventilated mesh fabric prevents heat accumulation",
                "Ergonomically contoured shape fits perfectly under clothes",
                "Relieves lumbar strain, sciatica, and spinal fatigue"
            ],
            sizes: ["S", "M", "L", "XL"],
            specs: {
                "Material": "Polyester + Neoprene + Steel Splints",
                "Compression Level": "High Reinforcement",
                "Color": "Dark Clinical Navy",
                "Usage": "Lower Back Support & Pain Relief",
                "Washable": "Hand wash only (remove splints)"
            },
            faqs: [
                { q: "How long should I wear the LS belt daily?", a: "For recovery, 2-4 hours during active movement is recommended. Consult your orthopedist for specific duration guidelines." },
                { q: "Can this belt be worn under a shirt?", a: "Yes, the low-profile contoured design sits flat against the lower back and is virtually invisible under regular clothing." }
            ]
        },
        "abdominal-belt": {
            id: "abdominal-belt",
            name: "FLOYD Abdominal Support Belt",
            category: "Abdominal Support",
            rating: 4.7,
            reviewsCount: 185,
            mainImage: "assets/data/FLOYD Abdominal Support Belt/1.png",
            galleryImages: [
                "assets/data/FLOYD Abdominal Support Belt/1.png",
                "assets/data/FLOYD Abdominal Support Belt/2.png",
                "assets/data/FLOYD Abdominal Support Belt/3.png",
                "assets/data/FLOYD Abdominal Support Belt/4.png",
                "assets/data/FLOYD Abdominal Support Belt/5.png"
            ],
            description: "FLOYD Abdominal Support Belt provides compression to the abdomen and waist, aiding post-operative recovery, supporting incisions, and restoring abdominal wall tone.",
            features: [
                "Broad width design covers the entire abdominal region",
                "Optimal compression speeds up healing of surgical incisions",
                "Premium breathable elastic avoids skin irritation or rashes",
                "Velcro closures ensure simple adjustment and secure fit",
                "Excellent for post-pregnancy abdominal binding and support"
            ],
            sizes: ["M", "L", "XL", "XXL"],
            specs: {
                "Material": "Cotton-Elastic Blend + Velcro",
                "Compression Level": "Medium to High Elasticity",
                "Color": "Soft Grey / Blue Accents",
                "Usage": "Post-Operative & Post-Pregnancy Binding",
                "Washable": "Yes (Mild detergent)"
            },
            faqs: [
                { q: "Can I use this for postpartum support?", a: "Yes, this belt is ideal for restoring muscle tone and supporting the lower abdomen post-delivery." },
                { q: "Will the belt roll down during movement?", a: "No, the internal flexible stays prevent the belt from rolling down or folding over." }
            ]
        },
        "contour-lumbar": {
            id: "contour-lumbar",
            name: "FLOYD Contour Lumbar Belt",
            category: "Back Support",
            rating: 4.8,
            reviewsCount: 198,
            mainImage: "assets/data/FLOYD Contour Lumbar Belt/1.png",
            galleryImages: [
                "assets/data/FLOYD Contour Lumbar Belt/1.png",
                "assets/data/FLOYD Contour Lumbar Belt/2.png",
                "assets/data/FLOYD Contour Lumbar Belt/3.png",
                "assets/data/FLOYD Contour Lumbar Belt/4.png",
                "assets/data/FLOYD Contour Lumbar Belt/5.png",
                "assets/data/FLOYD Contour Lumbar Belt/6.png"
            ],
            description: "FLOYD Contour Lumbar Belt is an advanced orthopedic brace designed with a dynamic contour shape to provide targeted comfort and structural compression to the lower back and lumbar vertebrae.",
            features: [
                "Contoured frame matches the natural curve of the spine",
                "Deep pelvic cut avoids pinching at the groin or thighs",
                "Dynamic lumbar pad offers localized pressure to sore muscles",
                "Industrial-strength velcro closures do not slip under load",
                "Ideal for weightlifters, warehouse workers, and drivers"
            ],
            sizes: ["S", "M", "L", "XL"],
            specs: {
                "Material": "Nylon Mesh + EVA Foam + Lumbar Pad",
                "Compression Level": "High (Contoured Fit)",
                "Color": "Clinical Navy / Slate Grey",
                "Usage": "Heavy Work & Posture Correction",
                "Washable": "Hand wash only"
            },
            faqs: [
                { q: "What is the difference between this and the LS belt?", a: "The Contour Lumbar Belt features a special curved cut and dynamic EVA foam lumbar pad, making it better suited for active movements, work, and heavy lifting." }
            ]
        }
    };

    const detailOverlay = document.getElementById('product-detail-overlay');
    if (detailOverlay) {
        const backBtn = document.getElementById('back-to-catalog');
        const detailMainImg = document.getElementById('detail-main-img');
        const detailCategory = document.getElementById('detail-category');
        const detailTitle = document.getElementById('detail-title');
        const detailRatingText = document.getElementById('detail-rating-text');
        const detailSizes = document.getElementById('detail-sizes');
        const detailInquireBtn = document.getElementById('detail-inquire-btn');
        const detailFeatures = document.getElementById('detail-features');
        const detailDescription = document.getElementById('detail-description');
        const detailSpecs = document.getElementById('detail-specs');
        const detailFaqs = document.getElementById('detail-faqs');
        const reviewsAvgScore = document.getElementById('reviews-avg-score');
        const reviewsTotalCount = document.getElementById('reviews-total-count');
        const detailReviewsList = document.getElementById('detail-reviews-list');
        const thumbGallery = document.getElementById('thumb-gallery');

        // Static rich mock reviews
        const mockReviews = [
            { user: "Rohan S.", date: "15 June 2026", rating: 5, text: "Excellent fit and support. Helps a lot with joint stiffness during workouts. The silicon grip keeps it firmly in place." },
            { user: "Dr. Anjali M. (Orthopedist)", date: "02 May 2026", rating: 5, text: "I regularly recommend Floyd supports to my patients. The fabric density provides uniform pressure and stabilizes the joint without restricting mobility." },
            { user: "Vikram K.", date: "24 April 2026", rating: 4, text: "Very supportive. Helps relieve lower back strain while sitting for long hours at the office. High-quality Velcro holds firmly." }
        ];

        const showProductDetail = (productId, updateHash = true) => {
            const data = PRODUCTS_DATA[productId];
            if (!data) return;

            // Load texts
            detailCategory.textContent = data.category;
            detailTitle.textContent = data.name;
            detailRatingText.textContent = `${data.rating} stars (${data.reviewsCount} reviews)`;
            reviewsAvgScore.textContent = data.rating;
            reviewsTotalCount.textContent = `${data.reviewsCount} reviews`;
            detailDescription.textContent = data.description;
            detailMainImg.src = data.mainImage;
            detailMainImg.alt = data.name;

            // Render features list
            detailFeatures.innerHTML = '';
            data.features.forEach(feat => {
                const li = document.createElement('li');
                li.textContent = feat;
                detailFeatures.appendChild(li);
            });

            // Render sizes
            detailSizes.innerHTML = '';
            data.sizes.forEach((size, idx) => {
                const btn = document.createElement('button');
                btn.className = `size-btn ${idx === 1 ? 'active' : ''}`;
                btn.textContent = size;
                btn.addEventListener('click', () => {
                    detailSizes.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
                detailSizes.appendChild(btn);
            });

            // Render specs table
            detailSpecs.innerHTML = '';
            for (const [key, val] of Object.entries(data.specs)) {
                const row = document.createElement('div');
                row.className = 'specs-row';
                row.innerHTML = `<span class="specs-label">${key}</span><span class="specs-value">${val}</span>`;
                detailSpecs.appendChild(row);
            }

            // Render FAQs
            detailFaqs.innerHTML = '';
            data.faqs.forEach(faq => {
                const item = document.createElement('div');
                item.className = 'faq-item';
                item.innerHTML = `
                    <div class="faq-question">${faq.q}</div>
                    <div class="faq-answer">${faq.a}</div>
                `;
                item.querySelector('.faq-question').addEventListener('click', () => {
                    item.classList.toggle('active');
                });
                detailFaqs.appendChild(item);
            });

            // Render reviews
            detailReviewsList.innerHTML = '';
            mockReviews.forEach(rev => {
                const item = document.createElement('div');
                item.className = 'review-item';
                item.innerHTML = `
                    <div class="review-header">
                        <span class="review-user">${rev.user}</span>
                        <span class="review-date">${rev.date}</span>
                    </div>
                    <div class="review-stars" style="color: #FBBF24; margin-bottom: 8px;">${'★'.repeat(rev.rating)}</div>
                    <p class="review-body">${rev.text}</p>
                `;
                detailReviewsList.appendChild(item);
            });

            // Generate thumbnails from actual product gallery images
            thumbGallery.innerHTML = '';
            const galleryImages = data.galleryImages || [data.mainImage];

            galleryImages.forEach((imgSrc, i) => {
                const item = document.createElement('div');
                item.className = `thumbnail-item ${i === 0 ? 'active' : ''}`;
                
                const img = document.createElement('img');
                img.src = imgSrc;
                item.appendChild(img);

                item.addEventListener('click', () => {
                    thumbGallery.querySelectorAll('.thumbnail-item').forEach(b => b.classList.remove('active'));
                    item.classList.add('active');
                    detailMainImg.src = imgSrc;
                    detailMainImg.style.transform = 'none';
                });

                thumbGallery.appendChild(item);
            });

            // Add size chart as last thumbnail
            const sizeChartItem = document.createElement('div');
            sizeChartItem.className = 'thumbnail-item';
            sizeChartItem.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:10px;font-weight:800;color:var(--accent-blue);background:#e6f0ff;text-align:center;padding:2px;">SIZE CHART</div>`;
            sizeChartItem.addEventListener('click', () => {
                alert(`Size Chart Guide for ${data.name}:\n\nS: Fits joint circumference 12-14" (30-35 cm)\nM: Fits joint circumference 14-16" (35-40 cm)\nL: Fits joint circumference 16-18" (40-45 cm)\nXL: Fits joint circumference 18-20" (45-50 cm)\n\nMeasure circumference 5 inches (12 cm) above the center of the joint.`);
            });
            thumbGallery.appendChild(sizeChartItem);

            detailMainImg.style.transform = 'none';

            // Connect CTA: Inquire Now (WhatsApp redirect)
            detailInquireBtn.onclick = () => {
                const activeSizeBtn = detailSizes.querySelector('.size-btn.active');
                const selectedSize = activeSizeBtn ? activeSizeBtn.textContent : 'M';
                const message = `Hello! I would like to inquire about purchasing the: *${data.name}* (Size: *${selectedSize}*).\n\nPlease provide availability and direct billing info.`;
                const whatsappUrl = `https://wa.me/919772942774?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
            };


            // Display overlay with transitions
            detailOverlay.style.display = 'block';
            setTimeout(() => {
                detailOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }, 10);

            // Update URL hash for deep-linking
            if (updateHash) {
                window.location.hash = `product-${productId}`;
            }
        };

        const closeProductDetail = () => {
            detailOverlay.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                detailOverlay.style.display = 'none';
            }, 350);
            history.pushState("", document.title, window.location.pathname + window.location.search);
        };

        backBtn.addEventListener('click', closeProductDetail);

        // Bind clicks to main product cards on catalog
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => {
            const productId = card.getAttribute('data-product-id');
            if (!productId) return;

            card.addEventListener('click', (e) => {
                e.preventDefault();
                showProductDetail(productId);
            });
            card.style.cursor = 'pointer';
            card.setAttribute('title', 'Click to view premium product details');
        });

        // Check hash link on load/hashchange for direct deep linking
        const checkHashLink = () => {
            const hash = window.location.hash;
            if (hash.startsWith('#product-')) {
                const productId = hash.replace('#product-', '');
                showProductDetail(productId, false);
            }
        };

        window.addEventListener('load', checkHashLink);
        window.addEventListener('hashchange', checkHashLink);
    }
});
