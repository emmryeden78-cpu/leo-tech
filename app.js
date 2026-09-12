// ══════════════════════════════════════════════
//  STOCKAGE LOCAL (localStorage) — persistance complète
// ══════════════════════════════════════════════
const STORAGE_KEY = 'electroshop_db_v1';

const DEFAULT_PRODUCTS = [
  { id:1, name:"iPhone 15 Pro", cat:"Smartphone", price:780000, oldPrice:910000, stock:24, emoji:"📱", images:[], desc:"A17 Pro, titane, Dynamic Island, 48MP", badge:"new", stars:5, specs:{"Processeur":"A17 Pro","Écran":"6.1\" Super Retina","RAM":"8 Go","Stockage":"256 Go","Batterie":"3274 mAh"} },
  { id:2, name:"Samsung Galaxy S25", cat:"Smartphone", price:585000, oldPrice:715000, stock:15, emoji:"📲", images:[], desc:"Snapdragon 8 Elite, 200MP, Galaxy AI", badge:"promo", stars:4, specs:{"Processeur":"Snapdragon 8 Elite","Écran":"6.2\" Dynamic AMOLED","RAM":"12 Go","Stockage":"256 Go","Batterie":"4000 mAh"} },
  { id:3, name:'MacBook Pro 14"', cat:"Ordinateur", price:1430000, oldPrice:null, stock:8, emoji:"💻", images:[], desc:"M3 Pro, 18 Go RAM, 512 Go SSD", badge:"new", stars:5, specs:{"Processeur":"Apple M3 Pro","Écran":"14.2\" Liquid Retina XDR","RAM":"18 Go","Stockage":"512 Go SSD","Autonomie":"18h"} },
  { id:4, name:"Sony WH-1000XM5", cat:"Audio", price:227000, oldPrice:259000, stock:31, emoji:"🎧", images:[], desc:"Réduction de bruit premium, 30h", badge:"promo", stars:5, specs:{"Type":"Over-ear","Autonomie":"30h","Charge":"3h","Connectivité":"Bluetooth 5.2","ANC":"Oui"} },
  { id:5, name:"iPad Pro 12.9", cat:"Accessoire", price:714000, oldPrice:null, stock:12, emoji:"📋", images:[], desc:"M2, Liquid Retina XDR, Apple Pencil", badge:"", stars:4, specs:{"Processeur":"Apple M2","Écran":"12.9\" Liquid Retina XDR","RAM":"8 Go","Stockage":"256 Go","Connectivité":"Wi-Fi 6E"} },
  { id:6, name:"LG OLED C3 55\"", cat:"TV", price:845000, oldPrice:1170000, stock:6, emoji:"📺", images:[], desc:"OLED evo, 120Hz, Dolby Vision IQ", badge:"promo", stars:4, specs:{"Technologie":"OLED evo","Taille":"55 pouces","Résolution":"4K UHD","Rafraichissement":"120 Hz","HDR":"Dolby Vision"} },
  { id:7, name:"Apple Watch Ultra 2", cat:"Accessoire", price:585000, oldPrice:null, stock:19, emoji:"⌚", images:[], desc:"Titane, GPS double fréquence, 60h", badge:"new", stars:5, specs:{"Boîtier":"Titane 49mm","GPS":"Double fréquence","Autonomie":"60h","Étanchéité":"100m","Santé":"ECG, SpO2"} },
  { id:8, name:"Dell XPS 15", cat:"Ordinateur", price:1170000, oldPrice:1300000, stock:10, emoji:"🖥", images:[], desc:"Intel i7-13, 16 Go, RTX 4060", badge:"", stars:4, specs:{"Processeur":"Intel Core i7-13700H","Écran":"15.6\" OLED 3.5K","RAM":"16 Go","Stockage":"512 Go NVMe","GPU":"NVIDIA RTX 4060"} },
  { id:9, name:"AirPods Pro 2", cat:"Audio", price:181000, oldPrice:214000, stock:40, emoji:"🎵", images:[], desc:"ANC adaptatif, audio spatial, MagSafe", badge:"promo", stars:5, specs:{"Type":"In-ear","ANC":"Adaptatif","Autonomie":"6h (30h étui)","Puce":"H2","Connectivité":"Bluetooth 5.3"} },
  { id:10, name:"Google Pixel 9 Pro", cat:"Smartphone", price:714000, oldPrice:null, stock:18, emoji:"🤳", images:[], desc:"Tensor G4, IA Gemini, 50MP triple", badge:"new", stars:4, specs:{"Processeur":"Tensor G4","Écran":"6.3\" LTPO OLED","RAM":"16 Go","Stockage":"128 Go","Batterie":"4700 mAh"} },
  { id:11, name:'Samsung 49" Odyssey', cat:"TV", price:780000, oldPrice:975000, stock:4, emoji:"🖥️", images:[], desc:"DQHD, 240Hz, Curved Gaming", badge:"promo", stars:4, specs:{"Type":"Gaming ultra-wide","Taille":"49 pouces","Résolution":"DQHD 5120x1440","Rafraichissement":"240 Hz","Connectique":"HDMI 2.1"} },
  { id:12, name:"Bose QuietComfort 45", cat:"Audio", price:194000, oldPrice:227000, stock:22, emoji:"🎙️", images:[], desc:"Noise cancelling, 24h, USB-C", badge:"", stars:4, specs:{"Type":"Over-ear","ANC":"Oui","Autonomie":"24h","Charge":"USB-C","Microphone":"4 mics"} },
];

const DEFAULT_ORDERS = [
  { id:"#2501", client:"Sophie Martin", email:"sophie@mail.fr", phone:"237691112233", products:"iPhone 15 Pro × 1", total:780000, status:"Livré", date:"12/05/2025" },
  { id:"#2502", client:"Marc Dupont", email:"marc@mail.fr", phone:"237677223344", products:"Sony WH-1000XM5 × 2", total:454000, status:"Expédié", date:"13/05/2025" },
  { id:"#2503", client:"Léa Bernard", email:"lea@mail.fr", phone:"237655334455", products:'MacBook Pro 14" × 1', total:1430000, status:"Traitement", date:"14/05/2025" },
  { id:"#2504", client:"Tom Leroy", email:"tom@mail.fr", phone:"237699445566", products:"AirPods Pro 2 × 1", total:181000, status:"Livré", date:"11/05/2025" },
  { id:"#2505", client:"Emma Garcia", email:"emma@mail.fr", phone:"237688556677", products:"iPad Pro × 1, AirPods Pro × 1", total:896000, status:"Annulé", date:"10/05/2025" },
];

// ⚙️ CONFIGURATION DE LA BOUTIQUE ⚙️
// Ce sont les valeurs par défaut que voit TOUT NOUVEAU VISITEUR de votre site
// (le panneau Admin > Paramètres ne change ces valeurs que dans le navigateur
// de la personne qui les modifie — voir la carte "Rendre ces réglages visibles
// pour tous vos visiteurs" dans Paramètres pour publier un changement pour tous).
const DEFAULT_SETTINGS = {
  shopName: "LEO TECH",
  currency: "FCFA",
  whatsappNumber: "237657261108",
  freeShippingThreshold: 50000,
  shippingFee: 3000,
  lowStockThreshold: 5,
  adminUser: "admin",
  adminPass: "1234",
  aboutDescription: "LEO TECH est votre boutique en ligne d'électronique premium au Cameroun : smartphones, ordinateurs, audio, TV et accessoires, livrés rapidement.",
  contactEmail: "contact@leotech.cm",
  address: "Douala, Cameroun",
  facebook: "",
  instagram: "",
  offer: {
    enabled: false,
    title: "Offre spéciale du jour",
    badge: "-15%",
    description: "Profitez de réductions exceptionnelles sur une sélection de produits cette semaine.",
    image: "",
    ctaText: "Voir les offres",
    ctaTarget: "shop",
    ctaCategory: "Smartphone",
    expiresAt: "",
  },
};

