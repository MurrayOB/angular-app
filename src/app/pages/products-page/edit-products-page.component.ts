import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

//Services
import { ApiService } from 'src/app/core/services/api.service';
import { StateService } from 'src/app/core/services/state.service';

//Interfaces
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-edit-products-page',
  templateUrl: './edit-products-page.component.html',
  styleUrls: ['./edit-products-page.component.css']
})
export class EditProductsPageComponent implements OnInit {
  @ViewChild('alert', { static: true })
  alert!: ElementRef;

  constructor(private apiService: ApiService, private stateService : StateService) { }

  url = "product/addProduct";

  successMessage = ''; 
  errorMessage = ''; 
  categories = ['Food', 'Clothes', 'Medicine', 'Household']; 
  defaultStr = 'Select A Category';

  product : Product = {
    name: '', 
    category: null, 
    quantity: null, 
    token: '', 
  }

  allProducts : any = []; 

  ngOnInit(): void {
    //Retrieve User Token
    this.product.token = this.apiService.getLocalStorageItem('token'); 

    //Subscribe to Products
    this.stateService.allProducts$.subscribe((products : any) => {
      this.allProducts = products; 
      //If Subscription is Empty
      if(!this.allProducts.length){
        this.allProducts = JSON.parse(localStorage.getItem('products')!); 
      }
    });

  }

  closeAlert() {
    this.alert.nativeElement.classList.remove('show');
    this.alert.nativeElement.classList.remove('d-block');
    this.alert.nativeElement.classList.add('d-none');
  }

  onSubmit(){
    this.apiService.post(this.product, this.url).subscribe(res => {
      this.errorMessage = ''; 
      this.successMessage = ''; 

      console.log(res);
      
      //Validation
      if(!res.Success){
        this.errorMessage = res.Message; 
        return; 
      }

      //Success Message
      this.successMessage = res.Message; 

      //Update Subject 
      this.allProducts.unshift(res.Data[0]); 

      this.stateService.allProducts$.next(this.allProducts); 
      //Update LocalStorage
      localStorage.setItem('products', JSON.stringify(this.allProducts));  

      this.alert.nativeElement.classList.add('show');
      this.alert.nativeElement.classList.add('d-block');
    }, 
    err => {
      console.log(err); 
      this.errorMessage = err['statusText']; 
    }); 
  }

}
