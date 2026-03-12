export class Cart {

  constructor() {
    this.cart = JSON.parse(localStorage.getItem('cart')) || [];
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  addToCart(product) {

    const existing = this.cart.find(item => item.name === product.name);

    if (existing) {
      existing.quantity += product.quantity;
    } else {
      this.cart.push(product);
    }

    this.saveCart();
  }

  removeFromCart(index) {
    this.cart.splice(index, 1);
    this.saveCart();
  }

  clearCart() {
    this.cart.length = 0;
    this.saveCart();
  }

  getCartQuantity() {

    let total = 0;

    this.cart.forEach(item => {
      total += item.quantity;
    });

    return total;
  }

  getCart() {
    return this.cart;
  }

}