import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardGuard } from "./core/guards/auth-guard.guard";

//Pages:
//Edit Products Page
import { EditProductsPageComponent } from "./pages/products-page/edit-products-page.component";
//Dashboard Page
import { DashboardPageComponent } from "./pages/dashboard-page/dashboard-page.component";
//Home Page
import { HomeComponent } from "./pages/home-page/home.component";
//Login Page
import { LoginPageComponent } from "./pages/login-page/login-page.component";
//Profile Page
import { ProfilePageComponent } from "./pages/profile-page/profile-page.component";
//Register Page
import { RegisterPageComponent } from "./pages/register-page/register-page.component";
//Statistics Page
import { StatisticsComponent } from "./pages/statistics/statistics.component";
//About Page
import { AboutPageComponent } from "./pages/about-page/about-page.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "dashboard-page",
    component: DashboardPageComponent,
    canActivate: [AuthGuardGuard],
  },
  {
    path: "edit-products-page",
    component: EditProductsPageComponent,
    canActivate: [AuthGuardGuard],
  },
  { path: "home-page", component: HomeComponent },
  { path: "login-page", component: LoginPageComponent },
  {
    path: "profile-page",
    component: ProfilePageComponent,
    canActivate: [AuthGuardGuard],
  },
  { path: "register-page", component: RegisterPageComponent },
  { path: "about-page", component: AboutPageComponent },
  {
    path: "statistics-page",
    component: StatisticsComponent,
    canActivate: [AuthGuardGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
