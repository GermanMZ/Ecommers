import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';
import { ProductsByCategoryPage} from '../pages/products-by-category/products-by-category';
import { ProductDetailsPage } from '../pages/product-details/product-details' 
import { IonicStorageModule} from '@ionic/storage';
import { CartPage } from '../pages/cart/cart'
import { SignupPage} from '../pages/signup/signup'
import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage} from '../pages/login/login'
import { HttpClientModule }  from '@angular/common/http';
import { CheckoutPage } from '../pages/checkout/checkout'
import { PerfilPage } from '../pages/perfil/perfil'
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    ProductsByCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage,
    LoginPage,
    CheckoutPage,
    PerfilPage,
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    ProductsByCategoryPage,
    ProductDetailsPage,
    CartPage,
    SignupPage,
    LoginPage,
    CheckoutPage,
    PerfilPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LoginPage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
