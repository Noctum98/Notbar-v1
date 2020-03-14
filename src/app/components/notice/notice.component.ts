import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import {ArticleService} from '../../services/article.service';
import { error } from 'protractor';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
  providers:[ArticleService]
})
export class NoticeComponent implements OnInit {
  public article:any;
  public url:string;
  public id_article:string;
  constructor(
    private _route:ActivatedRoute,
    private _articleService:ArticleService
  ) { 
    this.url = 'http://localhost:3700/art/';
  }

  ngOnInit(){
    this._route.params.subscribe(params =>{
        let title = params.id;
        console.log(title);
        this.getArticles(title);
      }   
    );
  }
  getArticles(title){
    this._articleService.getArticles().subscribe(
      response =>{
        for(var contador = 0;contador < response.Articles.length;contador++){
          if(response.Articles[contador].title == title){
            this.id_article = response.Articles[contador]._id;
            if(this.id_article) this.getArticle(this.id_article);
            break;
          }
        };
      },
      error=>{
        console.log(<any>error);
      }
    );
  }
  getArticle(id){
    this._articleService.getArticle(id).subscribe(
      response =>{
        this.article = response.Article;
        console.log(this.article);
      },
      error=>{
        console.log(<any>error);
      }
    );
  }

}
