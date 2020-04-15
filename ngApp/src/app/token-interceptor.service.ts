import { Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders} from '@angular/common/http' ;
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private authservice:AuthService ) { }

  intercept(req:HttpRequest<any> , next:HttpHandler){
    //let authService = this.injector.get(AuthService) ;
    let tokenizedReq = req.clone({
      setHeaders : {
        Authorization : `Bearer ${this.authservice.getToken()}`, //add this token to every http request for verify in nodejs
      }
    });
    return next.handle(tokenizedReq) ;
  }
}
