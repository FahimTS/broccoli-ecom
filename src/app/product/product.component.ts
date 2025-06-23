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
 
  stars = [1,2,3,4,5];
  currentRating = 0;

  rateProduct(rating: number):void {
    this.currentRating = rating;
    
  }


addToCart(cardData: Product) {
  const cartItem = {
    id: cardData.productId,
    name: cardData.productTitle,
    price: Number(cardData.productRate),
    image: cardData.productImg,
    quantity: 1,
    subtotal: Number(cardData.productRate) * 1
  };

  this.cartService.addToCart(cartItem);
}




  
}
