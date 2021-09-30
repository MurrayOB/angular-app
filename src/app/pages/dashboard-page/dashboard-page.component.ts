import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { ApiService } from 'src/app/core/services/api.service';
import { StateService } from 'src/app/core/services/state.service';

//Interfaces
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  @ViewChild('alert', { static: true })
  alert!: ElementRef;

  constructor(private stateService : StateService, private apiService : ApiService) { }

  role = ''; 
  url = 'product/removeProduct'; 
  token = ''; 
  errorMsg = ''; 

  product : Product = {
    token : '', 
  }

  allProducts : any = [
    {id: 1, name: 'Example', category: 'Food', quantity: 100}, 
    {id: 34, name: 'Another Example', category: 'Clothes', quantity: 50}, 
    {id: 20, name: 'Another Example', category: 'Medicine', quantity: 110}, 
    {id: 10, name: 'Another Example', category: 'Household', quantity: 120},
  ]; 
  columns : any = ["name", "category", "quantity"]; 

  ngOnInit(): void {
    //Subscribe to User Role
    this.stateService.user$.subscribe((user : User ) => {
      this.role = user.role || localStorage.getItem('role'); 
    }); 
    
    // //Set Token
    // this.product.token = this.apiService.getLocalStorageItem('token'); 

    // //Subscribe to Products
    // this.stateService.allProducts$.subscribe((products : any) => {
    //   this.allProducts = products; 

    //   if(!this.allProducts.length){
    //     this.allProducts = JSON.parse(localStorage.getItem('products')!); 
    //   }
    // }); 

    // //Subscribe to Columns
    // this.stateService.columns$.subscribe((columns : any) => {
    //   this.columns = columns; 
      
    //   if(!this.columns.length){
    //     this.columns = JSON.parse(localStorage.getItem('columns')!); 
    //   }
    // }); 

  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.alert.nativeElement.classList.remove('d-block');
    this.alert.nativeElement.classList.add('d-none');
  }

  //Capitilize Headers First Letter
  capitalize(s : any){
    return s[0].toUpperCase() + s.slice(1);
  }

  //Button To Remove A Product
  removeProduct(id : any){
    this.errorMsg = '';
    this.product.id = id; 

    this.apiService.post(this.product, `product/removeProduct`).subscribe(res => {
      console.log(res); 

      //Validation
      if(!res.Success){
        this.errorMsg = res.Message; 
        return; 
      } 

      //Alert Handling 
      this.alert.nativeElement.classList.add('show');
      this.alert.nativeElement.classList.add('d-block');

      //Delete Product Subject And LocalStorage
      for (let i = 0; i < this.allProducts.length; i++) {
        if(this.allProducts[i]['id'] === id){
          this.allProducts.splice(i, 1); 
          
          //Update Subject
          this.stateService.allProducts$.next(this.allProducts); 

          //Update Local Storage
          localStorage.setItem('products', JSON.stringify(this.allProducts)); 
        }
      } 

    }, 
    err => {
      console.error(err); 
      this.errorMsg = err['statusText']; 
    });
  }

}
  