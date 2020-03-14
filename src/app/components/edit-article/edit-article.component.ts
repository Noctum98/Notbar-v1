import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import {ArticleService} from '../../services/article.service';
import {UploadFileService} from '../../services/uploadFile.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit-article.component.css'],
  providers:[ArticleService,UploadFileService]
})
export class EditArticleComponent implements OnInit {
  public titulo:string;
  public article:any;
  public filesToUpload:Array<File>;
  public status:string;
  public url:string;
  public save_article:any;

  constructor(
    private _articleService:ArticleService,
    private _route:ActivatedRoute,
    private _uploadService:UploadFileService
  ) { 
    this.titulo = 'Editar articulo';
    this.url = 'http://localhost:3700/art/';
  }

  ngOnInit() {
    this._route.params.subscribe(params =>{
      let id = params.id;
      this.getArticle(id);
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
  onSubmit(form){
    this._articleService.updateArticle(this.article).subscribe(
      response =>{
        console.log(response.article);
        if(response.article){
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(this.url + 'upload-file/' + response.article._id,[],this.filesToUpload,'image')
            .then((result:any)=>{
              this.save_article = result.article;
              console.log(result);
              this.status = 'success';
              //form.reset();
            })
            
          }else{
            this.save_article = response.article;
            console.log(response);
            this.status = 'success';
            //form.reset();
          }
        }else{
          this.status = 'failed';
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }
  fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
	}
}
