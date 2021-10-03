import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { environment } from "src/environments/environment";

//Services
import { ApiService } from "../../core/services/api.service";
import { StateService } from "src/app/core/services/state.service";

//Interfaces
import { Response } from "../../models/response";
import { User } from "../../models/user";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.css"],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private stateService: StateService,
    private router: Router
  ) {}

  user: User = {
    name: "user123-example",
    password: "Password123",
  };

  result = "";

  ngOnInit(): void {}

  onSubmit() {
    if (!environment.production) {
      const user: User = {
        name: "user123-example",
        email: "example@gmail.com",
        password: "Password123",
        role: "Admin",
      };

      this.stateService.setUser(user);
      //Setting LocalStorage Items
      //This would be updated with setUser(user)
      this.apiService.setLocalStorageItem("role", user.role);
      this.apiService.setLocalStorageItem("email", user.email);
      this.apiService.setLocalStorageItem("name", user.name);
      this.apiService.setLocalStorageItem("token", "tokenexample");
      this.router.navigate(["/dashboard-page"]);
    }

    if (environment.production) {
      this.apiService.post(this.user, `user/loginUser`).subscribe(
        (response: Response) => {
          //Output Data for Console
          console.log(response);

          if (response == null) {
            this.result = "Unable to Connect to Server";
          }
          //Validation
          if (response.Success == false) {
            this.result = response.Message;
            return;
          }

          //Set User
          const user: User = response.Data;
          this.stateService.setUser(user);

          //Setting LocalStorage Items
          this.apiService.setLocalStorageItem("role", user.role);
          this.apiService.setLocalStorageItem("email", user.email);
          this.apiService.setLocalStorageItem("name", user.name);
          this.apiService.setLocalStorageItem("token", user.token);

          this.apiService.fetchProducts(user);

          //Direct to Dashboard Page
          this.router.navigate(["/dashboard-page"]);
        },
        (err) => {
          console.error(err);
          this.result = "Unable to Connect to the Server, " + err["statusText"];
        }
      );
    }
  }
}
