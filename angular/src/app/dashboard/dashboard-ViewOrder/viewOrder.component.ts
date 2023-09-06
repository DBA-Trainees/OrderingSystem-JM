import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import {
  forEach as _forEach,
  includes as _includes,
  map as _map,
} from "lodash-es";
import { AppComponentBase } from "@shared/app-component-base";
import {
  FoodServiceProxy,
  FoodDto,
  CustomerServiceProxy,
  CreateOrderDto,
  OrderServiceProxy,
  OrderDto,
} from "@shared/service-proxies/service-proxies";
import * as moment from "moment";
import { AbpSessionService } from "abp-ng2-module";
import { Guid } from "guid-typescript";

@Component({
  selector: "app-viewOrder",
  templateUrl: "./viewOrder.component.html",
})
export class viewOrderComponent extends AppComponentBase implements OnInit {
  saving = false;
  food = new FoodDto();
  order = new CreateOrderDto();
  dateNow: Date = new Date();
  Orders: OrderDto[] = [];
  id: number;
  generatedNumber = Guid;
  orderQuantity = 1;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _foodService: FoodServiceProxy,
    private _OrderService: OrderServiceProxy,
    private _sessionService: AbpSessionService,
    private _CustomerService: CustomerServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.id) {
      this._foodService.get(this.id).subscribe((result) => {
        this.food = result;
      });
    }
  }

  AddToCart(id: number): void {
    this.saving = true;
    this.order.dateOrdered = moment(this.dateNow);
    this.order.qty = this.orderQuantity;
    this.order.size = this.food.size;
    this.order.foodId = id;
    this.order.status = 1;

    this._OrderService.getAllFoodAndStatus(this.food.id).subscribe((result) => {
      if (this.food.id == result.foodId && result.status == 1 && this.food.size == result.size) {
        this.notify.info(this.l("Food is already added to cart"));
      } else {
        this._CustomerService
          .get(this._sessionService.userId)
          .subscribe((result) => {
            this.order.customerId = result.id;
            this._OrderService.create(this.order).subscribe(
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
    });
  }
}
