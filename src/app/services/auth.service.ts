import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtResponseI} from '../models/jwt-response';
import {tap} from 'rxjs/operators';
import {Observable,BehaviorSubject} from 'rxjs';

@Injectable()
export class AuthService{
    public url:string;
    public authSubject:any;
    private token:string;

    constructor(
        private _http:HttpClient
    ){
        this.url = 'http://localhost:3700/auth/';
        this.authSubject = new BehaviorSubject(false);
    }
    login(user){
        return this._http.post(this.url + 'login',user).pipe(tap((res:JwtResponseI)=>{
            if(res){
                this.saveToken(res.token);
            }
        }));
    }
    logout():void{
        localStorage.removeItem('ACCESS_TOKEN');
    }
    private saveToken(token){
        localStorage.setItem('ACCESS_TOKEN',token);
    }
    private getToken(){
        if(!this.token){
            this.token = localStorage.getItem('ACCESS_TOKEN');
        }
        return this.token;
    }
}