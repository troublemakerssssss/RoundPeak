const menus = [
  {id:1,nama:'Nasi Goreng Spesial',desc:'Nasi goreng dengan telur, ayam, dan bumbu rahasia',harga:15000,kat:'berat',icon:'🍳',badge:'TERLARIS'},
  {id:2,nama:'Ayam Geprek',desc:'Ayam crispy geprek dengan sambal terasi pedas',harga:18000,kat:'berat',icon:'🍗',badge:'POPULER'},
  {id:3,nama:'Mie Padeh',desc:'Mie padeh dengan telur dan bakso',harga:14000,kat:'berat',icon:'🍜',badge:''},
  {id:4,nama:'Nasi Rendang',desc:'Nasi dengan rendang daging sapi empuk dan gurih',harga:22000,kat:'berat',icon:'🥩',badge:''},
  {id:5,nama:'Kentang Goreng',desc:'Kentang goreng renyah dengan 3 pilihan saus',harga:10000,kat:'snack',icon:'🍟',badge:'FAVORIT'},
  {id:6,nama:'Nugget Saus BBQ',desc:'Nugget crispy dengan saus BBQ spesial',harga:12000,kat:'snack',icon:'🌭',badge:''},
  {id:7,nama:'Es Krim Cone',desc:'Es krim vanila dan coklat dengan cone renyah',harga:8000,kat:'dessert',icon:'🍦',badge:''},
  {id:8,nama:'Es Teh',desc:'Es teh manis atau tawar dengan air yang segar',harga:6000,kat:'minuman',icon:'🧋',badge:'SEGAR'},
];

let cart = [];
let activeTab = 'semua';

function renderMenu(tab='semua') {
  const grid = document.getElementById('menu-grid');
  const filtered = tab === 'semua' ? menus : menus.filter(m => m.kat === tab);
  grid.innerHTML = filtered.map(m => `
    <div class="menu-card" data-id="${m.id}">
      <div class="menu-img">${m.icon}${m.badge?`<span class="menu-badge">${m.badge}</span>`:''}</div>
      <div class="menu-body">
        <div class="menu-name">${m.nama}</div>
        <div class="menu-desc">${m.desc}</div>
        <div class="menu-footer">
          <span class="menu-price">Rp ${m.harga.toLocaleString('id')}</span>
          <button class="btn-add" onclick="addToCart(${m.id},event)">+</button>
        </div>
      </div>
    </div>`).join('');
}

function filterMenu(kat, el) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  renderMenu(kat);
}

function addToCart(id, e) {
  e.stopPropagation();
  const item = menus.find(m => m.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) existing.qty++;
  else cart.push({...item, qty: 1});
  updateCartUI();
  const btn = e.target;
  btn.style.transform = 'scale(1.3)';
  setTimeout(() => btn.style.transform = '', 200);
}

function updateCartUI() {
  const total = cart.reduce((s, c) => s + c.harga * c.qty, 0);
  const count = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('sticky-count').textContent = count;
  document.getElementById('nav-count').textContent = count > 0 ? `(${count})` : '';
  document.getElementById('cart-total').textContent = 'Rp ' + total.toLocaleString('id');
  const itemsEl = document.getElementById('cart-items');
  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty"><div class="cart-empty-icon">🛒</div><p>Keranjang masih kosong</p></div>`;
  } else {
    itemsEl.innerHTML = cart.map(c => `
      <div class="cart-item">
        <div class="cart-item-img">${c.icon}</div>
        <div style="flex:1">
          <div class="cart-item-name">${c.nama}</div>
          <div class="cart-item-price">Rp ${c.harga.toLocaleString('id')}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${c.id},-1)">−</button>
            <span class="qty-num">${c.qty}</span>
            <button class="qty-btn" onclick="changeQty(${c.id},1)">+</button>
          </div>
        </div>
      </div>`).join('');
  }
}

function changeQty(id, delta) {
  const idx = cart.findIndex(c => c.id === id);
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  updateCartUI();
}

function openCart() {
  document.getElementById('cart-overlay').classList.add('open');
  document.getElementById('cart-drawer').classList.add('open');
}
function closeCart() {
  document.getElementById('cart-overlay').classList.remove('open');
  document.getElementById('cart-drawer').classList.remove('open');
}

function checkout() {
  if (cart.length === 0) return alert('Keranjang kosong!');
  const items = cart.map(c => `• ${c.nama} x${c.qty} = Rp ${(c.harga*c.qty).toLocaleString('id')}`).join('%0A');
  const total = cart.reduce((s,c) => s+c.harga*c.qty, 0);
  const msg = `Halo Round Peak!%0A%0ASaya ingin memesan:%0A${items}%0A%0ATotal: Rp ${total.toLocaleString('id')}%0A%0ATerima kasih!`;
  window.open(`https://wa.me/6283185940226?text=${msg}`, '_blank');
}

function toggleFaq(el) {
  const item = el.parentElement;
  item.classList.toggle('open');
}

function toggleDark() {
  document.body.classList.toggle('light');
  document.querySelector('.toggle-dark').textContent = document.body.classList.contains('light') ? '🌙' : '☀';
}

function toggleMenu() {
  const nl = document.querySelector('.nav-links');
  nl.style.display = nl.style.display === 'flex' ? 'none' : 'flex';
  nl.style.flexDirection = 'column';
  nl.style.position = 'fixed';
  nl.style.top = '68px';
  nl.style.left = '0';
  nl.style.right = '0';
  nl.style.background = 'var(--dark)';
  nl.style.padding = '20px';
  nl.style.borderBottom = '1px solid var(--border)';
  nl.style.zIndex = '99';
}

// COUNTDOWN
function updateCountdown() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23,59,59);
  const diff = end - now;
  const h = Math.floor(diff/3600000);
  const m = Math.floor((diff%3600000)/60000);
  const s = Math.floor((diff%60000)/1000);
  document.getElementById('cd-h').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-m').textContent = String(m).padStart(2,'0');
  document.getElementById('cd-s').textContent = String(s).padStart(2,'0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// SCROLL REVEAL
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold: 0.1});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// NAVBAR SCROLL
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 60) nav.style.background = 'rgba(245,239,224,0.98)';
  else nav.style.background = 'rgba(245,239,224,0.92)';
});

renderMenu();