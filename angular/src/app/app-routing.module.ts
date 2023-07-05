import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { CategoryComponent } from './_Category/Category.component';
import { DivisionComponent } from './_Division/Division.component';
import { FoodComponent } from './_Food/Food.component';
import { TypeComponent } from './_Type/Type.component';
import { CreateFoodComponent } from './_Food/Create-Food/CreateFood.component';



@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: '_Category', component: CategoryComponent, canActivate: [AppRouteGuard] },
                    { path: '_Division', component: DivisionComponent, canActivate: [AppRouteGuard] },
                    { path: '_Food', component: FoodComponent, canActivate: [AppRouteGuard] },
                    { path: '_Food/CreateFood', component: CreateFoodComponent, canActivate: [AppRouteGuard] },
                    { path: '_Type', component: TypeComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
