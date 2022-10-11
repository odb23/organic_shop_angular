import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire/compat";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { environment } from "src/environments/environment";
import { AdminAuthGuard } from "./admin/services/admin-auth-guard.service";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./core/components/home/home.component";
import { LoginComponent } from "./core/components/login/login.component";
import { AdminModule } from './admin/admin.module';
import { ShoppingModule } from './shopping/shopping.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
    ]),

  ],
  providers: [
    AdminAuthGuard,
  
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
