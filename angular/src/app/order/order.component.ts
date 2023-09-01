import { Component, Injector } from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  CartDto,
  CartDtoPagedResultDto,
  CartServiceProxy,
  OrderDto,
  OrderDtoPagedResultDto,
  OrderServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { result } from "lodash-es";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";

class PagedOrderResultRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  // styleUrls: ['./order.component.css']
})
export class orderComponent extends PagedListingComponentBase<OrderDto> {
  
  Orders: OrderDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;
  id: number;

  constructor(injector: Injector,
    private _OrderService: OrderServiceProxy,
    // private _orderService: OrderServiceProxy
     ) {
    super(injector);
  }
  list(
    request: PagedOrderResultRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._OrderService
      .getAllOrders(
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

  protected delete(entity: OrderDto): void {
    throw new Error("Method not implemented.");
  }

}
