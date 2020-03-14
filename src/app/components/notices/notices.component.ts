import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {Router} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-notices',
  templateUrl: './notices.component.html',
  styleUrls: ['./notices.component.css'],
  providers:[ArticleService]
})
export class NoticesComponent implements OnInit {
  public articles:any;
  public url:string;
  public prueba:any;

  constructor(
    private _articleService:ArticleService,
    private _router:Router
  ) { 
    this.url = 'http://localhost:3700/art/';
  }

  ngOnInit(){
    this._articleService.getArticles().subscribe(
      response=>{
        this.articles = response.Articles;
      },
      error=>{
        console.log(<any>error)
      }
    );
  }
  redirigir(id){
    this._router.navigate(['/notice/',id]);
  }

}
