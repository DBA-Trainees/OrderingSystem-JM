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
import { edittypeComponent } from './type/edit-type/edittype.component';
import { typeComponent } from './type/type.component';
import { createtypeComponent } from './type/create-type/createtype.component';
import { divisionComponent } from './division/division.component';
import { createdivisionComponent } from './division/create-division/createdivision.component';
import { editdivisionComponent } from './division/edit-division/editdivision.component';
import { categoryComponent } from './category/category.component';
import { createfoodComponent } from './food/create-food/createfood.component';
import { createcategoryComponent } from './category/create-category/createcategory.component';
import { editcategoryComponent } from './category/edit-category/editcategory.component';


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
                    { path: 'category', component: categoryComponent, canActivate: [AppRouteGuard] },
                    { path: 'category/createcategory', component: createcategoryComponent, canActivate: [AppRouteGuard] },
                    { path: 'category/editcategory', component: editcategoryComponent, canActivate: [AppRouteGuard] },
                    { path: 'division', component: divisionComponent, canActivate: [AppRouteGuard] },
                    { path: 'division/editdivision', component: editdivisionComponent, canActivate: [AppRouteGuard] },
                    { path: 'division/createdivision', component: createdivisionComponent, canActivate: [AppRouteGuard] },
                    { path: 'food', component: foodComponent, canActivate: [AppRouteGuard] },
                    { path: 'food/createfood', component: createfoodComponent, canActivate: [AppRouteGuard] },
                    { path: 'type/edittype', component: edittypeComponent, canActivate: [AppRouteGuard] },
                    { path: 'type/createtype', component: createtypeComponent, canActivate: [AppRouteGuard] },
                    { path: 'type', component: typeComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },
               
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
