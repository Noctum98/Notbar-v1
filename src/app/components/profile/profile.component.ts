import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ArticleService} from '../../services/article.service';
import {AuthService} from '../../services/auth.service';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { error } from 'util';
import {Global} from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[UserService,ArticleService]
})
export class ProfileComponent implements OnInit {
  public user:any;
  public url:String;
  public url_articles:string;
  public token:string;
  public payload:any;
  public articles:any;
  public title:string;

  constructor(
    private _route:ActivatedRoute,
    private _userService:UserService,
    private _articleService:ArticleService,
    private _authService:AuthService,
    private _router:Router,
  ){ 
    this.token = localStorage.getItem('ACCESS_TOKEN');
    this.url_articles = 'http://localhost:3700/art/';  
    this.title = 'Mis articulos';
  }

  ngOnInit() {
    if (this.token != null){
      this.payload = JSON.parse(window.atob(this.token.split('.')[1]));
    }
    this.url = Global.url;
    this.user = this.payload;
    console.log(this.user);
    this.getArticles();
    
  }
  getArticles(){
    this._articleService.getArticles().subscribe(
      response=>{
        this.articles = response.Articles;
        console.log(this.articles);
      },
      error=>{
        console.log(<any>error)
      }
    );
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
  viewArticle(id){
    this._router.navigate(['notice/' + id]);
  }
  editar(id){
    this._router.navigate(['edit-article/' + id]);
  }
}
