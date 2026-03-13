/* ========================================
   PRODUCTS.JS - INNOVA IMPORT PIURA
   Base de datos de productos y funciones
   ======================================== */

const defaultProducts = [
  {
    id: 1,
    name: 'Audífonos Bluetooth Sport 200H',
    category: 'audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    description: 'Audífonos inalámbricos con hasta 20h de batería, cancelación de ruido pasiva y diseño sport resistente al sudor. Compatibles con Android e iOS. 🔥 ¡Uno de los más vendidos!',
    presentations: [
      { name: 'Unidad', price: 89.00 }
    ],
    stock: 25,
    bestSelling: true,
    dateAdded: new Date('2025-01-10')
  },
  {
    id: 2,
    name: 'Mouse Gamer RGB',
    category: 'perifericos',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop',
    description: 'Mouse óptico con iluminación RGB personalizable, 6 botones programables y sensor de hasta 3200 DPI. Ideal para gaming y trabajo.',
    presentations: [
      { name: 'Unidad', price: 55.00 }
    ],
    stock: 40,
    bestSelling: true,
    dateAdded: new Date('2025-01-15')
  },
  {
    id: 3,
    name: 'Teclado Mecánico Gaming',
    category: 'perifericos',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop',
    description: 'Teclado mecánico TKL con switches Blue, iluminación RGB por tecla y diseño compacto. Respuesta táctil precisa para gaming y programación.',
    presentations: [
      { name: 'Español (104 teclas)', price: 149.00 },
      { name: 'TKL (87 teclas)', price: 129.00 }
    ],
    stock: 18,
    bestSelling: false,
    dateAdded: new Date('2025-01-20')
  },
  {
    id: 4,
    name: 'Micrófono USB Condensador',
    category: 'audio',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=400&fit=crop',
    description: 'Micrófono de condensador plug & play, ideal para streaming, podcasts y videollamadas. Patrón cardioide y soporte ajustable incluido.',
    presentations: [
      { name: 'Con soporte', price: 119.00 },
      { name: 'Solo micrófono', price: 89.00 }
    ],
    stock: 15,
    bestSelling: false,
    dateAdded: new Date('2025-02-01')
  },
  {
    id: 5,
    name: 'Enfriador de Celular',
    category: 'accesorios',
    image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
    description: 'Ventilador magnético para celular con tecnología Peltier. Reduce hasta 20°C la temperatura de tu smartphone durante gaming prolongado.',
    presentations: [
      { name: 'Unidad', price: 45.00 }
    ],
    stock: 30,
    bestSelling: true,
    dateAdded: new Date('2025-02-10')
  },
  {
    id: 6,
    name: 'Laptop Ofimática / Estudiantes',
    category: 'computadoras',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    description: 'Laptops importadas para trabajo y estudio. Intel Core i3/i5, 8GB RAM, SSD 256GB, pantalla 15.6". Perfectas para Word, Excel, navegación y clases online.',
    presentations: [
      { name: 'Core i3 / 8GB / 256SSD', price: 1199.00 },
      { name: 'Core i5 / 8GB / 512SSD', price: 1599.00 }
    ],
    stock: 10,
    bestSelling: true,
    dateAdded: new Date('2025-01-05')
  },
  {
    id: 7,
    name: 'Laptop Gaming',
    category: 'computadoras',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&h=400&fit=crop',
    description: 'Laptops gaming importadas con GPU dedicada. Pantalla 144Hz, teclado RGB, disipación avanzada. Consulta disponibilidad y modelos vía WhatsApp.',
    presentations: [
      { name: 'GTX 1650 / i5 / 16GB', price: 2499.00 },
      { name: 'RTX 3050 / i7 / 16GB', price: 3299.00 }
    ],
    stock: 5,
    bestSelling: false,
    dateAdded: new Date('2025-01-12')
  },
  {
    id: 8,
    name: 'PC Ensamblada a Medida',
    category: 'computadoras',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=400&fit=crop',
    description: 'Ensamblamos tu PC según tu presupuesto y uso: gaming, diseño, ofimática o servidor. Procesadores AMD Ryzen / Intel Core, tarjetas madre, RAM, SSD/HDD y gabinetes disponibles.',
    presentations: [
      { name: 'Básica (ofimática)', price: 899.00 },
      { name: 'Media (gaming/diseño)', price: 1799.00 },
      { name: 'Alta gama (RTX)', price: 3499.00 }
    ],
    stock: 99,
    bestSelling: true,
    dateAdded: new Date('2025-01-01')
  },
  {
    id: 9,
    name: 'Cámara Web HD 1080p',
    category: 'perifericos',
    image: 'https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=400&h=400&fit=crop',
    description: 'Webcam Full HD con micrófono integrado, enfoque automático y corrección de iluminación. Ideal para videollamadas, clases virtuales y streaming.',
    presentations: [
      { name: '1080p con micrófono', price: 79.00 }
    ],
    stock: 22,
    bestSelling: false,
    dateAdded: new Date('2025-02-15')
  },
  {
    id: 10,
    name: 'Grifo Eléctrico Calentador',
    category: 'hogar',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=400&fit=crop',
    description: 'Caño eléctrico calentador de agua instantáneo. Fácil instalación, temperatura regulable y ahorro de energía. Ideal para cocina y lavamanos.',
    presentations: [
      { name: 'Unidad', price: 69.00 }
    ],
    stock: 20,
    bestSelling: false,
    dateAdded: new Date('2025-02-05')
  },
  {
    id: 11,
    name: 'Cepillo Secador 3 en 1',
    category: 'hogar',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop',
    description: 'Cepillo secador multifunción: seca, alisa y riza en un solo paso. 3 temperaturas, iones negativos para brillo y antifrizz. Incluye 3 cabezales.',
    presentations: [
      { name: 'Unidad completa', price: 89.00 }
    ],
    stock: 15,
    bestSelling: false,
    dateAdded: new Date('2025-02-20')
  },
  {
    id: 12,
    name: 'Luces LED E27 con Control Remoto',
    category: 'hogar',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    description: 'Focos LED inteligentes E27, 16 millones de colores RGB, bajo consumo (9W = 60W tradicional). Control remoto y modo temporizado incluidos.',
    presentations: [
      { name: '1 unidad', price: 25.00 },
      { name: 'Pack x3', price: 65.00 }
    ],
    stock: 50,
    bestSelling: true,
    dateAdded: new Date('2025-01-25')
  }
];

