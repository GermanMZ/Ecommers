import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage} from '@ionic/storage';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  username: string;
  password: string; 


  constructor(public navCtrl: NavController, public navParams: NavParams , public http: HttpClient, public toastCtrl: ToastController, public storage: Storage ,public AlertCtrl:AlertController) {
     
      this.username= "";
      this.password= ""; 
  
  }

  Login(){

      this.http.get("http://localhost/wordpress/api/auth/generate_auth_cookie/?insecure=cool&username=" +this.username +"&password="+this.password)
      .subscribe(   (data)  =>{
              
        let  datos =  JSON.parse((JSON.stringify(data)));
           
        if(datos.error){  

          this.toastCtrl.create({
            message: datos.error,
            duration: 5000
          }).present();
          return;
        }
          
          this.storage.set("userLoginInfo", datos).then( (response)=>{
                  
                    this.AlertCtrl.create({
                      title: "Login Successful",
                      message: "Usted esta Logueado",
                      buttons: [{
                          text: "OK",
                          handler: () =>{
                            if(this.navParams.get("next")){
                              this.navCtrl.push(this.navParams.get("next"));
                            }else{
                              this.navCtrl.pop();
                            }
                          }
                      }]
                    }).present();   
                      
          }) 
       });
       

  }

}
