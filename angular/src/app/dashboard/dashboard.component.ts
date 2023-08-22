import { Component, EventEmitter, Injector, Output } from "@angular/core";
import { Router } from "@angular/router";
import { cartComponent } from "@app/cart/cart.component";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  CartDto,
  CartServiceProxy,
  CreateCartDto,
  CustomerServiceProxy,
  FoodDto,
  FoodDtoPagedResultDto,
  FoodServiceProxy,
  OrderServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Subject, finalize } from "rxjs";
import { AbpSessionService } from "abp-ng2-module";

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
  AddToCart = new CreateCartDto();
  keyword = "";
  isActive: boolean;
  advancedFiltersVisible = false;
  saving = false;
  selectedCustomer: number = null;
  SelectedFood: number = null;

  constructor(
    injector: Injector,
    private _foodService: FoodServiceProxy,
    private _customerService: CustomerServiceProxy,
    // private _orderService: OrderServiceProxy,
    private _cartService: CartServiceProxy,
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

  showModal(): void {
    this.cartModal();
  }

  private cartModal(id?: number): void {
    let cartModal: BsModalRef;
    cartModal = this._modalService.show(cartComponent, {
      class: "modal-lg",
    });
  }

  addToCart(id: number): void {
    this.saving = true;
    this.AddToCart.status = 1;
    this.AddToCart.foodId = id;

    this._customerService
      .get(this._sessionService.userId)
      .subscribe((result) => {
        this.AddToCart.customerId = result.id;

        this._cartService.create(this.AddToCart).subscribe(
          () => {
            this.notify.info(this.l("Added to cart"));
            this.bsModalRef.hide();
            this.onSave.emit();
          },
          () => {
            this.saving = false;
          }
        );
      });
  }
}