// Cargar productos desde localStorage o usar por defecto
let products = [];
function initializeProducts() {
  const saved = localStorage.getItem('innovaProducts');
  if (saved) {
    products = JSON.parse(saved);
  } else {
    products = JSON.parse(JSON.stringify(defaultProducts));
    localStorage.setItem('innovaProducts', JSON.stringify(products));
  }
}

// Variables globales
let currentProduct = {};
let selectedPresentations = {};
let currentGridColumns = 3;

/* ===============================================
   FUNCIONES DEL MODAL
   =============================================== */

function openModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentProduct = product;
  selectedPresentations = {};

  loadCartSelections();

  document.getElementById('modalTitle').textContent = product.name;
  document.getElementById('modalImage').src = product.image;
  document.getElementById('modalImage').alt = product.name;
  document.getElementById('modalDesc').textContent = product.description;

  const container = document.getElementById('presentationsContainer');
  container.innerHTML = product.presentations.map((pres, idx) => {
    const qty = selectedPresentations[idx] ? selectedPresentations[idx].qty : 0;
    const isSelected = qty > 0;

    return `
      <div class="presentation-item ${isSelected ? 'selected' : ''}" id="pres-${idx}" onclick="togglePresentation(${idx}, '${pres.name}', ${pres.price})">
        <div class="pres-info">
          <div class="pres-name">${pres.name}</div>
          <div class="pres-price">S/. ${pres.price.toFixed(2)}</div>
        </div>
        <div class="pres-controls">
          <button class="qty-btn" onclick="event.stopPropagation(); decrementQty(${idx})" ${qty === 0 ? 'disabled' : ''}>−</button>
          <div class="qty-display" id="qty-${idx}">${qty}</div>
          <button class="qty-btn" onclick="event.stopPropagation(); incrementQty(${idx})">+</button>
          ${qty > 0 ? `<button class="remove-pres-btn" onclick="event.stopPropagation(); removePresentation(${idx})">✕</button>` : ''}
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function loadCartSelections() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  selectedPresentations = {};

  cart.forEach(item => {
    if (item.productId === currentProduct.id) {
      const presIdx = currentProduct.presentations.findIndex(p => p.name === item.presentation);
      if (presIdx !== -1) {
        if (!selectedPresentations[presIdx]) {
          selectedPresentations[presIdx] = {
            name: item.presentation,
            price: item.price,
            qty: 0
          };
        }
        selectedPresentations[presIdx].qty++;
      }
    }
  });
}

function togglePresentation(idx, name, price) {
  const currentQty = selectedPresentations[idx] ? selectedPresentations[idx].qty : 0;
  if (currentQty === 0) {
    selectedPresentations[idx] = { name, price, qty: 1 };
  }
  updatePresentationUI(idx);
}

function incrementQty(idx) {
  if (!selectedPresentations[idx]) {
    const pres = currentProduct.presentations[idx];
    selectedPresentations[idx] = { name: pres.name, price: pres.price, qty: 0 };
  }
  selectedPresentations[idx].qty++;
  updatePresentationUI(idx);
}

function decrementQty(idx) {
  if (selectedPresentations[idx] && selectedPresentations[idx].qty > 0) {
    selectedPresentations[idx].qty--;
    if (selectedPresentations[idx].qty === 0) {
      delete selectedPresentations[idx];
    }
    updatePresentationUI(idx);
  }
}

function removePresentation(idx) {
  delete selectedPresentations[idx];
  updatePresentationUI(idx);
}

function updatePresentationUI(idx) {
  const presElement = document.getElementById(`pres-${idx}`);
  const qty = selectedPresentations[idx] ? selectedPresentations[idx].qty : 0;
  const pres = currentProduct.presentations[idx];

  if (qty > 0) {
    presElement.classList.add('selected');
  } else {
    presElement.classList.remove('selected');
  }

  presElement.innerHTML = `
    <div class="pres-info">
      <div class="pres-name">${pres.name}</div>
      <div class="pres-price">S/. ${pres.price.toFixed(2)}</div>
    </div>
    <div class="pres-controls">
      <button class="qty-btn" onclick="event.stopPropagation(); decrementQty(${idx})" ${qty === 0 ? 'disabled' : ''}>−</button>
      <div class="qty-display" id="qty-${idx}">${qty}</div>
      <button class="qty-btn" onclick="event.stopPropagation(); incrementQty(${idx})">+</button>
      ${qty > 0 ? `<button class="remove-pres-btn" onclick="event.stopPropagation(); removePresentation(${idx})">✕</button>` : ''}
    </div>
  `;
}

function addSelectedToCart() {
  const selectedKeys = Object.keys(selectedPresentations);
  if (selectedKeys.length === 0) {
    toast.warning('Selecciona al menos una opción');
    return;
  }

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.productId !== currentProduct.id);

  selectedKeys.forEach(idx => {
    const pres = selectedPresentations[idx];
    for (let i = 0; i < pres.qty; i++) {
      cart.push({
        productId: currentProduct.id,
        name: currentProduct.name,
        image: currentProduct.image,
        category: currentProduct.category,
        presentation: pres.name,
        price: pres.price
      });
    }
  });

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  closeModal();
  toast.success('✓ Producto agregado a tu cotización');
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = cart.length;
}

/* ===============================================
   RENDER DE PRODUCTOS
   =============================================== */

function getCategoryLabel(cat) {
  const labels = {
    'audio':        '🎧 Audio',
    'perifericos':  '🖱️ Periféricos',
    'computadoras': '💻 Computadoras',
    'accesorios':   '📱 Accesorios',
    'hogar':        '🏠 Hogar'
  };
  return labels[cat] || cat;
}

function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const toRender = list !== undefined ? list : products;

  if (toRender.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <div style="font-size:3rem; margin-bottom:1rem;">🔍</div>
        <p>No encontramos productos con esos filtros.</p>
      </div>`;
    return;
  }

  // En index.html solo mostramos los primeros 4 más vendidos
  const isIndex = !document.querySelector('.catalog-section');
  const productsToShow = isIndex
    ? toRender.filter(p => p.bestSelling).slice(0, 4)
    : toRender;

  grid.innerHTML = productsToShow.map(product => {
    const minPrice = Math.min(...product.presentations.map(p => p.price));
    const hasMultiple = product.presentations.length > 1;

    return `
      <div class="product-card scroll-reveal" onclick="openModal(${product.id})">
        ${product.bestSelling ? '<span class="product-badge">🔥 Top ventas</span>' : ''}
        <img
          class="product-image"
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop'"
        >
        <div class="product-info">
          <p class="product-category">${getCategoryLabel(product.category)}</p>
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">
            ${hasMultiple ? '<span class="price-from">Desde </span>' : ''}
            S/. ${minPrice.toFixed(2)}
          </p>
          <div class="product-actions">
            <button class="btn btn-primary" onclick="event.stopPropagation(); openModal(${product.id})">
              Ver opciones
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ===============================================
   FUNCIONES DE ORDENAMIENTO
   =============================================== */

function sortProducts(list, type) {
  const sorted = [...list];

  switch (type) {
    case 'best-selling':
      sorted.sort((a, b) => (b.bestSelling ? 1 : 0) - (a.bestSelling ? 1 : 0));
      break;
    case 'alphabetical-asc':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'alphabetical-desc':
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'price-asc':
      sorted.sort((a, b) => {
        const minA = Math.min(...a.presentations.map(p => p.price));
        const minB = Math.min(...b.presentations.map(p => p.price));
        return minA - minB;
      });
      break;
    case 'price-desc':
      sorted.sort((a, b) => {
        const minA = Math.min(...a.presentations.map(p => p.price));
        const minB = Math.min(...b.presentations.map(p => p.price));
        return minB - minA;
      });
      break;
    case 'date-desc':
      sorted.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
      break;
    case 'date-asc':
      sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      break;
  }

  return sorted;
}

/* ===============================================
   FUNCIONES DE FILTRADO
   =============================================== */

function applyFilters() {
  const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
  const minPrice = parseFloat(document.getElementById('minPriceInput')?.value) || 0;
  const maxPrice = parseFloat(document.getElementById('maxPriceInput')?.value) || 9999;
  const categoryFilters = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);
  const sortType = document.getElementById('sortSelect')?.value || '';

  let filtered = products.filter(p => {
    let match = p.name.toLowerCase().includes(search);
    const minProductPrice = Math.min(...p.presentations.map(pr => pr.price));
    match = match && (minProductPrice >= minPrice && minProductPrice <= maxPrice);
    if (categoryFilters.length > 0) {
      match = match && categoryFilters.includes(p.category);
    }
    return match;
  });

  filtered = sortProducts(filtered, sortType || 'best-selling');
  renderProducts(filtered);

  const counter = document.getElementById('productsCount');
  if (counter) counter.textContent = filtered.length;

  updateStockCounts();
}

function updateStockCounts() {
  const inStockCount = document.getElementById('inStockCount');
  const outStockCount = document.getElementById('outStockCount');
  if (inStockCount) inStockCount.textContent = products.length;
  if (outStockCount) outStockCount.textContent = '0';
}

function updateSliderTrack() {
  const minRange = document.getElementById('minPriceRange');
  const maxRange = document.getElementById('maxPriceRange');
  const track = document.getElementById('sliderTrack');
  if (!minRange || !maxRange || !track) return;

  const min = parseInt(minRange.value);
  const max = parseInt(maxRange.value);
  const rangeMin = parseInt(minRange.min);
  const rangeMax = parseInt(minRange.max);

  const percentMin = ((min - rangeMin) / (rangeMax - rangeMin)) * 100;
  const percentMax = ((max - rangeMin) / (rangeMax - rangeMin)) * 100;

  track.style.left = percentMin + '%';
  track.style.width = (percentMax - percentMin) + '%';
}

/* ===============================================
   FUNCIONES DE VISTA
   =============================================== */

function changeGridView(columns) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  grid.className = `products-grid grid-${columns}`;
  currentGridColumns = columns;

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.classList.remove('active');
    if (parseInt(btn.dataset.columns) === columns) {
      btn.classList.add('active');
    }
  });
}

/* ===============================================
   CARRITO LATERAL
   =============================================== */

function openCart() {
  const sidebar = document.getElementById('cartSidebar');
  if (sidebar) {
    renderCart();
    sidebar.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const sidebar = document.getElementById('cartSidebar');
  if (sidebar) {
    sidebar.classList.remove('open');
    document.body.style.overflow = 'auto';
  }
}

function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div style="font-size:2.5rem;margin-bottom:1rem;">🛒</div>
        <p>Tu cotización está vacía.<br>¡Agrega productos y escríbenos por WhatsApp!</p>
      </div>`;
    if (totalEl) totalEl.textContent = 'S/. 0.00';
    return;
  }

  const grouped = {};
  cart.forEach(item => {
    const key = `${item.productId}-${item.presentation}`;
    if (!grouped[key]) grouped[key] = { ...item, qty: 0 };
    grouped[key].qty++;
  });

  container.innerHTML = Object.values(grouped).map(item => `
    <div class="cart-item">
      <img class="cart-item-image" src="${item.image}" alt="${item.name}"
        onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop'">
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-pres">${item.presentation} × ${item.qty}</p>
        <p class="cart-item-price">S/. ${(item.price * item.qty).toFixed(2)}</p>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.productId}','${item.presentation}')">✕</button>
    </div>
  `).join('');

  const total = Object.values(grouped).reduce((sum, i) => sum + i.price * i.qty, 0);
  if (totalEl) totalEl.textContent = `S/. ${total.toFixed(2)}`;

  // Actualizar botón principal → lleva a cart.html
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.onclick = () => { window.location.href = 'cart.html'; };
  }
}

