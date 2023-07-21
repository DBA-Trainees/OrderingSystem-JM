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
  CreateCategoriesDto,
  CategoriesServiceProxy,
} from "@shared/service-proxies/service-proxies";
import { Router } from "@angular/router";
@Component({
  selector: "app-category",
  templateUrl: "./createcategory.component.html",
})
export class createcategoryComponent
  extends AppComponentBase
  implements OnInit
{
  saving = false;
  category = new CreateCategoriesDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _categoriesService: CategoriesServiceProxy,
    public router: Router,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }
  save(): void {
    this.saving = true;

    this._categoriesService.create(this.category).subscribe(
      () => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.bsModalRef.hide();
        this.onSave.emit();
        this.router.navigateByUrl('app/category')
      },
      () => {
        this.saving = false;
      }
    );
  }
}
