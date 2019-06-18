import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/service.index';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/Login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuarioTemp: User;
  constructor(private auth: AuthService, private router: Router) {
    this.auth.user.subscribe(resp => { this.usuarioTemp = resp;})
  }

  ngOnInit() {

  }

  cerrarSesion() {
    this.auth.signOut().then(resp => {
      this.router.navigate(['/login']);
    }).catch(err => {
      console.log(err);
    });
  }

}
