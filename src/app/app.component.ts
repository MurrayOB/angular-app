import { animate, style, transition, trigger } from "@angular/animations";
import { Component, OnInit } from "@angular/core";
import { StateService } from "./core/services/state.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  constructor(private stateService: StateService) {}

  navbar: boolean = true;

  ngOnInit(): void {
    this.stateService.navbar$.subscribe((nav: boolean) => {
      this.navbar = nav;
    });
  }
}
