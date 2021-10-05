import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";

import { environment } from "src/environments/environment";

//Services
import { ApiService } from "src/app/core/services/api.service";
import { StateService } from "src/app/core/services/state.service";

//Interfaces
import { Product } from "src/app/models/product";

@Component({
  selector: "app-edit-products-page",
  templateUrl: "./edit-products-page.component.html",
  styleUrls: ["./edit-products-page.component.css"],
})
export class EditProductsPageComponent implements OnInit {
  @ViewChild("alert", { static: true })
  alert!: ElementRef;

  constructor(
    private apiService: ApiService,
    private stateService: StateService
  ) {}

  url = "product/addProduct";

  successMessage = "";
  errorMessage = "";
  categories = ["Food", "Clothes", "Medicine", "Household"];
  defaultStr = "Select A Category";

  product: Product = {
    name: "",
    category: null,
    quantity: null,
    token: "",
  };

  allProducts: any = [];

  ngOnInit(): void {
    if (!environment.production) {
      this.stateService.allProducts$.subscribe((products: any) => {
        if (products.length == 0) {
          this.allProducts = JSON.parse(localStorage.getItem("products")!);
        } else {
          this.allProducts = products;
        }
      });

      console.log(JSON.stringify(this.allProducts));
    }

    if (environment.production) {
      this.product.token = this.apiService.getLocalStorageItem("token");

      this.stateService.allProducts$.subscribe((products: any) => {
        this.allProducts = products;
        if (!this.allProducts.length) {
          this.allProducts = JSON.parse(localStorage.getItem("products")!);
        }
      });
    }
  }

  closeAlert() {
    this.alert.nativeElement.classList.remove("show");
    this.alert.nativeElement.classList.remove("d-block");
    this.alert.nativeElement.classList.add("d-none");
  }

  onSubmit() {
    //Fake Environment
    if (!environment.production) {
      const oldProduct = this.product;

      const newProduct = {
        id: 14,
        name: oldProduct.name,
        category: oldProduct.category,
        quantity: oldProduct.quantity,
      };

      this.allProducts.unshift(newProduct);

      this.stateService.allProducts$.next(this.allProducts);
      localStorage.setItem("products", JSON.stringify(this.allProducts));
      this.alert.nativeElement.classList.add("show");
      this.alert.nativeElement.classList.add("d-block");
    }

    if (environment.production) {
      this.apiService.post(this.product, this.url).subscribe(
        (res) => {
          this.errorMessage = "";
          this.successMessage = "";

          if (!res.Success) {
            this.errorMessage = res.Message;
            return;
          }

          this.successMessage = res.Message;

          this.allProducts.unshift(res.Data[0]);

          this.stateService.allProducts$.next(this.allProducts);

          localStorage.setItem("products", JSON.stringify(this.allProducts));

          this.alert.nativeElement.classList.add("show");
          this.alert.nativeElement.classList.add("d-block");
        },
        (err) => {
          console.log(err);
          this.errorMessage = err["statusText"];
        }
      );
    }
  }
}
