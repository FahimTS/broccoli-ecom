import { Component, Input } from '@angular/core';
import { FeaturedProduct } from '../interfaces/featured-product';
import { CartService } from '../services/cart';


@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.scss']
})
export class FeaturedProductComponent {
  @Input() cardData: FeaturedProduct;

  constructor(private cartService: CartService){};

  addToCart(cardData: FeaturedProduct){
    const cartItem = {
      id: this.cardData.productId,
      name: this.cardData.productTitle,
      price: Number(this.cardData.productRate),
      image: this.cardData.productImg
    }
    this.cartService.addToCart(cartItem);
  }

}
