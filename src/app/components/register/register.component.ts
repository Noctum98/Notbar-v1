import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {UploadService} from '../../services/upload.service';
import { error } from 'protractor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[UserService,UploadService]
})
export class RegisterComponent implements OnInit {
  public user:User;
  public status:string;
  public save_user:any;
  public filesToUpload:Array<any>;
  public url:string;

  constructor(
    private _userService:UserService,
    private _uploadService:UploadService
  ) {
    this.user = new User('','','','','','','');
    this.url = 'http://localhost:3700/api/';
   }

  ngOnInit() {
  }

  setUser(form){
    this._userService.saveUser(this.user).subscribe(
      response =>{
        console.log(response.UserStored);
        if(response){
          if(this.filesToUpload){
            this._uploadService.makeFileRequest(this.url+'upload-file/'+response.UserStored._id,[],this.filesToUpload,'image')
            .then((result:any)=>{
              this.save_user = result.UserStored;
              console.log(this.save_user);
              this.status = 'success';
              form.reset();
            });
          }else{
						this.save_user = response.UserStored;
						this.status = 'success';
						form.reset();
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
