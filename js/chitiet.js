/* ==========================================================================
   ADUDU - LUXURY PRODUCT DETAIL (chitiet.js)
   Interactions for Gallery, Variants, Tabs & Cart Integration
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
    // 1. PRODUCT DATABASE FOR DYNAMIC DETAIL DISPLAY
    const productsDB = {
        'product-1': {
            name: 'Túi Xách ADUDU Speedy Bandoulière 25',
            category: 'Túi Xách Nữ Biểu Tượng',
            sku: 'M41112',
            price: 48500000,
            images: [
                'images/detail-speedy-1.jpg',
                'images/detail-speedy-2.jpg',
                'images/detail-speedy-3.jpg',
                'images/detail-speedy-4.jpg'
            ],
            desc: 'Chiếc túi Speedy Bandoulière 25 mang đậm nét di sản của Maison ADUDU, chế tác từ chất liệu Monogram Canvas huyền thoại viền da bò tự nhiên. Khóa kim loại mạ vàng sang trọng và dây đeo vai tháo rời đem lại phong cách thanh lịch vượt thời gian.'
        },
        'product-2': {
            name: 'Túi ADUDU Neverfull MM Monogram',
            category: 'Túi Xách Tote Cao Cấp',
            sku: 'M40995',
            price: 52000000,
            images: [
                'images/product-2.jpg',
                'images/detail-speedy-2.jpg',
                'images/detail-speedy-3.jpg',
                'images/detail-speedy-4.jpg'
            ],
            desc: 'Chiếc túi Neverfull MM huyền thoại kết hợp thiết kế vượt thời gian với các chi tiết di sản. Rộng rãi nhưng không cồng kềnh, cấu trúc chắc chắn cùng lớp lót vải dệt kẻ sọc rực rỡ đặc trưng.'
        },
        'product-3': {
            name: 'Túi Xách ADUDU Capucines BB Taurillon',
            category: 'Túi Xách Da Cao Cấp',
            sku: 'M94755',
            price: 158000000,
            images: [
                'images/product-3.jpg',
                'images/detail-speedy-1.jpg',
                'images/detail-speedy-3.jpg',
                'images/detail-speedy-4.jpg'
            ],
            desc: 'Được đặt theo tên con phố cửa hàng đầu tiên của Maison năm 1854, Capucines BB là tuyệt tác đồ da thượng hạng làm từ da bê Taurillon nguyên khối, biểu tượng kim loại ADUDU bọc da tinh xảo.'
        },
        'product-4': {
            name: 'Vali Du Lịch ADUDU Horizon 55 Monogram',
            category: 'Hành Lý & Vali Kéo',
            sku: 'M23203',
            price: 96000000,
            images: [
                'images/product-4.jpg',
                'images/campaign-travel.jpg',
                'images/product-5.jpg',
                'images/detail-speedy-3.jpg'
            ],
            desc: 'Hợp tác cùng nhà thiết kế công nghiệp Marc Newson, Horizon 55 định nghĩa lại nghệ thuật du lịch với trọng lượng siêu nhẹ, 4 bánh xe đa hướng êm ái cùng tay kéo nhôm mở rộng bên ngoài tối ưu không gian.'
        },
        'product-5': {
            name: 'Balo Nam ADUDU Christopher MM Macassar',
            category: 'Balo & Túi Du Lịch Nam',
            sku: 'M43735',
            price: 85000000,
            images: [
                'images/product-5.jpg',
                'images/campaign-men.jpg',
                'images/product-4.jpg',
                'images/product-1.jpg'
            ],
            desc: 'Chiếc balo Christopher MM mang phong cách dã ngoại mạnh mẽ kết hợp sự xa xỉ thượng thừa của da canvas Monogram Macassar và chi tiết da đen nhám, hoàn hảo cho quý ông năng động.'
        },
        'product-6': {
            name: 'Giày Sneaker ADUDU Trainer Calf Leather',
            category: 'Giày Thể Thao Cao Cấp',
            sku: '1A9876',
            price: 33500000,
            images: [
                'images/product-6.jpg',
                'images/detail-speedy-2.jpg',
                'images/product-8.jpg',
                'images/campaign-men.jpg'
            ],
            desc: 'Được sáng tạo bởi Giám đốc Nghệ thuật, đôi sneaker ADUDU Trainer lấy cảm hứng từ giày bóng rổ cổ điển, mỗi đôi cần hơn 7 giờ may đo thủ công tỉ mỉ tại Ý.'
        },
        'product-7': {
            name: 'Ví Dài ADUDU Zippy Wallet Monogram',
            category: 'Ví & Phụ Kiện Nhỏ',
            sku: 'M42616',
            price: 24500000,
            images: [
                'images/product-7.jpg',
                'images/product-8.jpg',
                'images/detail-speedy-1.jpg',
                'images/detail-speedy-4.jpg'
            ],
            desc: 'Một trong những mẫu ví mang tính biểu tượng nhất của ADUDU, chiếc ví Zippy đa năng với khóa kéo tròn bằng kim loại vàng ánh kim, chứa 12 ngăn cắm thẻ và ngăn đựng tiền xu an toàn.'
        },
        'product-8': {
            name: 'Dây Thắt Lưng ADUDU Initiales 40mm',
            category: 'Thắt Lưng & Phụ Kiện',
            sku: 'M9043U',
            price: 18500000,
            images: [
                'images/product-8.jpg',
                'images/product-7.jpg',
                'images/campaign-men.jpg',
                'images/product-6.jpg'
            ],
            desc: 'Dây thắt lưng Initiales 40mm có thể xoay đổi 2 mặt: một mặt Monogram Canvas biểu tượng và mặt còn lại bằng da bê mềm mại màu đen, tôn vinh mặt khóa logo ADUDU mạ vàng sáng bóng.'
        }
    };

    // 2. PARSE URL PARAMETERS
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'product-1';
    const currentProduct = productsDB[productId] || productsDB['product-1'];

    // Update DOM with product info
    const titleEl = document.querySelector('.detail-product-title');
    const skuEl = document.querySelector('.detail-sku-val');
    const categoryEl = document.querySelector('.detail-brand-tag');
    const priceEl = document.querySelector('.detail-price-main');
    const descEl = document.querySelector('.detail-desc-text');
    const breadcrumbCurrent = document.querySelector('.breadcrumb-current');
    const mainImg = document.getElementById('detailMainImg');
    const thumbsContainer = document.querySelector('.detail-thumbs-list');

    if (titleEl) titleEl.textContent = currentProduct.name;
    if (skuEl) skuEl.textContent = currentProduct.sku;
    if (categoryEl) categoryEl.textContent = currentProduct.category;
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = currentProduct.name;
    if (descEl) descEl.textContent = currentProduct.desc;
    if (priceEl) {
        priceEl.textContent = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentProduct.price);
    }

    if (mainImg && currentProduct.images && currentProduct.images.length > 0) {
        mainImg.src = currentProduct.images[0];
        mainImg.alt = currentProduct.name;
    }

    if (thumbsContainer && currentProduct.images) {
        thumbsContainer.innerHTML = currentProduct.images.map((imgSrc, idx) => `
            <div class="detail-thumb-item ${idx === 0 ? 'active' : ''}" data-src="${imgSrc}">
                <img src="${imgSrc}" alt="${currentProduct.name} - Góc ${idx + 1}">
            </div>
        `).join('');

        // Re-attach thumbnail click events
        const thumbItems = thumbsContainer.querySelectorAll('.detail-thumb-item');
        thumbItems.forEach(thumb => {
            thumb.addEventListener('click', () => {
                thumbItems.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                const newSrc = thumb.getAttribute('data-src');
                if (mainImg && newSrc) {
                    mainImg.style.opacity = '0';
                    setTimeout(() => {
                        mainImg.src = newSrc;
                        mainImg.style.opacity = '1';
                    }, 200);
                }
            });
        });
    }

    // 3. COLOR SELECTOR
    const colorBtns = document.querySelectorAll('.color-option-btn');
    const colorSelectedName = document.querySelector('.color-selected-name');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (colorSelectedName) {
                colorSelectedName.textContent = btn.getAttribute('data-color-name');
            }
        });
    });

    // 4. SIZE SELECTOR
    const sizeBtns = document.querySelectorAll('.size-option-btn');
    const sizeSelectedVal = document.querySelector('.size-selected-val');
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (sizeSelectedVal) {
                sizeSelectedVal.textContent = btn.getAttribute('data-size');
            }
        });
    });

    // 5. QUANTITY CONTROLLER
    const qtyInput = document.getElementById('productQty');
    const qtyMinusBtn = document.getElementById('qtyMinus');
    const qtyPlusBtn = document.getElementById('qtyPlus');

    qtyMinusBtn?.addEventListener('click', () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val > 1) {
            qtyInput.value = val - 1;
        }
    });

    qtyPlusBtn?.addEventListener('click', () => {
        let val = parseInt(qtyInput.value, 10) || 1;
        if (val < 10) {
            qtyInput.value = val + 1;
        }
    });

    // 6. ACCORDION
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const item = trigger.closest('.accordion-item');
            item.classList.toggle('open');
        });
    });

    // 7. BUY NOW & ADD TO CART ON DETAIL PAGE
    const btnAddToCart = document.getElementById('btnAddToCartDetail');
    const btnBuyNow = document.getElementById('btnBuyNowDetail');

    function addCurrentToCart(quantity) {
        let cart = JSON.parse(localStorage.getItem('adudu_cart')) || [];
        const existing = cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({
                id: productId,
                name: currentProduct.name,
                price: currentProduct.price,
                image: currentProduct.images[0],
                quantity: quantity
            });
        }
        localStorage.setItem('adudu_cart', JSON.stringify(cart));
        if (typeof window.showToast === 'function') {
            window.showToast(`Đã thêm ${quantity} x "${currentProduct.name}" vào giỏ hàng!`);
        } else {
            alert(`Đã thêm ${quantity} x "${currentProduct.name}" vào giỏ hàng!`);
        }
    }

    btnAddToCart?.addEventListener('click', () => {
        const qty = parseInt(qtyInput?.value, 10) || 1;
        addCurrentToCart(qty);
    });

    btnBuyNow?.addEventListener('click', () => {
        const qty = parseInt(qtyInput?.value, 10) || 1;
        addCurrentToCart(qty);
        alert(`Cảm ơn bạn! Đã đặt mua "${currentProduct.name}" (Số lượng: ${qty}). Chúng tôi sẽ liên hệ để xác nhận đơn hàng.`);
    });
});
