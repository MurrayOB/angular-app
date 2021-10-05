import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/app/core/services/api.service";
import { StateService } from "src/app/core/services/state.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.css"],
})
export class NavBarComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private stateService: StateService
  ) {}

  //Parameters
  dark = "dark-theme";
  light = "light-theme";
  theme = "light-theme";

  loggedIn = false;
  role = "";
  name = "";
  url = "user/logoutUser";

  //Token Used For Logout Button
  user: User = {
    token: "",
  };

  ngOnInit(): void {
    //Get theme
    this.theme = localStorage.getItem("theme") || this.light;

    //Subscribe To Nav Bar Change
    this.router.events.subscribe((event) => {
      this.loggedIn = this.apiService.isLoggedIn();

      if (!this.loggedIn) {
        return;
      }

      this.user.token = this.apiService.getLocalStorageItem("token");
    });

    //Subscribe to User Role & Username
    this.stateService.user$.subscribe((user: User) => {
      this.role = user.role || localStorage.getItem("role");
      this.name = user.name || localStorage.getItem("name");
    });
  }

  toggleTheme() {
    const theme = document.documentElement.className;

    if (theme === this.dark) {
      this.theme = this.light;
      document.documentElement.className = this.light;
      localStorage.setItem("theme", this.light);
    } else {
      this.theme = this.dark;
      document.documentElement.className = this.dark;
      localStorage.setItem("theme", this.dark);
    }
  }

  logOut() {
    //Set Logged In To False
    this.loggedIn = false;

    //Post And Return Server Response
    this.apiService.post(this.user, this.url).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.error(err);
      }
    );

    localStorage.clear();

    this.router.navigate(["/login-page"]);
  }
}
