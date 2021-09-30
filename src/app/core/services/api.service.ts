import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

const API_URL = "";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient, private stateService : StateService) {}
  
  //Post To Server
  post(userOrProduct : any, url : any):Observable<any>{
    return this.http.post<any>(`${API_URL}${url}`, userOrProduct); 
  }

  //Local Storage Functions: 
  
  //Returns Logged In Boolean
  isLoggedIn(){
    return !!localStorage.getItem('token'); 
  }

  //Set Local Storage Function
  setLocalStorageItem(name : string, item: any){
    localStorage.setItem(name, item); 
  }

  //Get Local Storage Function
  getLocalStorageItem(name: string){
    return localStorage.getItem(name) || '';
  } 

  fetchProducts(user : any){
    this.post(user, `product/fetchProducts`).subscribe(res => {
      console.log(res); 

      //Validation
      if(!res.Success){
        console.log(res.Message);    
        return; 
      } 
    
      //Result (Columns and Products Array)
      var array = [];
      array = res.Data; 
    
      this.stateService.setProduct(array); 
    }, 
    err => {
      console.error(err); 
    });
  }
  
}
