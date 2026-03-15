/* ================================================
   ADMIN.JS — INNOVA IMPORT PIURA
   Dashboard, Productos, Categorías, Modals
   ================================================ */

/* ═══════════ ESTADO ═══════════ */
let currentEditingProduct = null;
let allProducts = [];

const DEFAULT_CATEGORIES = [
  { value: 'audio',        label: 'Audio' },
  { value: 'perifericos',  label: 'Periféricos' },
  { value: 'computadoras', label: 'Computadoras' },
  { value: 'accesorios',   label: 'Accesorios' },
  { value: 'hogar',        label: 'Hogar' },
];
let allCategories = [];

/* ═══════════ TOAST ═══════════ */
function showToast(message, isError = false, type = '') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';

  if (isError || type === 'error')   toast.classList.add('toast-error');
  else if (type === 'warning')       toast.classList.add('toast-warning');
  else if (type === 'info')          toast.classList.add('toast-info');
  else                               toast.classList.add('toast-success');

  const icon = isError || type === 'error' ? 'fa-times-circle'
    : type === 'warning' ? 'fa-exclamation-triangle'
    : type === 'info'    ? 'fa-info-circle'
    : 'fa-check-circle';

  toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
  container.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('show'));
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

/* Objeto toast compatible con pages.js */
const toast = {
  success: (msg) => showToast(msg, false, 'success'),
  error:   (msg) => showToast(msg, true,  'error'),
  warning: (msg) => showToast(msg, false, 'warning'),
  info:    (msg) => showToast(msg, false, 'info'),
};

