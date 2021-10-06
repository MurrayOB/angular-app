import { Component, OnInit } from "@angular/core";
import { StateService } from "src/app/core/services/state.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-user-profile-page",
  templateUrl: "./user-profile-page.component.html",
  styleUrls: ["./user-profile-page.component.css"],
})
export class UserProfilePageComponent implements OnInit {
  constructor(private stateService: StateService) {}

  date: any;

  user: User = {
    name: "",
    email: "",
  };

  ngOnInit(): void {
    this.date =
      new Date().toString().slice(0, 10) + ", " + new Date().getFullYear();
    this.stateService.user$.subscribe((user: User) => {
      this.user.name = user.name || localStorage.getItem("name");
      this.user.email = user.email || localStorage.getItem("email");
    });
  }
}