function defaultDB() {
  return {
    products: JSON.parse(JSON.stringify(DEFAULT_PRODUCTS)),
    cart: [],
    wishlist: [],
    orders: JSON.parse(JSON.stringify(DEFAULT_ORDERS)),
    notifications: [],
    settings: { ...DEFAULT_SETTINGS },
  };
}

let products, cart, wishlist, orders, notifications, settings;

// État de l'interface boutique (utilisé uniquement par index.html, mais
// déclaré ici pour que toutes les fonctions du fichier partagé y aient accès)
let activeFilter = "Tous";
let modalQty = 1;
let modalImgIndex = 0;
let currentModal = null;
let checkoutStep = 1;
let checkoutData = {};

function loadDB() {
  let db = null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) db = JSON.parse(raw);
  } catch (e) { console.error('Lecture localStorage impossible', e); }
  if (!db) db = defaultDB();
  products = db.products || [];
  cart = db.cart || [];
  wishlist = db.wishlist || [];
  orders = db.orders || [];
  notifications = db.notifications || [];
  settings = { ...DEFAULT_SETTINGS, ...(db.settings || {}) };
}

function saveDB() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ products, cart, wishlist, orders, notifications, settings }));
  } catch (e) {
    console.error('Écriture localStorage impossible', e);
    toast("⚠️ Stockage plein : réduisez le nombre/la taille des photos ou exportez puis videz d'anciennes commandes", 'error');
  }
}

// Synchronisation entre onglets du même navigateur (ex: la boutique ouverte
// dans un onglet et le tableau de bord admin dans un autre) : dès qu'une
// commande est passée quelque part, l'admin la voit apparaître en direct.
// Synchronisation en direct entre index.html (la boutique) et admin.html
// (le tableau de bord) quand ils sont ouverts dans deux onglets différents
// du même navigateur : dès qu'une commande est passée ou qu'un produit est
// modifié quelque part, l'autre page se met à jour toute seule. Chaque
// fonction de rendu ci-dessous se protège elle-même si les éléments
// correspondants n'existent pas sur la page en cours (voir leurs gardes
// "if (!el) return;"), donc ce bloc peut appeler sans risque les deux
// familles de rendu (boutique + admin), que l'on soit sur l'une ou l'autre.
window.addEventListener('storage', (e) => {
  if (e.key !== STORAGE_KEY || !e.newValue) return;
  try {
    const db = JSON.parse(e.newValue);
    const prevUnread = notifications.filter(n => !n.read).length;
    products = db.products || products;
    orders = db.orders || orders;
    notifications = db.notifications || notifications;
    settings = { ...DEFAULT_SETTINGS, ...(db.settings || {}) };
    const newUnread = notifications.filter(n => !n.read).length;
    renderNotifBadge();
    const adminPage = document.getElementById('page-admin');
    if (adminPage && adminPage.classList.contains('active')) {
      renderAdminOverview(); renderProductsTable(); renderOrders(); renderCustomers(); renderNotifPanel();
      if (newUnread > prevUnread) { toast('🔔 Nouvelle commande reçue !', 'success'); beep(); }
    }
    // Rafraîchit la boutique publique si elle est ouverte ailleurs (ex : l'admin
    // vient de changer un prix, un stock ou les paramètres de la boutique).
    renderShop(); renderFeatured(); renderFooter(); updateBadge();
  } catch (err) { console.error(err); }
});

// ══════════════════════════════════════════════
//  UTILITAIRES
// ══════════════════════════════════════════════
function formatPrice(n) {
  const num = Number(n) || 0;
  return num.toLocaleString('fr-FR') + ' ' + (settings.currency || 'FCFA');
}

function statusClass(status) {
  return String(status||'').toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/\s+/g,'-');
}

function getRatingInfo(p) {
  const reviews = p.reviews || [];
  if (!reviews.length) return { avg: p.stars || 0, count: 0 };
  const avg = reviews.reduce((s,r) => s + r.rating, 0) / reviews.length;
  return { avg, count: reviews.length };
}

function starsHtml(avg) {
  const rounded = Math.round(avg);
  return '★'.repeat(rounded) + '☆'.repeat(5-rounded);
}

function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination);
    o.type = 'sine'; o.frequency.value = 880;
    g.gain.setValueAtTime(0.15, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    o.start(); o.stop(ctx.currentTime + 0.4);
  } catch (e) { /* audio non disponible, on ignore */ }
}

// ══════════════════════════════════════════════
//  NAVIGATION
// ══════════════════════════════════════════════
function showPage(id) {
  // Le site public (index.html) et l'admin (admin.html) sont deux pages
  // séparées : cette fonction ne gère que la navigation interne au sein
  // du fichier où elle s'exécute. Si la page ciblée n'existe pas ici
  // (ex : appelée depuis admin.html), on ne fait simplement rien.
  const target = document.getElementById('page-' + id);
  if (!target) return;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  target.classList.add('active');
  if (id === 'home') renderFeatured();
  if (id === 'shop') renderShop();
  if (id === 'cart') renderCart();
  if (id === 'checkout') renderCheckout();
  if (id === 'about') renderInfoPages();
  if (id === 'cgv') renderInfoPages();
  window.scrollTo(0,0);
}

function renderInfoPages() {
  document.getElementById('about-title').textContent = 'À propos de ' + settings.shopName;
  document.getElementById('about-description').textContent = settings.aboutDescription;
  document.getElementById('about-contact').innerHTML = `Email : ${settings.contactEmail}<br>Adresse : ${settings.address}<br>WhatsApp : <a href="https://wa.me/${(settings.whatsappNumber||'').replace(/[^0-9]/g,'')}" style="color:var(--accent)" target="_blank" rel="noopener">${settings.whatsappNumber}</a>`;
  document.getElementById('cgv-shopname').textContent = settings.shopName;
  document.getElementById('cgv-currency').textContent = settings.currency;
  document.getElementById('cgv-contact').innerHTML = `Email : ${settings.contactEmail} — WhatsApp : ${settings.whatsappNumber}`;
}

function renderFooter() {
  const copyEl = document.getElementById('footer-copy');
  if (!copyEl) return;
  copyEl.textContent = `© ${new Date().getFullYear()} ${settings.shopName}`;
  const waLink = `https://wa.me/${(settings.whatsappNumber||'').replace(/[^0-9]/g,'')}`;
  document.getElementById('footer-whatsapp').href = waLink;
  document.getElementById('footer-whatsapp').target = '_blank';
  document.getElementById('footer-whatsapp').rel = 'noopener';
  document.getElementById('footer-whatsapp').onclick = null;
  const social = [];
  if (settings.facebook) social.push(`<a href="${settings.facebook}" target="_blank" rel="noopener" title="Facebook">📘</a>`);
  if (settings.instagram) social.push(`<a href="${settings.instagram}" target="_blank" rel="noopener" title="Instagram">📸</a>`);
  document.getElementById('footer-social').innerHTML = social.join('');
}

function setActiveNav(el) {
  document.querySelectorAll('.nav-links button').forEach(b => b.classList.remove('active-nav'));
  el.classList.add('active-nav');
}

// ══════════════════════════════════════════════
//  PRODUCT CARD
// ══════════════════════════════════════════════
function productThumb(p, sizeEm) {
  if (p.images && p.images.length) return `<img src="${p.images[0]}" alt="${p.name}" loading="lazy">`;
  return `<span style="font-size:${sizeEm || '4rem'}">${p.emoji || '📦'}</span>`;
}

