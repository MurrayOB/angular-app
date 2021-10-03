import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { environment } from "src/environments/environment";

//Services
import { ApiService } from "src/app/core/services/api.service";
import { StateService } from "src/app/core/services/state.service";

//Interfaces
import { Product } from "src/app/models/product";
import { User } from "src/app/models/user";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.css"],
})
export class DashboardPageComponent implements OnInit {
  @ViewChild("alert", { static: true })
  alert!: ElementRef;

  constructor(
    private stateService: StateService,
    private apiService: ApiService
  ) {}

  role = "";
  url = "product/removeProduct";
  token = "";
  errorMsg = "";

  product: Product = {
    token: "",
  };

  allProducts: any = [
    { id: 1, name: "Apples", category: "Food", quantity: 100 },
    { id: 34, name: "Shirts", category: "Clothes", quantity: 50 },
    { id: 20, name: "Vitamin", category: "Medicine", quantity: 110 },
    { id: 10, name: "Chairs", category: "Household", quantity: 120 },
  ];
  columns: any = ["name", "category", "quantity"];

  ngOnInit(): void {
    if (!environment.production) {
      this.getUserRole();

      this.stateService.allProducts$.subscribe((products: any) => {
        if (products.length !== 0) {
          this.allProducts = products;
          return;
        } else {
          let data = [];
          data.push(this.columns);
          data.push(this.allProducts);
          this.stateService.setProduct(data);
        }
      });
    }

    if (environment.production) {
      this.getUserRole();
      this.product.token = this.apiService.getLocalStorageItem("token");
      this.getProducts();
      this.getColumns();
    }
  }

  getUserRole() {
    this.stateService.user$.subscribe((user: User) => {
      this.role = user.role || localStorage.getItem("role");
    });
  }

  getProducts() {
    this.stateService.allProducts$.subscribe((products: any) => {
      this.allProducts = products;

      if (!this.allProducts.length) {
        this.allProducts = JSON.parse(localStorage.getItem("products")!);
      }
    });
  }

  getColumns() {
    this.stateService.columns$.subscribe((columns: any) => {
      this.columns = columns;

      if (!this.columns.length) {
        this.columns = JSON.parse(localStorage.getItem("columns")!);
      }
    });
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove("show");
    this.alert.nativeElement.classList.remove("d-block");
    this.alert.nativeElement.classList.add("d-none");
  }

  //Capitilize Headers First Letter
  capitalize(s: any) {
    return s[0].toUpperCase() + s.slice(1);
  }

  removeLocalProduct(id: any) {
    //Delete Product Subject And LocalStorage
    for (let i = 0; i < this.allProducts.length; i++) {
      if (this.allProducts[i]["id"] === id) {
        this.allProducts.splice(i, 1);

        //Update Subject
        this.stateService.allProducts$.next(this.allProducts);

        //Update Local Storage
        localStorage.setItem("products", JSON.stringify(this.allProducts));
      }
    }
  }

  removeProduct(id: any) {
    this.errorMsg = "";
    this.product.id = id;

    if (environment.production) {
      this.apiService.post(this.product, `product/removeProduct`).subscribe(
        (res) => {
          console.log(res);

          if (!res.Success) {
            this.errorMsg = res.Message;
            return;
          }

          this.alert.nativeElement.classList.add("show");
          this.alert.nativeElement.classList.add("d-block");

          this.removeLocalProduct(id);
        },
        (err) => {
          console.error(err);
          this.errorMsg = err["statusText"];
        }
      );
    }

    if (!environment.production) {
      this.alert.nativeElement.classList.add("show");
      this.alert.nativeElement.classList.add("d-block");
      this.removeLocalProduct(id);
    }
  }
}
