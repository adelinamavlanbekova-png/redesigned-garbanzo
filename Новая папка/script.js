const menuData = [
  { id: 1, title: "Пожар во рту", price: 390, desc: "Бургер-огонь, выдержат только смелые.", img: "images/burger1.jpg" },
  { id: 2, title: "Сырный обвал", price: 420, desc: "Море расплавленного сыра в каждой булочке.", img: "images/burger2.jpg" },
  { id: 3, title: "Беконатор", price: 450, desc: "Хрустящий бекон против твоего голода.", img: "images/burger3.jpg" }
];

const menuList = document.getElementById('menu-list');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartCountEl = document.getElementById('cart-count');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = {};

function renderMenu() {
  menuList.innerHTML = '';
  menuData.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.title}" onerror="this.src='https://via.placeholder.com/400x300?text=burger'">
      <div class="card-body">
        <div class="card-title">${item.title}</div>
        <div>${item.desc}</div>
        <div class="card-row">
          <div class="price">${item.price} ₽</div>
          <button class="add-btn" data-id="${item.id}">Добавить</button>
        </div>
      </div>
    `;
    menuList.appendChild(card);
  });
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = +btn.dataset.id;
      addToCart(id);
    });
  });
}

function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;
  updateCartUI();
}

function updateCartUI() {
  const totalQty = Object.values(cart).reduce((s,v)=>s+v,0);
  cartCountEl.textContent = totalQty;
  renderCartModal();
}

function renderCartModal() {
  cartItemsEl.innerHTML = '';
  let total = 0;
  Object.entries(cart).forEach(([id, qty]) => {
    const item = menuData.find(m=>m.id===+id);
    const itemTotal = item.price*qty;
    total+=itemTotal;
    const el = document.createElement('div');
    el.textContent = `${item.title} × ${qty} = ${itemTotal} ₽`;
    cartItemsEl.appendChild(el);
  });
  cartTotalEl.textContent = `${total} ₽`;
}

cartBtn.addEventListener('click', ()=>cartModal.classList.remove('hidden'));
closeCart.addEventListener('click', ()=>cartModal.classList.add('hidden'));
checkoutBtn.addEventListener('click', ()=>alert('Заказ оформлен! (демо)'));

renderMenu();
