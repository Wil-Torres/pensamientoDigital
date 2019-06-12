import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/service.index';
import { auth } from 'firebase';
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usr: any;

  constructor(public router: Router, private auth: AuthService) { }

  ngOnInit() {
    init_plugins();
    this.auth.user.subscribe(res => {
      this.usr = res;
    })
  }
  ingresar(email: string, password: string){
    // this.router.navigate(['/home']);
    this.auth.login(email, password)
    console.log(this.auth.user)
  }

  signUp (email: string, password: string) {
    this.auth.signUp(email, password);
  }



}