function createCard(p) {
  const inCart = cart.some(c => c.id === p.id);
  const inWish = wishlist.includes(p.id);
  const rating = getRatingInfo(p);
  const stars = starsHtml(rating.avg) + (rating.count ? ` <span style="color:var(--text-muted);font-weight:400">(${rating.count})</span>` : '');
  const outOfStock = (p.stock || 0) <= 0;
  const badge = outOfStock ? `<div class="product-badge outofstock">Rupture</div>` : (p.badge ? `<div class="product-badge ${p.badge}">${p.badge==='new'?'Nouveau':'Promo'}</div>` : '');
  const oldP = p.oldPrice ? `<span class="old-price">${formatPrice(p.oldPrice)}</span>` : '';
  return `
    <div class="product-card" onclick="openModal(${p.id})">
      <div class="product-img">
        ${badge}
        ${productThumb(p)}
        <div class="wishlist-btn ${inWish?'active':''}" onclick="toggleWish(event,${p.id})">♥</div>
      </div>
      <div class="product-info">
        <div class="product-cat">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="stars">${stars}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-footer">
          <div class="product-price">${formatPrice(p.price)}${oldP}</div>
          <button class="add-to-cart-btn" ${outOfStock?'disabled':''} onclick="addToCart(event,${p.id})">${outOfStock?'Rupture':(inCart?'✓ Ajouté':'+ Panier')}</button>
        </div>
      </div>
    </div>`;
}

// ══════════════════════════════════════════════
//  FEATURED
// ══════════════════════════════════════════════
function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  const featured = products.filter(p => p.badge).slice(0,6);
  grid.innerHTML = featured.map(createCard).join('');
}

// ══════════════════════════════════════════════
//  SHOP
// ══════════════════════════════════════════════
function renderShop() {
  if (!document.getElementById('shop-grid')) return;
  let list = [...products];
  const q = document.getElementById('search-input').value.toLowerCase();
  if (activeFilter !== 'Tous') list = list.filter(p => p.cat === activeFilter);
  if (q) list = list.filter(p => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
  const sort = document.getElementById('sort-select').value;
  if (sort === 'price-asc') list.sort((a,b) => a.price-b.price);
  if (sort === 'price-desc') list.sort((a,b) => b.price-a.price);
  if (sort === 'name') list.sort((a,b) => a.name.localeCompare(b.name));
  document.getElementById('shop-grid').innerHTML = list.length
    ? list.map(createCard).join('')
    : '<div class="empty-state" style="grid-column:1/-1"><div class="icon">🔍</div><h3>Aucun produit trouvé</h3><p>Essayez un autre terme de recherche</p></div>';
  document.getElementById('shop-title').textContent = `${activeFilter === 'Tous' ? 'Tous les produits' : activeFilter} (${list.length})`;
}

function setFilter(cat, el) {
  activeFilter = cat;
  document.querySelectorAll('.filter-chips .chip').forEach(c => c.classList.remove('active-chip'));
  el.classList.add('active-chip');
  renderShop();
}

function filterCat(cat) {
  activeFilter = cat;
  document.querySelectorAll('.filter-chips .chip').forEach((c,i) => {
    c.classList.remove('active-chip');
    if (c.textContent.includes(cat)) c.classList.add('active-chip');
  });
}

// ══════════════════════════════════════════════
//  MODAL PRODUIT
// ══════════════════════════════════════════════
function setModalImage(idx) {
  if (!currentModal) return;
  const imgs = currentModal.images || [];
  if (!imgs.length) return;
  modalImgIndex = Math.max(0, Math.min(idx, imgs.length-1));
  document.getElementById('modal-img').innerHTML = `<img src="${imgs[modalImgIndex]}" alt="${currentModal.name}">`;
  document.querySelectorAll('#modal-gallery img').forEach((im,i) => im.classList.toggle('active-thumb', i===modalImgIndex));
}

function openModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  currentModal = p; modalQty = 1; modalImgIndex = 0;
  const hasImages = p.images && p.images.length;
  document.getElementById('modal-img').innerHTML = hasImages ? `<img src="${p.images[0]}" alt="${p.name}">` : `<span style="font-size:6rem">${p.emoji||'📦'}</span>`;
  document.getElementById('modal-gallery').innerHTML = hasImages && p.images.length > 1
    ? p.images.map((src,i) => `<img src="${src}" class="${i===0?'active-thumb':''}" onclick="setModalImage(${i})">`).join('')
    : '';
  const specs = Object.entries(p.specs||{}).map(([k,v]) => `<div class="spec-item"><span>${k}</span><span>${v}</span></div>`).join('');
  const outOfStock = (p.stock||0) <= 0;
  const lowStock = !outOfStock && p.stock <= settings.lowStockThreshold;
  const stockNote = outOfStock
    ? `<div class="stock-note out">✕ Rupture de stock</div>`
    : lowStock
      ? `<div class="stock-note low">⚠ Plus que ${p.stock} en stock</div>`
      : `<div class="stock-note ok">✓ En stock (${p.stock})</div>`;
  const rating = getRatingInfo(p);
  document.getElementById('modal-details').innerHTML = `
    <div class="product-cat">${p.cat}</div>
    <h2>${p.name}</h2>
    <div class="stars">${starsHtml(rating.avg)} <span style="color:var(--text-muted);font-weight:400;font-size:0.8rem">${rating.count ? `(${rating.avg.toFixed(1)} · ${rating.count} avis)` : '(pas encore d\'avis)'}</span></div>
    <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:0.5rem">${p.desc}</p>
    <div class="modal-price">${formatPrice(p.price)} ${p.oldPrice ? `<span style="font-size:1rem;font-weight:400;color:var(--text-muted);text-decoration:line-through;">${formatPrice(p.oldPrice)}</span>` : ''}</div>
    ${stockNote}
    <div class="modal-spec"><h4>Caractéristiques</h4><div class="spec-list">${specs}</div></div>
    <div class="qty-control">
      <button class="qty-btn" onclick="changeQty(-1)">−</button>
      <div class="qty-val" id="modal-qty">1</div>
      <button class="qty-btn" onclick="changeQty(1)">+</button>
    </div>
    <button class="btn-add-modal" ${outOfStock?'disabled':''} onclick="addToCartModal()">🛒 ${outOfStock?'Indisponible':'Ajouter au panier — ' + formatPrice(p.price)}</button>
    <div class="reviews-section" id="reviews-section"></div>`;
  renderReviews(p);
  document.getElementById('product-modal').classList.add('open');
}

let pendingReviewStars = 5;

function renderReviews(p) {
  const el = document.getElementById('reviews-section');
  if (!el) return;
  const reviews = p.reviews || [];
  const list = reviews.length
    ? reviews.map(r => `
      <div class="review-item">
        <span class="review-name">${r.name}</span> <span class="review-stars">${starsHtml(r.rating)}</span>
        <div class="review-comment">${r.comment || ''}</div>
      </div>`).join('')
    : `<div class="no-reviews">Aucun avis pour l'instant — soyez le premier à donner votre avis.</div>`;
  pendingReviewStars = 5;
  el.innerHTML = `
    <h4 style="font-size:0.8rem;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:var(--text-muted);margin-bottom:0.6rem;">Avis clients</h4>
    ${list}
    <div class="review-form">
      <div class="star-select" id="review-star-select">${[1,2,3,4,5].map(i => `<span data-i="${i}" class="${i<=5?'sel':''}" onclick="setPendingStars(${i})">★</span>`).join('')}</div>
      <input type="text" id="review-name" placeholder="Votre nom">
      <textarea id="review-comment" placeholder="Votre avis sur ce produit..." rows="2" style="background:var(--surface);border:1px solid var(--border);color:var(--text);padding:0.6rem;border-radius:8px;font-family:var(--font-body);font-size:0.85rem;"></textarea>
      <button class="btn-small" onclick="submitReview(${p.id})">✓ Publier mon avis</button>
    </div>`;
}

