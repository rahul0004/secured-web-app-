import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './security/auth.guard';


const routes: Routes = [
  /*{path: 'home', component: HomeComponent, canActivate:[AuthGuard], data:{accessType: 'canAccessHome'}},
  {path: 'products', component: ProductsComponent, canActivate:[AuthGuard], data:{accessType: 'canAccessProducts'}},*/
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'login', component: LoginComponent},
  //{path: '', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
