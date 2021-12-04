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
  e.target.remove();
  saveToLocalStorage();
  // totalPrice()
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
      // totalPrice()
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

/* async function totalPrice(){
  let total = 0;
  const cartItems = document.querySelector('ol');
  const totalPriceSection = await document.querySelector('.total-price')
  cartItems.childNodes.forEach((li) => {
    const price = Number(li.innerText.split(' | ')[2].split(': $')[1])
    total += price
    totalPriceSection.innerText = total.toFixed(2)
  });
} */

function handleEmptyCart() {
  const cartItems = document.querySelector('ol');
  const emptyCart = document.querySelector('.empty-cart');
  emptyCart.addEventListener('click', () => {
    cartItems.innerHTML = '';
    localStorage.removeItem('cartItems');
  });
}

window.onload = async () => {
  const items = document.querySelector('.items');
  const divLoading = document.createElement('div');
  divLoading.className = 'loading';
  divLoading.innerText = 'carregando...';
  items.appendChild(divLoading);
  const data = await fetchProducts('computador');
  items.innerHTML = '';
  data.forEach((product) => {
    items.appendChild(createProductItemElement(product));
  });
  fillCart();
  addCart();
  // totalPrice()
  handleEmptyCart();
};
