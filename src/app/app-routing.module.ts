import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all.component';
import { CreateComponent } from './create/create.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { SingleProductComponent } from './single-product/single-product.component';

const routes: Routes = [
  { path: '', component: AllComponent },
  { path: 'create', component: CreateComponent },
  { path: 'edit', component: EditProductComponent },
  { path: 'detail/:name', component: SingleProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