function setPendingStars(i) {
  pendingReviewStars = i;
  document.querySelectorAll('#review-star-select span').forEach(s => s.classList.toggle('sel', parseInt(s.dataset.i) <= i));
}

function submitReview(productId) {
  const name = document.getElementById('review-name').value.trim();
  const comment = document.getElementById('review-comment').value.trim();
  if (!name) { toast('Indiquez votre nom', 'error'); return; }
  const p = products.find(x => x.id === productId);
  if (!p) return;
  p.reviews = p.reviews || [];
  p.reviews.unshift({ name, rating: pendingReviewStars, comment, date: new Date().toISOString() });
  saveDB();
  renderReviews(p);
  renderShop(); renderFeatured();
  toast('Merci pour votre avis ✓', 'success');
}

function closeModal() { document.getElementById('product-modal').classList.remove('open'); }
function changeQty(d) {
  if (!currentModal) return;
  modalQty = Math.max(1, Math.min(modalQty + d, currentModal.stock || 99));
  document.getElementById('modal-qty').textContent = modalQty;
}
function addToCartModal() {
  if (!currentModal) return;
  for (let i=0; i<modalQty; i++) addToCartById(currentModal.id);
  closeModal(); toast('Ajouté au panier ✓','success');
}

// ══════════════════════════════════════════════
//  PANIER
// ══════════════════════════════════════════════
function addToCart(e, id) { e.stopPropagation(); addToCartById(id); toast('Ajouté au panier ✓','success'); }

function addToCartById(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  if ((p.stock || 0) <= 0) { toast('Rupture de stock','error'); return; }
  const ex = cart.find(c => c.id === id);
  if (ex) {
    if (ex.qty >= p.stock) { toast('Stock maximum atteint','error'); return; }
    ex.qty++;
  } else cart.push({...p, qty:1});
  updateBadge(); saveDB();
}

function updateBadge() {
  const badge = document.getElementById('cart-badge');
  if (!badge) return;
  const total = cart.reduce((s,c) => s+c.qty, 0);
  badge.textContent = total;
}

function removeFromCart(id) { cart = cart.filter(c => c.id !== id); renderCart(); updateBadge(); saveDB(); }
function changeCartQty(id, d) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  const prod = products.find(p => p.id === id);
  const max = prod ? prod.stock : 99;
  item.qty = Math.max(1, Math.min(item.qty + d, max));
  renderCart(); updateBadge(); saveDB();
}

