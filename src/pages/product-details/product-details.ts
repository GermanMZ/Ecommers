import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ModalController  } from 'ionic-angular';
import * as WC from 'woocommerce-api'


import { Storage }  from '@ionic/storage'
import { CartPage } from '../cart/cart';
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
  

  product: any;
  WooCommerce: any;
  reviews: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage , public toastCtrl:ToastController, public modalCtrl:ModalController) {
  
     this.product = this.navParams.get("product");
     console.log(this.product);

     this.WooCommerce = WC({
      url: "http://34.125.61.0.xip.io",
      consumerKey: "ck_25746e9a2f9a7ca011c8403a1ce248efee77f1bc",
      consumerSecret: "cs_8f1f9dfcc20420e837d2453fd9d67c8120a7d379"  
 })


    this.WooCommerce.getAsync('products/'+this.product.id +'/reviews').then((data)=> {
            
      this.reviews = JSON.parse(data.body).product_reviews;
      console.log(this.reviews);

    },(err) =>{
       console.log(err);     
    })
  }

  AddToCart(product){
     this.storage.get("cart").then( (data)=> {
        
      if(data == null  ||  data.length == 0){

          data = []
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price)
          });

      }else {

        let added = 0;
        for(let i=  0; i < data.length; i++){
          
          if(product.id == data[i].product.id){

            console.log("Product is already in the cart");
            let qty = data[i].qty;
            data[i].qty = qty+1;
            data[i].amount = parseFloat(data[i].amount) + parseFloat(data[i].product.price);
            added = 1;
          }

        }//for

        if(added == 0){
          data.push({
            "product": product,
            "qty": 1,
            "amount": parseFloat(product.price)
          });
        }
              
      }
        
      this.storage.set("cart",data).then( () => {

           console.log("Card Updated");
           console.log(data);

           this.toastCtrl.create({
              message: "Cart Updated",
              duration: 3000
           }).present();

      })

  });


 }

 openCart(){
    
    this.modalCtrl.create(CartPage).present();
   
 }

}
