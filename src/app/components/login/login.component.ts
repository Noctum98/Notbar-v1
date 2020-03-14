import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {User} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import { error } from 'protractor';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[UserService,AuthService]
})
export class LoginComponent implements OnInit {
  public users:any;
  public user:any;
  public succes:Boolean;
  public condicion:string;
  public token:string;
  public payload:any;
  @Output() conseguirCondicion = new EventEmitter;

  constructor(
    private _userService:UserService,
    private router:Router,
    private _authService:AuthService
  ) { 
    this.user  = {
      name_user: '',
      password: ''
    };
    this.succes = true;
  }

  ngOnInit(){
    this.getUser();
    this.token = localStorage.getItem('ACCESS_TOKEN');
    if(this.token != null){
      this.redirigir('/notices');
    }

  }

  getUser(){
    this._userService.getUsers().subscribe(
      response =>{
        if(response){
          this.users = response;
          console.log(this.users);
        }
      },
      error =>{
        console.log(<any>error)
      }
    );
  }
  onSubmit(form){
    this._authService.login(this.user).subscribe(
      response=>{
        console.log(response.token);
        location.reload();
      },
      error =>{
        console.log(<any>error);
        this.succes = false;
      }
    );    
  }
  redirigir(path){
    this.router.navigate([path]);
  }
}

