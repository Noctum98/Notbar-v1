import { Component, OnInit } from '@angular/core';
import {UserService} from './services/user.service';
import {AuthService} from './services/auth.service';
import {Router} from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService,AuthService]
})
export class AppComponent implements OnInit {
  title = 'Notbar-v1';
  public token:string;
  public payload:any;
  public url:string;

  constructor(
    private _userService:UserService,
    private _authService:AuthService,
    private _router:Router
  ) {
    this.url = 'http://localhost:3700/api/';  
  }
  
  ngOnInit(){
    this.token = localStorage.getItem('ACCESS_TOKEN');
    if(this.token != null){
      this.payload = JSON.parse(window.atob(this.token.split('.')[1]));
      console.log(this.payload);
    }
  }
  logout(){
    this._authService.logout();
    location.reload();
  }
  redirigir(){
    this._router.navigate(['/notices']);
  }
  
}
