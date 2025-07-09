import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuIconXbar: boolean = true;
  menuBars: boolean = false;

  isCartOpen: boolean = false;
  cartItems: any[] = [];
  subtotal: number = 0;
  totalQuantity: number = 0;

  currentRoute: string = '';

  constructor(private cartService: CartService, private router: Router) {
    // detect route change
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.subtotal = this.cartService.getSubtotal();
      this.totalQuantity = this.cartService.getTotalQuantity();
    });

    this.cartService.cartVisibility$.subscribe((visible) => {
      this.isCartOpen = visible;
    });
  }

  isCartRelatedPage(): boolean {
    const cartPage = ['/cart', '/checkout', '/order-confirmation'];
    return cartPage.includes(this.currentRoute) || this.currentRoute.startsWith('/product-view/');
  }

  isConfirmationPage(): boolean {
    return this.router.url.includes('order-confirmation');
  }

  openMenu() {
    this.menuBars = !this.menuBars;
    this.menuIconXbar = !this.menuIconXbar;
  }

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  removeFromCart(item: any) {
    this.cartService.removeItem(item);
  }
}
