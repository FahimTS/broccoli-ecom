import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-view-cart',
  templateUrl: './product-view-cart.component.html',
  styleUrls: ['./product-view-cart.component.scss']
})
export class ProductViewCartComponent implements OnInit {

  product: any;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);
  }

  increaseQty() {
    this.quantity++;
  }

  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    const productToAdd = {
      ...this.product,
      quantity: this.quantity
    };
    this.cartService.addToCart(productToAdd);
    alert('Added to cart!');
  }
  

}
