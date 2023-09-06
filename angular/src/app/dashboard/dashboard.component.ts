import { Component, EventEmitter, Injector, Output } from "@angular/core";
import { Router } from "@angular/router";
import { cartComponent } from "@app/cart/cart.component";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  CustomerServiceProxy,
  FoodDto,
  FoodDtoPagedResultDto,
  FoodServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";
import { AbpSessionService } from "abp-ng2-module";
import { viewOrderComponent } from "./dashboard-ViewOrder/viewOrder.component";
import * as moment from "moment";

class PagedFoodResultRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class dashboardComponent extends PagedListingComponentBase<FoodDto> {
  protected delete(entity: FoodDto): void {
    throw new Error("Method not implemented.");
  }
  count: number;
  foods: FoodDto[] = [];
  id: number;

  keyword = "";
  isActive: boolean;
  advancedFiltersVisible = false;
  saving = false;
  selectedCategory: number = null;

  constructor(
    injector: Injector,
    private _foodService: FoodServiceProxy,
    private _customerService: CustomerServiceProxy,
    private bsModalRef: BsModalRef,
    private _sessionService: AbpSessionService,
    private _modalService: BsModalService,
    public router: Router
  ) {
    super(injector);
  }
  @Output() onSave = new EventEmitter<any>();

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

  viewOrder(food: FoodDto): void {
    this.showViewOrder(food.id);
  }

  private showViewOrder(id?: number): void {
    let viewOrder: BsModalRef;
    viewOrder = this._modalService.show(viewOrderComponent, {
      class: "modal-lg",
      initialState: {
        id: id,
      },
    });
  }

  showModal(): void {
    this.cartModal();
  }

  private cartModal(id?: number): void {
    let cartModal: BsModalRef;
    cartModal = this._modalService.show(cartComponent, {
      class: "modal-lg",
    });
  }

}
