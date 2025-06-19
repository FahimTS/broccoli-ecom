import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  menuIconXbar:boolean = true;
  menuBars: boolean = false;
  openMenu(){
    this.menuBars =! this.menuBars;
    this.menuIconXbar =! this.menuIconXbar;
  }

  isCartOpen:boolean = false;
toggleCart() {
  this.isCartOpen = !this.isCartOpen;
}

 cartItems: any[] = [];
  subtotal: number = 0;
totalQuantity: number = 0;

  constructor(private cartService: CartService) {}

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

  removeFromCart(item: any) {
    this.cartService.removeItem(item);
  }
}
