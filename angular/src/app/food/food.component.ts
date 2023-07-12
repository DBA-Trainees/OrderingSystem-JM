import { Component, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { FoodDto, FoodDtoPagedResultDto, FoodServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';

class PagedFoodResultRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html'  ,
  // styleUrls: ['./food.component.css']
})


export class foodComponent extends PagedListingComponentBase <FoodDto> {
  protected delete(entity: FoodDto): void {
    throw new Error('Method not implemented.');
  }
  foods: FoodDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _foodService: FoodServiceProxy,
    private _modalService: BsModalService
  ){
    super(injector);
  }

  protected list(
    request: PagedFoodResultRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._foodService
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
    .subscribe((result: FoodDtoPagedResultDto) => {
      this.foods = result.items;
      this.showPaging(result, pageNumber);
    });
  }
}
// CreateFoodView(): void {
  
// }