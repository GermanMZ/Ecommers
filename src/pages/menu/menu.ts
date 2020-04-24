import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as WC from 'woocommerce-api';
import { ProductsByCategoryPage } from '../products-by-category/products-by-category'
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { Storage }  from '@ionic/storage';
import { CartPage } from '../cart/cart';
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  homePage : any
  categories : any = [];
  WooCommerce: any;
  user : any = [];
  usuario : any;
  loggedIn : boolean;
  @ViewChild('content') childNavCtrl: NavController

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public modalCtrl: ModalController) {
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

  ionViewDidEnter() {
     
     this.storage.ready().then ( ()=>{
       this.storage.get("userLoginInfo").then( (userLoginInfo)=>{
          if(userLoginInfo != null){

              console.log("User Logged in...");
              this.user = userLoginInfo.user;
              this.loggedIn = true;
          }else{

             console.log("No user found.");
             this.user = {};
             this.loggedIn = false;
          }
       })
     })
     
  }

  openCategoryPage(category){

   this.childNavCtrl.setRoot(ProductsByCategoryPage, { "category": category});

  }

  openPage(pageName: string){
    if(pageName == "signup"){
      this.navCtrl.push(SignupPage);
    }else if(pageName == "login"){
      this.navCtrl.push(LoginPage);
    }else if(pageName == "logout"){
      this.storage.remove("userLoginInfo").then( () =>{
        this.user = {};
        this.loggedIn =false;
      }) 
    }else if(pageName == "cart"){
        let modal = this.modalCtrl.create(CartPage);
        modal.present();   
    }
  }

}
