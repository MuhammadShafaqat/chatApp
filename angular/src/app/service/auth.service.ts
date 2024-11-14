import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    isLoginStatus = new BehaviorSubject<boolean>(!!localStorage.getItem('authToken'));

  constructor(private http:HttpClient) { }

 apiUrl = 'http://localhost:5000/api/'

register(userObj:any){
return  this.http.post<any>(this.apiUrl+'register',userObj)
}

logIn(userObj:any){
  return  this.http.post<any>(this.apiUrl+'login',userObj)
}

logOut():void {
localStorage.removeItem('authToken');
localStorage.removeItem('currentUser');
this.isLoginStatus.next(false);
}

setLoginStatus(isLoggedIn: boolean):void{
   this.isLoginStatus.next(isLoggedIn);
}


}
