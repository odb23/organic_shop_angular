
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShoppingModule } from '../shopping/shopping.module';

@NgModule({
  imports: [
    SharedModule,
    ShoppingModule,
    NgbModule,
    RouterModule.forChild([])
  ],
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent,        
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }