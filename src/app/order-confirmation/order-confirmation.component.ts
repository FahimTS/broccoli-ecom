import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent {
  customer: any;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.customer = nav?.extras?.state?.['data'];
  }
}
