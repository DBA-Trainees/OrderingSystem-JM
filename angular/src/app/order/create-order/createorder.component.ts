import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Injector,
} from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { forEach as _forEach, map as _map } from "lodash-es";
import { AppComponentBase } from "@shared/app-component-base";
import {
  FoodServiceProxy,
  FoodDto,
  CategoriesDto,
  TypeDto,
  OrderDto,
  CustomerDto,
  OrderServiceProxy,
} from "@shared/service-proxies/service-proxies";
@Component({
  selector: "app-createorder",
  templateUrl: "./createorder.component.html",
})
export class createorderComponent extends AppComponentBase implements OnInit {
  saving = false;
  order = new OrderDto();
  customer: CustomerDto[];
  food: FoodDto[];

  selectedCustomer: number = null;
  selectedFood: number = null;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _orderService: OrderServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }
  ngOnInit(): void {
    this.show();
  }
  show(): void {
    this._orderService.getCustomer().subscribe((result) => {
      this.customer = result.items;
    });
    this._orderService.getFood().subscribe((result) => {
      this.food = result.items;
    });
  }
  save(): void {
    this.saving = true;
    this.order.customerId = this.selectedCustomer;
    this.order.foodId = this.selectedFood;

    this._orderService.create(this.order).subscribe(
      () => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();
        // this.router.navigateByUrl('/app/createfood')
      },
      () => {
        this.saving = false;
      }
    );
  }
}
