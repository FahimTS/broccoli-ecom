import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  cartItems: any[] = [];
  subtotal: number = 0;
  shipping: number = 160;
  vat: number = 160;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.updateCartSummary();
    });
  }

  updateCartSummary() {
    this.subtotal = this.cartService.getSubtotal();
  }

  get grandTotal(): number {
    return this.subtotal + this.shipping + this.vat;
  }

  increaseQty(item: any) {
    item.quantity += 1;
    this.cartService.addToCart(item); // updates localStorage
  }

  decreaseQty(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.cartService.addToCart(item); // trigger update
    }
  }

  removeItem(item: any) {
    this.cartService.removeItem(item);
  }

  updateCart() {
    this.cartService['updateCart'](); // private method, use cautiously
  }

  applyCoupon(code: string) {
    alert('Coupon applied: ' + code);
    // You can add real coupon logic later
  }

}
