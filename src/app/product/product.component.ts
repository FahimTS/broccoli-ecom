import { Component, Input } from '@angular/core';
import { Product } from '../interfaces/product';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @Input() cardData: Product;

  constructor(private cartService: CartService){};

addToCart(cardData: Product) {
  const cartItem = {
    id: this.cardData.productId,
    name: this.cardData.productTitle,
    price: Number(this.cardData.productRate),
    image: this.cardData.productImg
  };

  this.cartService.addToCart(cartItem);
}
  
}
