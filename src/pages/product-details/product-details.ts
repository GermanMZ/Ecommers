import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api'

@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  

  product: any;
  WooCommerce: any;
  reviews: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
     this.product = this.navParams.get("product");
     console.log(this.product);

     this.WooCommerce = WC({
      url: "http://localhost/wordpress",
      consumerKey: "ck_20f930d406870a1825a1bc34f0fc1356ced05343",
      consumerSecret: "cs_9d17148181d449f2cccd7300c23985f89e5a89be"  
    })


    this.WooCommerce.getAsync('products/'+this.product.id +'/reviews').then((data)=> {
            
      this.reviews = JSON.parse(data.body).product_reviews;
      console.log(this.reviews);

    },(err) =>{
       console.log(err);     
    })
  }

 

}
