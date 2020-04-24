import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';

import * as WC from 'woocommerce-api'

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  
   newUser: any = {};
   billing_shopping_same: boolean;
   WooCommerce : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public alertCrl: AlertController) {
      this.newUser.billing_address = {};
      this.newUser.shipping_address = {};
      this.billing_shopping_same = false;

      this.WooCommerce = WC({
        url: "http://localhost/wordpress",
        consumerKey: "ck_20f930d406870a1825a1bc34f0fc1356ced05343",
        consumerSecret: "cs_9d17148181d449f2cccd7300c23985f89e5a89be",
      })

    
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  
  
  setBillingToshopping(){

    this.billing_shopping_same = !this.billing_shopping_same;
  }

  checkEmail(){
     
     let validEmail = false;

     let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

     if(reg.test(this.newUser.email)){

      this.WooCommerce.getAsync('customers/email/' + this.newUser.email).then(( data)=>{
            
        let res = (JSON.parse(data.body));
        
        if(res.errors){
          validEmail = true;
          this.toastCtrl.create({
             message: "Email is good to goo.",
             duration: 3000
          }).present();

        }else {
          validEmail = false;
          this.toastCtrl.create({
            message: "Email already registered. Please check",
            showCloseButton: true
         }).present();
        }
           
          console.log(validEmail);
          
      })
     }else {

        validEmail = false;
        this.toastCtrl.create({
          message: "Invalid Email. Please check",
          showCloseButton: true
       }).present();
        console.log(validEmail);

     }
  }

  signup(){
     
    const data = {
      email: this.newUser.email,
      first_name: this.newUser.first_name,
      last_name: this.newUser.last_name,
      username: this.newUser.username,
      billing: {
        first_name: "John",
        last_name: "Doe",
        company: "",
        address_1: "969 Market",
        address_2: "",
        city: "San Francisco",
        state: "CA",
        postcode: "94103",
        country: "US",
        email: "john.doe@example.com",
        phone: "(555) 555-5555"
      },
      shipping: {
        first_name: this.newUser.first_name,
        last_name: this.newUser.last_name,
        company: "",
        address_1: this.newUser.shipping_address.address_1,
        address_2: "",
        city: this.newUser.shipping_address.city,
        state: "CA",
        postcode: "94103",
        country: "Guatemala"
      }
    };
    
    this.WooCommerce.postAsync("customers", data).then((res) => {
       
        let response = (JSON.parse(res.body));

        if(response.customer){
           this.alertCrl.create({
             title: "Cuenta Creada",
             message:"Tu cuenta ha sido creada satisfactoriamente. Te puede realizar login", 
             buttons :[{
                text:"Login",
                handler: () =>{
                  //Todo
                }
             }]

           }).present();

        }else if(response.errors){
           this.toastCtrl.create({
             message: response.errors[0].message,
             showCloseButton: true 
           }).present();
        }


      });

  }

}
