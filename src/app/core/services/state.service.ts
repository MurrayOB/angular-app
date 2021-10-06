import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

//Interfaces
import { User } from "src/app/models/user";

@Injectable({
  providedIn: "root",
})
export class StateService {
  //User
  user: User = {};
  user$ = new BehaviorSubject<User>(this.user);

  //Products
  products: any = [];
  allProducts$ = new BehaviorSubject<any>(this.products);

  //Columns
  columns: any = [];
  columns$ = new BehaviorSubject<any>(this.columns);

  //Layout
  navbar: boolean = true;
  navbar$ = new BehaviorSubject<any>(this.navbar);

  constructor() {}

  setUser(userin: User) {
    this.user = userin;
    this.user$.next(this.user);
  }

  setLayout(navbar: boolean) {
    this.navbar = navbar;
    this.navbar$.next(this.navbar);
  }

  setProduct(productsAndColumns: any) {
    var columns = [];
    var products = [];
    columns = productsAndColumns[0];
    var headers = [];

    //Get Headers
    for (let i = 0; i < columns.length; i++) {
      headers.push(columns[i][0]);
    }

    //Set Products
    products = productsAndColumns[1];
    this.products = products;
    this.allProducts$.next(this.products);
    localStorage.setItem("products", JSON.stringify(this.products));

    //Set Columns
    this.columns = headers;
    this.columns$.next(this.columns);
    localStorage.setItem("columns", JSON.stringify(this.columns));
  }
}
