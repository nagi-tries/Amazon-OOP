import { Cart } from "./cart-oop.js";
import { OrdersStorage } from "./ordersStrorage-oop.js";

const cart = new Cart();
const ordersStorage = new OrdersStorage();

class CheckoutUI {

  constructor() {

    this.cartContainer = document.querySelector('.js-cart-items');

    this.itemsCountElement = document.querySelector('.js-items-count');
    this.itemsTotalElement = document.querySelector('.js-items-total');
    this.beforeTaxElement = document.querySelector('.js-before-tax');
    this.taxElement = document.querySelector('.js-tax');
    this.finalTotalElement = document.querySelector('.js-final-total');

    this.placeOrderButton = document.querySelector('.js-place-order');

    this.renderCart();
    this.setupPlaceOrder();

  }

  renderCart() {

    const cartItems = cart.getCart();

    this.cartContainer.innerHTML = '';

    let totalItems = 0;
    let itemsTotal = 0;

    cartItems.forEach((item,index) => {

      const price = Number(item.price.replace('$',''));

      totalItems += item.quantity;
      itemsTotal += price * item.quantity;

      this.cartContainer.innerHTML += `
      <div class="cart-item">

        <img class="product-image" src="${item.image}">

        <div>
          <h3>${item.name}</h3>
          <p>Price: $${price.toFixed(2)}</p>
          <p>Quantity: ${item.quantity}</p>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </div>

      </div>
      `;

    });

    const tax = itemsTotal * 0.10;
    const finalTotal = itemsTotal + tax;

    this.itemsCountElement.innerText = totalItems;
    this.itemsTotalElement.innerText = itemsTotal.toFixed(2);
    this.beforeTaxElement.innerText = itemsTotal.toFixed(2);
    this.taxElement.innerText = tax.toFixed(2);
    this.finalTotalElement.innerText = finalTotal.toFixed(2);

    this.setupDeleteButtons();

  }

  setupDeleteButtons() {

    document.querySelectorAll('.delete-btn').forEach(btn => {

      btn.addEventListener('click', () => {

        const index = btn.dataset.index;

        cart.removeFromCart(index);

        this.renderCart();

      });

    });

  }

  setupPlaceOrder() {

    this.placeOrderButton.addEventListener('click', () => {

      const cartItems = cart.getCart();

      if(cartItems.length === 0) return;

      const newOrder = {
        id: crypto.randomUUID(),
        date: new Date().toLocaleDateString(),
        items: [...cartItems],
        total: this.finalTotalElement.innerText
      };

      ordersStorage.saveOrder(newOrder);

      cart.clearCart();

      window.location.href = "orders.html";

    });

  }

}

document.addEventListener("DOMContentLoaded", () => {
  new CheckoutUI();
});