function renderCart() {
  const el = document.getElementById('cart-content');
  if (!el) return;
  if (!cart.length) {
    el.innerHTML = '<div class="empty-state"><div class="icon">🛒</div><h3>Votre panier est vide</h3><p>Découvrez nos produits et ajoutez-en !</p><button class="btn-primary" style="margin-top:1rem" onclick="showPage(\'shop\')">Explorer la boutique</button></div>';
    return;
  }
  const subtotal = cart.reduce((s,c) => s+(c.price*c.qty), 0);
  const shipping = subtotal >= settings.freeShippingThreshold ? 0 : settings.shippingFee;
  const total = subtotal + shipping;
  const items = cart.map(c => `
    <div class="cart-item">
      <div class="cart-item-img">${productThumb(c, '2.5rem')}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${c.name}</div>
        <div class="cart-item-price">${formatPrice(c.price)} × ${c.qty} = ${formatPrice(c.price*c.qty)}</div>
      </div>
      <div class="cart-item-actions">
        <div class="qty-control" style="margin:0">
          <button class="qty-btn" onclick="changeCartQty(${c.id},-1)">−</button>
          <div class="qty-val" style="min-width:1.5rem">${c.qty}</div>
          <button class="qty-btn" onclick="changeCartQty(${c.id},1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${c.id})">🗑</button>
      </div>
    </div>`).join('');

  el.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 320px;gap:1.5rem;align-items:start">
      <div><div class="cart-items">${items}</div></div>
      <div class="cart-summary">
        <h3>Récapitulatif</h3>
        <div class="summary-row"><span>Sous-total</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row"><span>Livraison</span><span>${shipping === 0 ? '<span style="color:var(--success)">Gratuite</span>' : formatPrice(shipping)}</span></div>
        ${shipping>0 ? `<div style="font-size:0.78rem;color:var(--text-muted);padding:0.3rem 0">Livraison gratuite dès ${formatPrice(settings.freeShippingThreshold)} d'achat</div>` : ''}
        <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
        <button class="checkout-btn" onclick="startCheckout()">Passer la commande →</button>
        <button onclick="showPage('shop')" style="width:100%;background:none;border:1px solid var(--border);color:var(--text-muted);padding:0.7rem;border-radius:10px;cursor:pointer;margin-top:0.6rem;font-size:0.85rem;">Continuer les achats</button>
      </div>
    </div>`;
}

// ══════════════════════════════════════════════
//  CHECKOUT
// ══════════════════════════════════════════════
function startCheckout() {
  if (!cart.length) { toast('Panier vide !','error'); return; }
  checkoutStep = 1; showPage('checkout');
}

function renderCheckout() {
  ['step1','step2'].forEach((s,i) => {
    const el = document.getElementById(s);
    el.className = 'step' + (i+1 === checkoutStep ? ' active' : '') + (i+1 < checkoutStep ? ' done' : '');
    if (i+1 < checkoutStep) el.querySelector('.step-dot').innerHTML = '✓';
    else el.querySelector('.step-dot').textContent = i+1;
  });
  const body = document.getElementById('checkout-body');
  if (checkoutStep === 1) {
    body.innerHTML = `
      <h2 style="font-family:var(--font-display);margin-bottom:1.5rem">📦 Adresse de livraison</h2>
      <div class="checkout-form">
        <div class="form-row">
          <div class="form-group"><label>Prénom</label><input type="text" id="c-fname" placeholder="Jean" value="${checkoutData.fname||''}"></div>
          <div class="form-group"><label>Nom</label><input type="text" id="c-lname" placeholder="Dupont" value="${checkoutData.lname||''}"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Email</label><input type="email" id="c-email" placeholder="jean@email.com" value="${checkoutData.email||''}"></div>
          <div class="form-group"><label>Téléphone (WhatsApp)</label><input type="tel" id="c-phone" placeholder="237 6XX XXX XXX" value="${checkoutData.phone||''}"></div>
        </div>
        <div class="form-group"><label>Adresse / Quartier</label><input type="text" id="c-addr" placeholder="Ex : Rue 1.234, Bonamoussadi" value="${checkoutData.addr||''}"></div>
        <div class="form-row">
          <div class="form-group"><label>Ville</label><input type="text" id="c-city" placeholder="Douala" value="${checkoutData.city||''}"></div>
          <div class="form-group"><label>Repère / Code postal</label><input type="text" id="c-zip" placeholder="Optionnel" value="${checkoutData.zip||''}"></div>
        </div>
        <div class="form-group"><label>Note pour la livraison (optionnel)</label><textarea id="c-notes" placeholder="Ex : Appeler avant d'arriver">${checkoutData.notes||''}</textarea></div>
        <button class="btn-primary" style="margin-top:1rem" onclick="placeOrder()">✓ Confirmer la commande →</button>
      </div>`;
  } else {
    const order = orders[0];
    const total = order ? order.total : 0;
    body.innerHTML = `
      <div class="success-screen">
        <div class="icon">🎉</div>
        <h2>Commande confirmée !</h2>
        <p>Merci ${checkoutData.fname || ''}, votre commande <strong>${order ? order.id : ''}</strong> a été enregistrée.<br>
        Un récapitulatif WhatsApp s'est ouvert dans un nouvel onglet — il ne reste qu'à appuyer sur Envoyer pour confirmer auprès de la boutique.</p>
        <div class="success-box" style="background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:1.2rem;margin-bottom:1.5rem;">
          <div class="summary-row"><span>Commande</span><span>${order ? order.id : ''}</span></div>
          <div class="summary-row"><span>Total payé</span><span style="color:var(--accent)">${formatPrice(total)}</span></div>
          <div class="summary-row"><span>Livraison estimée</span><span>2-5 jours ouvrés</span></div>
        </div>
        <button class="btn-whatsapp" onclick="sendOrderToWhatsApp('${order ? order.id : ''}')">📲 Renvoyer la commande sur WhatsApp</button>
        <button class="btn-primary" style="margin-top:0.8rem" onclick="showPage('home');cart=[];updateBadge();saveDB()">Retour à l'accueil</button>
      </div>`;
  }
}

function buildWhatsAppMessage(order) {
  const lines = [
    `🛒 *Nouvelle commande ${settings.shopName}*`,
    `Commande : ${order.id}`,
    `Client : ${order.client}`,
    `Téléphone : ${order.phone}`,
    `Email : ${order.email}`,
    order.address ? `Adresse : ${order.address}` : null,
    order.notes ? `Note : ${order.notes}` : null,
    `Produits : ${order.products}`,
    `Total : ${formatPrice(order.total)}`,
  ].filter(Boolean);
  return lines.join('\n');
}

function sendOrderToWhatsApp(orderId) {
  const order = orders.find(o => o.id === orderId);
  if (!order) return;
  const msg = encodeURIComponent(buildWhatsAppMessage(order));
  const num = (settings.whatsappNumber || '').replace(/[^0-9]/g, '');
  window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
}

function placeOrder() {
  const fname = document.getElementById('c-fname')?.value.trim();
  const email = document.getElementById('c-email')?.value.trim();
  const phone = document.getElementById('c-phone')?.value.trim();
  if (!fname || !email || !phone) { toast('Veuillez remplir prénom, email et téléphone', 'error'); return; }
  checkoutData.fname = fname;
  checkoutData.lname = document.getElementById('c-lname')?.value || '';
  checkoutData.email = email;
  checkoutData.phone = phone;
  checkoutData.addr = document.getElementById('c-addr')?.value || '';
  checkoutData.zip = document.getElementById('c-zip')?.value || '';
  checkoutData.city = document.getElementById('c-city')?.value || '';
  checkoutData.notes = document.getElementById('c-notes')?.value || '';

  const subtotal = cart.reduce((s,c) => s+(c.price*c.qty),0);
  const shipping = subtotal >= settings.freeShippingThreshold ? 0 : settings.shippingFee;
  const total = subtotal + shipping;
  const orderId = '#' + (2500 + orders.length + 1 + Math.floor(Math.random()*90));
  const prods = cart.map(c => `${c.name} × ${c.qty}`).join(', ');
  const address = [checkoutData.addr, checkoutData.city, checkoutData.zip].filter(Boolean).join(', ');

  // Décrémente le stock et repère les articles qui passent en stock bas
  const lowStockAlerts = [];
  cart.forEach(c => {
    const p = products.find(x => x.id === c.id);
    if (!p) return;
    const before = p.stock || 0;
    p.stock = Math.max(0, before - c.qty);
    if (before > settings.lowStockThreshold && p.stock <= settings.lowStockThreshold) lowStockAlerts.push(p);
  });

  const order = {
    id: orderId,
    client: (checkoutData.fname||'Client') + ' ' + (checkoutData.lname||''),
    email: checkoutData.email||'—',
    phone: checkoutData.phone||'—',
    address, notes: checkoutData.notes||'',
    products: prods, total: total,
    status: 'Traitement', date: new Date().toLocaleDateString('fr-FR')
  };
  orders.unshift(order);
  addNotification(order);
  lowStockAlerts.forEach(p => addStockNotification(p));
  saveDB();
  renderProductsTable();

  checkoutStep = 2; renderCheckout();
  // Ouvre automatiquement WhatsApp avec le récapitulatif pré-rempli
  sendOrderToWhatsApp(orderId);
}

// ══════════════════════════════════════════════
//  WISHLIST
// ══════════════════════════════════════════════
function toggleWish(e, id) {
  e.stopPropagation();
  if (wishlist.includes(id)) wishlist = wishlist.filter(x => x !== id);
  else wishlist.push(id);
  renderShop(); renderFeatured(); saveDB();
}

// ══════════════════════════════════════════════
//  NOTIFICATIONS (panneau admin)
// ══════════════════════════════════════════════
function addNotification(order) {
  notifications.unshift({
    id: 'n' + Date.now(),
    orderId: order.id,
    message: `Nouvelle commande ${order.id} de ${order.client} — ${formatPrice(order.total)}`,
    date: new Date().toISOString(),
    read: false
  });
  notifications = notifications.slice(0, 50);
  renderNotifBadge();
  if (document.getElementById('page-admin')?.classList.contains('active')) renderNotifPanel();
  beep();
  if (window.Notification && Notification.permission === 'granted') {
    try { new Notification(settings.shopName, { body: `Nouvelle commande ${order.id} — ${formatPrice(order.total)}` }); } catch(e){}
  }
}

function addStockNotification(p) {
  notifications.unshift({
    id: 'n' + Date.now() + Math.random().toString(36).slice(2,6),
    orderId: null,
    lowStockProductId: p.id,
    message: `⚠️ Stock bas : ${p.name} (reste ${p.stock})`,
    date: new Date().toISOString(),
    read: false
  });
  notifications = notifications.slice(0, 50);
  renderNotifBadge();
  if (document.getElementById('page-admin')?.classList.contains('active')) renderNotifPanel();
}

function renderNotifBadge() {
  const badge = document.getElementById('notif-badge');
  if (!badge) return;
  const unread = notifications.filter(n => !n.read).length;
  badge.style.display = unread > 0 ? 'flex' : 'none';
  badge.textContent = unread > 9 ? '9+' : unread;
}

function renderNotifPanel() {
  const panel = document.getElementById('notif-panel');
  if (!panel) return;
  renderNotifBadge();
  if (!notifications.length) {
    panel.innerHTML = `<div class="notif-header">Notifications</div><div class="notif-empty">Aucune notification pour l'instant</div>`;
    return;
  }
  const items = notifications.map(n => `
    <div class="notif-item ${n.read?'':'unread'}" onclick="openOrderFromNotif('${n.orderId}','${n.id}')">
      <div>${n.message}</div>
      <div class="notif-time">${new Date(n.date).toLocaleString('fr-FR')}</div>
    </div>`).join('');
  panel.innerHTML = `<div class="notif-header">Notifications <button onclick="markAllNotifsRead()">Tout marquer lu</button></div>${items}`;
}

function toggleNotifPanel() {
  const panel = document.getElementById('notif-panel');
  panel.classList.toggle('open');
  if (panel.classList.contains('open')) renderNotifPanel();
}

function markAllNotifsRead() {
  notifications.forEach(n => n.read = true);
  saveDB(); renderNotifPanel();
}

function openOrderFromNotif(orderId, notifId) {
  const n = notifications.find(x => x.id === notifId);
  if (n) n.read = true;
  saveDB(); renderNotifBadge();
  document.getElementById('notif-panel').classList.remove('open');
  if (orderId && orderId !== 'null') {
    showAdminSection('orders', document.querySelectorAll('.sidebar-item')[2]);
    viewOrder(orderId);
  } else {
    showAdminSection('products', document.querySelectorAll('.sidebar-item')[1]);
  }
}

