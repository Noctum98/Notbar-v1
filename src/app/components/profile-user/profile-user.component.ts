import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params,Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ArticleService} from '../../services/article.service';
import { error } from 'protractor';

@Component({
  selector: 'app-profile-user',
  templateUrl: '../profile/profile.component.html',
  styleUrls: ['./profile-user.component.css'],
  providers:[ArticleService,UserService]
})
export class ProfileUserComponent implements OnInit {
  public title:string;
  public id_user:string;
  public user:any;
  public url:String;
  public articles:any;
  public url_articles:string;
  public token:string;
  public payload:any;

  constructor(
    private _route:ActivatedRoute,
    private _userService:UserService,
    private _articleService:ArticleService,
    private _router:Router
  ){ 
    this.token = localStorage.getItem('ACCESS_TOKEN');
    this.title = 'Articulos';
    this.url = 'http://localhost:3700';
    this.url_articles = 'http://localhost:3700/art/';
  }

  ngOnInit(){
    if (this.token != null){
      this.payload = JSON.parse(window.atob(this.token.split('.')[1]));
    }
    this._route.params.subscribe(params=>{
      let user = params.user;
      console.log(user);
      this.getUsers(user);
      this.getArticles();
    });
  }
  getUsers(user){
    this._userService.getUsers().subscribe(
      response =>{
        for(var contador = 0;contador < response.length;contador++){
          if(response[contador].name_user == user){
            this.id_user = response[contador]._id;
            if(this.id_user) this.getUser(this.id_user);
            break;
          }
        };
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
  getUser(id){
    this._userService.getUser(id).subscribe(
      response =>{
        this.user = response;
        console.log(this.user);
      },
      error=>{
        console.log(<any>error);
      }
    )
  }
  getArticles(){
    this._articleService.getArticles().subscribe(
      response =>{
        this.articles = response.Articles;
      },
      error =>{
        console.log(<any>error);
      }
    );
  }
  viewArticle(id){
    this._router.navigate(['notice/' + id]);
  }
  editar(id){
    this._router.navigate(['edit-article/' + id]);
  }
  borrar(id){
    this._articleService.deleteArticle(id).subscribe(
      response=>{
        location.reload();
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

}
