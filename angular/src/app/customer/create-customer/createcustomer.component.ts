import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { forEach as _forEach, map as _map } from "lodash-es";
import { AppComponentBase } from "@shared/app-component-base";
import {
  CustomerServiceProxy,
  DivisionServiceProxy,
  DivisionDto,
  CreateCustomerDto,
  CustomerDto,
  UserServiceProxy,
  UserDto,
} from "@shared/service-proxies/service-proxies";

@Component({
  selector: "createcustomer",
  templateUrl: "./createcustomer.component.html",
})
export class createcustomerComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  customer = new CreateCustomerDto();
  divisions: DivisionDto[];
  users: UserDto[];
  selectedDivision: number = null;
  selectedUser: number = null;
  id: number;

  @Output() onSave = new EventEmitter<any>();
  constructor(
    injector: Injector,
    public _customerService: CustomerServiceProxy,
    public _divisionService: DivisionServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.show();
  }

  show() {
    this._customerService.getDivision().subscribe((result) => {
      this.divisions = result.items;
    });
    this._customerService.getUser().subscribe((result) => {
      this.users = result.items;
    });
  }

  save(): void {
    this.saving = true;
    this.customer.divisionId = this.selectedDivision;
    this.customer.userId = this.selectedUser;
   
    this._customerService.getCustomerAndUser(this.selectedUser).subscribe(
      (result) =>{
        if (this.selectedUser == result.userId) {
          this.notify.info(this.l("User exist"));
        } else 
        {
          this._customerService.create(this.customer).subscribe(
            () => {
              this.notify.info(this.l('Created Successfully'));
              this.bsModalRef.hide();
              this.onSave.emit();
            },
            () => {
              this.saving = false;
            }
          );
        }
      }
    )
    
    
  }
}