function requestNotifPermission() {
  if (!window.Notification) { toast('Notifications non supportées par ce navigateur','error'); return; }
  Notification.requestPermission().then(perm => {
    toast(perm === 'granted' ? 'Notifications activées ✓' : 'Notifications refusées', perm === 'granted' ? 'success' : 'error');
  });
}

document.addEventListener('click', (e) => {
  const wrap = document.querySelector('.notif-wrap');
  if (wrap && !wrap.contains(e.target)) document.getElementById('notif-panel')?.classList.remove('open');
});

// ══════════════════════════════════════════════
//  ADMIN — CONNEXION
// ══════════════════════════════════════════════
function adminLogin() {
  const u = document.getElementById('admin-user').value;
  const p = document.getElementById('admin-pass').value;
  if (u === settings.adminUser && p === settings.adminPass) {
    document.getElementById('login-error').style.display = 'none';
    document.getElementById('page-admin-login').classList.remove('active');
    document.getElementById('page-admin').classList.add('active');
    renderAdminOverview(); renderProductsTable(); renderOrders(); renderCustomers(); renderNotifPanel(); renderSettingsForm();
  } else {
    document.getElementById('login-error').style.display = 'block';
  }
}

function adminLogout() { window.location.href = 'index.html'; }

function showAdminSection(id, el) {
  document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
  document.getElementById('admin-' + id).classList.add('active');
  document.querySelectorAll('.sidebar-item').forEach(s => s.classList.remove('active-admin'));
  if (el) el.classList.add('active-admin');
  if (id === 'settings') renderSettingsForm();
}

function renderAdminOverview() {
  if (!document.getElementById('stats-grid')) return;
  const total = orders.reduce((s,o) => s + parseFloat(o.total), 0);
  const data = [
    {label:'Chiffre d\'affaires', value: formatPrice(total), change:'', up:true},
    {label:'Commandes', value:orders.length, change:'', up:true},
    {label:'Produits', value:products.length, change:'', up:true},
    {label:'Clients', value:new Set(orders.map(o=>o.email)).size, change:'', up:true},
  ];
  document.getElementById('stats-grid').innerHTML = data.map(d => `
    <div class="stat-card">
      <div class="stat-label">${d.label}</div>
      <div class="stat-value">${d.value}</div>
      ${d.change ? `<div class="stat-change up">${d.change}</div>` : ''}
    </div>`).join('');

  document.getElementById('recent-orders-tbody').innerHTML = orders.slice(0,5).map(o => `
    <tr>
      <td><code style="color:var(--accent)">${o.id}</code></td>
      <td>${o.client}</td>
      <td style="color:var(--text-muted);max-width:200px;overflow:hidden;text-overflow:ellipsis">${o.products}</td>
      <td style="font-weight:700">${formatPrice(o.total)}</td>
      <td><span class="badge-order ${statusClass(o.status)}">${o.status}</span></td>
    </tr>`).join('');

  renderSalesChart();
}

// ══════════════════════════════════════════════
//  ADMIN — PRODUITS + PHOTOS
// ══════════════════════════════════════════════
let pendingImages = [];

function renderImageThumbs() {
  const el = document.getElementById('p-image-thumbs');
  el.innerHTML = pendingImages.map((src,i) => `
    <div class="img-thumb"><img src="${src}"><button class="rm-img" onclick="removePendingImage(${i})">✕</button></div>`).join('');
}

function removePendingImage(i) { pendingImages.splice(i,1); renderImageThumbs(); }

function resizeImageFile(file, maxDim, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) { height = Math.round(height * maxDim / width); width = maxDim; }
        else if (height > maxDim) { width = Math.round(width * maxDim / height); height = maxDim; }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function handleImageFiles(event) {
  const files = Array.from(event.target.files || []);
  for (const file of files) {
    try {
      const dataUrl = await resizeImageFile(file, 640, 0.72);
      pendingImages.push(dataUrl);
    } catch (e) { console.error(e); toast('Impossible de lire une image', 'error'); }
  }
  renderImageThumbs();
  event.target.value = '';
}

function addImageUrl() {
  const input = document.getElementById('p-image-url');
  const url = input.value.trim();
  if (!url) return;
  pendingImages.push(url);
  input.value = '';
  renderImageThumbs();
}

function renderProductsTable() {
  const tbody0 = document.getElementById('products-tbody');
  if (!tbody0) return;
  document.getElementById('product-count').textContent = products.length + ' produits';
  document.getElementById('products-tbody').innerHTML = products.map(p => {
    const isOut = p.stock <= 0;
    const isLow = !isOut && p.stock <= settings.lowStockThreshold;
    const stockClass = isOut ? 'out' : isLow ? 'low' : 'in';
    const stockLabel = isOut ? 'Rupture' : isLow ? 'Stock bas' : 'En stock';
    const restockBtn = (isOut || isLow) ? `<button class="btn-small" style="padding:0.3rem 0.6rem;font-size:0.78rem" onclick="sendRestockAlert(${p.id})" title="Envoyer un rappel de réassort sur WhatsApp">📲</button>` : '';
    return `<tr>
      <td><div class="td-img"><div class="td-emoji">${productThumb(p,'1.4rem')}</div><div><div style="font-weight:600">${p.name}</div><div style="font-size:0.78rem;color:var(--text-muted)">${p.desc.slice(0,40)}...</div></div></div></td>
      <td><span class="badge-cat">${p.cat}</span></td>
      <td><strong>${formatPrice(p.price)}</strong>${p.oldPrice ? ` <span style="color:var(--text-muted);text-decoration:line-through;font-size:0.8rem">${formatPrice(p.oldPrice)}</span>`:''}</td>
      <td><span class="badge-stock ${stockClass}">${stockLabel} (${p.stock})</span></td>
      <td><div class="action-btns"><button class="btn-edit" onclick="editProduct(${p.id})">✏ Éditer</button><button class="btn-del" onclick="deleteProduct(${p.id})">🗑 Suppr.</button>${restockBtn}</div></td>
    </tr>`;
  }).join('');
}

function sendRestockAlert(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const msg = encodeURIComponent(`📦 Rappel réassort ${settings.shopName}\nProduit : ${p.name}\nStock restant : ${p.stock}\nPensez à recommander auprès du fournisseur.`);
  const num = (settings.whatsappNumber || '').replace(/[^0-9]/g, '');
  window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
}

function editProduct(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  document.getElementById('edit-id').value = p.id;
  document.getElementById('p-name').value = p.name;
  document.getElementById('p-cat').value = p.cat;
  document.getElementById('p-price').value = p.price;
  document.getElementById('p-oldprice').value = p.oldPrice || '';
  document.getElementById('p-stock').value = p.stock;
  document.getElementById('p-emoji').value = p.emoji;
  document.getElementById('p-desc').value = p.desc;
  document.getElementById('p-badge').value = p.badge || '';
  document.getElementById('p-stars').value = p.stars;
  document.getElementById('product-form-title').textContent = '✏ Modifier : ' + p.name;
  pendingImages = [...(p.images || [])];
  renderImageThumbs();
  window.scrollTo(0,0);
  toast('Produit chargé pour édition', 'success');
}

