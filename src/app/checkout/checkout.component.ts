import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../services/cart';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  selectedMethod: string = 'check';

  cartItems: any[] = [];
  shipping: number = 15;
  vat: number = 0;
  total: number = 0;

  constructor(private fb: FormBuilder, private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();

    this.checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      country: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      createAccount: [false],
      orderNote: [''],

      // Payment fields
      cardNumber: [''],
      cardExpiry: [''],
      cardCvv: [''],

      bkashNumber: [''],
      bkashTrxId: [''],

      nagadNumber: [''],
      nagadTrxId: [''],

      rocketNumber: [''],
      rocketTrxId: ['']
    });

    this.setPaymentValidators(this.selectedMethod);
  }

  

  calculateTotals() {
    const subtotal = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.vat = subtotal * 0.05; // 5% VAT
    this.total = subtotal + this.shipping + this.vat;
  }

  togglePayment(method: string): void {
    this.selectedMethod = method;
    this.setPaymentValidators(method);
  }

  setPaymentValidators(method: string) {
    // Reset all payment field validators & clear values
    const paymentFields = [
      'cardNumber', 'cardExpiry', 'cardCvv',
      'bkashNumber', 'bkashTrxId',
      'nagadNumber', 'nagadTrxId',
      'rocketNumber', 'rocketTrxId'
    ];

    paymentFields.forEach(field => {
      this.checkoutForm.get(field)?.clearValidators();
      this.checkoutForm.get(field)?.setValue('');
      this.checkoutForm.get(field)?.updateValueAndValidity();
    });

    // Set validators based on selected payment method
    if (method === 'card') {
      ['cardNumber', 'cardExpiry', 'cardCvv'].forEach(field => {
        this.checkoutForm.get(field)?.setValidators(Validators.required);
        this.checkoutForm.get(field)?.updateValueAndValidity();
      });
    } else if (method === 'bkash') {
      ['bkashNumber', 'bkashTrxId'].forEach(field => {
        this.checkoutForm.get(field)?.setValidators(Validators.required);
        this.checkoutForm.get(field)?.updateValueAndValidity();
      });
    } else if (method === 'nagad') {
      ['nagadNumber', 'nagadTrxId'].forEach(field => {
        this.checkoutForm.get(field)?.setValidators(Validators.required);
        this.checkoutForm.get(field)?.updateValueAndValidity();
      });
    } else if (method === 'rocket') {
      ['rocketNumber', 'rocketTrxId'].forEach(field => {
        this.checkoutForm.get(field)?.setValidators(Validators.required);
        this.checkoutForm.get(field)?.updateValueAndValidity();
      });
    }
  }

placeOrder(): void {
  if (this.checkoutForm.valid) {
    const formData = this.checkoutForm.value;

    const orderData = {
      fullName: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      email: formData.email,
      address: `${formData.address1}, ${formData.address2 ? formData.address2 + ', ' : ''}${formData.city}, ${formData.state}, ${formData.country}`,
      orderNote: formData.orderNote,
      paymentMethod: this.selectedMethod,
      totals: {
        shipping: this.shipping,
        vat: this.vat,
        total: this.total
      },
      cartItems: this.cartItems
    };

    this.router.navigate(['/order-confirmation'], {
      state: { data: orderData }
    });

    // Uncomment below line if you want to clear cart after placing order
    // this.cartService.clearCart();

  } else {
    alert('Please fill the form correctly.');
    this.markAllFieldsTouched(this.checkoutForm);
  }
}


  markAllFieldsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markAllFieldsTouched(control as FormGroup);
      }
    });
  }



}
