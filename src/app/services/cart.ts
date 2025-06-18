import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  private cartVisible = new BehaviorSubject<boolean>(false);
  
  cartVisibility$ = this.cartVisible.asObservable();

  private cartStorageKey = 'cartItems';

  constructor() {
    this.loadCart(); // cart load from localStorage on service init
  }

  addToCart(product: any) {
    const index = this.cartItems.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.cartItems[index].quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.updateCart();
  }

  removeItem(product: any) {
    this.cartItems = this.cartItems.filter(p => p.id !== product.id);
    this.updateCart();
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  }

  getTotalQuantity(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  toggleCartVisibility() {
    const current = this.cartVisible.getValue();
    this.cartVisible.next(!current);
  }

  // 🔽 Save to localStorage and notify
  private updateCart() {
    localStorage.setItem(this.cartStorageKey, JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
  }

  // 🔽 Load cart from localStorage on init
  private loadCart() {
    const savedCart = localStorage.getItem(this.cartStorageKey);
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  // Optional: clear cart
  clearCart() {
    this.cartItems = [];
    localStorage.removeItem(this.cartStorageKey);
    this.cartSubject.next(this.cartItems);
  }
}
