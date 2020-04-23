import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as WC from 'woocommerce-api';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category'

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  homePage : any
  categories : any = [];
  WooCommerce: any;

  @ViewChild('content') childNavCtrl: NavController

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage = HomePage

    this.WooCommerce = WC({
      url: "http://localhost/wordpress",
      consumerKey: "ck_20f930d406870a1825a1bc34f0fc1356ced05343",
      consumerSecret: "cs_9d17148181d449f2cccd7300c23985f89e5a89be"  
    })
    
    this.WooCommerce.getAsync("products/categories").then((data) => {
      // console.log(JSON.parse(data.body).product_categories); 
       
       let temp: any[] = JSON.parse(data.body).product_categories;

      

       for (let i = 0; i < temp.length; i++){
        
        if(temp[i].parent == 0 ){
            
            if(temp[i].name == "Ropa"){
                  temp[i].icon = "shirt";
            }

            if(temp[i].name == "Zapatos"){
                  temp[i].icon = "shirt";    
            }

            if(temp[i].name == "Musica"){
              temp[i].icon = "musical-notes";
            }

            this.categories.push(temp[i])
         }
          
       }



    }, (err) => {
        console.log('error while trying get categories', err);
    })
  
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  openCategoryPage(category){

   this.childNavCtrl.setRoot(ProductsByCategoryPage, { "category": category});

  }

}
