import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { ClaimComponent } from './claim/claim.component';
import { PractiseComponent } from './practise/practise.component';
import { CartComponent } from './cart/cart.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'terms-of-service', component: TermsOfServiceComponent},
  {path: 'claim', component: ClaimComponent},
  {path: 'practise', component: PractiseComponent},
  {path: 'cart', component: CartComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
