import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';

import { categoryComponent } from './category/category.component';
import { foodComponent } from './food/food.component';
import { divisionComponent } from './division/division.component';
import { typeComponent } from './type/type.component';
import { customerComponent } from './customer/customer.component';
import { dashboardComponent } from './dashboard/dashboard.component';
import { orderComponent } from './order/order.component';
import { cartComponent } from './cart/cart.component';
import { viewOrderComponent } from './dashboard/dashboard-ViewOrder/viewOrder.component';

// create function
import { createcategoryComponent } from './category/create-category/createcategory.component';
import { createdivisionComponent } from './division/create-division/createdivision.component';
import { createtypeComponent } from './type/create-type/createtype.component';
import { createcustomerComponent } from './customer/create-customer/createcustomer.component';
import { createfoodComponent } from './food/create-food/createfood.component';

//edit function
import { editcategoryComponent } from './category/edit-category/editcategory.component';
import { editdivisionComponent } from './division/edit-division/editdivision.component';
import { edittypeComponent } from './type/edit-type/edittype.component';
import { editcustomerComponent } from './customer/edit-customer/editcustomer.component';
import { editfoodComponent } from './food/edit-food/editfood.component';

import {  CategoriesServiceProxy, CustomerServiceProxy, DivisionServiceProxy, FoodServiceProxy, OrderServiceProxy, TypeServiceProxy, UserServiceProxy } from '@shared/service-proxies/service-proxies';




@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        
        // tenants
        TenantsComponent,
        CreateTenantDialogComponent,
        EditTenantDialogComponent,
        // roles
        RolesComponent,
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        // users
        UsersComponent,
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ChangePasswordComponent,
        ResetPasswordDialogComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent,
        divisionComponent,
        editdivisionComponent,
        createdivisionComponent,
        categoryComponent,
        foodComponent,
        edittypeComponent,
        createtypeComponent,
        typeComponent,
        createcategoryComponent,
        editcategoryComponent,
        customerComponent,
        editcustomerComponent,
        createcustomerComponent,
        dashboardComponent,
        createfoodComponent,
        editfoodComponent,
        orderComponent,
        cartComponent,
        viewOrderComponent,

    ],
    imports: [
        // BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        CollapseModule,
        TabsModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
    ],
    providers: [
        CategoriesServiceProxy,
        DivisionServiceProxy,
        FoodServiceProxy,
        TypeServiceProxy,
        CustomerServiceProxy,
        OrderServiceProxy,
        UserServiceProxy,
        ]
})
export class AppModule {}
