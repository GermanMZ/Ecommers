import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';
//import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductDetailsPage} from '../product-details/product-details'; 

import * as WC from 'woocommerce-api'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  page: number; 

  @ViewChild('productSlides') productSlides : Slides

  constructor(public navCtrl: NavController, public toastCtrl:ToastController) {
    
    this.page = 1;
    
    
    this.WooCommerce = WC({
      url: "http://34.125.61.0.xip.io",
      consumerKey: "ck_25746e9a2f9a7ca011c8403a1ce248efee77f1bc",
      consumerSecret: "cs_8f1f9dfcc20420e837d2453fd9d67c8120a7d379"  
 })


    this.loadMoreProducts(null);
    this.WooCommerce.getAsync("products").then((response)=> {
       
        this.products = JSON.parse(response.body).products;
    }, (err)=> {
       console.log(err);
    })
  }

  

  ionViewDidLoad(){
    setInterval(()=> {
       if(this.productSlides.getActiveIndex() == this.productSlides.length() - 1)
        this.productSlides.slideTo(0);
          
      this.productSlides.slideNext();
    },3000)

  }

  loadMoreProducts(event){
   
    if(event == null)
    {  
      this.page = 1
      this.moreProducts = [];
    }
    else
       this.page ++; 

    this.WooCommerce.getAsync("products?page="+this.page).then((response)=> {
      this.moreProducts = this.moreProducts.concat( JSON.parse(response.body).products);
      
      if(event != null)
      {
         event.complete();
      }

      if(JSON.parse(response.body).products.length < 10){
       // event.enable(false);
        this.toastCtrl.create({
          message: "No hay mas productos!",
          duration: 5000
        }).present();

      }



  }, (err)=> {
     console.log(err);
  })

}

openProductPage(product){
   this.navCtrl.push(ProductDetailsPage, {"product":product})

}


}
