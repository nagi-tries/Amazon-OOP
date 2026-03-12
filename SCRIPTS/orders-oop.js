import { OrdersStorage } from "./ordersStrorage-oop.js";

const ordersStorage = new OrdersStorage();

class OrdersUI {

  constructor() {

    this.container = document.querySelector('.js-orders-container');

    this.orders = ordersStorage.getOrders();

    if (!this.orders.length) {
      this.container.innerHTML = "<h3>No orders yet.</h3>";
    } else {
      this.renderOrders();
    }

  }

  renderOrders() {

    this.container.innerHTML = '';

    this.orders.forEach(order => {

      let itemsHTML = '';

      order.items.forEach(item => {

        const price = Number(item.price.replace('$',''));

        itemsHTML += `
        <div class="order-item">

          <img class="product-image" src="${item.image}">

          <div class="product-info">
            <div>${item.name}</div>
            <div>Price: $${price.toFixed(2)}</div>
            <div>Quantity: ${item.quantity}</div>
          </div>

        </div>
        `;

      });

      this.container.innerHTML += `
      <div class="order-card">

        <div class="order-header">

          <div>
            ORDER PLACED
            <strong>${order.date}</strong>
          </div>

          <div>
            TOTAL
            <strong>$${order.total}</strong>
          </div>

          <div>
            ORDER ID
            <strong>${order.id}</strong>
          </div>

        </div>

        <div class="order-products">
          ${itemsHTML}
        </div>

      </div>
      `;

    });

  }

}

new OrdersUI();