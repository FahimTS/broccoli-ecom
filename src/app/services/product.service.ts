import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {


    private products: Product[] =  [
     {
      productId: 2,
      productImg: '../../assets/img/product/1.webp',
      productTitle: 'Q. s product',
      productRate: 39.00,
      oldPrice: 100,
      categories: null
    },
    {
      productId: 3,
      productImg: '../../assets/img/product/2.webp',
      productTitle: 'C. v product',
      productRate: 70.00,
      oldPrice: null,
      categories: null
    },
    {
      productId: 4,
      productImg: '../../assets/img/product/3.webp',
      productTitle: 'H. c d product',
      productRate: 39.00,
      oldPrice: null,
      categories: null,
      
    },
    {
      productId: 5,
      productImg: '../../assets/img/product/4.webp',
      productTitle: 'K. p v product',
      productRate: 39.00,
      oldPrice: null,
      categories: null
    },
    {
      productId: 6,
      productImg: '../../assets/img/product/5.webp',
      productTitle: 'L. u c e product',
      productRate: 99.00,
      oldPrice: null,
      categories: null
    },
    {
      productId: 7,
      productImg: '../../assets/img/product/6.webp',
      productTitle: 'E. s product',
      productRate: 39.00,
      oldPrice: null,
      categories: null
    },
    {
      productId: 8,
      productImg: '../../assets/img/product/7.webp',
      productTitle: 'J. l p t Praesent adipiscing.',
      productRate: 19.00,
      oldPrice: null,
      categories: null
    },
    {
      productId: 9,
      productImg: '../../assets/img/product/8.webp',
      productTitle: 'P. s o product',
      productRate: 33.00,
      oldPrice: null,
      categories: null
    }
  ];

  getProductById(id: number): Product | undefined {
    return this.products.find(p => p.productId === id);
  }

  getAllProducts(): Product[] {
    return this.products;
  }

}
