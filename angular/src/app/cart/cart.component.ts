import { Component, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { FoodDto, OrderDto, OrderDtoPagedResultDto, OrderServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';


class PagedOrderResultRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'  ,
  // styleUrls: ['./cart.component.css']
})

export class cartComponent extends PagedListingComponentBase <OrderDto>{
  
  protected delete(entity: OrderDto): void {
    throw new Error('Method not implemented.');
  }
  orders: OrderDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  
 constructor(
  injector: Injector,
  private _orderService: OrderServiceProxy,
  private _modalService: BsModalService,
){
  super(injector);
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
