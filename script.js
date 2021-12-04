function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function saveToLocalStorage() {
  const cartItems = document.querySelector('ol');
  saveCartItems(JSON.stringify(cartItems.innerHTML));
}

function cartItemClickListener(e) {
  // coloque seu código aqui
  e.target.remove();
  saveToLocalStorage();
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function addCart() {
  const cartItems = document.querySelector('ol');
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((button) => {
    button.addEventListener('click', async ({ target }) => {
      const item = target.parentNode;
      const itemID = getSkuFromProductItem(item);
      const fetItem = await fetchItem(itemID);
      cartItems.appendChild(createCartItemElement(fetItem));
      saveToLocalStorage();
    });
  });
}

function fillCart() {
  const cartItems = document.querySelector('ol');
  cartItems.innerHTML = JSON.parse(getSavedCartItems());
  cartItems.childNodes.forEach((li) => {
    li.addEventListener('click', cartItemClickListener);
  });
}

window.onload = async () => {
  const items = document.querySelector('.items');
  const data = await fetchProducts('computador');
  data.forEach((product) => {
    items.appendChild(createProductItemElement(product));
  });
  fillCart();
  addCart();
};
