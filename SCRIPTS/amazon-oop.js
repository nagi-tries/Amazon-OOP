import { Cart } from "./cart-oop.js";

const cart = new Cart();

class StoreUI {

  constructor() {

    this.quantityElements = document.querySelectorAll('.product-quantity');
    this.addButtons = document.querySelectorAll('.js-add-to-cart');

    this.populateQuantities();
    this.updateCartQuantity();
    this.setupAddButtons();

  }

  populateQuantities() {

    this.quantityElements.forEach(select => {

      for (let i = 1; i <= 10; i++) {

        const option = document.createElement('option');

        option.value = i;
        option.innerText = i;

        select.appendChild(option);

      }

    });

  }

  setupAddButtons() {

    this.addButtons.forEach(button => {

      button.addEventListener('click', () => {

        const container = button.closest('.product-container');

        const name = container.querySelector('.product-name-container').innerText;
        const price = container.querySelector('.product-price').innerText;
        const quantity = Number(container.querySelector('.product-quantity').value);
        const image = container.querySelector('.product-image').src;

        cart.addToCart({
          name,
          price,
          quantity,
          image
        });

        this.updateCartQuantity();

      });

    });

  }

  updateCartQuantity() {

    const element = document.querySelector('.js-cart-quantity');

    if (element) {
      element.innerText = cart.getCartQuantity();
    }

  }

}

document.addEventListener("DOMContentLoaded", () => {
  new StoreUI();
});
