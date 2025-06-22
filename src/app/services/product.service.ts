import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    private products = [
    {
      id: 1,
      productTitle: 'Vegetables Juices',
      productRate: 149,
      oldPrice: 165,
      productImg: '../../assets/img/product/2.webp',
      categories: ['Parts', 'Car', 'Seat', 'Cover']
    },
    {
      id: 2,
      productTitle: 'Organic Honey',
      productRate: 199,
      oldPrice: 220,
      productImg: '../../assets/img/product/3.webp',
      categories: ['Natural', 'Sweet', 'Jar']
    }
  ];

  getProductById(id: number) {
    return this.products.find(p => p.id === id);
  }

  getAllProducts() {
    return this.products;
  }

}
