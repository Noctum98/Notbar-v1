import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/article.service';
import { error } from 'protractor';
import {Router} from '@angular/router';


@Component({
  selector: 'app-world',
  templateUrl: '../entertainment/entertainment.component.html',
  styleUrls: ['./world.component.css'],
  providers:[ArticleService]
})
export class WorldComponent implements OnInit {

  public articles:any;
  public url:string;
  public category:string;

  constructor(
    private _articleService:ArticleService,
    private _router:Router
  ){ 
    this.url = 'http://localhost:3700/art/';
    this.category = 'Mundo';
  }

  ngOnInit() {
    this.getArticles();
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
  redirigir(id){
    this._router.navigate(['/notice/',id]);
  }

}
