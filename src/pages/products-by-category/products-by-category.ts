import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {
  

  WooCommerce: any;
  products: any = []
  category: any;
  page: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
    this.page = 1;
    this.category = this.navParams.get("category");

    this.WooCommerce = WC({
      url: "http://localhost/wordpress",
      consumerKey: "ck_20f930d406870a1825a1bc34f0fc1356ced05343",
      consumerSecret: "cs_9d17148181d449f2cccd7300c23985f89e5a89be"  
    })

    this.WooCommerce.getAsync("products?filter[category]=" +this.category.name).then((response)=> {
        this.products = JSON.parse(response.body).products;
    }, (err)=> {
        console.log(err);
    })
  
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }
  
  loadMoreProducts(event){
    this.page++;
    
    this.WooCommerce.getAsync("products?filter[category]="+this.category )

  }
  

}
