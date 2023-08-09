import { Component, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { OrderDto, OrderDtoPagedResultDto, FoodServiceProxy, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { createorderComponent } from './create-order/createorder.component';
import { editorderComponent } from './edit-order/editorder.component';

class PagedOrderResultRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html'  ,
  // styleUrls: ['./order.component.css']
})

export class orderComponent extends PagedListingComponentBase <OrderDto>{
  orders: OrderDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;
  id : number;
  constructor(
    injector: Injector,
    private _orderService: OrderServiceProxy,
    private _modalService: BsModalService
  ){
super(injector);
  }

  createOrder():void{
    this.showCreateEditOrder();
  }

  editOrder(orders : OrderDto):void{
    this.showCreateEditOrder(orders.id);
  }
  
  protected delete(order: OrderDto): void {
    // abp.message.confirm(
    //   this.l("", order.name),
    //   undefined,
    //   (result: boolean) => {
    //     if (result) {
    //       this._orderService.delete(order.id).subscribe(() => {
    //         abp.notify.success(this.l("Succesfully Deleted"));
    //         this.refresh();
    //       });
    //     }
    //   }
    // );
  }


  private showCreateEditOrder(id?: number): void {
    let CreateorEditOrder: BsModalRef;
    if (!id) {
      CreateorEditOrder = this._modalService.show(createorderComponent, {
        class: "model-lg",
      });
    } else {
      CreateorEditOrder = this._modalService.show(editorderComponent, {
        class: "model-lg",
        initialState: {
          id: id,
        },
      });
    } CreateorEditOrder.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  protected list(
    request: PagedOrderResultRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._orderService
    .getAll( 
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
      this.orders = result.items;
      this.showPaging(result, pageNumber);
    });
  }

}
