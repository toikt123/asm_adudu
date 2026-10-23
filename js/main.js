/* ==========================================================================
   ADUDU - LUXURY FASHION MAISON (main.js)
   Interactive Features & State Management
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    // 1. STICKY HEADER EFFECT
    const siteHeader = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            siteHeader?.classList.add('scrolled');
        } else {
            siteHeader?.classList.remove('scrolled');
        }
    });

    // 2. MOBILE DRAWER NAVIGATION
    const menuToggleBtn = document.querySelector('.menu-toggle-btn');
    const mobileDrawerOverlay = document.querySelector('.mobile-drawer-overlay');
    const mobileDrawerClose = document.querySelector('.mobile-drawer-close');
    const mobileDrawerLinks = document.querySelectorAll('.mobile-drawer-menu a');

    function openMobileDrawer() {
        mobileDrawerOverlay?.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileDrawer() {
        mobileDrawerOverlay?.classList.remove('open');
        document.body.style.overflow = '';
    }

    menuToggleBtn?.addEventListener('click', openMobileDrawer);
    mobileDrawerClose?.addEventListener('click', closeMobileDrawer);
    mobileDrawerOverlay?.addEventListener('click', (e) => {
        if (e.target === mobileDrawerOverlay) closeMobileDrawer();
    });
    mobileDrawerLinks.forEach(link => {
        link.addEventListener('click', closeMobileDrawer);
    });

    // 3. HERO SLIDER AUTO-PLAY & CONTROLS
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .slider-dot');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    let currentSlide = 0;
    let slideInterval = null;

    function goToSlide(index) {
        if (!slides.length) return;
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    if (slides.length > 0) {
        nextBtn?.addEventListener('click', () => {
            nextSlide();
            resetSlideInterval();
        });

        prevBtn?.addEventListener('click', () => {
            prevSlide();
            resetSlideInterval();
        });

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                goToSlide(idx);
                resetSlideInterval();
            });
        });

        function startSlideInterval() {
            slideInterval = setInterval(nextSlide, 6000);
        }

        function resetSlideInterval() {
            clearInterval(slideInterval);
            startSlideInterval();
        }

        startSlideInterval();

        const sliderElem = document.querySelector('.hero-slider');
        sliderElem?.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderElem?.addEventListener('mouseleave', () => startSlideInterval());
    }

    // 4. PRODUCT FILTER TABS
    const filterBtns = document.querySelectorAll('.product-filters .filter-btn');
    const productCards = document.querySelectorAll('.products-grid .product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 5. SHOPPING CART SYSTEM
    let cart = JSON.parse(localStorage.getItem('adudu_cart')) || [
        {
            id: 'product-1',
            name: 'Túi Xách ADUDU Speedy Bandoulière 25',
            price: 48500000,
            image: 'images/product-1.jpg',
            quantity: 1
        }
    ];

    const cartDrawerOverlay = document.querySelector('.cart-drawer-overlay');
    const cartToggleBtns = document.querySelectorAll('.cart-toggle-btn');
    const cartCloseBtn = document.querySelector('.cart-close-btn');
    const cartBadge = document.querySelector('.cart-badge');
    const cartItemsList = document.querySelector('.cart-items-list');
    const cartTotalAmount = document.querySelector('.cart-total-amount');

    function formatVND(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    }

    function updateCartUI() {
        if (!cartItemsList) return;

        // Calculate count and total
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        if (cartBadge) {
            cartBadge.textContent = totalItems;
        }

        if (cartTotalAmount) {
            cartTotalAmount.textContent = formatVND(totalPrice);
        }

        if (cart.length === 0) {
            cartItemsList.innerHTML = `
                <div class="cart-empty">
                    <i class="fa-solid fa-bag-shopping"></i>
                    <p>Giỏ hàng của Quý khách đang trống.</p>
                    <a href="#products" class="btn btn-primary-luxury" style="margin-top: 1.5rem; display: inline-block;">Khám Phá Sản Phẩm</a>
                </div>
            `;
            return;
        }

        cartItemsList.innerHTML = cart.map((item, idx) => `
            <div class="cart-item" data-index="${idx}">
                <div class="cart-item-img">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">${formatVND(item.price)}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn minus" onclick="changeCartQty(${idx}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn plus" onclick="changeCartQty(${idx}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeCartItem(${idx})" title="Xóa khỏi giỏ hàng">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `).join('');

        localStorage.setItem('adudu_cart', JSON.stringify(cart));
    }

    window.changeCartQty = function (index, delta) {
        if (cart[index]) {
            cart[index].quantity += delta;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
            updateCartUI();
        }
    };

    window.removeCartItem = function (index) {
        cart.splice(index, 1);
        updateCartUI();
        showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
    };

    function openCart() {
        cartDrawerOverlay?.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cartDrawerOverlay?.classList.remove('open');
        document.body.style.overflow = '';
    }

    cartToggleBtns.forEach(btn => btn.addEventListener('click', openCart));
    cartCloseBtn?.addEventListener('click', closeCart);
    cartDrawerOverlay?.addEventListener('click', (e) => {
        if (e.target === cartDrawerOverlay) closeCart();
    });

    // MUA HÀNG BUTTON HANDLER ON PRODUCT CARDS
    const buyButtons = document.querySelectorAll('.btn-buy-product');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.product-card');
            if (!card) return;

            const id = card.getAttribute('data-id') || 'product-1';
            const name = card.querySelector('.product-title')?.textContent.trim() || 'Sản phẩm ADUDU';
            const priceText = card.querySelector('.product-price')?.textContent.replace(/[^0-9]/g, '') || '48500000';
            const price = parseInt(priceText, 10);
            const image = card.querySelector('.product-image-box img')?.getAttribute('src') || 'images/product-1.jpg';

            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, image, quantity: 1 });
            }

            updateCartUI();
            showToast(`Đã thêm "${name}" vào giỏ hàng!`);
            openCart();
        });
    });

    // Initialize cart UI on load
    updateCartUI();

    // 6. LIGHTBOX MODAL
    const lightboxModal = document.querySelector('.lightbox-modal');
    const lightboxImg = document.querySelector('.lightbox-content img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const zoomableImages = document.querySelectorAll('.product-zoom-hint, .lightbox-trigger');

    zoomableImages.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.product-card, .slide, .about-visual-main');
            const img = card ? card.querySelector('img') : null;
            if (img && lightboxModal && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxCaption.textContent = img.alt || 'Maison ADUDU Haute Couture';
                lightboxModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeLightbox() {
        lightboxModal?.classList.remove('active');
        document.body.style.overflow = '';
    }

    lightboxClose?.addEventListener('click', closeLightbox);
    lightboxModal?.addEventListener('click', (e) => {
        if (e.target === lightboxModal) closeLightbox();
    });

    // 7. TOAST NOTIFICATION
    function showToast(message) {
        let toast = document.querySelector('.toast-notice');
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-notice';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--lv-gold);"></i> ${message}`;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }
    window.showToast = showToast;

    // 8. CONTACT FORM SUBMISSION
    const contactForm = document.getElementById('aduduContactForm');
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Trân trọng cảm ơn Quý khách! Chuyên viên ADUDU sẽ liên hệ trong 15 phút.');
        contactForm.reset();
    });

    // 10. NEWSLETTER SUBMISSION
    const newsletterForm = document.getElementById('aduduNewsletterForm');
    newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Quý khách đã đăng ký thành công bản tin Maison ADUDU!');
        newsletterForm.reset();
    });

    // 11. CHECKOUT BUTTON
    const checkoutBtn = document.querySelector('.btn-checkout');
    checkoutBtn?.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Giỏ hàng của Quý khách đang trống!');
            return;
        }
        alert('Cảm ơn Quý khách đã mua sắm tại Maison ADUDU! Đơn hàng trị giá ' + cartTotalAmount?.textContent + ' đang được chuyển đến bộ phận dịch vụ khách hàng cao cấp.');
        cart = [];
        updateCartUI();
        closeCart();
    });
});
