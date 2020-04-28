import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as WC from 'woocommerce-api';
import { ProductDetailsPage } from '../product-details/product-details'

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
      url: "http://34.125.61.0.xip.io",
      consumerKey: "ck_25746e9a2f9a7ca011c8403a1ce248efee77f1bc",
      consumerSecret: "cs_8f1f9dfcc20420e837d2453fd9d67c8120a7d379"  
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
    console.log("Getttin page" + this.page)
    this.WooCommerce.getAsync("products?filter[category]="+this.category.name + "page=" +this.page).then(( data ) => {
       let temp =(JSON.parse(data.body).products);

       this.products = this.products.concat(JSON.parse(data.body).products)
       
       event.complete();

       if(temp.length < 10)
          event.enable(false);

      })  
  }

  openProductPage(product){
    this.navCtrl.push(ProductDetailsPage, {"product":product})
  
 }
  
}
