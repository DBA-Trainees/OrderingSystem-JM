import { Component, Injector } from "@angular/core";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  CustomerDto,
  CustomerDtoPagedResultDto,
  CustomerServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { finalize } from "rxjs";
import { editcustomerComponent } from "./edit-customer/editcustomer.component";
import { createcustomerComponent } from "./create-customer/createcustomer.component";

class PagedCustomerResultRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  // styleUrls: ['./customer.component.css']
})
export class customerComponent extends PagedListingComponentBase<CustomerDto> {
  customer: CustomerDto[] = [];
  keyword = "";
  isActive: boolean | null;
  advancedFiltersVisible = false;

  constructor(
    injector: Injector,
    private _customerService: CustomerServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }
  createCustomer(): void {
    this.showCreateEditCustomer();
  }

  editcustomer(customer: CustomerDto): void {
    this.showCreateEditCustomer(customer.id);
  }
  
  private showCreateEditCustomer(id?: number): void {
    let CreateorEditCustomer: BsModalRef;
    if (!id) {
      CreateorEditCustomer = this._modalService.show(createcustomerComponent, {
        class: "model-lg",
      });
    } else {
      CreateorEditCustomer = this._modalService.show(editcustomerComponent, {
        class: "model-lg",
        initialState: {
          id: id,
        },
      });
    }

    CreateorEditCustomer.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

  protected delete(customer: CustomerDto): void {
    abp.message.confirm(
      this.l("", customer.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._customerService.delete(customer.id).subscribe(() => {
            abp.notify.success(this.l("Succesfully Deleted"));
            this.refresh();
          });
        }
      }
    );
  }

  protected list(
    request: PagedCustomerResultRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._customerService
      .getAllCustomerWithDivision(
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
      .subscribe((result: CustomerDtoPagedResultDto) => {
        this.customer = result.items;
        this.showPaging(result, pageNumber);
      });
  }
}
