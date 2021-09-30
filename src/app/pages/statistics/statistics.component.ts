import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/core/services/state.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  constructor(private stateService : StateService) { }

  chartOptions = {
    responsive: true , 
 
  }

  //Chart Labels
  labels =  ['Clothes', 'Household', 'Medicine', 'Food'];

  //Chart Data Array
  quantity : any = []; 

  //Chart Data
  chartData = [
    {
      data: this.quantity, 
    },
  ];

  //Chart Colors
  colors = [{ 
      backgroundColor: [
        'rgba(134, 174, 247, 0.8)',
        'rgba(101, 214, 105, 0.8)',
        'rgba(240, 112, 103, 0.8)', 
        'rgba(255, 174, 74, 0.6)', 
      ]
    }]; 
  
  allProducts : any = [
    {id: 1, name: 'Example', category: 'Food', quantity: 100}, 
    {id: 34, name: 'Another Example', category: 'Clothes', quantity: 90}, 
    {id: 20, name: 'Another Example', category: 'Medicine', quantity: 110}, 
    {id: 10, name: 'Another Example', category: 'Household', quantity: 120}, 
  ]; 

  ngOnInit(): void {
    //Subscribe to Products
    // this.stateService.allProducts$.subscribe((products : any) => {
    //   this.allProducts = products; 

    //   if(!this.allProducts.length){
    //     this.allProducts = JSON.parse(localStorage.getItem('products')!); 
    //   }
    // }); 

    this.getQuantities(this.allProducts); 
  
  }

  //Get Quantities of Categories for Charts onInit
  getQuantities(allProducts : any){
    var household = 0;  
    var clothes = 0;  
    var food = 0;  
    var medicine = 0;

    if(!allProducts.length){
      return; 
    }

    for (let i = 0; i < allProducts.length; i++) {
      //Add Quanitites to Categories Array
      if(allProducts[i]['category'] == 'Household'){
        household = household + Number( allProducts[i]['quantity']); 
      }

      if(allProducts[i]['category'] == 'Clothes'){
        clothes = clothes + Number( allProducts[i]['quantity']); 
      }
      
      if(allProducts[i]['category'] == 'Medicine'){
        medicine = medicine + Number( allProducts[i]['quantity']); 
      }

      if(allProducts[i]['category'] == 'Food'){
        food = food + Number( allProducts[i]['quantity']); 
      }
    }

    this.quantity.push(clothes); 
    this.quantity.push(household); 
    this.quantity.push(medicine); 
    this.quantity.push(food); 
  }

}
