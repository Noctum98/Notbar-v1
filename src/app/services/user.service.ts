import {Injectable} from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user';

@Injectable()
export class UserService{
    public url:String;

    constructor(
        public _http:HttpClient
    ){
        this.url = 'http://localhost:3700/api/';
    }

    testService(){
        return 'Servicio funcionando correctamente';
    }

    getUsers():Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url + 'get-users',{headers:headers});
    }
    getUser(id):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.get(this.url + 'get-user/'+id,{headers:headers});
    }
    saveUser(user:User):Observable<any>{
        let params = JSON.stringify(user);
        let headers = new HttpHeaders().set('Content-Type','application/json');

        return this._http.post(this.url + 'save-user',params,{headers:headers});
    }
}