function removeFromCart(productId, presentation) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const idx = cart.findIndex(i => i.productId == productId && i.presentation === presentation);
  if (idx > -1) cart.splice(idx, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartBadge();
  renderCart();
}

function sendCartWhatsApp() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    toast.warning('Tu cotización está vacía');
    return;
  }

  const grouped = {};
  cart.forEach(item => {
    const key = `${item.productId}-${item.presentation}`;
    if (!grouped[key]) grouped[key] = { ...item, qty: 0 };
    grouped[key].qty++;
  });

  const lines = Object.values(grouped).map(i =>
    `• ${i.name} (${i.presentation}) x${i.qty} → S/. ${(i.price * i.qty).toFixed(2)}`
  ).join('\n');

  const total = Object.values(grouped).reduce((sum, i) => sum + i.price * i.qty, 0);
  const msg = `¡Hola Innova Import! 👋 Quisiera cotizar los siguientes productos:\n\n${lines}\n\nTotal aprox.: S/. ${total.toFixed(2)}\n\n¿Tienen disponibilidad? ✅`;

  window.open(`https://wa.me/51981862204?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ===============================================
   EVENT LISTENERS
   =============================================== */

function setupFilterListeners() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.addEventListener('input', applyFilters);

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.addEventListener('change', applyFilters);

  const inStockFilter = document.getElementById('inStockFilter');
  const outOfStockFilter = document.getElementById('outOfStockFilter');
  if (inStockFilter) inStockFilter.addEventListener('change', applyFilters);
  if (outOfStockFilter) outOfStockFilter.addEventListener('change', applyFilters);

  const minPriceRange = document.getElementById('minPriceRange');
  const maxPriceRange = document.getElementById('maxPriceRange');
  const minPriceInput = document.getElementById('minPriceInput');
  const maxPriceInput = document.getElementById('maxPriceInput');

  if (minPriceRange && minPriceInput) {
    minPriceRange.addEventListener('input', (e) => {
      const value = parseInt(e.target.value);
      const maxValue = parseInt(maxPriceRange.value);
      if (value > maxValue) {
        minPriceRange.value = maxValue;
        minPriceInput.value = maxValue;
      } else {
        minPriceInput.value = value;
      }
      updateSliderTrack();
    });
    minPriceRange.addEventListener('change', applyFilters);
    minPriceInput.addEventListener('input', (e) => {
      minPriceRange.value = parseInt(e.target.value) || 0;
      updateSliderTrack();
      applyFilters();
    });
  }

  if (maxPriceRange && maxPriceInput) {
    maxPriceRange.addEventListener('input', (e) => {
      const value = parseInt(e.target.value);
      const minValue = parseInt(minPriceRange.value);
      if (value < minValue) {
        maxPriceRange.value = minValue;
        maxPriceInput.value = minValue;
      } else {
        maxPriceInput.value = value;
      }
      updateSliderTrack();
    });
    maxPriceRange.addEventListener('change', applyFilters);
    maxPriceInput.addEventListener('input', (e) => {
      maxPriceRange.value = parseInt(e.target.value) || 9999;
      updateSliderTrack();
      applyFilters();
    });
  }

  document.querySelectorAll('.category-filter').forEach(filter => {
    filter.addEventListener('change', applyFilters);
  });

  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = '';
      if (inStockFilter) inStockFilter.checked = true;
      if (outOfStockFilter) outOfStockFilter.checked = false;
      if (minPriceInput) minPriceInput.value = '0';
      if (maxPriceInput) maxPriceInput.value = '9999';
      if (minPriceRange) minPriceRange.value = '0';
      if (maxPriceRange) maxPriceRange.value = '9999';
      document.querySelectorAll('.category-filter').forEach(f => f.checked = false);
      updateSliderTrack();
      applyFilters();
    });
  }

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => changeGridView(parseInt(btn.dataset.columns)));
  });

  updateSliderTrack();
}

/* ===============================================
   INICIALIZACIÓN
   =============================================== */

document.addEventListener('DOMContentLoaded', () => {
  initializeProducts();
  updateCartBadge();
  updateStockCounts();

  if (document.getElementById('productsGrid')) {
    renderProducts();
    setupFilterListeners();
    const counter = document.getElementById('productsCount');
    if (counter) counter.textContent = products.length;
  }

  const cartBtn = document.getElementById('cartBtn');
  if (cartBtn) cartBtn.addEventListener('click', openCart);

  const cartClose = document.getElementById('cartClose');
  if (cartClose) cartClose.addEventListener('click', closeCart);
});