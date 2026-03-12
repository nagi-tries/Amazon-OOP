export class OrdersStorage {

  getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
  }

  saveOrder(order) {

    const orders = this.getOrders();

    orders.push(order);

    localStorage.setItem('orders', JSON.stringify(orders));

  }

}