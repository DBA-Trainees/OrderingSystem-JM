import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { forEach as _forEach, map as _map, result } from "lodash-es";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CustomerServiceProxy,
  CustomerDtoPagedResultDto,
  DivisionServiceProxy,
  DivisionDto,
  CreateCustomerDto,
} from "@shared/service-proxies/service-proxies";
import { Router } from "@angular/router";

@Component({
  selector: "createcustomer",
  templateUrl: "./createcustomer.component.html",
})
export class createcustomerComponent extends AppComponentBase implements OnInit {
  saving = false;
    customer=  new CreateCustomerDto();
  divisions: DivisionDto[];
  selectedDivision: number = null;

  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    public _customerService: CustomerServiceProxy,
    public _divisionService: DivisionServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.show();
  }

  show(){
    this._customerService.getDivision().subscribe(
      result => {
        this.divisions = result.items;
      }
    );
  }

  save(): void {
    this.saving = true;
    this.customer.divisionId = this.selectedDivision;

    this._customerService.create(this.customer).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      } 
    );
  }
}
