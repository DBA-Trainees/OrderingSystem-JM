import { Component, EventEmitter, Injector, Output } from "@angular/core";
import { Router } from "@angular/router";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  FoodDto,
  CartDto,
  CartDtoPagedResultDto,
  CartServiceProxy,
  CreateOrderDto,
  OrderServiceProxy,
  CustomerServiceProxy,
  FoodServiceProxy,
  CreateCartDto,
} from "@shared/service-proxies/service-proxies";
import { AbpSessionService } from "abp-ng2-module";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";
import * as moment from "moment";
import "moment/locale/pt-br";

class PagedCartResultRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  // styleUrls: ['./cart.component.css']
})
export class cartComponent extends PagedListingComponentBase<CartDto> {
  Carts: CartDto[] = [];
  Order = new CreateOrderDto();
  Cart = new CreateCartDto();
  keyword = "";
  isActive: boolean | null;
  saving = false;
  advancedFiltersVisible = false;


  constructor(
    injector: Injector,
    private _CartService: CartServiceProxy,
    private _sessionService: AbpSessionService,
    private _customerService: CustomerServiceProxy,
    private _OrderService: OrderServiceProxy,
    private _foodService: FoodServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  protected list(
    request: PagedCartResultRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._CartService
      .getAllCustomerAndFood(
        request.keyword,
        request.isActive,
        request.skipCount,
        request.maxResultCount
      )
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: CartDtoPagedResultDto) => {
        this.Carts = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(Cart: CartDto): void {
    abp.message.confirm(this.l(""), undefined, (result: boolean) => {
      if (result) {
        this._CartService.delete(Cart.id).subscribe(() => {
          abp.notify.success(this.l("Succesfully Deleted"));
          this.refresh();
        });
      }
    });
  }

  @Output() onSave = new EventEmitter<any>();
 
  GetCart(id: number):void{
    this.Order.cartId = id;
    
  }
  Checkout(id: number): void {
    
    var dateNow = moment.utc();
    this.saving = true;
    this.Order.status = 2;
    this.Order.dateOrdered = dateNow;
    this.Order.foodId = id;
    
    this._customerService.get(this._sessionService.userId).subscribe((result) => {
        this.Order.customerId = result.id;

        this._OrderService.create(this.Order).subscribe(
          () => {
            this._CartService.delete(this.Order.cartId).subscribe(() => {
              this.notify.info(this.l("Added to cart"));
              this.bsModalRef.hide();
              this.onSave.emit();
            })
          },
          () => {
            this.saving = false;
          }
        );
      });
  }
}
