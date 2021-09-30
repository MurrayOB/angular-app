import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Router } from '@angular/router';

//Interfaces
import { User } from '../../models/user'; 
import { Response } from '../../models/response'; 
import { StateService } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent implements OnInit {

  patternEmail: string = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

  constructor(private apiService : ApiService, private stateService: StateService, private router:Router) { }
   
  user: User = {
    name: '', 
    email: '', 
    password: '',
    role: null, 
  }; 

  url = "user/registerUser";
  result = ''; 
  roles = ['Cashier', 'Admin']; 
  defaultStr = 'Select A Role';

  ngOnInit(): void {
  }

  onSubmit(){
    this.stateService.setUser(this.user); 
    //Setting LocalStorage Items
    //This would be updated with setUser(user)
    this.apiService.setLocalStorageItem('role', this.user.role);
    this.apiService.setLocalStorageItem('email', this.user.email);
    this.apiService.setLocalStorageItem('name', this.user.name);
    this.apiService.setLocalStorageItem('token', 'tokenexample'); 
    this.router.navigate(['/dashboard-page']); 
    
    // this.apiService.post(this.user, this.url).subscribe((response : Response) => {
    //   console.log(response);
      
    //   if(!response.Success){
    //     this.result = response.Message; 
    //     return; 
    //   }
      
    //   this.router.navigate(['/dashboard-page']); 
    // }, 
    // err =>{
    //   console.error(err); 
    // }
    // ); 
  }

}
  