import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Pages
import { HomeComponent } from './pages/home-page/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { EditProductsPageComponent } from './pages/products-page/edit-products-page.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
//Components
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
//Guard
import { AuthGuardGuard } from './core/guards/auth-guard.guard';
//Services
import { StateService } from './core/services/state.service'; 
//Chart
import { ChartsModule } from 'ng2-charts';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AboutPageComponent } from './pages/about-page/about-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    RegisterPageComponent,
    LoginPageComponent,
    DashboardPageComponent,
    ProfilePageComponent,
    EditProductsPageComponent,
    StatisticsComponent,
    AboutPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule, 
    ChartsModule, 
    NgbModule, 
  ],
  providers: [DatePipe, AuthGuardGuard, StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
