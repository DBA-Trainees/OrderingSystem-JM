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
  CustomerDto,
  CustomerServiceProxy,
  DivisionDto,
  DivisionServiceProxy,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "app-editcustomer",
  templateUrl: "./editcustomer.component.html",
})
export class editcustomerComponent extends AppComponentBase implements OnInit {
  saving = false;
  customer = new CustomerDto();
  customers: CustomerDto[];

  division = new DivisionDto();
  divisions: DivisionDto[];
  selectedDivision: number = null;
  id: number = 0;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _customerService: CustomerServiceProxy,
    private _divisionService: DivisionServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    if (this.id) {
      this._customerService.get(this.id).subscribe((result) => {
        this.customer = result;
      });
    }
    this.show();
  }

  show(): void {
    this._customerService.getDivision().subscribe((result) => {
      this.divisions = result.items;
    });
  }

  save(): void {
    this.saving = true;
    this.customer.divisionId = this.selectedDivision;
      this._customerService.update(this.customer).subscribe(
        () => {
          this.notify.info(this.l("SavedSuccessfully"));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
    }
  }
