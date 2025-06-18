import { Component, Input } from '@angular/core';
import { ProductTwo } from '../interfaces/product-two';
import { CartService } from '../services/cart';

@Component({
  selector: 'app-product-two',
  templateUrl: './product-two.component.html',
  styleUrls: ['./product-two.component.scss']
})
export class ProductTwoComponent {
  @Input() cardData: ProductTwo;

  constructor (private cartService: CartService){};

  addToCart(cardData: ProductTwo){
    const cartItem = {
      id: this.cardData.productId,
      name: this.cardData.productTitle,
      price: Number(this.cardData.productRate),
      image: this.cardData.productImg
    }
    this.cartService.addToCart(cartItem);
  }

}