/* ═══════════ CONFIRM DIALOG ═══════════ */
function showConfirm(message, onConfirm) {
  document.getElementById('_innovaConfirm')?.remove();

  const overlay = document.createElement('div');
  overlay.id = '_innovaConfirm';
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:99998;
    background:rgba(0,0,0,.45);backdrop-filter:blur(4px);
    display:flex;align-items:center;justify-content:center;animation:fadeIn .2s ease;
  `;

  overlay.innerHTML = `
    <div style="
      background:#fff;max-width:400px;width:90%;
      border-top:3px solid #EF4444;
      box-shadow:0 20px 60px rgba(26,86,219,.2);
      font-family:'Inter',system-ui,sans-serif;
      animation:toastIn .3s cubic-bezier(.22,.8,.36,1);
    ">
      <div style="padding:1.75rem 1.75rem 1.25rem;display:flex;gap:1rem;align-items:flex-start;">
        <div style="width:36px;height:36px;border-radius:50%;background:rgba(239,68,68,.1);color:#EF4444;
          display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-exclamation-triangle" style="font-size:0.9rem;"></i>
        </div>
        <div>
          <p style="font-size:0.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(51,51,51,.45);margin:0 0 .4rem;">Confirmar acción</p>
          <p style="font-size:.92rem;color:#333;margin:0;line-height:1.5;">${message}</p>
        </div>
      </div>
      <div style="padding:.75rem 1.75rem 1.5rem;display:flex;gap:.75rem;justify-content:flex-end;">
        <button id="_confirmCancel" style="padding:.6rem 1.4rem;border:1px solid #DBEAFE;background:transparent;
          font-family:inherit;font-size:.82rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;
          cursor:pointer;color:#666;transition:all .2s ease;">Cancelar</button>
        <button id="_confirmOk" style="padding:.6rem 1.4rem;border:none;background:#EF4444;color:#fff;
          font-family:inherit;font-size:.82rem;font-weight:500;letter-spacing:.08em;text-transform:uppercase;
          cursor:pointer;transition:all .2s ease;">Eliminar</button>
      </div>
    </div>`;

  document.body.appendChild(overlay);

  if (!document.getElementById('_confirmStyles')) {
    const s = document.createElement('style');
    s.id = '_confirmStyles';
    s.textContent = `
      @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
      @keyframes fadeOut { from{opacity:1} to{opacity:0} }
      @keyframes toastIn { from{opacity:0;transform:scale(.95) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
    `;
    document.head.appendChild(s);
  }

  const cancelBtn = overlay.querySelector('#_confirmCancel');
  const okBtn     = overlay.querySelector('#_confirmOk');

  const close = () => {
    overlay.style.animation = 'fadeOut .2s ease forwards';
    setTimeout(() => overlay.remove(), 200);
  };

  cancelBtn.onclick = close;
  okBtn.onclick     = () => { close(); onConfirm(); };
  overlay.onclick   = (e) => { if (e.target === overlay) close(); };

  const onKey = (e) => { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', onKey); } };
  document.addEventListener('keydown', onKey);
}

/* ═══════════ CATEGORÍAS ═══════════ */
function loadCategories() {
  const saved = localStorage.getItem('innovaCategories');
  if (saved) {
    allCategories = JSON.parse(saved);
    DEFAULT_CATEGORIES.forEach(def => {
      if (!allCategories.find(c => c.value === def.value)) {
        allCategories.unshift({ ...def, custom: false });
      }
    });
  } else {
    allCategories = DEFAULT_CATEGORIES.map(c => ({ ...c, custom: false }));
  }
  saveCategories();
}

function saveCategories() {
  localStorage.setItem('innovaCategories', JSON.stringify(allCategories));
}

function syncCategorySelects(keepValue = '') {
  const selects = [
    document.getElementById('productCategory'),
    document.getElementById('filterCategory')
  ];
  selects.forEach((sel, idx) => {
    if (!sel) return;
    const current = keepValue || sel.value;
    sel.innerHTML = idx === 0
      ? '<option value="">-- Seleccionar --</option>'
      : '<option value="">Todas las categorías</option>';
    allCategories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.value;
      opt.textContent = cat.label;
      sel.appendChild(opt);
    });
    if (current) sel.value = current;
  });
}

function openCatModal() {
  renderCatChips();
  document.getElementById('newCatInput').value = '';
  document.getElementById('catModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('newCatInput').focus(), 100);
}

function closeCatModal() {
  document.getElementById('catModalOverlay').classList.remove('active');
  if (!document.getElementById('productModalOverlay').classList.contains('active')) {
    document.body.style.overflow = '';
  }
  syncCategorySelects();
  renderProductCards();
}

function getCatLabel(value) {
  const found = allCategories.find(c => c.value === value);
  return found ? found.label : (value || 'Sin categoría');
}

function renderCatChips() {
  const list = document.getElementById('catChipsList');
  if (!list) return;

  if (allCategories.length === 0) {
    list.innerHTML = '<div class="cat-empty"><i class="fas fa-tag"></i><br>No hay categorías aún</div>';
    return;
  }

  list.innerHTML = allCategories.map(cat => {
    const usedCount = allProducts.filter(p => p.category === cat.value).length;
    const isDefault = !cat.custom;
    return `
      <div class="cat-chip" data-value="${cat.value}">
        <div class="cat-chip-left">
          <div class="cat-chip-icon ${isDefault ? 'default' : ''}">
            <i class="fas fa-${isDefault ? 'bolt' : 'tag'}"></i>
          </div>
          <div>
            <span class="cat-chip-name">${escHtml(cat.label)}</span>
            <span class="cat-chip-badge">${usedCount} producto${usedCount !== 1 ? 's' : ''}</span>
            ${isDefault ? '<span class="cat-chip-badge" style="color:var(--gold);margin-left:.3rem;">predeterminada</span>' : ''}
          </div>
        </div>
        <button class="btn-cat-delete" onclick="deleteCategory('${cat.value}')"
          ${isDefault ? 'disabled title="No se puede eliminar una categoría predeterminada"' : `title="Eliminar ${escHtml(cat.label)}"`}>
          <i class="fas fa-trash"></i>
        </button>
      </div>`;
  }).join('');
}

function addCategory() {
  const input = document.getElementById('newCatInput');
  const raw = input.value.trim();
  if (!raw) { input.focus(); return; }

  const value = raw.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');

  if (!value) { toast.error('Nombre inválido'); return; }
  if (allCategories.find(c => c.value === value || c.label.toLowerCase() === raw.toLowerCase())) {
    toast.warning('Esa categoría ya existe'); input.select(); return;
  }

  allCategories.push({ value, label: raw, custom: true });
  saveCategories();
  syncCategorySelects();
  renderCatChips();
  input.value = '';
  input.focus();
  toast.success(`Categoría "${raw}" agregada`);
}

function deleteCategory(value) {
  const cat = allCategories.find(c => c.value === value);
  if (!cat || !cat.custom) { toast.warning('No se puede eliminar una categoría predeterminada'); return; }

  const usedCount = allProducts.filter(p => p.category === value).length;
  const msg = usedCount > 0
    ? `¿Eliminar "${cat.label}"? Tiene ${usedCount} producto(s) que quedarán sin categoría.`
    : `¿Eliminar la categoría "${cat.label}"?`;

  showConfirm(msg, () => {
    if (usedCount > 0) {
      allProducts = allProducts.map(p => p.category === value ? { ...p, category: '' } : p);
      saveProducts();
    }
    allCategories = allCategories.filter(c => c.value !== value);
    saveCategories();
    syncCategorySelects();
    renderCatChips();
    toast.success(`Categoría "${cat.label}" eliminada`);
  });
}

/* ═══════════ VISTAS ═══════════ */
const pageTitleEl = () => document.getElementById('pageTitle');
const loader      = () => document.getElementById('pageLoader');

function showView(viewName) {
  const loaderEl = loader();
  loaderEl.classList.add('active');
  setTimeout(() => {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.classList.add('active');
      const titles = {
        dashboard: 'Dashboard', products: 'Gestión de Productos',
        sales: 'Ventas', clients: 'Clientes', reports: 'Reportes',
        invoices: 'Facturas', users: 'Usuarios', settings: 'Configuración',
      };
      if (pageTitleEl()) pageTitleEl().textContent = titles[viewName] || 'Panel';

      if (viewName === 'products')  renderProductCards();
      if (viewName === 'dashboard') updateDashboardCount();
    }
    loaderEl.classList.remove('active');
  }, 280);
}

function navigate(e) {
  const link = e.target.closest('[data-view]');
  if (!link) return;
  e.preventDefault();
  const view = link.dataset.view;
  history.pushState({ view }, '', `#${view}`);
  showView(view);
  document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
  link.classList.add('active');
  if (window.innerWidth <= 992) closeSidebar();
}

/* ═══════════ FECHA ═══════════ */
function setCurrentDate() {
  const el = document.getElementById('currentDate');
  if (el) el.textContent = new Date().toLocaleDateString('es-PE', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
}

/* ═══════════ PERSISTENCIA PRODUCTOS ═══════════ */
function loadProducts() {
  const saved = localStorage.getItem('innovaProducts');
  if (saved) {
    allProducts = JSON.parse(saved);
  } else {
    // Toma los defaultProducts de products.js si existen
    if (typeof defaultProducts !== 'undefined') {
      allProducts = JSON.parse(JSON.stringify(defaultProducts));
    } else {
      allProducts = [];
    }
    saveProducts();
  }
}

function saveProducts() {
  localStorage.setItem('innovaProducts', JSON.stringify(allProducts));
}

/* ═══════════ RENDER CARDS ═══════════ */
function renderProductCards() {
  const grid = document.getElementById('productCardsGrid');
  if (!grid) return;

  const catFilter  = document.getElementById('filterCategory')?.value || '';
  const searchTerm = (document.getElementById('searchProducts')?.value || '').toLowerCase();

  let list = allProducts;
  if (catFilter)  list = list.filter(p => p.category === catFilter);
  if (searchTerm) list = list.filter(p =>
    p.name.toLowerCase().includes(searchTerm) ||
    (p.description || '').toLowerCase().includes(searchTerm)
  );

  const countEl = document.getElementById('productsCount');
  if (countEl) countEl.textContent =
    `${allProducts.length} producto${allProducts.length !== 1 ? 's' : ''} registrado${allProducts.length !== 1 ? 's' : ''}`;

  if (list.length === 0) {
    grid.innerHTML = `
      <div class="empty-products" style="grid-column:1/-1;">
        <i class="fas fa-box-open"></i>
        <h3>${allProducts.length === 0 ? 'No hay productos aún' : 'Sin resultados'}</h3>
        <p>${allProducts.length === 0 ? 'Agrega tu primer producto.' : 'Intenta con otro filtro o búsqueda.'}</p>
      </div>`;
    return;
  }

  grid.innerHTML = list.map(product => {
    const minPrice = product.presentations?.length
      ? Math.min(...product.presentations.map(p => p.price || 0)) : 0;
    const isLowStock = product.stock < 10;
    const catLabel = getCatLabel(product.category);

    const presentationsPills = (product.presentations || []).slice(0, 3).map(p =>
      `<span class="pres-pill">${escHtml(p.name)} · S/.${parseFloat(p.price).toFixed(2)}</span>`
    ).join('');
    const morePres = (product.presentations || []).length > 3
      ? `<span class="pres-pill" style="color:var(--text-muted);">+${product.presentations.length - 3} más</span>` : '';

    const imgEl = product.image
      ? `<img src="${product.image}" alt="${escHtml(product.name)}" class="product-card-image"
             onclick="previewImage('${product.image.replace(/'/g, "\\'")}','${escHtml(product.name)}')"
             loading="lazy" onerror="this.style.display='none'">`
      : `<div class="product-card-image-placeholder"><i class="fas fa-image"></i></div>`;

    return `
      <div class="product-card">
        ${product.bestSelling ? '<span class="badge-best"><i class="fas fa-star"></i> Top ventas</span>' : ''}
        ${isLowStock ? '<span class="badge-stock-low"><i class="fas fa-exclamation-triangle"></i> Stock bajo</span>' : ''}
        ${imgEl}
        <div class="product-card-body">
          <div class="product-card-top">
            <div class="product-card-name">${escHtml(product.name)}</div>
            <span class="product-card-id">#${product.id}</span>
          </div>
          <span class="product-card-category"><i class="fas fa-tag"></i> ${escHtml(catLabel)}</span>
          <p class="product-card-desc">${escHtml(product.description || '')}</p>
          <div class="product-card-divider"></div>
          <div class="product-card-meta">
            <div class="product-card-price">S/. ${minPrice.toFixed(2)}<span>desde</span></div>
            <div class="product-card-stock ${isLowStock ? 'low' : ''}">
              <i class="fas fa-cubes"></i> ${product.stock} und.
            </div>
          </div>
          <div class="product-card-presentations">${presentationsPills}${morePres}</div>
        </div>
        <div class="product-card-actions">
          <button class="btn-card-action edit" onclick="editProduct(${product.id})">
            <i class="fas fa-edit"></i> Editar
          </button>
          <button class="btn-card-action delete" onclick="deleteProduct(${product.id})">
            <i class="fas fa-trash"></i> Eliminar
          </button>
        </div>
      </div>`;
  }).join('');
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function updateDashboardCount() {
  const el = document.getElementById('dashProductCount');
  if (el) el.textContent = allProducts.length;
}

/* ═══════════ CRUD PRODUCTOS ═══════════ */
function editProduct(id) {
  const product = allProducts.find(p => p.id === id);
  if (!product) return;
  currentEditingProduct = id;
  document.getElementById('productId').value          = product.id;
  document.getElementById('productName').value        = product.name;
  document.getElementById('productImage').value       = product.image || '';
  document.getElementById('productDescription').value = product.description || '';
  document.getElementById('productStock').value       = product.stock || 0;
  document.getElementById('productBestSelling').checked = !!product.bestSelling;
  syncCategorySelects(product.category);
  document.getElementById('productCategory').value = product.category;
  showImagePreview(product.image);

  const container = document.getElementById('presentationsContainer');
  container.innerHTML = '';
  (product.presentations || []).forEach(p => addPresentationRow(p.name, p.price));

  document.getElementById('modalTitle').textContent = `Editar: ${product.name}`;
  openProductModal();
}

function newProduct() {
  currentEditingProduct = null;
  document.getElementById('productForm').reset();
  const nextId = allProducts.length > 0 ? Math.max(...allProducts.map(p => p.id || 0)) + 1 : 1;
  document.getElementById('productId').value = nextId;
  document.getElementById('imagePreview').style.display = 'none';
  document.getElementById('presentationsContainer').innerHTML = '';
  syncCategorySelects();
  addPresentationRow();
  document.getElementById('modalTitle').textContent = 'Nuevo Producto';
  openProductModal();
}

function addPresentationRow(name = '', price = '') {
  const container = document.getElementById('presentationsContainer');
  const div = document.createElement('div');
  div.className = 'presentation-item';
  div.innerHTML = `
    <div>
      <label style="font-size:.76rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:.3rem;">Presentación</label>
      <input type="text" class="pres-name" value="${escHtml(String(name))}"
        placeholder="ej: 1 Unidad, Pack x2" style="width:100%;padding:.55rem .75rem;border:1.5px solid var(--border-light);border-radius:4px;font-size:.86rem;font-family:inherit;">
    </div>
    <div>
      <label style="font-size:.76rem;font-weight:600;color:var(--text-muted);display:block;margin-bottom:.3rem;">Precio (S/.)</label>
      <input type="number" class="pres-price" value="${price}" step="0.01" min="0" placeholder="0.00"
        style="width:100%;padding:.55rem .75rem;border:1.5px solid var(--border-light);border-radius:4px;font-size:.86rem;font-family:inherit;">
    </div>
    <button type="button" class="btn-remove-presentation" onclick="this.closest('.presentation-item').remove()">
      <i class="fas fa-times"></i> Eliminar
    </button>`;
  container.appendChild(div);
}

function saveProduct(e) {
  e.preventDefault();
  const form = document.getElementById('productForm');
  if (!form.checkValidity()) { toast.error('Completa todos los campos requeridos'); return; }

  const presentations = [];
  document.querySelectorAll('.presentation-item').forEach(item => {
    const name  = item.querySelector('.pres-name')?.value.trim();
    const price = parseFloat(item.querySelector('.pres-price')?.value);
    if (name && !isNaN(price)) presentations.push({ name, price });
  });
  if (presentations.length === 0) { toast.error('Agrega al menos una presentación'); return; }

  const data = {
    id:          currentEditingProduct || parseInt(document.getElementById('productId').value),
    name:        document.getElementById('productName').value.trim(),
    image:       document.getElementById('productImage').value.trim(),
    category:    document.getElementById('productCategory').value,
    description: document.getElementById('productDescription').value.trim(),
    stock:       parseInt(document.getElementById('productStock').value) || 0,
    bestSelling: document.getElementById('productBestSelling').checked,
    presentations,
    dateAdded: currentEditingProduct
      ? allProducts.find(p => p.id === currentEditingProduct)?.dateAdded
      : new Date().toISOString(),
  };

  if (currentEditingProduct) {
    const idx = allProducts.findIndex(p => p.id === currentEditingProduct);
    if (idx !== -1) allProducts[idx] = data;
  } else {
    allProducts.push(data);
  }

  saveProducts();
  renderProductCards();
  updateDashboardCount();
  closeProductModal();
  toast.success(currentEditingProduct ? 'Producto actualizado ✓' : 'Producto guardado ✓');
}

function deleteProduct(id) {
  const product = allProducts.find(p => p.id === id);
  if (!product) return;
  showConfirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`, () => {
    allProducts = allProducts.filter(p => p.id !== id);
    saveProducts();
    renderProductCards();
    updateDashboardCount();
    toast.success('Producto eliminado');
  });
}

/* ═══════════ MODAL PRODUCTO ═══════════ */
function openProductModal() {
  document.getElementById('productModalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('productModalOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

/* ═══════════ IMAGEN ═══════════ */
function previewImage(url, name) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:20000;display:flex;align-items:center;justify-content:center;cursor:zoom-out;';
  overlay.innerHTML = `<img src="${url}" alt="${name || ''}" style="max-width:90vw;max-height:90vh;border-radius:4px;box-shadow:0 20px 60px rgba(0,0,0,.5);">`;
  overlay.onclick = () => overlay.remove();
  document.body.appendChild(overlay);
}

function showImagePreview(url) {
  const el = document.getElementById('imagePreview');
  if (!el) return;
  if (url) { el.src = url; el.style.display = 'block'; }
  else { el.style.display = 'none'; }
}

function handleImageUpload(file) {
  if (!file || !file.type.startsWith('image/')) { toast.error('Selecciona una imagen válida'); return; }
  const reader = new FileReader();
  reader.onload = e => {
    document.getElementById('productImage').value = e.target.result;
    showImagePreview(e.target.result);
  };
  reader.readAsDataURL(file);
}

/* ═══════════ SIDEBAR MÓVIL ═══════════ */
function openSidebar() {
  document.getElementById('adminSidebar').classList.add('show');
  document.getElementById('sidebarOverlay').classList.add('show');
  document.body.classList.add('sidebar-open');
}

function closeSidebar() {
  document.getElementById('adminSidebar').classList.remove('show');
  document.getElementById('sidebarOverlay').classList.remove('show');
  document.body.classList.remove('sidebar-open');
}

/* ═══════════ INIT ═══════════ */
document.addEventListener('DOMContentLoaded', () => {
  loadCategories();
  loadProducts();
  syncCategorySelects();
  setCurrentDate();

  const initialHash = location.hash.replace('#', '') || 'dashboard';
  showView(initialHash);
  const initialLink = document.querySelector(`[data-view="${initialHash}"]`);
  if (initialLink) {
    document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
    initialLink.classList.add('active');
  }

  document.addEventListener('click', navigate);
  window.addEventListener('popstate', e => showView(e.state?.view || 'dashboard'));

  document.getElementById('sidebarToggle')?.addEventListener('click', openSidebar);
  document.getElementById('sidebarClose')?.addEventListener('click', closeSidebar);
  document.getElementById('sidebarOverlay')?.addEventListener('click', closeSidebar);

  document.getElementById('btnAddProduct')?.addEventListener('click', newProduct);
  document.getElementById('btnAddPresentation')?.addEventListener('click', () => addPresentationRow());
  document.getElementById('btnCloseModal')?.addEventListener('click', closeProductModal);
  document.getElementById('btnCancelForm')?.addEventListener('click', closeProductModal);
  document.getElementById('productForm')?.addEventListener('submit', saveProduct);
  document.getElementById('productModalOverlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeProductModal();
  });

  document.getElementById('btnUploadImage')?.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('fileInput').click();
  });
  document.getElementById('fileInput')?.addEventListener('change', e => {
    if (e.target.files[0]) handleImageUpload(e.target.files[0]);
  });
  document.getElementById('productImage')?.addEventListener('input', function () {
    showImagePreview(this.value);
  });

  document.getElementById('searchProducts')?.addEventListener('input', renderProductCards);
  document.getElementById('filterCategory')?.addEventListener('change', renderProductCards);

  document.getElementById('btnManageCatsToolbar')?.addEventListener('click', openCatModal);
  document.getElementById('btnManageCatsForm')?.addEventListener('click', openCatModal);
  document.getElementById('btnCloseCatModal')?.addEventListener('click', closeCatModal);
  document.getElementById('catModalOverlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeCatModal();
  });
  document.getElementById('btnSaveCat')?.addEventListener('click', addCategory);
  document.getElementById('newCatInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); addCategory(); }
  });
});
