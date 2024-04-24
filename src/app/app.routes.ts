import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { authGuard } from "./utils/auth.guard";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
import { AllOrdersComponent } from "./components/all-orders/all-orders.component";
import { RecipesComponent } from "./components/recipes/recipes.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'sign-in',
        component: SignInComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'my-orders/:id',
        component: MyOrdersComponent,
        canActivate: [authGuard]
    },
    {
        path: 'all-orders',
        component: AllOrdersComponent,
        canActivate: [authGuard]
    },
    {
        path: 'recipes',
        component: RecipesComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];