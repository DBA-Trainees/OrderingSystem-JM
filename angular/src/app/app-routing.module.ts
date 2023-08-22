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

import { foodComponent } from './food/food.component';
import { typeComponent } from './type/type.component';
import { customerComponent } from './customer/customer.component';
import { divisionComponent } from './division/division.component';
import { categoryComponent } from './category/category.component';
import { orderComponent } from './order/order.component';
import { cartComponent } from './cart/cart.component';


import { createfoodComponent } from './food/create-food/createfood.component';
import { createcustomerComponent } from './customer/create-customer/createcustomer.component';
import { createcategoryComponent } from './category/create-category/createcategory.component';
import { createdivisionComponent } from './division/create-division/createdivision.component';
import { createtypeComponent } from './type/create-type/createtype.component';

import { editcategoryComponent } from './category/edit-category/editcategory.component';
import { editcustomerComponent } from './customer/edit-customer/editcustomer.component';
import { edittypeComponent } from './type/edit-type/edittype.component';
import { editdivisionComponent } from './division/edit-division/editdivision.component';
import { editfoodComponent } from './food/edit-food/editfood.component';

import { dashboardComponent } from './dashboard/dashboard.component';


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

                    { path: 'customer', component: customerComponent, data: { permission: 'Pages.Customer' }, canActivate: [AppRouteGuard] },
                    { path: 'customer/createcustomer', component: createcustomerComponent, canActivate: [AppRouteGuard] },
                    { path: 'customer/editcustomer', component: editcustomerComponent, canActivate: [AppRouteGuard] },
                   
                    { path: 'category', component: categoryComponent, data: { permission: 'Pages.Category' }, canActivate: [AppRouteGuard] },
                    { path: 'category/createcategory', component: createcategoryComponent, canActivate: [AppRouteGuard] },
                    { path: 'category/editcategory', component: editcategoryComponent, canActivate: [AppRouteGuard] },
                  
                    { path: 'order', component: orderComponent, data: { permission: 'Pages.Order' }, canActivate: [AppRouteGuard] },
                  
                    { path: 'dashboard', component: dashboardComponent,data: { permission: 'Pages.Dashboard' },  canActivate: [AppRouteGuard] },
                    { path: 'cart', component: cartComponent, canActivate: [AppRouteGuard] },
                   
                    { path: 'division', component: divisionComponent, data: { permission: 'Pages.Division' }, canActivate: [AppRouteGuard] },
                    { path: 'division/editdivision', component: editdivisionComponent, canActivate: [AppRouteGuard] },
                    { path: 'division/createdivision', component: createdivisionComponent, canActivate: [AppRouteGuard] },
                  
                    { path: 'food', component: foodComponent,data: { permission: 'Pages.Food' }, canActivate: [AppRouteGuard] },
                    { path: 'food/createfood', component: createfoodComponent, canActivate: [AppRouteGuard] },
                    { path: 'food/editfood', component: editfoodComponent, canActivate: [AppRouteGuard] },
                  
                    { path: 'type', component: typeComponent,data: { permission: 'Pages.Type' }, canActivate: [AppRouteGuard] },
                    { path: 'type/edittype', component: edittypeComponent, canActivate: [AppRouteGuard] },
                    { path: 'type/createtype', component: createtypeComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
