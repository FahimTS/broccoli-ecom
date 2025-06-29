import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  selectedMethod: string = ''; // Track current selection

  togglePayment(method: string) {
    // If already selected, deselect to collapse
    if (this.selectedMethod === method) {
      this.selectedMethod = ''; // Collapse it
    } else {
      this.selectedMethod = method; // Expand it
    }
  }
}
