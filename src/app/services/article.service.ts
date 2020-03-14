import {Injectable} from '@angular/core';
import {Article} from '../models/article';
import {Observable} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable()
export class ArticleService{
    public url:string;

    constructor(
        public _http:HttpClient
    ){
        this.url = 'http://localhost:3700/art/';
    }
    testService(){
        return 'Servicio de articulos funcionando correctamente';
    }
    saveArticle(article:Article):Observable<any>{
        let params = JSON.stringify(article);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url + 'save-article',params,{headers:headers});
    }
    getArticles():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url + 'get-articles',{headers:headers});
    }
    getArticle(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url + 'get-article/' + id,{headers:headers}); 
    }
    deleteArticle(id){
        let headers = new HttpHeaders().set('Content-Type','application/json');
        
        return this._http.delete(this.url + 'delete/' + id,{headers:headers});
    }
    updateArticle(article):Observable<any>{
        let params = JSON.stringify(article);
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.put(this.url + 'update-article/' + article._id,params,{headers:headers});
    }

}