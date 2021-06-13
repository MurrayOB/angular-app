import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { ApiService } from '../services/api.service';
//import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router){}
  
  canActivate(): boolean{
    if(!this.apiService.isLoggedIn()){
      this.router.navigate(['/login-page'])
      return false; 
    }

    return true; 

  }
  
}
