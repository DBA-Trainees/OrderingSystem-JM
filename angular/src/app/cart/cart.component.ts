import { Component, EventEmitter, Injector, Output } from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  OrderServiceProxy,
  OrderDto,
  OrderDtoPagedResultDto,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";
import "moment/locale/pt-br";
import * as moment from "moment";

class PagedOrderResultRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  // styleUrls: ['./cart.component.css']
})
export class cartComponent extends PagedListingComponentBase<OrderDto> {
  Order = new OrderDto();
  Orders : OrderDto[]= [];
  dateToday : Date = new Date();
  keyword = "";
  isActive: boolean | null;
  saving = false;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _OrderService: OrderServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  protected list(
    request: PagedOrderResultRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._OrderService
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
      .subscribe((result: OrderDtoPagedResultDto) => {
        this.Orders = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  protected delete(Order: OrderDto): void {
    abp.message.confirm(this.l(""), undefined, (result: boolean) => {
      if (result) {
        this._OrderService.delete(Order.id).subscribe(() => {
          abp.notify.success(this.l("Succesfully Deleted"));
          this.refresh();
        });
      }
    });
  }

  @Output() onSave = new EventEmitter<any>();
  
  Checkout(orderNumber: string):void{
   const orderDto = new OrderDto();

   orderDto.orders = this.Orders.map((order) =>{

    const Order = new OrderDto();
    Order.id = order.id;
    Order.foodId = order.foodId;
    Order.size = order.size;
    Order.status = 2;
    Order.qty = order.qty;
    Order.customerId = order.customerId;
    Order.dateOrdered = moment(this.dateToday);

    return Order;
   });
   this._OrderService.checkout(orderDto).subscribe(
    (result) => {
      orderNumber = result.orderNumber;
      this.notify.info(this.l("Ordered succesfully"));
      this.bsModalRef.hide();
      this.onSave.emit(result);
      this.refresh();

    }
   )
  }
}