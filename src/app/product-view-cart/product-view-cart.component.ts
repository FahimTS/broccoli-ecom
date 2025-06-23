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
    const foundProduct = this.productService.getProductById(id);

    if (foundProduct) {
      this.product = foundProduct;
    } else {
      console.error('Product not found for ID:', id);
    }
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
  if (!this.product) {
    console.error('No product to add');
    return;
  }

  const productToAdd = {
    id: this.product.productId, // ✅ id নামেই দিতে হবে
    name: this.product.productTitle,
    price: this.product.productRate,
    image: this.product.productImg,
    quantity: this.quantity,
    subtotal: this.quantity * this.product.productRate
  };

  this.cartService.addToCart(productToAdd);

}


  

}
