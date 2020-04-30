import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage} from '@ionic/storage';

@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
  

   user: any;
   Nombre: any;
   Correo: any; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  
    
  
  } 


  ionViewDidLoad() {
    this.storage.ready().then ( ()=>{
      this.storage.get("userLoginInfo").then( (userLoginInfo)=>{
     
             this.Nombre = userLoginInfo.user.firstname 
             this.Correo = userLoginInfo.user.email; 
      })
    })
  }




}
