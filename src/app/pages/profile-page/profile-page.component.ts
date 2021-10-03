import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

//Services
import { ApiService } from "src/app/core/services/api.service";
import { StateService } from "src/app/core/services/state.service";

//Interfaces
import { User } from "src/app/models/user";
import { Response } from "../../models/response";

interface Alert {
  type: string;
  message: string;
}

const DALERTS: Alert[] = [
  {
    type: "danger",
    message: "This is a danger alert",
  },
];

const ALERTS: Alert[] = [
  {
    type: "success",
    message: "This is an success alert",
  },
];

@Component({
  selector: "app-profile-page",
  templateUrl: "./profile-page.component.html",
  styleUrls: ["./profile-page.component.css"],
})
export class ProfilePageComponent implements OnInit {
  alerts: Alert[] = [];

  constructor(
    private apiService: ApiService,
    private stateService: StateService
  ) {}

  url = "user/changeUserDetails";

  user: User = {
    name: "",
    email: "",
    token: "",
  };

  errorMessage = "";
  successMessage = "";

  ngOnInit(): void {
    this.user.name = this.apiService.getLocalStorageItem("name");
    this.user.email = this.apiService.getLocalStorageItem("email");
    this.user.token = this.apiService.getLocalStorageItem("token");
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  //Stop User From Continuous Calls
  limitBtn() {
    (<HTMLInputElement>document.getElementById("changeBtn")).disabled = true;

    setTimeout(function () {
      (<HTMLInputElement>document.getElementById("changeBtn")).disabled = false;
    }, 2000);
  }

  onSubmit() {
    //Reset User Messages
    this.errorMessage = "";
    this.successMessage = "";

    this.limitBtn();

    //Validation To See If They've Made Any Changes
    if (
      this.user.name == this.apiService.getLocalStorageItem("name") &&
      this.user.email == this.apiService.getLocalStorageItem("email")
    ) {
      this.errorMessage = "You havent made any changes";
      return;
    }

    if (!environment.production) {
      this.apiService.setLocalStorageItem("name", this.user.name);
      this.apiService.setLocalStorageItem("email", this.user.email);
      this.stateService.setUser(this.user);
      this.successMessage = "Successfully Changed User Details";
    }

    if (environment.production) {
      this.apiService.post(this.user, this.url).subscribe(
        (response: Response) => {
          console.log(response);

          //Validation
          if (!response.Success) {
            this.errorMessage = response.Message;
            return;
          }

          //Storage
          this.apiService.setLocalStorageItem("name", response.Data.name);
          this.apiService.setLocalStorageItem("email", response.Data.email);

          //Broadcast Subject
          this.stateService.setUser(this.user);

          this.successMessage = "Successfully Changed User Details";
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
}
