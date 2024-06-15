import { Routes } from '@angular/router';
import {SignupComponent} from "./pages/signup/signup.component";
import {LoginComponent} from "./pages/login/login.component";
import {HomeComponent} from "./pages/home/home.component";

export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent, // Add LoginComponent route
    pathMatch: 'full',
  },
  {
    path: '',
    component: HomeComponent, // Add HomeComponent route
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: '/login', // Redirect to login by default
    pathMatch: 'full',
  }
];
