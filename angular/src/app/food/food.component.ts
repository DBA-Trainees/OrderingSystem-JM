import { Component, Injector } from '@angular/core';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/paged-listing-component-base';
import { FoodDto, FoodDtoPagedResultDto, FoodServiceProxy } from '@shared/service-proxies/service-proxies';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs';
import { createfoodComponent } from './create-food/createfood.component';
import { editfoodComponent } from './edit-food/editfood.component';

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
  createFood(): void {
    this.showCreateEditFood();
  }
  editFood(food:FoodDto):void{
    this.showCreateEditFood(food.id);
}
private showCreateEditFood(id?: number): void {
  let CreateorEditFood: BsModalRef;
  if (!id) {
    CreateorEditFood = this._modalService.show(createfoodComponent, {
      class: "model-lg",
    });
  } else {
    CreateorEditFood = this._modalService.show(editfoodComponent, {
      class: "model-lg",
      initialState: {
        id: id,
      },
    });
  } CreateorEditFood.content.onSave.subscribe(() => {
    this.refresh();
  });
}
protected delete(food: FoodDto): void {
  abp.message.confirm(
    this.l("", food.name),
    undefined,
    (result: boolean) => {
      if (result) {
        this._foodService.delete(food.id).subscribe(() => {
          abp.notify.success(this.l("Succesfully Deleted"));
          this.refresh();
        });
      }
    }
  );
}
  protected list(
    request: PagedFoodResultRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._foodService
    .getAllFoodWithTypeandCategory( 
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