function saveProduct() {
  const name = document.getElementById('p-name').value.trim();
  if (!name) { toast('Nom requis','error'); return; }
  const editId = parseInt(document.getElementById('edit-id').value);
  const data = {
    name, cat: document.getElementById('p-cat').value,
    price: parseFloat(document.getElementById('p-price').value) || 0,
    oldPrice: parseFloat(document.getElementById('p-oldprice').value) || null,
    stock: parseInt(document.getElementById('p-stock').value) || 0,
    emoji: document.getElementById('p-emoji').value || '📦',
    desc: document.getElementById('p-desc').value || '',
    badge: document.getElementById('p-badge').value,
    stars: parseInt(document.getElementById('p-stars').value) || 4,
    images: [...pendingImages],
  };
  if (editId) {
    const idx = products.findIndex(x => x.id === editId);
    if (idx !== -1) { data.specs = products[idx].specs || {}; products[idx] = {...products[idx], ...data}; toast('Produit mis à jour ✓','success'); }
  } else {
    data.id = products.length ? Math.max(...products.map(p=>p.id)) + 1 : 1;
    data.specs = {};
    products.push(data); toast('Produit ajouté ✓','success');
  }
  saveDB();
  cancelEdit(); renderProductsTable(); renderAdminOverview();
}

function cancelEdit() {
  document.getElementById('edit-id').value = '';
  ['p-name','p-price','p-oldprice','p-stock','p-emoji','p-desc'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('p-badge').value = '';
  document.getElementById('p-stars').value = 4;
  document.getElementById('product-form-title').textContent = '➕ Ajouter un produit';
  pendingImages = [];
  renderImageThumbs();
}

function deleteProduct(id) {
  if (!confirm('Supprimer ce produit ?')) return;
  products = products.filter(p => p.id !== id);
  saveDB();
  renderProductsTable(); renderAdminOverview();
  toast('Produit supprimé','success');
}

// ══════════════════════════════════════════════
//  ADMIN — COMMANDES
// ══════════════════════════════════════════════
const ORDER_STATUSES = ['Traitement','Expédié','Livré','Annulé'];

function renderOrders() {
  const ordersTbody = document.getElementById('all-orders-tbody');
  if (!ordersTbody) return;
  ordersTbody.innerHTML = orders.map(o => `
    <tr>
      <td><code style="color:var(--accent)">${o.id}</code></td>
      <td><div style="font-weight:600">${o.client}</div><div style="font-size:0.78rem;color:var(--text-muted)">${o.email}</div></td>
      <td style="color:var(--text-muted)">${o.phone||'—'}</td>
      <td style="color:var(--text-muted)">${o.date}</td>
      <td><strong>${formatPrice(o.total)}</strong></td>
      <td><select class="order-status-sel" onchange="updateOrderStatus('${o.id}',this.value)">
        ${ORDER_STATUSES.map(s => `<option ${o.status===s?'selected':''}>${s}</option>`).join('')}
      </select></td>
      <td><div class="action-btns"><button class="btn-view" onclick="viewOrder('${o.id}')">👁 Voir</button><button class="btn-small" style="padding:0.3rem 0.6rem;font-size:0.78rem" onclick="sendOrderToWhatsApp('${o.id}')">📲</button></div></td>
    </tr>`).join('');
}

function updateOrderStatus(id, status) {
  const o = orders.find(x => x.id === id);
  if (o) { o.status = status; saveDB(); renderOrders(); renderAdminOverview(); toast('Statut mis à jour ✓','success'); }
}

function viewOrder(id) {
  const o = orders.find(x => x.id === id);
  if (!o) return;
  document.getElementById('order-modal-body').innerHTML = `
    <div class="order-detail-row"><span>Commande</span><span><strong>${o.id}</strong></span></div>
    <div class="order-detail-row"><span>Client</span><span>${o.client}</span></div>
    <div class="order-detail-row"><span>Email</span><span>${o.email}</span></div>
    <div class="order-detail-row"><span>Téléphone</span><span>${o.phone||'—'}</span></div>
    <div class="order-detail-row"><span>Adresse</span><span>${o.address||'—'}</span></div>
    <div class="order-detail-row"><span>Produits</span><span>${o.products}</span></div>
    <div class="order-detail-row"><span>Note</span><span>${o.notes||'—'}</span></div>
    <div class="order-detail-row"><span>Total</span><span><strong>${formatPrice(o.total)}</strong></span></div>
    <div class="order-detail-row"><span>Date</span><span>${o.date}</span></div>
    <div class="order-detail-row"><span>Statut</span><span><span class="badge-order ${statusClass(o.status)}">${o.status}</span></span></div>
    <button class="btn-whatsapp" style="margin-top:1.2rem" onclick="sendOrderToWhatsApp('${o.id}')">📲 Contacter sur WhatsApp</button>
  `;
  document.getElementById('order-modal').classList.add('open');
}
function closeOrderModal() { document.getElementById('order-modal').classList.remove('open'); }

function renderCustomers() {
  if (!document.getElementById('customers-tbody')) return;
  const map = {};
  orders.forEach(o => {
    if (!map[o.email]) map[o.email] = {name:o.client, email:o.email, phone:o.phone, count:0, total:0};
    map[o.email].count++;
    map[o.email].total += parseFloat(o.total);
  });
  document.getElementById('customers-tbody').innerHTML = Object.values(map).map(c => `
    <tr>
      <td><strong>${c.name}</strong></td>
      <td style="color:var(--text-muted)">${c.email}</td>
      <td style="color:var(--text-muted)">${c.phone||'—'}</td>
      <td>${c.count} commande${c.count>1?'s':''}</td>
      <td style="color:var(--accent);font-weight:700">${formatPrice(c.total)}</td>
    </tr>`).join('');
}

// ══════════════════════════════════════════════
//  ADMIN — PARAMÈTRES
// ══════════════════════════════════════════════
function renderSettingsForm() {
  const $ = id => document.getElementById(id);
  if (!$('s-shopname')) return;
  $('s-shopname').value = settings.shopName;
  $('s-currency').value = settings.currency;
  $('s-freeship').value = settings.freeShippingThreshold;
  $('s-shipfee').value = settings.shippingFee;
  $('s-lowstock').value = settings.lowStockThreshold;
  $('s-whatsapp').value = settings.whatsappNumber;
  $('s-aboutdesc').value = settings.aboutDescription;
  $('s-email').value = settings.contactEmail;
  $('s-address').value = settings.address;
  $('s-facebook').value = settings.facebook;
  $('s-instagram').value = settings.instagram;
  $('s-adminuser').value = settings.adminUser;
  $('s-adminpass').value = '';

  const o = settings.offer || DEFAULT_SETTINGS.offer;
  $('s-offer-enabled').checked = !!o.enabled;
  $('s-offer-title').value = o.title || '';
  $('s-offer-badge').value = o.badge || '';
  $('s-offer-cta').value = o.ctaText || '';
  $('s-offer-target').value = o.ctaTarget || 'shop';
  $('s-offer-category').value = o.ctaCategory || 'Smartphone';
  $('s-offer-cat-wrap').style.display = (o.ctaTarget === 'category') ? 'flex' : 'none';
  $('s-offer-expires').value = o.expiresAt || '';
  $('s-offer-desc').value = o.description || '';
  pendingOfferImage = o.image || '';
  renderOfferImageThumb();
}

function saveShopSettings() {
  const $ = id => document.getElementById(id);
  settings.shopName = $('s-shopname').value.trim() || 'LEO TECH';
  settings.currency = $('s-currency').value.trim() || 'FCFA';
  settings.freeShippingThreshold = parseFloat($('s-freeship').value) || 0;
  settings.shippingFee = parseFloat($('s-shipfee').value) || 0;
  settings.lowStockThreshold = parseInt($('s-lowstock').value) || 0;
  settings.whatsappNumber = $('s-whatsapp').value.replace(/[^0-9]/g,'');
  settings.aboutDescription = $('s-aboutdesc').value.trim();
  settings.contactEmail = $('s-email').value.trim();
  settings.address = $('s-address').value.trim();
  settings.facebook = $('s-facebook').value.trim();
  settings.instagram = $('s-instagram').value.trim();
  saveDB();
  document.getElementById('admin-demo-hint').textContent = `Identifiant : ${settings.adminUser}`;
  toast('Paramètres enregistrés ✓ (dans ce navigateur)','success');
  renderAdminOverview(); renderProductsTable(); renderOrders(); renderCustomers(); renderCart(); renderFooter();
}

// ══════════════════════════════════════════════
//  OFFRE SPÉCIALE (popup d'accueil)
// ══════════════════════════════════════════════
let pendingOfferImage = '';

function maybeShowOffer(force) {
  const o = settings.offer;
  if (!o || !o.enabled) { if (force) toast("Activez d'abord la popup dans Paramètres", 'error'); return; }
  if (!force && o.expiresAt) {
    const exp = new Date(o.expiresAt + 'T23:59:59');
    if (new Date() > exp) return;
  }
  if (!force) {
    try { if (sessionStorage.getItem('offerDismissed_v1')) return; } catch(e) {}
  }
  document.getElementById('offer-badge').style.display = o.badge ? 'inline-block' : 'none';
  document.getElementById('offer-badge').textContent = o.badge || '';
  document.getElementById('offer-title').textContent = o.title || 'Offre spéciale';
  document.getElementById('offer-desc').textContent = o.description || '';
  document.getElementById('offer-image-wrap').innerHTML = o.image ? `<img src="${o.image}" alt="">` : '';
  document.getElementById('offer-follow-btn').textContent = o.ctaText || "Voir l'offre";
  document.getElementById('offer-modal').classList.add('open');
}

function closeOfferModal(remember) {
  document.getElementById('offer-modal').classList.remove('open');
  if (remember) { try { sessionStorage.setItem('offerDismissed_v1','1'); } catch(e) {} }
}

function followOffer() {
  const o = settings.offer;
  closeOfferModal(true);
  if (o.ctaTarget === 'category' && o.ctaCategory) { filterCat(o.ctaCategory); showPage('shop'); }
  else { showPage('shop'); }
}

async function handleOfferImageFile(event) {
  const file = event.target.files[0];
  if (!file) return;
  try {
    pendingOfferImage = await resizeImageFile(file, 800, 0.72);
    renderOfferImageThumb();
  } catch (e) { toast('Impossible de lire cette image', 'error'); }
  event.target.value = '';
}

function setOfferImageUrl() {
  const input = document.getElementById('s-offer-image-url');
  const url = input.value.trim();
  if (!url) return;
  pendingOfferImage = url;
  input.value = '';
  renderOfferImageThumb();
}

function renderOfferImageThumb() {
  const el = document.getElementById('s-offer-image-thumb');
  el.innerHTML = pendingOfferImage
    ? `<div class="img-thumb"><img src="${pendingOfferImage}"><button class="rm-img" onclick="pendingOfferImage='';renderOfferImageThumb();">✕</button></div>`
    : '';
}

function saveOfferSettings() {
  const $ = id => document.getElementById(id);
  settings.offer = {
    enabled: $('s-offer-enabled').checked,
    title: $('s-offer-title').value.trim() || 'Offre spéciale',
    badge: $('s-offer-badge').value.trim(),
    description: $('s-offer-desc').value.trim(),
    image: pendingOfferImage,
    ctaText: $('s-offer-cta').value.trim() || "Voir l'offre",
    ctaTarget: $('s-offer-target').value,
    ctaCategory: $('s-offer-category').value,
    expiresAt: $('s-offer-expires').value,
  };
  saveDB();
  toast("Offre enregistrée ✓ (dans ce navigateur)", 'success');
}

function saveAdminCreds() {
  const u = document.getElementById('s-adminuser').value.trim();
  const p = document.getElementById('s-adminpass').value;
  if (!u) { toast('Identifiant requis','error'); return; }
  settings.adminUser = u;
  if (p) settings.adminPass = p;
  saveDB();
  document.getElementById('s-adminpass').value = '';
  toast('Identifiants mis à jour ✓','success');
}

function exportData() {
  const data = { products, cart, wishlist, orders, notifications, settings, exportedAt: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `electroshop-backup-${Date.now()}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  toast('Sauvegarde exportée ✓','success');
}

function csvEscape(v) {
  const s = String(v==null?'':v);
  return /[",\n;]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
}

function exportOrdersCSV() {
  const headers = ['ID','Client','Email','Téléphone','Adresse','Produits','Total','Devise','Statut','Date'];
  const rows = orders.map(o => [o.id,o.client,o.email,o.phone,o.address,o.products,o.total,settings.currency,o.status,o.date]);
  const csv = [headers, ...rows].map(r => r.map(csvEscape).join(';')).join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `commandes-${Date.now()}.csv`;
  document.body.appendChild(a); a.click(); a.remove();
  toast('Export CSV téléchargé ✓','success');
}

// ══════════════════════════════════════════════
//  CODE DE CONFIGURATION (à coller dans le fichier)
// ══════════════════════════════════════════════
function openConfigModal() {
  const code = 'const DEFAULT_SETTINGS = ' + JSON.stringify(settings, null, 2) + ';';
  document.getElementById('config-code-text').value = code;
  document.getElementById('config-modal').classList.add('open');
}
function closeConfigModal() { document.getElementById('config-modal').classList.remove('open'); }
function copyConfigCode() {
  const ta = document.getElementById('config-code-text');
  ta.select();
  try { document.execCommand('copy'); toast('Copié dans le presse-papiers ✓','success'); }
  catch(e) { toast('Sélectionnez le texte et copiez-le manuellement (Ctrl+C)','error'); }
}

// ══════════════════════════════════════════════
//  GRAPHIQUE DES VENTES (canvas natif, sans dépendance)
// ══════════════════════════════════════════════
function renderSalesChart() {
  const canvas = document.getElementById('sales-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || 600, height = 120;
  canvas.width = width * dpr; canvas.height = height * dpr;
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,width,height);

  // Regroupe le total des commandes par jour sur les 7 derniers jours
  const days = [];
  for (let i=6; i>=0; i--) {
    const d = new Date(); d.setDate(d.getDate()-i);
    days.push({ key: d.toLocaleDateString('fr-FR'), label: d.toLocaleDateString('fr-FR',{weekday:'short'}), total: 0 });
  }
  orders.forEach(o => {
    const day = days.find(d => d.key === o.date);
    if (day) day.total += Number(o.total)||0;
  });
  const max = Math.max(1, ...days.map(d => d.total));
  const barW = width / days.length;
  days.forEach((d,i) => {
    const barH = (d.total / max) * (height - 30);
    const x = i*barW + barW*0.2, w = barW*0.6;
    ctx.fillStyle = d.total > 0 ? '#3b82f6' : '#2a3448';
    ctx.fillRect(x, height-20-barH, w, barH);
    ctx.fillStyle = '#6b6b85';
    ctx.font = '10px DM Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(d.label, x+w/2, height-6);
  });
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.products) products = data.products;
      if (data.orders) orders = data.orders;
      if (data.wishlist) wishlist = data.wishlist;
      if (data.notifications) notifications = data.notifications;
      if (data.settings) settings = { ...DEFAULT_SETTINGS, ...data.settings };
      saveDB();
      renderAdminOverview(); renderProductsTable(); renderOrders(); renderCustomers(); renderSettingsForm(); renderNotifPanel();
      toast('Sauvegarde importée ✓','success');
    } catch (err) { toast('Fichier invalide','error'); }
  };
  reader.readAsText(file);
  event.target.value = '';
}

function resetDemoData() {
  if (!confirm('Réinitialiser toutes les données aux valeurs de démonstration ? Cette action est irréversible.')) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// ══════════════════════════════════════════════
//  TOAST
// ══════════════════════════════════════════════
function toast(msg, type='') {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.className = 'toast show ' + type;
  setTimeout(() => el.className = 'toast', 2800);
}
