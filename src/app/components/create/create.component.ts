import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../../services/article.service';
import {Article} from '../../models/article';
import {UploadFileService} from '../../services/uploadFile.service';
import * as moment from 'moment';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers:[ArticleService,UploadFileService]
})
export class CreateComponent implements OnInit {
  public titulo:string;
  public test:string;
  public article:Article;
  public token:string;
  public payload:any;
  public filesToUpload:Array<any>;
  public url:string;
  public save_article:any;
  public status:string;
  public date:any;

  constructor(
    private _articleService:ArticleService,
    private _uploadService:UploadFileService
  ) { 
    this.titulo = 'Crear Articulo';
    this.url = 'http://localhost:3700/art/';
    this.test = _articleService.testService();
    this.token = localStorage.getItem('ACCESS_TOKEN');
    this.payload = JSON.parse(window.atob(this.token.split('.')[1]));
    this.date =  moment().format('L');
    console.log(this.date);
    this.article = new Article('','',this.payload.name + ' ' + this.payload.last_name,this.payload.name_user,this.date,'','','');
  }

  ngOnInit(){
    console.log(this.date);
    console.log(this.test);
  }
  onSubmit(form){
    this._articleService.saveArticle(this.article).subscribe(
      response =>{
        if(response){
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(this.url + 'upload-file/' + response.ArticleStored._id,[],this.filesToUpload,'image')
            .then((result:any)=>{
              this.save_article = result.ArticleStored;
              console.log(result);
              this.status = 'success';
              //form.reset();
            })
            
          }else{
            this.save_article = response.ArticleStored;
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
